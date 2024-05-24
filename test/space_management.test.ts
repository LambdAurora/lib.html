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

function make_item(name: string, text: string): html.Element {
	return html.create_element("li")
		.with_attr("id", `fn:${name}`)
		.with_child(text + " ")
		.with_child(html.create_element("a")
			.with_attr("class", "footnote_src_link")
			.with_attr("href", `#fn:${name}:src`)
			.with_child("↩")
		);
}

Deno.test("html/output/proper_wrapping/list", () => {
	const list = html.create_element("ol")
		.with_attr("class", "footnotes")
		.with_child(make_item("1", "Simple text"))
		.with_child(make_item("fance-name", "Fancy name footnote."))
		.with_child(make_item("3", "Moar text"))
		.with_child(html.create_element("li")
			.with_child("Simple")
		);

	list.purge_blank_children();

	assertEquals(list.html(), /*html*/ `<ol class="footnotes">
	<li id="fn:1">
		Simple text
		<a class="footnote_src_link" href="#fn:1:src">↩</a>
	</li>
	<li id="fn:fance-name">
		Fancy name footnote.
		<a class="footnote_src_link" href="#fn:fance-name:src">↩</a>
	</li>
	<li id="fn:3">
		Moar text
		<a class="footnote_src_link" href="#fn:3:src">↩</a>
	</li>
	<li>Simple</li>
</ol>`)
});
