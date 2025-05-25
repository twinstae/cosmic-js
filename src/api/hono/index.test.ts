import app from "./index.ts";
import { runTestScenario } from "../scenario";
import { describe } from "bun:test";

async function get(path: string) {
	const res = await app.request(path);

	return res.json();
}

async function post(path: string, data: unknown) {
	return app.request(path, {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
}

describe("hono", () => {
	runTestScenario("hono api", {
		get,
		post,
	});
});
