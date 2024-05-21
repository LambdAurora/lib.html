/*
 * Copyright 2024 LambdAurora <email@lambdaurora.dev>
 *
 * This file is part of lib.html.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/**
 * This module contains definition related to parsing and stringification of HTML.
 *
 * @module
 */

import type { Node } from "./tree.ts";
import { decode_html, TAG_END_CODE_POINT, TAG_START_CODE_POINT } from "./utils.ts";
import { Comment, Text } from "./text.ts";
import { create_element, Element, Tag } from "./element.ts";

/*
 * Render
 */

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

/*
 * Utils
 */

type TagName = { name: string };

/**
 * Sanitizes recursively the given element(s).
 *
 * @param element the element(s) to sanitize
 * @param disallowed_tags the tags that should be escaped
 * @param extra extra custom sanitizer
 * @returns the sanitized element(s)
 */
export function sanitize_elements<I extends (Node | Node[])>(
	element: I,
	disallowed_tags: readonly (string | TagName)[],
	extra = (node: Node) => node
): I {
	const tags_to_remove = disallowed_tags.map(tag => typeof tag === "string" ? tag : tag.name) as string[];

	function execute(el: Node | Node[]) {
		if (el instanceof Array) {
			for (let i = 0; i < el.length; i++) {
				el[i] = execute(el[i]) as Node;
			}
		} else if (el instanceof Element) {
			if (tags_to_remove.includes(el.tag.name)) {
				return new Text(decode_html(stringify(el)));
			} else {
				execute(el.children);
				return extra(el);
			}
		}

		return el;
	}

	if (element instanceof Element || element instanceof Text || element instanceof Comment)
		return (execute([element]) as Node[])[0] as I;
	else
		return execute(element) as I;
}

/*
 * Parser
 */

/**
 * Attempts to parse HTML nodes from a given HTML source.
 *
 * @param source the HTML source
 * @returns the HTML nodes
 */
export function parse_nodes(source: string): Node[] {
	const nodes: Node[] = [];

	parse_html(source, {
		tag: Tag.div,
		append_child: (node: Node) => nodes.push(node)
	} as unknown as Element);

	return nodes;
}

/**
 * Attempts to parse the first HTML node encountered from a given HTML source.
 *
 * @param source the HTML source
 * @param container a container for which the parsed content should be appended as children
 * @returns the first parsed node, or the container if it was provided and not null
 */
export function parse(source: string, container: Element | null = null): Node {
	if (container !== null) {
		parse_html(source, container);
		return container;
	} else
		return parse_nodes(source)[0];
}

