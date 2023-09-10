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
}