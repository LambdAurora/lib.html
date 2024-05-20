import { assertEquals } from "@std/assert";
import { decode_html } from "../lib/utils.ts";

Deno.test("html/decode_html", () => {
	assertEquals(decode_html("&amp;"), "&");
	assertEquals(decode_html("&nbsp;"), "\u00a0");
	assertEquals(decode_html("&#x2726;"), "\u2726");
	assertEquals(decode_html("&#10084;&#xfe0f;"), "❤️");
});
