import etymwn_data from './data/etymologies.json';
import Language from './Language';
import EtyTree from './EtyTree';

class Word {
  constructor(word, language = 'eng', color = false) {
    if (typeof word !== 'string') {
      throw new TypeError('word must be a string');
    }
    this._word = word;

    if (language instanceof Language) {
      this._language = language;
    } else {
      this._language = new Language(language);
    }

    this.color = Boolean(color);

    this._origins = { direct: [], recursive: [] };
    this._id = `${this.word}:${this.language.iso}`;
  }

  origins(recursive = false) {
    const search = recursive ? 'recursive' : 'direct';

    if (!etymwn_data[this.language.iso] || !etymwn_data[this.language.iso][this.word]) {
      // There are no roots for this word
      return [];
    }

    const roots = etymwn_data[this.language.iso][this.word].map(root =>
      Object.entries(root).map(([word, lang]) => new Word(word, lang))
    ).flat();

    const tracked = [...roots];

    if (recursive) {
      for (const root of tracked) {
        for (const child of root.origins()) {
          if (!tracked.includes(child) && child !== this) {
            tracked.push(child);
          }
        }
      }
    }

    this._origins[search] = tracked;
    return this._origins[search];
  }

  tree() {
    return new EtyTree(this);
  }

  get word() {
    return this._word;
  }

  get language() {
    return this._language;
  }

  get pretty() {
    const word = this.color ? this.word.toUpperCase() : this.word;
    return `${word} (${this.language.name})`;
  }

  compare(other) {
    if (other instanceof Word) {
      return this.pretty < other.pretty;
    }
    return this.pretty < other;
  }

  equals(other) {
    if (other instanceof Word) {
      return this._id === other._id;
    }
    return this.pretty === other;
  }

  toString() {
    return this.pretty;
  }

  toJSON() {
    return {
      id: this._id,
      word: this.word,
      language: this.language.toJSON() // Assuming Language class has a toJSON method
    };
  }

  valueOf() {
    return this.word.length;
  }
}

export default Word;
