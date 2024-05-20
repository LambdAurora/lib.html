/*
 * Copyright 2024 LambdAurora <email@lambdaurora.dev>
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/**
 * This module contains definitions related to HTML text nodes.
 *
 * @module
 */

import { Node } from "./tree.ts";
import { encode_html } from "./utils.ts";

/**
 * Represents a text node.
 *
 * @version 1.0.0
 * @since 1.0.0
 */
export class Text extends Node {
	/**
	 * Represents the content of this text node.
	 */
	public content: string = "";

	constructor(content: string) {
		super();

		this.content = content;
	}

	/**
	 * Gets the HTML-encoded content of this text node.
	 *
	 * @returns the HTML-encoded content
	 */
	public override html(): string {
		return encode_html(this.content);
	}

	/**
	 * Returns the text content of this text node.
	 *
	 * @returns the text content
	 */
	public override text(): string {
		return this.content;
	}

	public override toString(): string {
		return `TextNode{${this.content}}`;
	}

	/**
	 * Returns a representation of this text node suitable for JSON-serialization.
	 *
	 * @returns the representation of this text node for JSON-serialization
	 */
	public override to_json(): string {
		return this.content;
	}

	/**
	 * Clones this text node.
	 *
	 * @returns the cloned text node
	 */
	public override clone(): Text {
		return new Text(this.content);
	}
}

/**
 * Represents a comment node.
 *
 * @version 1.0.0
 * @since 1.0.0
 */
export class Comment extends Node {
	/**
	 * Represents the content of this comment node.
	 */
	public content: string = "";

	constructor(content: string) {
		super();

		this.content = content;
	}

	/**
	 * Returns the HTML representation of this comment node.
	 *
	 * @returns the HTML string
	 */
	public override html(): string {
		return `<!--${this.content}-->`;
	}

	/**
	 * Returns the text content of this comment node.
	 *
	 * @returns an empty string
	 */
	public override text(): "" {
		return "";
	}

	public override toString(): string {
		return `CommentNode{${this.content}}`;
	}

	/**
	 * Returns a representation of this comment node suitable for JSON-serialization.
	 *
	 * @returns the representation of this comment node for JSON-serialization
	 */
	public override to_json(): object {
		return {
			type: "comment",
			content: this.content,
		};
	}

	/**
	 * Clones this comment node.
	 *
	 * @returns the cloned comment node
	 */
	public override clone(): Comment {
		return new Comment(this.content);
	}
}
