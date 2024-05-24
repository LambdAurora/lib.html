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
 * This module contains definitions related to HTML elements.
 *
 * @module
 */

// deno-lint-ignore-file no-explicit-any
import { type Attribute, type AttributeClass, type AttributeValue, create_attribute } from "./attribute.ts";
import { stringify_start_tag } from "./stringify.ts";
import { StringifyStyle } from "./stringify.ts";
import { Comment, Text } from "./text.ts";
import { Node } from "./tree.ts";
import { get_leading_spaces, get_trailing_spaces, merge_objects } from "./utils.ts";

/**
 * Represents the data associated with an HTML tag.
 */
export interface TagData<El extends Element> {
	/**
	 * Attributes that are required.
	 */
	required_attributes: readonly string[];
	/**
	 * `true` if an element with this tag can be closed in its opening statement, or `false` otherwise.
	 */
	self_closing: boolean;
	/**
	 * `true` if the parser should attempt to parse elements inside elements using this tag, or `false` otherwise.
	 */
	parse_inside: boolean;
	/**
	 * `true` if text nodes inside elements using this tag should be escaped, or `false` otherwise.
	 */
	escape_inside: boolean;
	/**
	 * `true` if the format inside elements using this tag should be preserved, or `false` otherwise.
	 */
	preserve_format: boolean;
	/**
	 * `true` if elements using this tag can be inlined, or `false` otherwise.
	 * This is a hint for stringification.
	 */
	inline: boolean;
	/**
	 * Creates a new instance of the element associated with this tag.
	 *
	 * @returns a new instance of the element
	 */
	create: () => El;
}

/**
 * Represents the data associated with an HTML tag and its name.
 */
export interface NamedTagData<El extends Element> extends TagData<El> {
	/**
	 * The name of this HTML tag.
	 */
	name: string;
}

export function make_tag<El extends Element>(name: string, options: Partial<TagData<El>> = {}): Readonly<NamedTagData<El>> {
	const complete_options = merge_objects({
		required_attributes: Object.freeze([]),
		self_closing: false,
		parse_inside: true,
		escape_inside: true,
		preserve_format: false,
		inline: true,
		create: function () {
			return new Element(this as NamedTagData<El>) as El;
		}
	}, options);
	return Object.freeze({
		name: name,
		...complete_options
	});
}

/**
 * Represents all the standardized HTML5 tags.
 *
 * @version 1.0.0
 * @since 1.0.0
 */
