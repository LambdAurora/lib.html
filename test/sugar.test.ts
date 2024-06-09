import { type AnyConstructor, assertEquals, assertInstanceOf } from "@std/assert";
import { button, dialog, Element, h1, type Node, p, SimpleAttribute, Text } from "../mod.ts";

function assert_instanceofs<T extends AnyConstructor>(nodes: readonly Node[], array: readonly T[]) {
	assertEquals(nodes.length, array.length);

	for (let i = 0; i < nodes.length; i++) {
		assertInstanceOf(nodes[i], array[i]);
	}
}

Deno.test("html/sugar", () => {
	const el = dialog({
		children: [
			h1(["Hello world!"]),
			p(["It's a beautiful day!"]),
			button({
				children: [
					"Close",
				],
				style: {
					color: "#800",
				},
			}),
		],
		attributes: {
			open: "",
		},
		style: {
			"background-color": "#dddddd",
		},
	});

	assertInstanceOf(el, Element);

	assertEquals(el.attributes.length, 2);
	assertInstanceOf(el.attr("open"), SimpleAttribute);
	assertEquals(el.attr("style").real_value, { "background-color": "#dddddd" });

	assert_instanceofs(el.children, [Element, Element, Element]);

	const h1_el = el.children[0] as Element;
	const p_el = el.children[1] as Element;
	const button_el = el.children[2] as Element;

	assertEquals(h1_el.tag.name, "h1");
	assertEquals(p_el.tag.name, "p");
	assertEquals(button_el.tag.name, "button");

	assert_instanceofs(h1_el.children, [Text]);
	assert_instanceofs(p_el.children, [Text]);
	assert_instanceofs(button_el.children, [Text]);

	assertEquals(h1_el.children[0].text(), "Hello world!");
	assertEquals(p_el.children[0].text(), "It's a beautiful day!");
	assertEquals(button_el.children[0].text(), "Close");

	assertEquals(button_el.attr("style").real_value, { color: "#800" });
});
