/*
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
import type { CreateElementIn, CreateElementOut, Element, ImageElement, LinkElement, StyleValue } from "./element.ts";
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

/**
 * Creates a new `a` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `a` element
 */
export function a(input?: Input | (Node | string)[]): LinkElement {
	return with_children("a", input);
}

/**
 * Creates a new `abbr` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `abbr` element
 */
export function abbr(input?: Input | (Node | string)[]): Element {
	return with_children("abbr", input);
}

/**
 * Creates a new `address` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `address` element
 */
export function address(input?: Input | (Node | string)[]): Element {
	return with_children("address", input);
}

/**
 * Creates a new `area` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `area` element
 */
export function area(input?: Input | (Node | string)[]): Element {
	return with_children("area", input);
}

/**
 * Creates a new `article` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `article` element
 */
export function article(input?: Input | (Node | string)[]): Element {
	return with_children("article", input);
}

/**
 * Creates a new `aside` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `aside` element
 */
export function aside(input?: Input | (Node | string)[]): Element {
	return with_children("aside", input);
}

/**
 * Creates a new `audio` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `audio` element
 */
export function audio(input?: Input | (Node | string)[]): Element {
	return with_children("audio", input);
}

/**
 * Creates a new `b` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `b` element
 */
export function b(input?: Input | (Node | string)[]): Element {
	return with_children("b", input);
}

/**
 * Creates a new `base` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `base` element
 */
export function base(input?: Input | (Node | string)[]): Element {
	return with_children("base", input);
}

/**
 * Creates a new `bdi` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `bdi` element
 */
export function bdi(input?: Input | (Node | string)[]): Element {
	return with_children("bdi", input);
}

/**
 * Creates a new `bdo` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `bdo` element
 */
export function bdo(input?: Input | (Node | string)[]): Element {
	return with_children("bdo", input);
}

/**
 * Creates a new `blockquote` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `blockquote` element
 */
export function blockquote(input?: Input | (Node | string)[]): Element {
	return with_children("blockquote", input);
}

/**
 * Creates a new `body` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `body` element
 */
export function body(input?: Input | (Node | string)[]): Element {
	return with_children("body", input);
}

/**
 * Creates a new `br` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `br` element
 */
export function br(input?: Input | (Node | string)[]): Element {
	return with_children("br", input);
}

/**
 * Creates a new `button` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `button` element
 */
export function button(input?: Input | (Node | string)[]): Element {
	return with_children("button", input);
}

/**
 * Creates a new `canvas` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `canvas` element
 */
export function canvas(input?: Input | (Node | string)[]): Element {
	return with_children("canvas", input);
}

/**
 * Creates a new `caption` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `caption` element
 */
export function caption(input?: Input | (Node | string)[]): Element {
	return with_children("caption", input);
}

/**
 * Creates a new `cite` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `cite` element
 */
export function cite(input?: Input | (Node | string)[]): Element {
	return with_children("cite", input);
}

/**
 * Creates a new `code` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `code` element
 */
export function code(input?: Input | (Node | string)[]): Element {
	return with_children("code", input);
}

/**
 * Creates a new `col` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `col` element
 */
export function col(input?: Input | (Node | string)[]): Element {
	return with_children("col", input);
}

/**
 * Creates a new `colgroup` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `colgroup` element
 */
export function colgroup(input?: Input | (Node | string)[]): Element {
	return with_children("colgroup", input);
}

/**
 * Creates a new `data` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `data` element
 */
export function data(input?: Input | (Node | string)[]): Element {
	return with_children("data", input);
}

/**
 * Creates a new `datalist` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `datalist` element
 */
export function datalist(input?: Input | (Node | string)[]): Element {
	return with_children("datalist", input);
}

/**
 * Creates a new `dd` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `dd` element
 */
export function dd(input?: Input | (Node | string)[]): Element {
	return with_children("dd", input);
}

/**
 * Creates a new `del` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `del` element
 */
export function del(input?: Input | (Node | string)[]): Element {
	return with_children("del", input);
}

/**
 * Creates a new `details` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `details` element
 */
export function details(input?: Input | (Node | string)[]): Element {
	return with_children("details", input);
}

