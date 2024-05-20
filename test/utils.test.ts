import { assertEquals } from "@std/assert";
import { get_leading_spaces, get_trailing_spaces } from "../lib/utils.ts";

Deno.test("utils/get_leading_spaces", () => {
	assertEquals(get_leading_spaces(""), 0);
	assertEquals(get_leading_spaces(" "), 1);
	assertEquals(get_leading_spaces("\t"), 1);
	assertEquals(get_leading_spaces("\r\n"), 2);
	assertEquals(get_leading_spaces("  \n"), 3);
	assertEquals(
		get_leading_spaces("\n"
			+ "While making this website, I decided to challenge myself and reduce to the absolute minimum the usage of Javascript. This implied that the navigation on this website\n"),
		1
	);
});

Deno.test("utils/get_trailing_spaces", () => {
	assertEquals(get_trailing_spaces(""), 0);
	assertEquals(get_trailing_spaces(" "), 1);
	assertEquals(get_trailing_spaces("\t"), 1);
	assertEquals(get_trailing_spaces("\r\n"), 2);
	assertEquals(get_trailing_spaces("  \n"), 3);
	assertEquals(
		get_trailing_spaces("\n"
			+ "While making this website, I decided to challenge myself and reduce to the absolute minimum the usage of Javascript. This implied that the navigation on this website\n"),
		1
	);
});
