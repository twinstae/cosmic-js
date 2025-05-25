import { describe } from "bun:test";
import { runTestScenario } from "../scenario";
import app from "./app";
const fetchElysia = async (path: string, init?: RequestInit) => {
	const res = await app.handle(
		new Request(`http://localhost:3000${path}`, init),
	);

	if(res.ok) {

		if(res.headers.get("Content-Type") === "application/json"){
			return res.json()
		}

		return res.text()
	}

	throw Error(`${res.status} ${await res.text()}`);
};
const get = (path: string) => fetchElysia(path);
const post = (path: string, body: unknown) =>
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