/**
 * Creates a new `dfn` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `dfn` element
 */
export function dfn(input?: Input | (Node | string)[]): Element {
	return with_children("dfn", input);
}

/**
 * Creates a new `dialog` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `dialog` element
 */
export function dialog(input?: Input | (Node | string)[]): Element {
	return with_children("dialog", input);
}

/**
 * Creates a new `div` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `div` element
 */
export function div(input?: Input | (Node | string)[]): Element {
	return with_children("div", input);
}

/**
 * Creates a new `dl` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `dl` element
 */
export function dl(input?: Input | (Node | string)[]): Element {
	return with_children("dl", input);
}

/**
 * Creates a new `dt` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `dt` element
 */
export function dt(input?: Input | (Node | string)[]): Element {
	return with_children("dt", input);
}

/**
 * Creates a new `em` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `em` element
 */
export function em(input?: Input | (Node | string)[]): Element {
	return with_children("em", input);
}

/**
 * Creates a new `fieldset` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `fieldset` element
 */
export function fieldset(input?: Input | (Node | string)[]): Element {
	return with_children("fieldset", input);
}

/**
 * Creates a new `figcaption` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `figcaption` element
 */
export function figcaption(input?: Input | (Node | string)[]): Element {
	return with_children("figcaption", input);
}

/**
 * Creates a new `figure` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `figure` element
 */
export function figure(input?: Input | (Node | string)[]): Element {
	return with_children("figure", input);
}

/**
 * Creates a new `footer` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `footer` element
 */
export function footer(input?: Input | (Node | string)[]): Element {
	return with_children("footer", input);
}

/**
 * Creates a new `form` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `form` element
 */
export function form(input?: Input | (Node | string)[]): Element {
	return with_children("form", input);
}

/**
 * Creates a new `h1` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `h1` element
 */
export function h1(input?: Input | (Node | string)[]): Element {
	return with_children("h1", input);
}

/**
 * Creates a new `h2` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `h2` element
 */
export function h2(input?: Input | (Node | string)[]): Element {
	return with_children("h2", input);
}

/**
 * Creates a new `h3` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `h3` element
 */
export function h3(input?: Input | (Node | string)[]): Element {
	return with_children("h3", input);
}

/**
 * Creates a new `h4` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `h4` element
 */
export function h4(input?: Input | (Node | string)[]): Element {
	return with_children("h4", input);
}

/**
 * Creates a new `h5` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `h5` element
 */
export function h5(input?: Input | (Node | string)[]): Element {
	return with_children("h5", input);
}

/**
 * Creates a new `h6` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `h6` element
 */
export function h6(input?: Input | (Node | string)[]): Element {
	return with_children("h6", input);
}

/**
 * Creates a new `head` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `head` element
 */
export function head(input?: Input | (Node | string)[]): Element {
	return with_children("head", input);
}

/**
 * Creates a new `header` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `header` element
 */
export function header(input?: Input | (Node | string)[]): Element {
	return with_children("header", input);
}

/**
 * Creates a new `hr` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `hr` element
 */
export function hr(input?: Input | (Node | string)[]): Element {
	return with_children("hr", input);
}

/**
 * Creates a new `i` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `i` element
 */
export function i(input?: Input | (Node | string)[]): Element {
	return with_children("i", input);
}

/**
 * Creates a new `iframe` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `iframe` element
 */
export function iframe(input?: Input | (Node | string)[]): Element {
	return with_children("iframe", input);
}

/**
 * Creates a new `img` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `img` element
 */
export function img(input?: Input | (Node | string)[]): ImageElement {
	return with_children("img", input);
}

/**
 * Creates a new `input` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `input` element
 */
export function input(input?: Input | (Node | string)[]): Element {
	return with_children("input", input);
}

/**
 * Creates a new `ins` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `ins` element
 */
export function ins(input?: Input | (Node | string)[]): Element {
	return with_children("ins", input);
}

/**
 * Creates a new `kbd` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `kbd` element
 */
export function kbd(input?: Input | (Node | string)[]): Element {
	return with_children("kbd", input);
}

/**
 * Creates a new `label` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `label` element
 */
export function label(input?: Input | (Node | string)[]): Element {
	return with_children("label", input);
}

