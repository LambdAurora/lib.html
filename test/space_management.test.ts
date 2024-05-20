import { assertEquals } from "@std/assert";
import * as html from "../mod.ts";

const screaming = "a".repeat(156);
const p = html.create_element("p")
	.with_child(screaming)
	.with_child(html.create_element("a").with_child("test link"))
	.with_child(". Hello World!")
	.with_child(" Stuff is strange");

Deno.test("html/output/proper_wrapping", () => {
	assertEquals(p.html(), `<p>${screaming}<a>test link</a>. Hello World!\n\tStuff is strange</p>`);
});

Deno.test("html/output/proper_ugly", () => {
	assertEquals(p.html(new html.StringifyStyle("")), `<p>${screaming}<a>test link</a>. Hello World! Stuff is strange</p>`);
});
