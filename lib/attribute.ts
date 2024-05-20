/*
 * Copyright 2024 LambdAurora <email@lambdaurora.dev>
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/**
 * This module contains definitions related to HTML attributes.
 *
 * @module
 */

import { encode_html } from "./utils.ts";

/* Types */

/**
 * Represents the attribute class given the name of the attribute.
 *
 * @param Name the name of the attribute
 */
export type AttributeClass<Name> = Name extends "class"
	? ClassAttribute
	: Name extends "style"
		? StyleAttribute
		: SimpleAttribute;

/**
 * Represents the underlying value for style attributes.
 */
export type StyleAttributeValue = {
	[key: string]: (string | number)
};

/**
 * Represents the underlying attribute value given its name.
 *
 * @param Name the name of the attribute
 */
export type AttributeValue<Name> = (
	Name extends "class"
		? string[]
		: Name extends "style"
			? StyleAttributeValue
			: string
	) | string | null | undefined;

/* Attributes */

/**
 * Creates an attribute instance of the given name and value.
 *
 * @param name the name of the attribute
 * @param value the value of the attribute
 * @returns the attribute instance
 */
export function create_attribute<N extends string, V extends AttributeValue<N>, A extends AttributeClass<N>>(name: N, value: V): A {
	switch (name) {
		case "class":
			return new ClassAttribute(value as AttributeValue<"class">) as A;
		case "style":
			return new StyleAttribute(value as AttributeValue<"style">) as A;
		default:
			return new SimpleAttribute(name, value as (string | null | undefined)) as A;
	}
}

/**
 * Represents an attribute of an HTML element.
 *
 * @version 1.0.0
 * @since 1.0.0
 */
export abstract class Attribute<ValueType> {
	/**
	 * The value of this attribute.
	 * @protected
	 */
	protected _value: ValueType;

	protected constructor(value: ValueType) {
		this._value = value;
	}

	/**
	 * The name of this attribute.
	 */
	public abstract get name(): string;

	/**
	 * The string value of this attribute.
	 *
	 * @see #real_value
	 */
	public abstract get value(): string;

	/**
	 * Sets the value of this attribute.
	 *
	 * @param value the raw or string value of this attribute
	 */
	public abstract set_value(value: ValueType | string): void;

	/**
	 * The actual underlying value of this attribute.
	 *
	 * @see #value
	 */
	public get real_value(): ValueType {
		return this._value;
	}

	/**
	 * Returns the HTML representation of this attribute.
	 *
	 * @returns the HTMl string
	 */
	public html(): string {
		const value = this.value;
		if (value.length === 0) {
			return this.name;
		} else {
			return `${this.name}="${encode_html(value)}"`;
		}
	}

	/**
	 * Returns a representation of this attribute suitable for JSON-serialization.
	 *
	 * @returns the representation of this attribute for JSON-serialization
	 */
	public abstract to_json(): object;

	/**
	 * Clones this attribute.
	 *
	 * @returns the cloned attribute
	 */
	public abstract clone(): Attribute<ValueType>;
}

/**
 * Represents a regular attribute in an HTML tag.
 *
 * @version 1.0.0
 * @since 1.0.0
 */
export class SimpleAttribute extends Attribute<string> {
	/**
	 * The name of this attribute.
	 */
	public readonly name: string;

	constructor(name: string, value: string | null | undefined) {
		super(value ? value.trim() : "");
		this.name = name;
	}

	/**
	 * The string value of this attribute.
	 *
	 * @see #real_value
	 */
	public override get value(): string {
		return this._value;
	}

	/**
	 * Sets the value of this attribute.
	 *
	 * @param value the value of this attribute
	 */
	public override set_value(value: string) {
		this._value = value.trim();
	}

	public override toString(): string {
		return `Attribute{name: "${this.name}", value: "${this.value}"]}`;
	}

	/**
	 * Returns a representation of this simple attribute suitable for JSON-serialization.
	 *
	 * @returns the representation of this simple attribute for JSON-serialization
	 */
	public override to_json(): object {
		return {
			type: "attribute",
			name: this.name,
			value: this.value
		};
	}

	/**
	 * Clones this attribute.
	 *
	 * @returns the cloned attribute
	 */
	public override clone(): SimpleAttribute {
		return new SimpleAttribute(this.name, this._value);
	}
}

function build_class_value(value: string[] | string | null | undefined): string[] {
	if (value instanceof Array) {
		return value;
	} else if (typeof value === "string") {
		if (value.includes(" "))
			return value.split(" ");
		else
			return [value];
	} else {
		return [];
	}
}

/**
 * Represents a `class` HTML attribute.
 *
 * @version 1.0.0
 * @since 1.0.0
 */
export class ClassAttribute extends Attribute<string[]> {
	constructor(value: string[] | string | null | undefined) {
		super(build_class_value(value));
	}