export const Tag: Readonly<{ [key: string]: Readonly<NamedTagData<Element>> }> = Object.freeze({
	"!doctype": make_tag("!DOCTYPE", {self_closing: true}),
	a: make_tag("a", {create: () => new LinkElement()}),
	abbr: make_tag("abbr"),
	address: make_tag("address", {inline: false}),
	area: make_tag("area", {self_closing: true}),
	article: make_tag("article", {inline: false}),
	aside: make_tag("aside", {inline: false}),
	audio: make_tag("audio", {inline: false}),
	b: make_tag("b"),
	base: make_tag("base", {self_closing: true}),
	bdi: make_tag("bdi"),
	bdo: make_tag("bdo"),
	blockquote: make_tag("blockquote", {inline: false}),
	body: make_tag("body", {inline: false}),
	br: make_tag("br", {self_closing: true, inline: false}),
	button: make_tag("button"),
	canvas: make_tag("canvas", {inline: false}),
	caption: make_tag("caption"),
	cite: make_tag("cite"),
	code: make_tag("code"),
	col: make_tag("col", {self_closing: true}),
	colgroup: make_tag("colgroup", {inline: false}),
	data: make_tag("data"),
	datalist: make_tag("datalist", {inline: false}),
	dd: make_tag("dd"),
	del: make_tag("del"),
	details: make_tag("details", {inline: false}),
	dfn: make_tag("dfn"),
	dialog: make_tag("dialog", {inline: false}),
	div: make_tag("div", {inline: false}),
	dl: make_tag("dl", {inline: false}),
	dt: make_tag("dt"),
	em: make_tag("em"),
	fieldset: make_tag("fieldset", {inline: false}),
	figcaption: make_tag("figcaption"),
	figure: make_tag("figure", {inline: false}),
	footer: make_tag("footer", {inline: false}),
	form: make_tag("form", {inline: false}),
	h1: make_tag("h1"),
	h2: make_tag("h2"),
	h3: make_tag("h3"),
	h4: make_tag("h4"),
	h5: make_tag("h5"),
	h6: make_tag("h6"),
	head: make_tag("head", {inline: false}),
	header: make_tag("header", {inline: false}),
	hr: make_tag("hr", {self_closing: true}),
	html: make_tag("html", {inline: false}),
	i: make_tag("i"),
	iframe: make_tag("iframe", {inline: false}),
	img: make_tag("img", {required_attributes: ["src", "alt"], self_closing: true, create: () => new ImageElement()}),
	input: make_tag("input", {self_closing: true}),
	ins: make_tag("ins"),
	kbd: make_tag("kbd"),
	label: make_tag("label"),
	legend: make_tag("legend"),
	li: make_tag("li"),
	link: make_tag("link", {self_closing: true}),
	main: make_tag("main", {inline: false}),
	map: make_tag("map", {inline: false}),
	mark: make_tag("mark"),
	meta: make_tag("meta", {self_closing: true}),
	meter: make_tag("meter"),
	nav: make_tag("nav", {inline: false}),
	noscript: make_tag("noscript", {inline: false}),
	ol: make_tag("ol", {inline: false}),
	optgroup: make_tag("optgroup", {inline: false}),
	option: make_tag("option"),
	output: make_tag("output"),
	p: make_tag("p", {inline: false}),
	param: make_tag("param", {self_closing: true}),
	picture: make_tag("picture", {inline: false}),
	pre: make_tag("pre", {preserve_format: true}),
	progress: make_tag("progress"),
	q: make_tag("q"),
	rp: make_tag("rp"),
	rt: make_tag("rt"),
	ruby: make_tag("ruby", {inline: false}),
	s: make_tag("s"),
	samp: make_tag("samp"),
	script: make_tag("script", {parse_inside: false, preserve_format: true, escape_inside: false, inline: false}),
	section: make_tag("section", {inline: false}),
	select: make_tag("select", {inline: false}),
	small: make_tag("small"),
	source: make_tag("source", {self_closing: true}),
	span: make_tag("span"),
	strong: make_tag("strong"),
	style: make_tag("style", {parse_inside: false, preserve_format: true, escape_inside: false, inline: false}),
	sub: make_tag("sub"),
	summary: make_tag("summary"),
	sup: make_tag("sup"),
	svg: make_tag("svg", {inline: false}),
	table: make_tag("table", {inline: false}),
	tbody: make_tag("tbody", {inline: false}),
	td: make_tag("td"),
	template: make_tag("template"),
	textarea: make_tag("textarea"),
	tfoot: make_tag("tfoot", {inline: false}),
	th: make_tag("th"),
	thead: make_tag("thead", {inline: false}),
	time: make_tag("time"),
	title: make_tag("title"),
	tr: make_tag("tr", {inline: false}),
	track: make_tag("track", {self_closing: true}),
	u: make_tag("u"),
	ul: make_tag("ul", {inline: false}),
	var: make_tag("var"),
	video: make_tag("video", {inline: false}),
	wbr: make_tag("wbr", {self_closing: true}),
});

type CreateElementIn<El extends Element> = string | NamedTagData<El>;
type CreateElementOut<El extends Element, I extends CreateElementIn<El>> = I extends "a" ? LinkElement : I extends "img" ? ImageElement : El;

/**
 * Creates an HTML element instance based on the given tag name.
 *
 * @param tag the tag name of the HTML element
 * @returns the HTML element instance
 */
export function create_element<El extends Element, I extends CreateElementIn<El>>(
	tag: I
): CreateElementOut<El, I> {
	const actual_tag = typeof tag === "string" ? Tag[tag.toLowerCase()] : Tag[tag.name];

	if (actual_tag === undefined || actual_tag === null) {
		if (typeof tag === "string")
			return make_tag(tag).create() as CreateElementOut<El, I>; // Awful leniency.

		throw new Error(`Invalid tag "${tag}" was specified`);
	}

	return actual_tag.create() as CreateElementOut<El, I>;
}

type StyleValue = string | number | undefined;
type StyleResult<V extends StyleValue> = V extends (string | number) ? Element : (string | number | null);

/**
 * Represents an HTML element, with a tag, attributes, and possibly children.
 *
 * @version 1.2.0
 * @since 1.0.0
 */
