import { NavLink } from "@/components/nav-link";
import { CustomRouterProvider } from "@/test/custom-router-provider";

import { describe, expect, it } from "bun:test";

describe("Nav Link", () => {
	it("should highlight when the nav link when is the current page link", async () => {
		const wrapper = await CustomRouterProvider({
			element: (
				<>
					<NavLink to="/about">About</NavLink>
					<NavLink to="/home">Home</NavLink>
				</>
			),
			path: "/about",
		});

		expect(wrapper.getByText("About").dataset.current).toEqual("true");
		expect(wrapper.getByText("Home").dataset.current).toEqual("false");
	});
});
