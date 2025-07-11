import Fastify from "fastify";
import {
	type TypeBoxTypeProvider,
	TypeBoxValidatorCompiler,
} from "@fastify/type-provider-typebox";
import registerBatches from "./batch";
import { runTestScenario } from "../scenario";
import { afterAll, beforeAll, describe } from "bun:test";

describe("Fastify API", () => {
	const app = Fastify({
		logger: false,
	})
		.setValidatorCompiler(TypeBoxValidatorCompiler)
		.withTypeProvider<TypeBoxTypeProvider>()
		.register(registerBatches, { prefix: "/batches" });

	beforeAll(async () => {
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

		const status = res.statusCode.toString();
		if (status.startsWith("4") || status.startsWith("5")) {
			throw new Response(res.body, {
				status: res.statusCode,
				headers: new Headers(JSON.parse(JSON.stringify(res.headers))),
			});
		}

		return res.json();
	}

	async function post(path: string, data: string | object) {
		const res = await app.inject({
			method: "POST",
			url: path,
			payload: data,
		});

		const status = res.statusCode.toString();

		if (status.startsWith("4") || status.startsWith("5")) {
			throw new Response(res.body, {
				status: res.statusCode,
				headers: new Headers(JSON.parse(JSON.stringify(res.headers))),
			});
		}

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
