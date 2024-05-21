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
 * This module contains various utilities.
 *
 * @module
 */

// From https://www.w3.org/TR/xml-entity-names/2007/htmlmathml.json
import HTML_ENTITIES from "./html_entities.json" with { type: "json" };

/**
 * Represents the non-breaking space character.
 */
export const NBSP = "\u00a0";

const SPACES = [" ", "\t", "\r", "\n"];
/**
 * Represents the HTML tag start (`<`) code point.
 */
export const TAG_START_CODE_POINT: number = "<".codePointAt(0)!;
/**
 * Represents the HTML tag end (`>`) code point.
 */
export const TAG_END_CODE_POINT: number = ">".codePointAt(0)!;

/*
 * Object stuff
 */

/**
 * Merges the properties of two objects and will keep intact the properties of the target object.
 *
 * @param source the source object
 * @param target the target object
 * @returns the merged object
 * @since 1.0.0
 */
export function merge_objects<S, T extends S>(source: S, target: T | Partial<S>): T {
	if (source === null || source === undefined) {
		return target as T;
	} else if (target === null || target === undefined) {
		target = {} as T;
	}

	// deno-lint-ignore no-explicit-any
	const target_obj = target as any;

	Object.entries(source).forEach(([key, value]) => {
		if (target_obj[key] === undefined) {
			target_obj[key] = value;
		} else if (typeof target_obj[key] === "object") {
			target_obj[key] = merge_objects(value, target_obj[key]);
		}
	});

	return target as T;
}

/*
 * Character stuff
 */

const ENTITY_DECODE_REGEX = (() => {
	const named_pattern = `&(${Object.keys(HTML_ENTITIES.characters).join("|")});`;
	return new RegExp(`${named_pattern}|&#([0-9]+);|&#[xX]([a-fA-F0-9]+);`, "g");
})();

//region Inspired from "he" (https://github.com/mathiasbynens/he)
function code_point_to_symbol(code_point: number): string {
	if ((code_point >= 0xD800 && code_point <= 0xDFFF) || code_point > 0x10FFFF) {
		// “Otherwise, if the number is in the range 0xD800 to 0xDFFF or is
		// greater than 0x10FFFF, then this is a parse error. Return a U+FFFD
		// REPLACEMENT CHARACTER.”
		return "\uFFFD";
	}
	return String.fromCharCode(code_point);
}

/**
 * Decodes the HTML entities from the given text.
 *
 * @param text the text to decode
 * @returns the decoded text
 */
export function decode_html(text: string): string {
	return text.replaceAll(ENTITY_DECODE_REGEX, (substring, named: string, decimal: string, hex: string) => {
		if (named) {
			// deno-lint-ignore no-explicit-any
			return (HTML_ENTITIES.characters as any)[named];
		}

		if (decimal) {
			// Decode decimal escapes, e.g. `&#119558;`.
			const code_point = parseInt(decimal, 10);
			return code_point_to_symbol(code_point);
		}

		if (hex) {
			// Decode hexadecimal escapes, e.g. `&#x1D306;`.
			const code_point = parseInt(hex, 16);
			return code_point_to_symbol(code_point);
		}

		return substring;
	});
}

//endregion

/**
 * Encodes characters that are part of syntax in HTML as their HTML entities equivalent.
 *
 * @param text the text to encode
 * @returns the encoded text
 */
export function encode_html(text: string): string {
	return text
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&apos;")
		.replaceAll(NBSP, "&nbsp;");
}

/**
 * Returns whether the character at the specified index in the input string matches the given character.
 *
 * @param input the input string
 * @param character the character to compare
 * @param index the character index in the input string
 * @returns `true` if it matches, otherwise `false`
 * @since 1.0.0
 */
export function is_character_match(input: string, character: string | number, index: number = 0): boolean {
	if (index < 0 || index >= input.length) {
		return false;
	}

	if (typeof character === "number") { // it's a codepoint
		return input.codePointAt(index) === character;
	} else {
		return input[index] === character;
	}
}

/**
 * Gets the amount of leading spaces in the given input string.
 *
 * @param input the input string
 * @returns the amount of leading spaces
 */
export function get_leading_spaces(input: string): number {
	let i;

	for (i = 0; i < input.length; i++) {
		if (!SPACES.includes(input[i])) break;
	}

	return i;
}

/**
 * Gets the amount of trailing spaces in the given input string.
 *
 * @param input the input string
 * @returns the amount of trailing spaces
 */
export function get_trailing_spaces(input: string): number {
	let count = 0;

	for (let i = input.length - 1; i >= 0; i--) {
		if (!SPACES.includes(input[i])) break;
		count++;
	}

	return count;
}
