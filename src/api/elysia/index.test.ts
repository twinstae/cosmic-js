import { describe } from "bun:test";
import { runTestScenario } from "../scenario";
import app from "./app";
const fetchElysia = (path: string, init?: RequestInit) =>
	app.handle(new Request("http://localhost:3000" + path, init)).then((res) => {
		if (!res.ok) {
			return res
				.text()
				.then((value) =>
					Promise.reject(JSON.stringify({ code: res.status, error: value })),
				);
		}
		return res.json();
	});
const get = (path: string) => fetchElysia(path);
const post = (path: string, body: any) =>
	fetchElysia(path, {
		method: "POST",
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json",
		},
	});

describe("elysia", () => {
	runTestScenario("elysia api", {
		get,
		post,
	});
});
