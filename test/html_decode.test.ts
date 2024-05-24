import { assertEquals } from "@std/assert";
import { decode_html } from "../lib/utils.ts";
import { parse_element } from "../mod.ts";

Deno.test("html/decode_html", () => {
	assertEquals(decode_html("&amp;"), "&");
	assertEquals(decode_html("&nbsp;"), "\u00a0");
	assertEquals(decode_html("&#x2726;"), "\u2726");
	assertEquals(decode_html("&#10084;&#xfe0f;"), "❤️");
});

Deno.test("html/encode_html/no_parse_inside", () => {
	const text = /*html*/ `<script>
	const test = 42;
	// <!-- This is an HTML comment inside a JS code. -->
	if (test < 100) {
		console.log("test < 100");
	} else {
		console.log("&lt;test&gt;");
	}
</script>`

	const element = parse_element(text)!.element;
	assertEquals(element.html(), text);
});
