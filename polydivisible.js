/**
 * Polydivisible Number Functions
 * 
 * Character sequence for bases up to 62:
 * 0-9 (0-9), A-Z (10-35), a-z (36-61)
 */

/**
 * Converts a single character to its decimal value in the given base
 * @param {string} char - The character to convert
 * @returns {number} The decimal value of the character
 */
function charToValue(char) {
  if (char >= '0' && char <= '9') {
    return char.charCodeAt(0) - '0'.charCodeAt(0);
  } else if (char >= 'A' && char <= 'Z') {
    return char.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
  } else if (char >= 'a' && char <= 'z') {
    return char.charCodeAt(0) - 'a'.charCodeAt(0) + 36;
  }
  throw new Error(`Invalid character: ${char}`);
}

/**
 * Converts a decimal value to its character representation
 * @param {number} value - The decimal value (0-61)
 * @returns {string} The character representation
 */
function valueToChar(value) {
  if (value >= 0 && value <= 9) {
    return String.fromCharCode('0'.charCodeAt(0) + value);
  } else if (value >= 10 && value <= 35) {
    return String.fromCharCode('A'.charCodeAt(0) + (value - 10));
  } else if (value >= 36 && value <= 61) {
    return String.fromCharCode('a'.charCodeAt(0) + (value - 36));
  }
  throw new Error(`Invalid value: ${value}`);
}

/**
 * Converts a string in the given base to decimal
 * @param {string} s - The string to convert
 * @param {number} b - The base of the string
 * @returns {number} The decimal representation
 */
function toDecimal(s, b) {
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    result = result * b + charToValue(s[i]);
  }
  return result;
}

/**
 * Converts a decimal number to a string in the given base
 * @param {number} num - The decimal number
 * @param {number} b - The target base
 * @returns {string} The string representation in the given base
 */
function fromDecimal(num, b) {
  if (num === 0) return '0';
  
  let result = '';
  while (num > 0) {
    result = valueToChar(num % b) + result;
    num = Math.floor(num / b);
  }
  return result;
}

/**
 * Checks if a number string in the given base is polydivisible
 * @param {string} s - The number string to check
 * @param {number} b - The base of the number
 * @returns {boolean} True if the number is polydivisible, false otherwise
 */
function isPolydivisible(s, b) {
  // For each position i (1-indexed), check if the first i digits are divisible by i
  for (let i = 1; i <= s.length; i++) {
    const substring = s.substring(0, i);
    const decimalValue = toDecimal(substring, b);
    if (decimalValue % i !== 0) {
      return false;
    }
  }
  return true;
}

/**
 * Gets the nth polydivisible number in the given base
 * @param {number} n - The index of the polydivisible number
 * @param {number} b - The base
 * @returns {string} The nth polydivisible number as a string
 * Note: Based on examples, this appears to use 1-based indexing where n=1 returns "0"
 */
function getPolydivisible(n, b) {
  // Handle special case for n=0 (return the first polydivisible number)
  if (n === 0) return '0';
  
  // Convert to 0-indexed for internal processing (n=1 -> index 0)
  const index = n - 1;
  const allPolydivisible = [];
  
  // Use BFS to generate polydivisible numbers level by level
  let currentLevel = [];
  
  // Level 0: single digits
  for (let digit = 0; digit < b; digit++) {
    currentLevel.push(valueToChar(digit));
  }
  
  // Process each level
  while (allPolydivisible.length <= index) {
    const nextLevel = [];
    
    for (const num of currentLevel) {
      // Add to results
      allPolydivisible.push(num);
      
      // If we have enough, stop early
      if (allPolydivisible.length > index) break;
      
      // Don't extend "0" as it would create numbers with leading zeros
      if (num === '0') continue;
      
      // Try extending this number with each digit
      for (let digit = 0; digit < b; digit++) {
        const extended = num + valueToChar(digit);
        
        // Check if this extended number is polydivisible
        // We only need to check the last condition since all prefixes are already valid
        const len = extended.length;
        const decimalValue = toDecimal(extended, b);
        
        if (decimalValue % len === 0) {
          nextLevel.push(extended);
        }
      }
    }
    
    currentLevel = nextLevel;
    
    // If no more numbers can be generated, break
    if (currentLevel.length === 0) break;
  }
  
  // If we couldn't generate enough polydivisible numbers, return empty string
  // This shouldn't happen in practice for reasonable values of n
  return allPolydivisible[index] || '';
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    isPolydivisible,
    getPolydivisible,
    charToValue,
    valueToChar,
    toDecimal,
    fromDecimal
  };
}
