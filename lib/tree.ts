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
 * This module contains the basics of the HTML AST.
 *
 * @module
 */

/**
 * Represents a node that is part of the HTML tree.
 */
export abstract class Node {
	/**
	 * Returns the HTML representation of this node.
	 *
	 * @returns the HTML string
	 */
	public abstract html(): string;

	/**
	 * Returns the text content of this node.
	 *
	 * @returns the text content
	 */
	public abstract text(): string;

	/**
	 * Returns a representation of this node suitable for JSON-serialization.
	 *
	 * @returns the representation of this node for JSON-serialization
	 */
	public abstract toJSON(): object | string;

	/**
	 * Clones this node.
	 *
	 * @returns the cloned node
	 */
	public abstract clone(): Node;
}
