import Fastify from 'fastify';
import cors from '@fastify/cors';
import { appRoutes } from './routes';
import { jwtPlugin } from './plugins/jwt';

const app = Fastify();

app.register(cors, {});
app.register(jwtPlugin);
app.register(appRoutes);

app.listen({ port: 3333 }).then(() => {
  console.log('Server is running on port 3333');
});
