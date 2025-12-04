const {
  isPolydivisible,
  getPolydivisible,
  charToValue,
  valueToChar,
  toDecimal,
  fromDecimal
} = require('./polydivisible');

// Helper function to run tests
function test(description, fn) {
  try {
    fn();
    console.log(`✓ ${description}`);
  } catch (error) {
    console.error(`✗ ${description}`);
    console.error(`  ${error.message}`);
    process.exitCode = 1;
  }
}

function assertEquals(actual, expected, message = '') {
  if (actual !== expected) {
    throw new Error(`Expected ${expected} but got ${actual}. ${message}`);
  }
}

console.log('Testing Polydivisible Functions\n');

// Test character conversion functions
console.log('Character Conversion Tests:');
test('charToValue converts digits correctly', () => {
  assertEquals(charToValue('0'), 0);
  assertEquals(charToValue('5'), 5);
  assertEquals(charToValue('9'), 9);
});

test('charToValue converts uppercase letters correctly', () => {
  assertEquals(charToValue('A'), 10);
  assertEquals(charToValue('Z'), 35);
});

test('charToValue converts lowercase letters correctly', () => {
  assertEquals(charToValue('a'), 36);
  assertEquals(charToValue('z'), 61);
});

test('valueToChar converts to digits correctly', () => {
  assertEquals(valueToChar(0), '0');
  assertEquals(valueToChar(5), '5');
  assertEquals(valueToChar(9), '9');
});

test('valueToChar converts to uppercase letters correctly', () => {
  assertEquals(valueToChar(10), 'A');
  assertEquals(valueToChar(35), 'Z');
});

test('valueToChar converts to lowercase letters correctly', () => {
  assertEquals(valueToChar(36), 'a');
  assertEquals(valueToChar(61), 'z');
});

// Test base conversion functions
console.log('\nBase Conversion Tests:');
test('toDecimal converts base 10 correctly', () => {
  assertEquals(toDecimal('123', 10), 123);
  assertEquals(toDecimal('1232', 10), 1232);
});

test('toDecimal converts base 16 correctly', () => {
  assertEquals(toDecimal('1A', 16), 26);
  assertEquals(toDecimal('FF', 16), 255);
});

test('fromDecimal converts to base 10 correctly', () => {
  assertEquals(fromDecimal(123, 10), '123');
  assertEquals(fromDecimal(0, 10), '0');
});

test('fromDecimal converts to base 16 correctly', () => {
  assertEquals(fromDecimal(26, 16), '1A');
  assertEquals(fromDecimal(255, 16), 'FF');
});

// Test isPolydivisible function
console.log('\nIsPolydivisible Tests:');
test('isPolydivisible("1232", 10) returns true', () => {
  assertEquals(isPolydivisible("1232", 10), true);
});

test('isPolydivisible("123220", 10) returns false', () => {
  assertEquals(isPolydivisible("123220", 10), false);
});

test('isPolydivisible("123220", 6) returns true', () => {
  assertEquals(isPolydivisible("123220", 6), true);
});

test('isPolydivisible single digit is always true', () => {
  assertEquals(isPolydivisible("0", 10), true);
  assertEquals(isPolydivisible("5", 10), true);
  assertEquals(isPolydivisible("9", 10), true);
});

test('isPolydivisible with base 16', () => {
  assertEquals(isPolydivisible("1", 16), true);
  assertEquals(isPolydivisible("12", 16), true);
});

// Test getPolydivisible function
console.log('\nGetPolydivisible Tests:');
test('getPolydivisible(0, 10) returns "0" (special case)', () => {
  assertEquals(getPolydivisible(0, 10), "0");
});

test('getPolydivisible(1, 10) returns "0" (first polydivisible number)', () => {
  assertEquals(getPolydivisible(1, 10), "0");
});

test('getPolydivisible(22, 10) returns "32"', () => {
  assertEquals(getPolydivisible(22, 10), "32");
});

test('getPolydivisible(22, 16) returns "1A"', () => {
  assertEquals(getPolydivisible(22, 16), "1A");
});

test('getPolydivisible(42, 16) returns "42"', () => {
  assertEquals(getPolydivisible(42, 16), "42");
});

test('First few polydivisible numbers in base 10 (1-indexed)', () => {
  assertEquals(getPolydivisible(1, 10), "0");
  assertEquals(getPolydivisible(2, 10), "1");
  assertEquals(getPolydivisible(3, 10), "2");
  assertEquals(getPolydivisible(4, 10), "3");
  assertEquals(getPolydivisible(5, 10), "4");
  assertEquals(getPolydivisible(6, 10), "5");
  assertEquals(getPolydivisible(7, 10), "6");
  assertEquals(getPolydivisible(8, 10), "7");
  assertEquals(getPolydivisible(9, 10), "8");
  assertEquals(getPolydivisible(10, 10), "9");
  assertEquals(getPolydivisible(11, 10), "10");
});

console.log('\n' + (process.exitCode === 1 ? 'Some tests failed!' : 'All tests passed!'));
