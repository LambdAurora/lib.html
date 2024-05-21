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
 * # lib.html
 *
 * An HTML AST, parser, and writer library.
 *
 * ## Quick Example
 *
 * ```ts
 * import * as html from "@lambdaurora/libhtml";
 *
 * const div = html.parse(`<div>
 * 	<h1>Hello World!</h1>
 * 	<p>
 * 		This is a lovely HTML source.
 * 	</p>
 * </div>`) as html.Element;
 *
 * div.get_element_by_tag_name("h1").text // Hello World!
 *
 * const alert = html.create_element("div")
 * 	.with_child(html.create_element("h1")
 * 		.with_child("Alert: this is a lovely day!")
 * 	).with_child(html.create_element("p")
 * 		.with_child("Have a good day!")
 * 	);
 *
 * const html_string = alert.html();
 * ```
 *
 * @module
 */

export * from "./lib/tree.ts";
export * from "./lib/text.ts";
export * from "./lib/attribute.ts";
export * from "./lib/element.ts";
export * from "./lib/html.ts";
export * from "./lib/utils.ts";
