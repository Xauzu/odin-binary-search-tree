module.exports = class Queue {
    constructor(arr) {
        this._arr = arr;
    }

    get length() {
        return this._arr.length;
    }

    dequeue() {
        if (this._arr.length > 0) {
            const item = this._arr.splice(0, 1);
            console.log(item, this._arr);
            return item;
        }
        else
            throw new Error('Empty array');
    }

    enqueue(item) {
        this._arr = [...this._arr, item];
        return this._arr;
    }
}