const TAG_END_REGEX = /^\s*<\/\s*([^<>\s]+)\s*\>/;
const ATTRIBUTE_REGEX = /^\s*([^ \t\n\r"'>\/=]+)(?:\s*=\s*((?:[^"' \t\n\r<>`]+)|(?:'([^"]*?)')|(?:"([^']*?)")))?/;
const COMMENT_END_REGEX = /-->/;

interface TextParseResult {
	text: Text;
	end: number;
}

/**
 * Attempts to parse and consume a text node from the given HTML source.
 *
 * @param source the HTML source
 * @param start the character index where the parsing should begin
 * @param parent the parent element to which the parsed nodes will be appended to
 * @returns `null` if the parsing failed,
 * or a result containing the text node and where it ends in the source otherwise
 */
function parse_text(source: string, start: number, parent: Element): TextParseResult | null {
	let end = -1;
	for (let i = start; i < source.length; i++) {
		const character = source.codePointAt(i);
		if (character === TAG_START_CODE_POINT) { // Possible control character.
			if (i === source.length - 1) // If it's the last character, it's not a control character.
				continue;

			if (!parent.tag.parse_inside) { // In the case of a code block we can ignore control characters, except the code ending tag.
				const result = TAG_END_REGEX.exec(source.substring(i));

				if (result) {
					if (result[1].toLowerCase() === parent.tag.name)
						break;
				}
			} else {
				break;
			}
		}

		end = i - start;
	}

	if (end !== -1) {
		const length = end + 1;
		if (length !== 1) end++;
		return {
			text: new Text(decode_html(source.substring(start, start + length))),
			end: Math.max(1, end)
		};
	} else {
		return null;
	}
}

/**
 * Attempts to parse as many HTML nodes as possible starting from the beginning of the given source string.
 *
 * @param source the HTML source
 * @param parent the parent element to which the parsed nodes will be appended to
 * @returns the number of characters that have been consumed in the parsing process
 */
function parse_html(source: string, parent: Element): number {
	let i = 0;
	while (i < source.length) {
		if (source.codePointAt(i) === TAG_START_CODE_POINT) {
			const sub_source = source.substring(i);
			const result = parse_tag_start(sub_source);

			if (result) {
				let skip_length = result.length;
				const element = result.node;

				if (!result.self_closing && !element.tag.self_closing) {
					// Not a self-closing tag, parse inside.
					skip_length += parse_html(source.substring(i + result.length), element);
				}

				parent.append_child(element);

				i += skip_length;
				continue;
			} else {
				// Test for an end tag.
				const end_tag_match = sub_source.match(TAG_END_REGEX);

				if (end_tag_match) {
					i += end_tag_match[0].length;

					if (parent.tag.name === end_tag_match[1].toLowerCase()) {
						break;
					}

					continue;
				} else {
					// Test for a comment.
					const comment_result = parse_comment(sub_source);

					if (comment_result) {
						i += comment_result.length;

						parent.append_child(comment_result.comment);

						continue;
					}
				}
			}
		} else {
			const text_result = parse_text(source, i, parent);

			if (text_result) {
				parent.append_child(text_result.text);
				i += text_result.end;
				continue;
			}
		}

		i++;
	}

	return i;
}

/**
 * Represents the result of the parsing of an HTML tag start.
 */
export interface TagParseResult {
	/**
	 * The parsed element without its children.
	 */
	node: Element;
	/**
	 * The length of the HTML element in the source string.
	 */
	length: number;
	/**
	 * `true` if the element doesn't have a closing tag, or `false` otherwise.
	 */
	self_closing: boolean;
}

/**
 * Attempts to parse the start of an HTML tag at the beginning of the source string.
 *
 * @param source the HTML source
 * @returns `null` if no HTML tag start is present,
 * or an object containing the parsed element, the length it takes in the source,
 * and whether the tag is self-closing or not otherwise
 */
export function parse_tag_start(source: string): TagParseResult | null {
	const tag_result = source.match(/^<([^<>\s/]+)/);
	if (!tag_result)
		return null;

	if (source.startsWith("<!--"))
		return null;

	const node = create_element(tag_result[1]);

	const attributes_length = parse_attributes(source.substring(tag_result[0].length), node);

	let length = source.length;
	let self_closing = false;
	for (let i = (tag_result[0].length + attributes_length); i < source.length; i++) {
		if (source.charAt(i) === '/') {
			if ((i + 1) < source.length && source.codePointAt(i + 1) === TAG_END_CODE_POINT) {
				self_closing = true;
				length = i + 2;
				break;
			}
		} else if (source.codePointAt(i) === TAG_END_CODE_POINT) {
			length = i + 1;
			break;
		}
	}

	return {
		node: node,
		length: length,
		self_closing: self_closing
	};
}

/**
 * Trims a given comment string.
 *
 * @param comment the comment
 * @returns the trimmed comment
 */
function remove_useless_comment_spaces(comment: string): string {
	return comment.replace(/^\s*/, "").replace(/\s*$/, "");
}

/**
 * Represents the result of the parsing of an HTML comment.
 */
export interface CommentParseResult {
	/**
	 * The parsed comment.
	 */
	comment: Comment;
	/**
	 * The length of the comment in the source string.
	 */
	length: number;
}

/**
 * Attempts to parse an HTML comment at the beginning of the given source.
 *
 * @param source the source
 * @returns if failed `null`, or the comment with skip length otherwise
 */
export function parse_comment(source: string): CommentParseResult | null {
	if (!source.startsWith("<!--"))
		return null;

	const i = 4;
	if (source.length === i) {
		// Only the start is present, somehow, the HTML specification would be extremely mad,
		// but everyone decides to parse it as a valid, so let's do it here too!
		return {comment: new Comment(""), length: i};
	}

	// HTML specification says that a comment text
	// must not start with the string ">", nor start with the string "->",
	// nor contain the strings "<!--", "-->", or "--!>",
	// nor end with the string "<!-".
	// BUT IN PRACTICE, those rules are ignored in most parsers.
	// So why even try?
	const result = COMMENT_END_REGEX.exec(source);

	if (!result) {
		return {
			comment: new Comment(remove_useless_comment_spaces(source.substring(4))),
			length: source.length
		};
	}

	return {
		comment: new Comment(remove_useless_comment_spaces(source.substring(4, result.index))),
		length: result.index + 3
	};
}

/**
 * Attempts to parse the attributes of a given HTML element.
 *
 * @param source the HTML source
 * @param parent the HTML element currently being parsed
 * @returns the amount of characters consumed by the attribute parser
 */
function parse_attributes(source: string, parent: Element): number {
	let length = 0;
	let result;
	do {
		if (source.length > 0 && source.codePointAt(0) === TAG_END_CODE_POINT)
			break;

		result = ATTRIBUTE_REGEX.exec(source);

		if (!result) break;

		source = source.substring(result.index + result[0].length);
		length += result.index + result[0].length;

		let value = result[2];
		if (result[3] !== undefined) value = result[3];
		else if (result[4] !== undefined) value = result[4];
		else if (!value) value = "";

		parent.attr(result[1], value);
	} while (source.length > 0);

	return length;
}
