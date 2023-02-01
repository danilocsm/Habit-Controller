import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

function generateDateFromYearBeginning() {
  const firstDayOfTheYear = dayjs().startOf('year');
  const today = new Date();

  const dates = [];
  let compareDate = firstDayOfTheYear;

  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, 'day');
  }

  return dates;
}

async function run() {
  await prisma.day.deleteMany();
  const daysSinceYearBeginning = generateDateFromYearBeginning();

  const data = await Promise.all(
    daysSinceYearBeginning.map((day) => {
      return prisma.day.create({ data: { date: day } });
    })
  );
}

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
