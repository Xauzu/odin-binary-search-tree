module.exports = class TreeNode {
    constructor(val, leftNode, rightNode) {
        this._value = val || null;
        this._leftNode = leftNode || null;
        this._rightNode = rightNode || null;
    }

    get value() { return this._value; }
    set value(val) { this._value = val; }

    get left() { return this._leftNode; }
    set left(node) { this._leftNode = node; }

    get right() { return this._rightNode; }
    set right(node) { this._rightNode = node; }
}