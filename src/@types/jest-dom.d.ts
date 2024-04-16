import type { expect } from "bun:test";
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";
declare module "bun:test" {

	// biome-ignore lint/suspicious/noExplicitAny:
	
	interface Matchers<T = any>
		extends TestingLibraryMatchers<
			ReturnType<typeof expect.stringContaining>,
			T
		> {}
}
