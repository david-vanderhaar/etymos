import Word from './Word'
import EtyTree from './EtyTree'
import {random} from './util';
import Data from './data/index';

function getSourceWord(word, language, color = false) {
  if (word instanceof Word) {
      return word;
  }
  return new Word(word, language, color);
}

function origins(word, language = "eng", recursive = false, color = false) {
  const sourceWord = getSourceWord(word, language, color);
  return sourceWord.origins(recursive);
}

function tree(word, language = "eng", color = false) {
  const sourceWord = getSourceWord(word, language, color);
  return new EtyTree(sourceWord);
}

function randomWord(language = "eng") {
  const w = random(Object.keys(Data[language]));
  return new Word(w, language);
}

export default {
  origins,
  tree,
  randomWord,
}