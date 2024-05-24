import { assertEquals } from "@std/assert";
import * as html from "../mod.ts";

Deno.test("html.Element#purge_empty_children - preserve space between 2 elements that requires it", () => {
	const source = /*html*/ `<div>Hello: <a href="https://randomfox.ca/">Random Fox!</a> <b>Isn&apos;t it cute?</b></div>`;
	const el = html.parse(source) as html.Element;
	el.purge_blank_children();

	assertEquals(el.html(new html.StringifyStyle("")), source);
});

Deno.test("html.Element#purge_empty_children - don't purge normal text", () => {
	const source = /*html*/ `<p class="center">
	There&apos;s nothing, but foxes. I think?
	<br />
	🦊
</p>`;

	const el = html.parse(source) as html.Element;
	el.purge_blank_children();

	assertEquals(el.html(), source);
});