export class Element extends Node {
	/**
	 * The tag of this HTML element.
	 */
	public readonly tag: NamedTagData<this>;
	/**
	 * The attributes of this element.
	 */
	public attributes: Attribute<any>[] = [];
	/**
	 * The children of this element.
	 */
	public children: Node[] = [];

	constructor(tag: string | NamedTagData<any>) {
		super();

		if (typeof tag === "string") {
			this.tag = (Tag as any)[tag];
		} else {
			this.tag = tag;
		}

		if (this.tag === undefined || this.tag === null) {
			throw new Error(`Invalid tag "${tag}" was specified`);
		}
	}

	/**
	 * Appends a child node to this element.
	 *
	 * @param node the node to append
	 * @returns the appended node
	 */
	public append_child(node: Node | string): Node {
		if (this.tag.self_closing) {
			throw new Error(`Cannot append children to self-closing tag "${this.tag.name}".`);
		} else if (typeof node === "string") {
			node = new Text(node);
		} else if (!(node instanceof Node)) {
			throw new Error(`The appended node must be a Node object, found ${node}.`);
		}

		this.children.push(node);
		return node;
	}

	/**
	 * Appends a child node to this element as a builder-like method.
	 *
	 * @param node the node to append
	 * @returns this current element
	 */
	public with_child(node: Node | string): Element {
		this.append_child(node);
		return this;
	}

	/**
	 * Creates or gets the attribute of the specified name.
	 * If a value is specified, this method will create the attribute if missing, or will replace the existing one.
	 * If no value is specified, this method will act as a getter, and will create the attribute if missing.
	 *
	 * @param name the name of the attribute
	 * @param value the value of the attribute
	 * @returns the attribute
	 */
	public attr<Name extends string, V extends AttributeValue<Name>, A extends AttributeClass<Name>>(name: Name, value: V = undefined as V): A {
		for (const [i, attribute] of this.attributes.entries()) {
			if (name === attribute.name) {
				if (value !== undefined && value !== null) {
					const replaced_attr = create_attribute(name, value);
					this.attributes[i] = replaced_attr;
					return replaced_attr as A;
				}
				return attribute as A;
			}
		}

		const attribute = create_attribute(name, value);
		this.attributes.push(attribute);
		return attribute as A;
	}

	/**
	 * Sets an attribute by name with the specified value.
	 * If no value is specified, nothing happens.
	 *
	 * @param name the name of the attribute
	 * @param value the value of the attribute
	 * @returns this current element
	 */
	public with_attr<Name extends string, V extends AttributeValue<Name>>(name: Name, value: V = "" as V): this {
		this.attr(name, value);
		return this;
	}

	/**
	 * Gets the attribute by name.
	 *
	 * @param name the name of the attribute
	 * @returns the attribute if present, else `null`
	 */
	public get_attr<Name extends string>(name: Name): AttributeClass<Name> | null {
		for (const attribute of this.attributes) {
			if (name === attribute.name) {
				return attribute as AttributeClass<Name>;
			}
		}
		return null;
	}

	/**
	 * Removes an attribute by name.
	 *
	 * @param name the name of the attribute
	 */
	public remove_attr(name: string): void {
		for (const [i, attribute] of this.attributes.entries()) {
			if (name === attribute.name) {
				this.attributes.splice(i, 1);
				return;
			}
		}
	}

	/**
	 * Sets the specified style if a value is specified, else gets the value of the property if present.
	 *
	 * @param property the style property
	 * @param value the property value
	 * @returns this current element if a value is specified, else the property value if present,
	 * or `null` otherwise
	 */
	public style<V extends StyleValue>(property: string, value?: V): StyleResult<V> {
		if (typeof value === "string" || typeof value === "number") {
			this.attr("style").set(property, value);
			return this as unknown as StyleResult<V>;
		} else {
			const style = this.get_attr("style");
			if (style) return style.get(property) as StyleResult<V>;
			return null as StyleResult<V>;
		}
	}

	/**
	 * Applies this element on the given callback.
	 *
	 * @param callback the function to call with this element
	 * @returns this element
	 */
	public with(callback: (element: Element) => void): this {
		callback(this);
		return this;
	}

