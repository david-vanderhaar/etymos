import iso_639_2_codes from './data/iso-639-2.json';
import iso_639_3_codes from './data/iso-639-3.json';

class Language {
  constructor(iso) {
    this.iso = iso;

    if (iso_639_3_codes[iso]) {
      this.name = iso_639_3_codes[iso];
    } else if (iso_639_2_codes[iso]) {
      this.name = iso_639_2_codes[iso];
    } else {
      throw new Error(`Language with iso code '${iso}' unknown`);
    }
  }

  toString() {
    return this.name;
  }

  equals(other) {
    return this.iso === other.iso && this.name === other.name;
  }

  toJSON() {
    return {
      iso: this.iso,
      name: this.name,
    };
  }

  [Symbol.for('nodejs.util.inspect.custom')]() {
    return `Language(iso=${this.iso})`;
  }
}

export default Language;
