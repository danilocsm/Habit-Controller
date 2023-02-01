import fastifyJwt from '@fastify/jwt';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

const jwtPlugin = fp((app: FastifyInstance, opts: any, done: any) => {
  app.register(fastifyJwt, { secret: process.env.SECRET_KEY as string });

  app.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (error) {
        reply.status(401);
        reply.send(error);
      }
    }
  );
  done();
});

export { jwtPlugin };
