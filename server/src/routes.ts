import dayjs from 'dayjs';
import fastify, { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from './lib/prisma';
import * as bcrypt from 'bcrypt';

export async function appRoutes(app: FastifyInstance) {
  app.post('/signup', async (request: any, reply: any) => {
    const createUserBody = z.object({
      username: z.string(),
      password: z.string(),
    });

    const { username, password } = createUserBody.parse(request.body);

    const today = dayjs().startOf('day').toDate();

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        created_at: today,
      },
    });

    const token = app.jwt.sign({
      payload: { username, password },
      expiresIn: 3600,
    });

    reply.send({ userId: newUser.id, token: token });
  });

  app.post('/login', async (request, reply) => {
    const createUserBody = z.object({
      username: z.string(),
      password: z.string(),
    });

    const { username, password } = createUserBody.parse(request.body);
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!user) throw Error();

    const passwordMatch = bcrypt.compare(user.password, password);

    if (!passwordMatch) reply.status(403).send({ message: 'Senha invalida' });

    const token = app.jwt.sign({
      payload: { username, password },
      expiresIn: 3600,
    });

    reply.status(200).send({ userId: user.id, token: token });
  });

  app.post(
    '/habits',
    // @ts-ignore
    { onRequest: [app.authenticate] },
    async (request: any) => {
      const createHabitBody = z.object({
        title: z.string(),
        weekDays: z.array(z.number().min(0).max(6)),
        userId: z.string().uuid(),
      });

      const { title, weekDays, userId } = createHabitBody.parse(request.body);

      const today = dayjs().startOf('day').toDate();

      await prisma.habit.create({
        data: {
          title,
          created_at: today,
          user_id: userId,
          weekDays: {
            create: weekDays.map((weekDay) => {
              return { week_day: weekDay };
            }),
          },
        },
      });

      let day = await prisma.day.findUnique({
        where: { date: today },
      });
      console.log(day);
      if (!day) {
        day = await prisma.day.create({ data: { date: today } });
      }
    }
  );

  // @ts-ignore
  app.get('/day', { onRequest: [app.authenticate] }, async (request: any) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
      userId: z.string().uuid(),
    });

    const { date, userId } = getDayParams.parse(request.query);

    const parsedDate = dayjs(date).startOf('day');
    const weekDay = parsedDate.get('day');

    // recupera todos os habitos do dia
    // recuperar todos os habitos completados

    const possibleHabits = await prisma.habit.findMany({
      where: {
        user_id: userId,
        created_at: { lte: date },
        weekDays: { some: { week_day: weekDay } },
      },
    });

    const day = await prisma.day.findUnique({
      where: { date: parsedDate.toDate() },
      include: { dayHabits: true },
    });

    const completedHabits =
      day?.dayHabits.map((dayHabit) => {
        return dayHabit.habit_id;
      }) ?? [];

    return { possibleHabits, completedHabits };
  });

  // checked / unchecked
  app.patch(
    '/habits/:id/toggle',
    //@ts-ignore
    { onRequest: [app.authenticate] },
    async (request: any) => {
      const toggleHabitParams = z.object({ id: z.string().uuid() });

      const { id } = toggleHabitParams.parse(request.params);

      const today = dayjs().startOf('day').toDate();

      let day = await prisma.day.findUnique({ where: { date: today } });

      if (!day) {
        day = await prisma.day.create({ data: { date: today } });
      }

      const dayHabit = await prisma.dayHabit.findUnique({
        where: { day_id_habit_id: { day_id: day.id, habit_id: id } },
      });

      if (dayHabit) {
        await prisma.dayHabit.delete({ where: { id: dayHabit.id } });
      } else {
        // completes the habit for the day
        await prisma.dayHabit.create({
          data: { day_id: day.id, habit_id: id },
        });
      }
    }
  );

  app.get(
    '/summary',
    // @ts-ignore
    { onRequest: [app.authenticate] },
    async (request: any) => {
      const { userId } = request.query;
      const summary = await prisma.$queryRaw`
      SELECT
        D.id,
        D.date,
        (
          SELECT
           cast(count(*) as float)
          FROM day_habits DH
          WHERE DH.day_id = D.id
        ) as completed,
        (
          SELECT
           cast(count(*) as float)
          FROM habit_week_days HWD
          JOIN habits H
           ON H.id = HWD.habit_id
          WHERE
           HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
           AND H.created_at <= D.date AND H.user_id = ${userId}
        ) as amount
      FROM days as D
    `;

      return summary;
    }
  );
}
