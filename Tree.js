const Node = require('./TreeNode.js');

module.exports = class Tree {
    constructor(arr) {
        this._arr = arr || null;
        this._root = this.buildTree(arr);
    }

    #sortAndRemoveDuplicates(arr) {
        let results = [];
        for (let i = 0; i < arr.length; i++)
            if (!results.includes(arr[i]))
                results.push(arr[i]);
        return results.sort((a, b) => a - b);;
    }
    buildTree(data) {
        const processed = this.#sortAndRemoveDuplicates(data);
        const rootNode = new Node();
    }
}