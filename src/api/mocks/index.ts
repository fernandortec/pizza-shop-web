import { signInMock } from "@/api/mocks/sign-in-mock";
import { env } from "@/env";
import { setupWorker } from "msw/browser";

export const worker = setupWorker(signInMock);

export async function enableMSW(): Promise<void> {
	if (env.MODE !== "test") return;

	await worker.start();
}