/**
 * Creates a new `legend` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `legend` element
 */
export function legend(input?: Input | (Node | string)[]): Element {
	return with_children("legend", input);
}

/**
 * Creates a new `li` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `li` element
 */
export function li(input?: Input | (Node | string)[]): Element {
	return with_children("li", input);
}

/**
 * Creates a new `link` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `link` element
 */
export function link(input?: Input | (Node | string)[]): Element {
	return with_children("link", input);
}

/**
 * Creates a new `main` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `main` element
 */
export function main(input?: Input | (Node | string)[]): Element {
	return with_children("main", input);
}

/**
 * Creates a new `map` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `map` element
 */
export function map(input?: Input | (Node | string)[]): Element {
	return with_children("map", input);
}

/**
 * Creates a new `mark` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `mark` element
 */
export function mark(input?: Input | (Node | string)[]): Element {
	return with_children("mark", input);
}

/**
 * Creates a new `meta` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `meta` element
 */
export function meta(input?: Input | (Node | string)[]): Element {
	return with_children("meta", input);
}

/**
 * Creates a new `meter` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `meter` element
 */
export function meter(input?: Input | (Node | string)[]): Element {
	return with_children("meter", input);
}

/**
 * Creates a new `nav` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `nav` element
 */
export function nav(input?: Input | (Node | string)[]): Element {
	return with_children("nav", input);
}

/**
 * Creates a new `noscript` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `noscript` element
 */
export function noscript(input?: Input | (Node | string)[]): Element {
	return with_children("noscript", input);
}

/**
 * Creates a new `ol` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `ol` element
 */
export function ol(input?: Input | (Node | string)[]): Element {
	return with_children("ol", input);
}

/**
 * Creates a new `optgroup` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `optgroup` element
 */
export function optgroup(input?: Input | (Node | string)[]): Element {
	return with_children("optgroup", input);
}

/**
 * Creates a new `option` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `option` element
 */
export function option(input?: Input | (Node | string)[]): Element {
	return with_children("option", input);
}

/**
 * Creates a new `output` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `output` element
 */
export function output(input?: Input | (Node | string)[]): Element {
	return with_children("output", input);
}

/**
 * Creates a new `p` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `p` element
 */
export function p(input?: Input | (Node | string)[]): Element {
	return with_children("p", input);
}

/**
 * Creates a new `param` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `param` element
 */
export function param(input?: Input | (Node | string)[]): Element {
	return with_children("param", input);
}

/**
 * Creates a new `picture` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `picture` element
 */
export function picture(input?: Input | (Node | string)[]): Element {
	return with_children("picture", input);
}

/**
 * Creates a new `pre` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `pre` element
 */
export function pre(input?: Input | (Node | string)[]): Element {
	return with_children("pre", input);
}

/**
 * Creates a new `progress` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `progress` element
 */
export function progress(input?: Input | (Node | string)[]): Element {
	return with_children("progress", input);
}

/**
 * Creates a new `q` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `q` element
 */
export function q(input?: Input | (Node | string)[]): Element {
	return with_children("q", input);
}

/**
 * Creates a new `rp` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `rp` element
 */
export function rp(input?: Input | (Node | string)[]): Element {
	return with_children("rp", input);
}

/**
 * Creates a new `rt` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `rt` element
 */
export function rt(input?: Input | (Node | string)[]): Element {
	return with_children("rt", input);
}

/**
 * Creates a new `ruby` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `ruby` element
 */
export function ruby(input?: Input | (Node | string)[]): Element {
	return with_children("ruby", input);
}

/**
 * Creates a new `s` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `s` element
 */
export function s(input?: Input | (Node | string)[]): Element {
	return with_children("s", input);
}

/**
 * Creates a new `samp` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `samp` element
 */
export function samp(input?: Input | (Node | string)[]): Element {
	return with_children("samp", input);
}

/**
 * Creates a new `script` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `script` element
 */
export function script(input?: Input | (Node | string)[]): Element {
	return with_children("script", input);
}

/**
 * Creates a new `section` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `section` element
 */
export function section(input?: Input | (Node | string)[]): Element {
	return with_children("section", input);
}

