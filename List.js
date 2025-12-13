class List {
  constructor(head, tail) {
    this.head = head;
    this.tail = tail;
  }

  static empty() {
    return new List(null, null);
  }

  isEmpty() {
    return this.head === null && this.tail === null;
  }

  // Fixing stack overflow issue by using an iterative approach or trampling/thunks if necessary.
  // Here, we'll use a standard iterative reconstruction for safety in JS.
  concat(other) {
    if (this.isEmpty()) return other;
    if (other.isEmpty()) return this;

    // To avoid stack overflow on deep recursion, we can collect elements first
    // or use an iterative approach to build the new list.
    // However, since this is an immutable list, we typically rebuild the first list
    // pointing to the second.
    
    // Stack-safe implementation:
    // 1. Reverse the current list into a temporary structure (or array)
    // 2. Iteratively build the new list starting from 'other' and prepending 
    //    elements from the reversed current list.
    
    let acc = other;
    let temp = [];
    let current = this;
    
    // Collect elements of 'this' list
    while (!current.isEmpty()) {
      temp.push(current.head);
      current = current.tail;
    }
    
    // Rebuild backwards
    for (let i = temp.length - 1; i >= 0; i--) {
      acc = new List(temp[i], acc);
    }
    
    return acc;
  }

  // Helper to visualize the list
  toArray() {
    let arr = [];
    let current = this;
    while (!current.isEmpty()) {
      arr.push(current.head);
      current = current.tail;
    }
    return arr;
  }
}

module.exports = List;
