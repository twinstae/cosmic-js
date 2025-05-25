import app from "./index.ts";
import { runTestScenario } from "../scenario";
import { describe } from "bun:test";

async function get(path: string) {
	const res = await app.request(path);

	if (res.ok) {
		if (res.headers.get("Content-Type") === "application/json") {
			return res.json();
		}

		return res.text();
	}

	throw res;
}

async function post(path: string, data: unknown) {
	const res = await app.request(path, {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (res.ok) {
		return res;
	}

	throw res;
}

describe("hono", () => {
	runTestScenario("hono api", {
		get,
		post,
	});
});