/**
 * Creates a new `select` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `select` element
 */
export function select(input?: Input | (Node | string)[]): Element {
	return with_children("select", input);
}

/**
 * Creates a new `slot` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `slot` element
 */
export function slot(input?: Input | (Node | string)[]): Element {
	return with_children("slot", input);
}

/**
 * Creates a new `small` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `small` element
 */
export function small(input?: Input | (Node | string)[]): Element {
	return with_children("small", input);
}

/**
 * Creates a new `source` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `source` element
 */
export function source(input?: Input | (Node | string)[]): Element {
	return with_children("source", input);
}

/**
 * Creates a new `span` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `span` element
 */
export function span(input?: Input | (Node | string)[]): Element {
	return with_children("span", input);
}

/**
 * Creates a new `strong` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `strong` element
 */
export function strong(input?: Input | (Node | string)[]): Element {
	return with_children("strong", input);
}

/**
 * Creates a new `style` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `style` element
 */
export function style(input?: Input | (Node | string)[]): Element {
	return with_children("style", input);
}

/**
 * Creates a new `sub` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `sub` element
 */
export function sub(input?: Input | (Node | string)[]): Element {
	return with_children("sub", input);
}

/**
 * Creates a new `summary` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `summary` element
 */
export function summary(input?: Input | (Node | string)[]): Element {
	return with_children("summary", input);
}

/**
 * Creates a new `sup` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `sup` element
 */
export function sup(input?: Input | (Node | string)[]): Element {
	return with_children("sup", input);
}

/**
 * Creates a new `svg` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `svg` element
 */
export function svg(input?: Input | (Node | string)[]): Element {
	return with_children("svg", input);
}

/**
 * Creates a new `table` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `table` element
 */
export function table(input?: Input | (Node | string)[]): Element {
	return with_children("table", input);
}

/**
 * Creates a new `tbody` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `tbody` element
 */
export function tbody(input?: Input | (Node | string)[]): Element {
	return with_children("tbody", input);
}

/**
 * Creates a new `td` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `td` element
 */
export function td(input?: Input | (Node | string)[]): Element {
	return with_children("td", input);
}

/**
 * Creates a new `template` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `template` element
 */
export function template(input?: Input | (Node | string)[]): Element {
	return with_children("template", input);
}

/**
 * Creates a new `textarea` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `textarea` element
 */
export function textarea(input?: Input | (Node | string)[]): Element {
	return with_children("textarea", input);
}

/**
 * Creates a new `tfoot` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `tfoot` element
 */
export function tfoot(input?: Input | (Node | string)[]): Element {
	return with_children("tfoot", input);
}

/**
 * Creates a new `th` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `th` element
 */
export function th(input?: Input | (Node | string)[]): Element {
	return with_children("th", input);
}

/**
 * Creates a new `thead` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `thead` element
 */
export function thead(input?: Input | (Node | string)[]): Element {
	return with_children("thead", input);
}

/**
 * Creates a new `time` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `time` element
 */
export function time(input?: Input | (Node | string)[]): Element {
	return with_children("time", input);
}

/**
 * Creates a new `title` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `title` element
 */
export function title(input?: Input | (Node | string)[]): Element {
	return with_children("title", input);
}

/**
 * Creates a new `tr` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `tr` element
 */
export function tr(input?: Input | (Node | string)[]): Element {
	return with_children("tr", input);
}

/**
 * Creates a new `track` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `track` element
 */
export function track(input?: Input | (Node | string)[]): Element {
	return with_children("track", input);
}

/**
 * Creates a new `u` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `u` element
 */
export function u(input?: Input | (Node | string)[]): Element {
	return with_children("u", input);
}

/**
 * Creates a new `ul` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `ul` element
 */
export function ul(input?: Input | (Node | string)[]): Element {
	return with_children("ul", input);
}

/**
 * Creates a new `video` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `video` element
 */
export function video(input?: Input | (Node | string)[]): Element {
	return with_children("video", input);
}

/**
 * Creates a new `wbr` element.
 *
 * @param input optional element inputs
 * @returns a new instance of the `wbr` element
 */
export function wbr(input?: Input | (Node | string)[]): Element {
	return with_children("wbr", input);
}
