import Fastify from 'fastify';
import {
  TypeBoxTypeProvider,
  TypeBoxValidatorCompiler,
} from '@fastify/type-provider-typebox';
import registerBatches from './batch';
import { runTestScenario } from '../scenario';
import { afterAll, beforeAll, describe } from 'bun:test';

describe('Fastify API', () => {
  let app: ReturnType<typeof Fastify>;

  beforeAll(async () => {
    app = Fastify({
      logger: false,
    })
      .setValidatorCompiler(TypeBoxValidatorCompiler)
      .withTypeProvider<TypeBoxTypeProvider>();

    app.register(registerBatches, { prefix: '/batches' });

    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  async function get(path: string) {
    const res = await app.inject({
      method: 'GET',
      url: path,
    });

    return res.json();
  }

  async function post(path: string, data: unknown) {
    return app.inject({
      method: 'POST',
      url: path,
      payload: data,
    });
  }

  runTestScenario('fastify api', {
    get,
    post,
  });
});
