module.exports = class TreeNode {
    constructor(val, leftNode, rightNode) {
        this._value = val || null;
        this._leftNode = leftNode || null;
        this._rightNode = rightNode || null;
    }
}