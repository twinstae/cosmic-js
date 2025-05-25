import router from "./index";
import { runTestScenario } from "../scenario";
import { expect, it } from "bun:test";

const HOST = "http://localhost:3000";

async function get(path: string) {
	const res = await router.fetch(HOST + path);

	if (res.ok) {
		if (res.headers.get("Content-Type")?.startsWith("application/json")) {
			return res.json();
		}

		const t = await res.text();
		console.log(t);
		return t;
	}
	throw res;
}

async function post(path: string, data: unknown) {
	const res = await router.fetch(HOST + path, {
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

it("fets is fets", () => {
	expect(1+1).toBe(2)
})

runTestScenario("fets api", {
	get,
	post,
});
