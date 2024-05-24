# lib.html

<p align="center">
	<img src="https://img.shields.io/badge/language-TS-9B599A.svg?style=flat-square" alt="JS" />
	<a href="https://raw.githubusercontent.com/LambdAurora/lib.html/main/LICENSE"><img src="https://img.shields.io/badge/license-MPL%202.0-blue.svg?style=flat-square" alt="GitHub license" /></a>
	<a href="https://jsr.io/@lambdaurora/libhtml"><img src="https://jsr.io/badges/@lambdaurora/libhtml?style=flat-square" alt="JSR badge" /></a>
	<img src="https://shields.io/github/v/tag/LambdAurora/lib.html?sort=semver&style=flat-square" />
	<a href="https://github.com/LambdAurora/lib.html/issues/"><img src="https://img.shields.io/github/issues/LambdAurora/lib.html.svg?style=flat-square" alt="GitHub issues" /></a>
</p>

<p align="center">
	An HTML AST, parser, and writer library written in TypeScript.
</p>

## Example

```typescript
import * as html from "@lambdaurora/libhtml";

const div = html.parse(`<div>
	<h1>Hello World!</h1>
	<p>
		This is a lovely HTML source.
	</p>
</div>`) as html.Element;

div.get_element_by_tag_name("h1").text // Hello World!

const alert = html.create_element("div")
	.with_child(html.create_element("h1")
		.with_child("Alert: this is a lovely day!")
	).with_child(html.create_element("p")
		.with_child("Have a good day!")
	);

const html_string = alert.html();
```

## Usage

### Deno

Add [the library from JSR](https://jsr.io/@lambdaurora/libhtml):

```shell
deno add @lambdaurora/libhtml
```

Then import it:

```typescript
import * as html from "@lambdaurora/libhtml";
```

### Web

Import the library using [esm.sh](https://esm.sh):

```javascript
import * as html from "https://esm.sh/jsr/@lambdaurora/libhtml@1.1.3";
```
