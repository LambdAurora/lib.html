import { assertEquals, assertInstanceOf, assertNotEquals } from "@std/assert";
import { Element, parse_element, parse_nodes, Tag, Text } from "../mod.ts";

const TEST_STRING = /*html*/`<div class="ls_sidenav_wrapper">
	<input type="checkbox" id="trigger" class="ls_sidenav_internal_trigger" aria-hidden="true">
	<nav id="name" class="ls_sidenav">
		<ul></ul>
	</nav>

	<label for="trigger" class="ls_sidenav_darkened"></label>
</div>
<p>Hello world!</p>`;

Deno.test("html/parse_html_element", () => {
	const result = parse_element(TEST_STRING);

	assertNotEquals(result, null);
	assertEquals(result!.length, 248);
	assertNotEquals(result!.length, TEST_STRING.length);
	assertEquals(result!.element.tag, Tag.div);
});

Deno.test("html/parse_nodes", () => {
	const result = parse_nodes(TEST_STRING);

	assertEquals(result.length, 3);
	assertInstanceOf(result[0], Element);
	assertEquals(result[0].tag.name, "div");

	assertInstanceOf(result[1], Text);
	
	assertInstanceOf(result[2], Element);
	assertEquals(result[2].tag.name, "p");
	assertEquals(result[2].text(), "Hello world!");
});
