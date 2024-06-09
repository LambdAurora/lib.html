import { Tag } from "../lib/element.ts";

const TYPE_IMPORTS = ["CreateElementIn", "CreateElementOut", "Element", "StyleValue"];
const EXCLUDED = ["!doctype", "html", "var"];

const HEADER = /*ts*/ `/*
 * Copyright 2024 LambdAurora <email@lambdaurora.dev>
 *
 * This file is part of lib.html.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// WARNING: This file is auto-generated!

import type { Node } from "./tree.ts";
import type { AttributeValue } from "./attribute.ts";
import type { __TYPE_IMPORTS__ } from "./element.ts";
import { create_element } from "./element.ts";

interface Input {
	/**
	 * The children of this element.
	 */
	readonly children?: (Node | string)[];
	/**
	 * The attributes of this element.
	 */
	readonly attributes?: {
		[key: string]: AttributeValue<string> | AttributeValue<"class"> | AttributeValue<"style">;
	};
	/**
	 * The style of this element.
	 */
	readonly style?: {
		[key: string]: StyleValue;
	};
}

function with_children<El extends Element, I extends CreateElementIn<El>>(
	tag: I,
	input?: Input | (Node | string)[],
): CreateElementOut<Element, I> {
	const elem = create_element(tag);
	if (input instanceof Array) {
		for (const child of input) elem.append_child(child);
	} else {
		if (input?.children) {
			for (const child of input.children) elem.append_child(child);
		}
		if (input?.attributes) {
			// deno-lint-ignore no-explicit-any
			for (const [key, attr] of Object.entries(input.attributes)) elem.attr(key, attr as any);
		}
		if (input?.style) {
			for (const [key, value] of Object.entries(input.style)) elem.style(key, value);
		}
	}
	return elem;
}
`;

const functions = Object.entries(Tag)
	.filter(([key, _]) => !EXCLUDED.includes(key))
	.map(([key, value]) => {
		const elementType = value.create().constructor.name;

		if (!TYPE_IMPORTS.includes(elementType)) {
			TYPE_IMPORTS.push(elementType);
		}

		return /*ts*/ `/**
 * Creates a new \`${key}\` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the \`${key}\` element
 */
export function ${key}(input?: Input | (Node | string)[]): ${elementType} {
	return with_children("${key}", input);
}`;
	}).join("\n\n");

TYPE_IMPORTS.sort();

await Deno.writeTextFile("./lib/sugar.ts", HEADER.replace("__TYPE_IMPORTS__", TYPE_IMPORTS.join(", ")) + "\n" + functions + "\n");
