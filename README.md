# Kata-problems
Codewars project - Polydivisible Numbers

## Polydivisible Numbers

This repository contains implementations of functions to work with polydivisible numbers.

### What is a Polydivisible Number?

A polydivisible number in base `b` is a number where, for every position `i` from 1 to the length of the number, the substring from position 1 to `i` (when converted to decimal) is divisible by `i`.

**Example:** `1232` in base 10 is polydivisible because:
- `1` (position 1) is divisible by 1 ✓
- `12` (positions 1-2) is divisible by 2 ✓
- `123` (positions 1-3) is divisible by 3 ✓
- `1232` (positions 1-4) is divisible by 4 ✓

### Functions

#### `isPolydivisible(s, b)`

Checks if a number string in the given base is polydivisible.

**Parameters:**
- `s` (string): The number string to check
- `b` (number): The base of the number (2-62)

**Returns:** `boolean` - `true` if the number is polydivisible, `false` otherwise

**Examples:**
```javascript
isPolydivisible("1232", 10);   // true
isPolydivisible("123220", 10); // false
isPolydivisible("123220", 6);  // true
```

#### `getPolydivisible(n, b)`

Returns the nth polydivisible number in the given base.

**Parameters:**
- `n` (number): The index of the polydivisible number (uses 1-based indexing, where n=1 returns "0")
- `b` (number): The base (2-62)

**Returns:** `string` - The nth polydivisible number as a string

**Examples:**
```javascript
getPolydivisible(22, 10);  // "32"
getPolydivisible(22, 16);  // "1A"
getPolydivisible(42, 16);  // "42"
```

### Character Encoding

For bases up to 62, the following character sequence is used:
- `0-9` for values 0-9
- `A-Z` for values 10-35
- `a-z` for values 36-61

### Running Tests

```bash
npm test
```

### Implementation Details

The implementation uses:
- Base conversion utilities to convert between different bases and decimal
- An efficient BFS (breadth-first search) algorithm to generate polydivisible numbers in order
- Comprehensive test coverage for all examples and edge cases