	/**
	 * The name of this attribute.
	 */
	public override get name(): "class" {
		return "class";
	}

	/**
	 * The string value of this attribute.
	 *
	 * @see #real_value
	 */
	public override get value(): string {
		return this._value.join(" ");
	}

	/**
	 * Sets the value of this attribute.
	 *
	 * @param value the class list or string value of this attribute
	 */
	public override set_value(value: string | string[]): void {
		this._value = build_class_value(value);
	}

	/**
	 * Adds the given class name to this attribute.
	 *
	 * @param class_name the class name to add
	 */
	public add(class_name: string): void {
		this._value.push(class_name);
	}

	/**
	 * Removes the given class name from this attribute.
	 *
	 * @param class_name the class name to remove
	 * @returns `true` if the class name has been found and removed, or `false` otherwise
	 */
	public remove(class_name: string): boolean {
		const index = this._value.findIndex((value) => value === class_name);

		if (index !== -1) {
			this._value.splice(index);
			return true;
		} else {
			return false;
		}
	}

	public override toString(): string {
		return `ClassAttribute{name: "${this.name}", value: "${this.value}", classes: [${this._value.join(", ")}}`;
	}

	/**
	 * Returns a representation of this `class` attribute suitable for JSON-serialization.
	 *
	 * @returns the representation of this `class` attribute for JSON-serialization
	 */
	public override to_json(): object {
		return {
			type: "class_attribute",
			name: this.name,
			value: this.value,
			classes: this._value
		};
	}

	/**
	 * Clones this `class` attribute.
	 *
	 * @returns the cloned `class` attribute
	 */
	public override clone(): ClassAttribute {
		return new ClassAttribute(this._value);
	}
}

function build_style_value(value: StyleAttributeValue | string | null | undefined): StyleAttributeValue {
	if (value instanceof Object) {
		return value;
	} else if (typeof value === "string") {
		value = value.replace(/\/\*(?:.|\n)*?\*\//, "");
		const new_value: StyleAttributeValue = {};

		value.split(";").forEach(rule => {
			if (/^\s*$/.test(rule))
				return;
			const split = rule.split(":");
			let property_value = "";
			if (split[1]) property_value = split.slice(1).join(":");
			if (split[0]) {
				new_value[split[0].trim()] = property_value.trim();
			}
		});

		return new_value;
	} else {
		return {};
	}
}

/**
 * Represents a `style` HTML attribute.
 *
 * @version 1.0.0
 * @since 1.0.0
 */
export class StyleAttribute extends Attribute<StyleAttributeValue> {
	constructor(value: StyleAttributeValue | string | null | undefined) {
		super(build_style_value(value));
	}

	/**
	 * The name of this attribute.
	 */
	public override get name(): "style" {
		return "style";
	}

	/**
	 * The string value of this attribute.
	 *
	 * @see #real_value
	 */
	public override get value(): string {
		const val = Object.entries(this._value).map(([key, value]) => `${key}: ${value}`).join("; ")
		return val === "" ? val : (val + ";");
	}

	/**
	 * Sets the value of this attribute.
	 *
	 * @param value the style object or string value of this attribute
	 */
	public override set_value(value: string | StyleAttributeValue): void {
		this._value = build_style_value(value);
	}

	/**
	 * Sets a style property to the given value.
	 *
	 * @param property the style property to set
	 * @param value the value of the property
	 */
	public set(property: string, value: string | number): void {
		if (typeof value !== "string") {
			value = value.toString();
		}

		this._value[property.trim()] = value.trim();
	}

	/**
	 * Gets the value of the given style property.
	 *
	 * @param property the property
	 * @returns the value for the given style property
	 */
	public get(property: string): string | number | undefined {
		return this._value[property];
	}

	/**
	 * Removes the style property from this attribute.
	 *
	 * @param property the property to remove
	 * @returns `true` if the property has been found and removed, or `false` otherwise
	 */
	public remove(property: string): boolean {
		if (Object.hasOwn(this._value, property)) {
			delete this._value[property];
			return true;
		} else {
			return false;
		}
	}

	public override toString(): string {
		const style = Object.entries(this._value).map(([key, value]) => `${key}: ${value}`).join(",");
		return `StyleAttribute{name: "${this.name}", value: "${this.value}", style: {${style}}}`;
	}

	/**
	 * Returns a representation of this `style` attribute suitable for JSON-serialization.
	 *
	 * @returns the representation of this `style` attribute for JSON-serialization
	 */
	public override to_json(): object {
		return {
			type: "style_attribute",
			name: this.name,
			value: this.value,
			style: this._value
		};
	}

	/**
	 * Clones this `style` attribute.
	 *
	 * @returns the cloned `style` attribute
	 */
	public override clone(): StyleAttribute {
		return new StyleAttribute(this._value);
	}
}
