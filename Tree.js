const Node = require('./TreeNode.js');

module.exports = class Tree {
    constructor(arr) {
        this._arr = this.#sortAndRemoveDuplicates(arr) || null;
        this._root = this.buildTree(this._arr);
    }

    get root() { return this._root}

    #sortAndRemoveDuplicates(arr) {
        let results = [];
        for (let i = 0; i < arr.length; i++)
            if (!results.includes(arr[i]))
                results.push(arr[i]);
        return results.sort((a, b) => a - b);;
    }
    buildTree(data) {
        if (data.length === 0) return null;
        if (data.length === 1) return new Node(data[0]);

        let start = 0;
        let end = data.length - 1;
        let mid = Math.floor((start + end) / 2);

        const root = new Node(data[mid]);


        root.left = this.buildTree(data.slice(0, mid));
        root.right = this.buildTree(data.slice(mid+1));

        return root;
    }
    find(val) {
        let currentNode = this._root;
        while (currentNode !== null) {
            if (val === currentNode.value) break;

            if (val < currentNode.value) 
                currentNode = currentNode.left;
            else 
                currentNode = currentNode.right;
        }
        return currentNode;
    }
    insert(val) {
        let currentNode = this._root;
        while (currentNode !== null) {
            if (val === currentNode.value) return null;

            else if (val < currentNode.value) {
                if (currentNode.left === null) {
                    currentNode.left = new Node(val);
                    return currentNode.left;
                }
                currentNode = currentNode.left;
            }
            else {
                if (currentNode.right === null) {
                    currentNode.right = new Node(val);
                    return currentNode.right;
                }
                currentNode = currentNode.right;
            }
        }
        return currentNode;
    }
}