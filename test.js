const Tree = require('./Tree.js');
const Queue = require('./Queue.js');

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

function randInts(count) {
    const arr = []
    for (let i = 0; i < count; i++)
        arr.push(Math.floor(Math.random() * 100));
    return arr;
}

function test() {
    const arr = randInts(30);

    const bst = new Tree(arr);
    console.log('Is balanced?', bst.isBalanced());
    console.log('pre', bst.preorder());
    console.log('post', bst.postorder());
    console.log('in', bst.inorder());
    console.log('---');
    prettyPrint(bst.root);

    console.log('');
    for (let i = 20; i < 40; i++)
        bst.insert(i);

    prettyPrint(bst.root);
    console.log('Is balanced?', bst.isBalanced());

    console.log('rebalancing...');
    bst.rebalance();

    console.log('Is balanced?', bst.isBalanced());
    prettyPrint(bst.root);
    console.log('---');
    console.log('pre', bst.preorder());
    console.log('post', bst.postorder());
    console.log('in', bst.inorder());
}

test();
