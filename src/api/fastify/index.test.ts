import Fastify from "fastify";
import {
	TypeBoxTypeProvider,
	TypeBoxValidatorCompiler,
} from "@fastify/type-provider-typebox";
import registerBatches from "./batch";
import { runTestScenario } from "../scenario";
import { afterAll, beforeAll, describe } from "bun:test";

const app = Fastify({
	logger: false,
})
	.setValidatorCompiler(TypeBoxValidatorCompiler)
	.withTypeProvider<TypeBoxTypeProvider>()
	.register(registerBatches, { prefix: "/batches" });

type AppT = typeof app;

describe("Fastify API", () => {
	let app: AppT;

	beforeAll(async () => {
		app = Fastify({
			logger: false,
		})
			.setValidatorCompiler(TypeBoxValidatorCompiler)
			.withTypeProvider<TypeBoxTypeProvider>()
			.register(registerBatches, { prefix: "/batches" });

		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	async function get(path: string) {
		const res = await app.inject({
			method: "GET",
			url: path,
		});

		return res.json();
	}

	async function post(path: string, data: string | object) {
		const res = await app.inject({
			method: "POST",
			url: path,
			payload: data,
		});

		return new Response(JSON.stringify(await res.json()), {
			status: res.statusCode,
			headers: new Headers(JSON.parse(JSON.stringify(res.headers))),
		});
	}

	runTestScenario("fastify api", {
		get,
		post,
	});
});
