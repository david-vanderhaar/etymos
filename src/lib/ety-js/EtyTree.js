import TreeModel from 'tree-model'
import Word from './Word';

class EtyTree {
  constructor(word) {
    if (!(word instanceof Word)) {
      throw new TypeError("word must be an instance of 'Word'");
    }
    this.sourceWord = word;

    const tree = new TreeModel();
    this.root = tree.parse({
      id: word._id,
      name: word.pretty,
      data: word.toJSON(),
      children: []
    });

    if (this.sourceWord.origins().length > 0) {
      this.addChildren(this.root, this.sourceWord);
    }
  }

  addChildren(parentNode, parentWord) {
    parentWord.origins().forEach(origin => {
      const childNode = new TreeModel().parse({
        id: origin._id,
        name: origin.pretty,
        data: origin.toJSON(),
        children: []
      });

      // Check if the node already exists (avoiding duplicates)
      if (!parentNode.children.some(child => child.model.id === origin._id)) {
        const childTreeNode = parentNode.addChild(childNode);
        this.addChildren(childTreeNode, origin);
      }
    });
  }

  toString() {
    // Custom string representation of the tree
    const printNode = (node, depth = 0) => {
      let result = '  '.repeat(depth) + node.model.name + '\n';
      node.children.forEach(child => {
        result += printNode(child, depth + 1);
      });
      return result;
    };

    return this.root ? printNode(this.root).trim() : '';
  }

  toJSON() {
    return this.root.model;  // Returns the root model as JSON
  }

  isEmpty() {
    return this.sourceWord.origins().length === 0;
  }

  [Symbol.for('nodejs.util.inspect.custom')]() {
    return `EtyTree(word='${this.sourceWord.word}')`;
  }
}

export default EtyTree;