	/**
	 * Purges text and comment children of this element that are blank and insignificant.
	 *
	 * This method is recursive.
	 */
	public purge_blank_children(): void {
		if (this.tag.preserve_format) {
			return;
		}

		this.children = this.children.filter(child => {
			if (child instanceof Element) {
				child.purge_blank_children();
			} else if (child instanceof Text || child instanceof Comment) {
				// We don't want to filter simple single whitespaces as it could be: <a>Something</a> <code>hey</code>
				// Removing the space could mess up the meaning.
				return !child.content.match(/^(?:(?:[ \t\n]*\n[ \t\n]*)+|[ \t]{2,})$/);
			}

			return true;
		});
	}

	/**
	 * Simplifies white spaces present in the text nodes of this element.
	 *
	 * Simplification involves reducing leading and trailing whitespace characters into a single space character,
	 * and reducing whitespace characters surrounding a new line character into a single new line character.
	 *
	 * This method is recursive.
	 */
	public simplify_whitespaces(): void {
		if (this.tag.preserve_format) {
			return;
		}

		this.purge_blank_children();
		this.children = this.children.map(child => {
			if (child instanceof Text) {
				return new Text(
					child.content.replaceAll(
						/^[\t ]+|[\t ]*(\n)[\t ]*|[\t ]$/g,
						(_, nl: string | undefined) => {
							if (nl) {
								return "\n";
							} else {
								return " ";
							}
						}
					)
				);
			} else if (child instanceof Element) {
				child.simplify_whitespaces();
			}

			return child;
		});
	}

	/**
	 * Gets the first occurrence of an element that matches.
	 *
	 * @param matcher the matcher function
	 * @returns the found element if the search is successful, or `undefined` otherwise
	 */
	public get_element_by_match(matcher: (child: Element) => boolean): Element | undefined {
		return this.children.find(child => child instanceof Element && matcher(child)) as Element;
	}

	/**
	 * Gets the first occurrence of an element by its name in this element.
	 *
	 * @param name the name of the element to search
	 * @returns the found element if the search is successful, or `undefined` otherwise
	 */
	public get_element_by_tag_name(name: string | NamedTagData<any>): Element | undefined {
		if (typeof name !== "string") {
			if (!name.name) {
				return undefined;
			} else name = name.name;
		}

		return this.get_element_by_match(child => child.tag.name === name);
	}

	/**
	 * Finds the first occurrence of an element that matches.
	 * This method is recursive.
	 *
	 * @param matcher the matcher function
	 * @returns the found element if the search is successful, or `undefined` otherwise
	 */
	public find_element(matcher: (element: Element) => boolean): Element | undefined {
		const result = this.get_element_by_match(matcher);

		if (result) {
			return result;
		} else {
			for (const child of this.children) {
				if (child instanceof Element) {
					const child_result = child.find_element(matcher);

					if (child_result) {
						return child_result;
					}
				}
			}
		}

		return undefined;
	}

	/**
	 * Finds the first occurrence of an element by its name.
	 * This method is recursive.
	 *
	 * @param name the name of the element to search
	 * @returns the found element if the search is successful, or `undefined` otherwise
	 */
	public find_element_by_tag_name(name: string | NamedTagData<any>): Element | undefined {
		if (typeof name !== "string") {
			if (!name.name) {
				return undefined;
			} else name = name.name;
		}

		return this.find_element(child => child.tag.name === name);
	}

	/**
	 * Finds the first occurrence of an element by its id.
	 *
	 * @param name the name of the identifier
	 * @returns the found element if the search is successful, or `undefined` otherwise
	 */
	public find_element_by_id(name: string): Element | undefined {
		return this.find_element(child => {
			const value = child.get_attr("id")?.value;

			return value === name;
		});
	}

	/**
	 * Attempts to find the first relevant text child of this element.
	 *
	 * @returns the first relevant text child, or `undefined` otherwise
	 * @private
	 */
	private get_first_relevant_text_child(): Text | undefined {
		for (const child of this.children) {
			if (child instanceof Text) {
				return child;
			} else if (child instanceof Element) {
				return child.get_first_relevant_text_child();
			}
		}

		return undefined;
	}

	/**
	 * Attempts to find the last relevant text child of this element.
	 *
	 * @returns the last relevant text child, or `undefined` otherwise
	 * @private
	 */
	private get_last_relevant_text_child(): Text | undefined {
		for (let i = this.children.length - 1; i >= 0; i--) {
			const child = this.children[i];

			if (child instanceof Text) {
				return child;
			} else if (child instanceof Element) {
				return child.get_last_relevant_text_child();
			}
		}

		return undefined;
	}

