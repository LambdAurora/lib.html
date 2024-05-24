import { assertEquals } from "@std/assert";
import * as html from "../mod.ts";

const screaming = "a".repeat(156);
const p = html.create_element("p")
	.with_child(screaming)
	.with_child(html.create_element("a").with_child("test link"))
	.with_child(". Hello World!")
	.with_child(" Stuff is strange");

Deno.test("html/output/proper_wrapping/simple", () => {
	assertEquals(p.html(), /*html*/ `<p>\n\t${screaming}<a>test link</a>. Hello World!\n\tStuff is strange\n</p>`);
});

Deno.test("html/output/proper_ugly", () => {
	assertEquals(
		p.html(new html.StringifyStyle("")),
		/*html*/ `<p>${screaming}<a>test link</a>. Hello World! Stuff is strange</p>`,
	);
});

Deno.test("html/output/proper_wrapping/nested_elements", () => {
	const div = html.create_element("div")
		.with_child(html.create_element("p")
			.with_child(html.create_element("a")
				.with_attr("href", "https://lambdaurora.dev/")
				.with_child("Website")
			).with_child(html.create_element("sup")
				.with_child(html.create_element("a")
					.with_attr("id", "fn:1:src")
					.with_attr("href", "#fn:1")
					.with_child("1")
				)
			)
		);

	assertEquals(
		div.html(),
		/*html*/ `<div>
	<p>
		<a href="https://lambdaurora.dev/">Website</a><sup><a id="fn:1:src" href="#fn:1">1</a></sup>
	</p>
</div>`
	);
});
