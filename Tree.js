const Node = require('./TreeNode.js');
const Queue = require('./Queue.js');

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
            let dir = '';

            if (val === currentNode.value) return null;

            else if (val < currentNode.value) {
                dir = 'left';
            }
            else {
                dir = 'right';
            }

            if (currentNode[dir] === null) {
                currentNode[dir] = new Node(val);
                return currentNode[dir];
            }
            currentNode = currentNode[dir];
        }
        return currentNode;
    }
    delete(val) {
        let prevNode = null;
        let dir = '';
        let currentNode = this._root;
        while (currentNode !== null) {
            if (val === currentNode.value) {
                // No child
                if (currentNode.left === null && currentNode.right === null) {
                    prevNode[dir] = null;
                }
                // Two child
                else if (currentNode.left !== null && currentNode.right !== null) {
                    let prev = currentNode;
                    let current = currentNode.right;
                    while (current.left !== null) {
                        prev = current;
                        current = current.left;
                    }

                    // Move node if there is right child
                    if (prev !== currentNode)
                        prev.left = current.right;
                    else
                        prev.right = current.right;

                    currentNode.value = current.value;    
                }
                // One child
                else {
                    let child;
                    if (currentNode.left !== null)
                        child = currentNode.left;
                    else
                        child = currentNode.right;

                    prevNode[dir] = child;
                }
            }
            else if (val < currentNode.value) {
                dir = 'left';
            }
            else {
                dir = 'right';
            }

            prevNode = currentNode;
            currentNode = currentNode[dir];
        }
        return currentNode;
    }
    levelOrder(func) {
        const q = new Queue();
        q.enqueue(this._root);

        const arr = []
        while (q.length > 0) {
            const current = q.dequeue();

            arr.push(current.value);

            if (func) 
                func(current);

            if (current.left) {
                q.enqueue(current.left);
            }

            if (current.right) {
                q.enqueue(current.right);
            }
        }

        if (!func)
            return arr;
    }
    levelOrderRecur(func, q, arr) {
        if (!q) {
            q = new Queue();
            q.enqueue(this._root);
            arr = [];
        }
        else if (q.length === 0) {
            if (!func)
                return arr;
            return;
        };
        
        const current = q.dequeue();

        arr.push(current.value);

        if (func) 
            func(current);

        if (current.left) {
            q.enqueue(current.left);
        }

        if (current.right) {
            q.enqueue(current.right);
        }

        return this.levelOrderRecur(func, q, arr);
    }
    preorder(func, node, arr) {
        if (node === null) return;
        if (node === undefined) {
            node = this._root;
            arr = []
        }

        if (func)
            func(node);
        arr.push(node.value);

        this.preorder(func, node.left, arr);
        this.preorder(func, node.right, arr);

        if (!func)
            return arr;
    }
    inorder(func, node, arr) {
        if (node === null) return;
        if (node === undefined) {
            node = this._root;
            arr = []
        }


        this.inorder(func, node.left, arr);

        if (func)
            func(node);
        arr.push(node.value);

        this.inorder(func, node.right, arr);

        if (!func)
            return arr;
    }
    postorder(func, node, arr) {
        if (node === null) return;
        if (node === undefined) {
            node = this._root;
            arr = []
        }


        this.postorder(func, node.left, arr);
        this.postorder(func, node.right, arr);

        if (func)
            func(node);
        arr.push(node.value);

        if (!func)
            return arr;
    }
}