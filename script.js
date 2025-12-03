class Node {
    constructor(value = null, next = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0; 
    }

    append(value) {
        const newNode = new Node(value)

        if (!this.head) {
            this.head = newNode; 
        }
        else {
            let currentNode = this.head;
            while (currentNode.next) {
                currentNode = currentNode.next;
            }
            currentNode.next = newNode; 
        }
        this.size++; 
    }

    prepend(value) {
        const newNode = new Node(value)
        newNode.next = this.head; 
        this.head = newNode; 
        this.size++; 
    }

    getSize() {

        return this.size; 
    }
    
    getHead() {

        if (this.head == null) {
            return null;
        }

        return this.head; 
    }

    getTail() {
        if (this.head === null) {
            return null;
        }

        let currentNode = this.head; 
        while (currentNode.next) {
            currentNode = currentNode.next; 
        }
        return currentNode;  
    }

    at(index) {
        if (index < 0 || index >= this.size) {
            return null;
        }

        let currentNode = this.head; 
        for (let i = 0; i < index; i++) {
            currentNode = currentNode.next; 
        }
        return currentNode; 
    }

    pop() {
        if (this.head === null) {
            return null;
        }

        let currentNode = this.head; 
        let previousNode = null;

        while (currentNode.next) {
            previousNode = currentNode; 
            currentNode = currentNode.next; 
        }

        previousNode.next = null; 
        this.size--; 
        return currentNode; 
    }

    contains(value) {
        let currentNode = this.head; 
        while(currentNode) {
            if (currentNode.value === value) {
                return true; 
            }
            currentNode = currentNode.next; 
        }
        return false; 
    }

    find(value) {
        let currentNode = this.head; 
        let index = 0;
        while(currentNode) {
            if (currentNode.value === value) {
                return index;
            }
            currentNode = currentNode.next; 
            index++; 
        }
        return null;  
    }

    toString() {
        let currentNode = this.head; 
        let listString = ``;
        while (currentNode) {
            listString += `( ${currentNode.value} ) -> `;
            currentNode = currentNode.next; 
        }
        listString += `null`;
        return listString; 
    }

    insertAt(value, index) {
        if (index < 0 || index >= this.size) {
            return;
        }

        const newNode = new Node(value);

        if (index === 0) {
            newNode.next = this.head;
            this.head = newNode; 
        }
        else {
            let currentNode = this.head;
            let nodeCount = 0;
            while (nodeCount < index - 1) {
                currentNode = currentNode.next;
                nodeCount++; 
            }
            newNode.next = currentNode.next;
            currentNode.next = newNode; 
        }
        this.size++; 
    }

    removeAt(index) {
        if (index < 0 || index >= this.size) {
            return;
        }
        let removedNode; 
        if (index === 0) {
            removedNode = this.head; 
            this.head = this.head.next; 
        } 
        else {
            let previousNode = null;
            let currentNode = this.head; 
            let nodeCount = 0;

            while (nodeCount < index) {
                previousNode = currentNode; 
                currentNode = currentNode.next; 
                nodeCount++;
            }
            removedNode = currentNode; 
            previousNode.next = currentNode.next; 
        } 
        this.size--;
        return removedNode; 
    } 
}

class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.defaultCapacity = 16; 
    this.capacity = this.defaultCapacity; 
    this.threshold = this.loadFactor * this.capacity; 
    this.buckets = new Array(this.capacity); 
    this.fullBuckets = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = ((primeNumber * hashCode) + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  } 

  set(key, value) { 
    let index = this.hash(key);

    if (!this.buckets[index]) {
      this.buckets[index] = new LinkedList(); 
      this.buckets[index].append([`${key}`,`${value}`]); 
      this.fullBuckets++; 
      this.growMap();
    }
    else {
      for (let i = 0; i < this.buckets[index].getSize(); i++) {
        if (this.buckets[index].at(i).value[0] === `${key}`) {
            this.buckets[index].at(i).value[1] = `${value}`;
            this.growMap(); 
            return;
        }
      }
        this.buckets[index].append([`${key}`,`${value}`]);
        this.growMap(); 
    }
  }

  growMap() {
    if (this.getLength() > this.threshold) {

      let temp = this.getEntries();
      this.capacity *= 2;  
      this.threshold = this.loadFactor * this.capacity; 
      this.buckets = new Array(this.capacity); 

      for (let i = 0; i < temp.length; i++) {
        this.set(temp[i][0],temp[i][1]); 
      }
    }
  }

  get(key) {
    let index = this.hash(key);

    for (let i = 0; this.buckets[index].getSize(); i++) {
        if (this.buckets[index].at(i).value[0] === `${key}`) {
            return this.buckets[index].at(i).value[1]; 
        }
    }
    return null; 
  }

  has(key) {    
    let index = this.hash(key);

    for (let i = 0; this.buckets[index].getSize(); i++) {
        if (this.buckets[index].at(i).value[0] === `${key}`) {
            return true;
        }
    }
    return false; 
}

  remove(key) {
    let index = this.hash(key); 
    for (let i = 0; this.buckets[index].getSize(); i++) {
      if (this.buckets[index].at(i).value[0] === `${key}`) {
        this.buckets[index].removeAt(i);
        return true;
      }
    }
    return false; 
  }

  getLength() {
    let len = 0;
    for (let i = 0; i < this.capacity; i++) {
        if (this.buckets[i]) {
            len += this.buckets[i].getSize(); 
        }
    }
    return len;
  }

  clear() {
    this.fullBuckets = 0;
    this.capacity = this.defaultCapacity; 
    this.threshold = this.loadFactor * this.capacity;
    this.buckets = new Array(this.capacity); 
  }

  getKeys() {
    let keysArr = [];

    for (let i = 0; i < this.capacity; i++) {
        if (this.buckets[i]) {
            for (let j = 0; j < this.buckets[i].getSize(); j++) {
                keysArr.push(this.buckets[i].at(j).value[0]);
            }
        }
    }
    return keysArr; 
  }

  getValues() {
    let valuesArr = [];

    for (let i = 0; i < this.capacity; i++) {
        if (this.buckets[i]) {
            for (let j = 0; j < this.buckets[i].getSize(); j++) {
                valuesArr.push(this.buckets[i].at(j).value[1]);
            }
        }
    }
    return valuesArr; 
  }

  getEntries() {
    let entriesArr = [];

    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i]) {
        for (let j = 0; j < this.buckets[i].getSize(); j++) {
                entriesArr.push([`${this.buckets[i].at(j).value[0]}`,`${this.buckets[i].at(j).value[1]}`] );
            }
        }
    }
    return entriesArr; 
  }
}

const test = new HashMap(); 
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'meme');
test.set('moon', 'silver'); 
test.set('lion', 'omg'); 

console.log(test);
console.log(test.getKeys());
console.log(test.getValues());
console.log(test.getEntries()); 

for (let i = 0; i < test.buckets.length; i++) {
    console.log(`Index ${i} of test = ${test.buckets[i]}`); 
}