	/**
	 * Returns whether the next child after the given current child is significant and should
	 * prevent space insertion.
	 *
	 * @param current_index the current child index
	 * @returns `true` if the next child can be separated by a new line, or `false` otherwise
	 * @private
	 */
	private can_insert_separator(current_index: number): boolean {
		for (let i = current_index + 1; i < this.children.length; i++) {
			const look_ahead = this.children[i];

			if (look_ahead instanceof Text) {
				return get_leading_spaces(look_ahead.content) !== 0;
			} else if (look_ahead instanceof Element) {
				if (!look_ahead.tag.inline) {
					return true;
				} else {
					const text_look_ahead = look_ahead.get_first_relevant_text_child();

					if (text_look_ahead && get_leading_spaces(text_look_ahead.content) !== 0) {
						return true;
					} else {
						return false;
					}
				}
			}
			
		}

		return false;
	}

	private can_indent_first_child(): boolean {
		if (!this.tag.inline) {
			// This element isn't an inline element, we can freely use new lines.
			return true;
		} else {
			// Otherwise we look for the first relevant text child and see if it has leading spaces,
			// if it does then we can insert a new line without altering the meaning of the HTML tree.
			const relevant_child = this.get_first_relevant_text_child();

			if (
				relevant_child?.content === undefined
				|| get_leading_spaces(relevant_child.content) !== 0
			) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Returns the outer HTML string of this element.
	 *
	 * @param style the HTML string style
	 * @returns the outer HTML string
	 */
	public override html(style: StringifyStyle = new StringifyStyle("\t")): string {
		// Can we prettify the output?
		const pretty = style.is_pretty() && !this.tag.preserve_format;
		let result = style.indent_value + stringify_start_tag(this);

		if (!this.tag.self_closing) {
			if (this.children.length > 0) {
				const indent = pretty ? style.indent() : new StringifyStyle("");

				if (pretty && this.can_indent_first_child()) {
					// We can use a new line to allow the first child to be indented.
					result += "\n";
				}

				result += this.inner_html(indent);

				if (pretty) {
					const trailing_spaces = get_trailing_spaces(result);

					// If we have trailing spaces we can simplify them into a new line.
					if (trailing_spaces) {
						result = result.substring(0, result.length - trailing_spaces) + `\n${style.indent_value}`;
					} else if (!this.tag.inline) {
						// Or if this element isn't an inline element, then we can put the end tag on a new line.
						result += `\n${style.indent_value}`;
					} else {
						// Otherwise we look if there's a relevant text child that has trailing spaces to determine if we can have a new line.
						const last_text = this.get_last_relevant_text_child();

						if (last_text && get_trailing_spaces(last_text.content)) {
							result += `\n${style.indent_value}`;
						}
					}
				}
			}

			result += `</${this.tag.name}>`;
		}

		return result;
	}

	/**
	 * Returns the inner HTML string of this element.
	 *
	 * @param style the HTML string style
	 * @returns the inner HTML string
	 */
	public inner_html(style: StringifyStyle = new StringifyStyle("\t", 0)): string {
		// Can we prettify the output?
		const pretty = style.is_pretty() && !this.tag.preserve_format;
		let look_behind: Node | null = null;
		let result = "";

		let allow_element_indent = true;

		for (let i = 0; i < this.children.length; i++) {
			const child = this.children[i];
			const look_ahead = this.children[i + 1];
			// Separator to use to join each child.
			const separator = (pretty && i !== this.children.length - 1) ? "\n" : "";

			if (child instanceof Text) {
				const starting_spaces = get_leading_spaces(child.content);
				let html = child.html();

				if (pretty && ((!this.tag.inline && i === 0) || starting_spaces !== 0)) {
					// If we prettify and the text has leading spaces, we can replace with indentation instead.
					if (look_behind instanceof Text && !result.endsWith("\n")) {
						// And in the case the previous node was also text, we make sure the new line is present as it could not be.
						result += "\n";
					}

					html = style.indent_value + html.substring(starting_spaces);
				}

				result += html;

				if (look_ahead instanceof Element && separator && get_trailing_spaces(child.content)) {
					result = result.replace(/\s+$/, "") + "\n";
					allow_element_indent = true;
				} else if (look_ahead instanceof Element) {
					allow_element_indent = false;
				}
			} else if (child instanceof Element) {
				const relevant_text = child.get_first_relevant_text_child();
				const elem_html = child.html(style);

				if (!result.endsWith("\n") && (i !== 0 || !this.can_indent_first_child()) && relevant_text && get_leading_spaces(relevant_text.content) === 0) {
					result += elem_html.trimStart();
				} else if (!allow_element_indent) {
					result += elem_html.trimStart();
				} else {
					if (pretty && i !== 0 && !result.endsWith("\n")) {
						// If we prettify and indent the child element, we ensure that there's a new line for it.
						result += "\n";
					}
					result += elem_html;
				}

				if (this.can_insert_separator(i)) {
					result += separator;
				}

				allow_element_indent = true;
			} else if (child instanceof Comment) {
				result += child.html();
			}

			look_behind = child;
		}

		return result;
	}

	/**
	 * Returns the text content of this element.
	 *
	 * @returns the text content
	 */
	public override text(): string {
		let result = "";

		for (const child of this.children) {
			result += child.text();
		}

		return result;
	}

	public override toString(): string {
		return `Element{tag: "${this.tag.name}", `
			+ `attributes: [${this.attributes.map(attr => attr.toString()).join(", ")}], `
			+ `children: [${this.children.map(child => child.toString()).join(", ")}]}`;
	}

	/**
	 * Returns a representation of this element suitable for JSON-serialization.
	 *
	 * @returns the representation of this element for JSON-serialization
	 */
	public override toJSON(): object {
		return {
			type: "tag",
			tag: this.tag.name,
			attributes: this.attributes.map(attr => attr.toJSON()),
			children: this.children.map(child => child.toJSON()),
		};
	}

	/**
	 * Clones the children of this element.
	 *
	 * @returns the cloned children of this element
	 */
	public clone_children(): Node[] {
		const cloned = [];

		for (const node of this.children) {
			cloned.push(node.clone());
		}

		return cloned;
	}

	/**
	 * Clones the attributes of this element.
	 *
	 * @returns the cloned attribute list
	 * @protected
	 */
	protected clone_attributes(): Attribute<any>[] {
		const cloned = [];

		for (const attr of this.attributes) {
			cloned.push(attr.clone());
		}

		return cloned;
	}

	/**
	 * Clones this element.
	 *
	 * @returns the cloned element
	 */
	public override clone(): Element {
		const cloned = new Element(this.tag);
		cloned.children = this.clone_children();
		cloned.attributes = this.clone_attributes();
		return cloned;
	}
}

/**
 * Represents a link element.
 *
 * @version 1.0.0
 * @since 1.0.0
 */
export class LinkElement extends Element {
	constructor() {
		super(Tag.a);
	}

	/**
	 * The hyperlink reference value.
	 */
	public get href(): string | undefined {
		return this.attr("href")?.value;
	}

	public set href(value: string) {
		this.attr("href", value);
	}

	/**
	 * The title of this link element.
	 */
	public get title(): string | undefined {
		return this.attr("title")?.value;
	}

	public set title(value: string) {
		this.attr("title", value);
	}

	/**
	 * Clones this element.
	 *
	 * @returns the cloned element
	 */
	public override clone(): LinkElement {
		const cloned = new LinkElement();
		cloned.children = this.clone_children();
		cloned.attributes = this.clone_attributes();
		return cloned;
	}
}

/**
 * Represents an image element.
 *
 * @version 1.0.0
 * @since 1.0.0
 */
export class ImageElement extends Element {
	constructor() {
		super(Tag.img);
	}

	/**
	 * The source of this image element.
	 */
	public get src(): string | undefined {
		return this.attr("src")?.value;
	}

	public set src(value: string) {
		this.attr("src", value);
	}

	/**
	 * The alt text of this image element.
	 */
	public get alt(): string | undefined {
		return this.attr("alt")?.value;
	}

	public set alt(value: string) {
		this.attr("alt", value);
	}

	/**
	 * The title of this image element.
	 */
	public get title(): string | undefined {
		return this.attr("title")?.value;
	}

	public set title(value: string) {
		this.attr("title", value);
	}

	/**
	 * Clones this element.
	 *
	 * @returns the cloned element
	 */
	public override clone(): ImageElement {
		const cloned = new ImageElement();
		cloned.children = this.clone_children();
		cloned.attributes = this.clone_attributes();
		return cloned;
	}
}
