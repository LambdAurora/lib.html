/*
 * Copyright 2024 LambdAurora <email@lambdaurora.dev>
 *
 * This file is part of lib.html.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Element, Tag } from "./element.ts";
import { Comment, Text } from "./text.ts";
import type { Node } from "./tree.ts"; 

/**
 * Represents a utility to assist in the stringification process of the HTML tree.
 *
 * @version 1.0.0
 * @since 1.0.0
 */
export class StringifyStyle {
	constructor(public readonly indent_char: string, public readonly level: number = 0) {
	}

	/**
	 * Returns whether this stringify style is considered a prettified string output.
	 *
	 * @returns `true` if this stringify style is pretty, or `false` otherwise
	 */
	public is_pretty(): boolean {
		return this.indent_char !== "";
	}

	/**
	 * Indents of a given amount this stringify style.
	 *
	 * @param amount the amount to indent
	 * @returns the indented stringify style
	 */
	public indent(amount: number = 1): StringifyStyle {
		return new StringifyStyle(this.indent_char, this.level + amount);
	}

	/**
	 * The indentation value of this stringify style.
	 */
	public get indent_value(): string {
		return this.is_pretty() ? this.indent_char.repeat(this.level) : "";
	}
}

/**
 * Stringifies the start tag of the given element.
 *
 * @param element the element
 * @returns the stringified start tag
 * @since 1.2.0
 */
export function stringify_start_tag(element: Element): string {
	let result = `<${element.tag.name}`;

	// Add attributes to output.
	if (element.attributes.length > 0) {
		result += " " + element.attributes.map(attr => attr.html()).join(" ");
	}

	if (
		element.children.length === 0
		&& element.tag.self_closing
		&& element.tag.name !== Tag["!doctype"].name
	) {
		// This element is self-closing, we can stop here.
		result += " />";
	} else {
		result += ">";
	}

	return result;
}

/**
 * Stringifies the given node.
 *
 * @param node the node to stringify
 * @param style the style of stringification
 * @returns the HTML node as an HTML string
 */
export function stringify(node: Node, style: StringifyStyle = new StringifyStyle("\n")): string {
	if (node instanceof Text) {
		return node.html();
	} else if (node instanceof Comment) {
		return node.html();
	} else if (node instanceof Element) {
		return node.html(style);
	} else {
		throw new Error("Not a valid node.");
	}
}
