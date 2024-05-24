# lib.html changelog

## 1.0.0

- Initial release.

### 1.0.1

- Improved some minor typing.

### 1.0.2

- Fixed JSON stringification integration.

### 1.0.3

- Fixed wrong insertion of significant whitespaces in stringification.

### 1.0.4

- Made `clone_children` public as it being protected was a mistake.

## 1.1.0

- Added single HTML element parsing function `parse_element`.
- Improved HTML stringification.

### 1.1.1

- Fixed HTML stringification inserting too many new lines.

### 1.1.2

- Fixed HTML parsing disregarding strays `<` characters.

### 1.1.3

- Fixed broken `parse_nodes` function.

## 1.2.0

- Added `stringify_tag_start` function.
- Fixed some prettification issues.

### 1.2.1

- Improved prettification of lists and tables.
- Fixed missing pretty condition to insert new lines in `inner_html`.

### 1.2.2

- Fixed bad HTML text encoding and decoding inside of `<script>` or `<style>` elements.

### 1.2.3

- Fixed bad stringification of space-sensitive elements which changed the meaning of the HTML tree.
