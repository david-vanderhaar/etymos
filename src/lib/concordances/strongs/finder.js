import { STRONGS_DICTIONARY } from './strongs-hebrew-dictionary.js'

export function findReplacements(properNoun) {
  if (!properNoun) return null;
  if (properNoun.length < 3) return null;

  // You can use an API here to fetch suggestions based on the proper noun.
  // For simplicity, I'll provide a local example.
  const replacements = {
    "David": {
      word: properNoun,
      replacements: ["The beloved", "King of Israel", "Beloved one"]
    }
  };
  return replacements[properNoun] || { word: properNoun, replacements: []}
  // return replacements[properNoun] || null
}

export function findReplacements_v2(properNoun) {
  if (!properNoun) null;
  if (properNoun.length < 3) return null;

  // Normalize the input proper noun (e.g., convert to lowercase and remove spaces)
  const normalizedProperNoun = properNoun.toLowerCase().replace(/\s/g, '');
  console.log(normalizedProperNoun);
  const suggestions = [];

  // Iterate through the Strong's Concordance data
  for (const strongsNumber in STRONGS_DICTIONARY) {
    const entry = STRONGS_DICTIONARY[strongsNumber];
    const strongsDef = entry.strongs_def?.toLowerCase();
    const normalizedStrongsDef = strongsDef === undefined ? '' : strongsDef;
    const kjvDef = entry.kjv_def?.toLowerCase();
    const normalizedKjvDef = kjvDef === undefined ? '' : kjvDef;

    // Check if the normalized proper noun is found in the strongs_def or kjv_def
    if (normalizedStrongsDef.includes(normalizedProperNoun)) {
      console.log(normalizedStrongsDef);
      suggestions.push(entry.strongsDef);
    }
    if (normalizedKjvDef.includes(normalizedProperNoun)) {
      suggestions.push(entry.kjv_def);
    }
  }

  return { word: properNoun, replacements: suggestions }
}

export function findReplacements_v3(properNoun) {
  if (!properNoun) null;
  if (properNoun.length < 3) return null;

  // Normalize the input proper noun (e.g., convert to lowercase and remove spaces)
  const normalizedProperNoun = properNoun.toLowerCase().replace(/\s/g, '');
  const suggestions = [];

  // Iterate through the Strong's Concordance data
  // for each entry, check if the normalized proper noun is found at the beginning of the strongs_def or kjv_def
  // if so, search the derivation field for a strongs number (H + any number of digits)
  // if found, search the dictionary for that strongs number
  // if found, add the strongs_def and kjv_def to the suggestions
  for (const strongsNumber in STRONGS_DICTIONARY) {
    const entry = STRONGS_DICTIONARY[strongsNumber];
    const strongsDef = entry.strongs_def?.toLowerCase();
    const normalizedStrongsDef = strongsDef === undefined ? '' : strongsDef;
    const kjvDef = entry.kjv_def?.toLowerCase();
    const normalizedKjvDef = kjvDef === undefined ? '' : kjvDef;
    // Check if the normalized proper noun is found at the beginning of the strongs_def or kjv_def
    if (normalizedStrongsDef.startsWith(normalizedProperNoun)) {
      suggestions.push(entry.strongs_def);
      suggestions.push(entry.kjv_def);
      // Search the derivation field for a strongs number (H + any number of digits)
      const derivationMatch = entry.derivation?.match(/H\d+/);
      if (derivationMatch) {
        const derivedNumber = derivationMatch[0];
        // Search the dictionary for that strongs number
        const derivedEntry = STRONGS_DICTIONARY[derivedNumber];
        if (derivedEntry) {
          suggestions.push(derivedEntry.strongs_def);
          suggestions.push(derivedEntry.kjv_def);
        }
      }
    }
    if (normalizedKjvDef.startsWith(normalizedProperNoun)) {
      suggestions.push(entry.strongs_def);
      suggestions.push(entry.kjv_def);
      // Search the derivation field for a strongs number (H + any number of digits)
      const derivationMatch = entry.derivation?.match(/H\d+/);
      if (derivationMatch) {
        const derivedNumber = derivationMatch[0];
        // Search the dictionary for that strongs number
        const derivedEntry = STRONGS_DICTIONARY[derivedNumber];
        if (derivedEntry) {
          suggestions.push(derivedEntry.strongs_def);
          suggestions.push(derivedEntry.kjv_def);
        }
      }
    }
  }

  // sanitize suggestions
  const uniqueSuggestions = [...new Set(suggestions)];
  // escape single quotes
  const escapedSuggestions = uniqueSuggestions.map((suggestion) => suggestion.replace(/'/g, "\\'"));

  // break suggestions into words by splitting on commas
  const words = escapedSuggestions.map((suggestion) => suggestion.split(","));
  return { word: properNoun, replacements: words.flat().map((word) => word.trim()) }
}

export function findReplacements_v4(properNoun) {
  if (!properNoun) null;
  if (properNoun.length < 3) return null;

  // Normalize the input proper noun (e.g., convert to lowercase and remove spaces)
  const normalizedProperNoun = properNoun.toLowerCase().replace(/\s/g, '');
  let suggestions = [];

  // Iterate through the Strong's Concordance data
  // for each entry, check if the normalized proper noun is found in the comma separated list of terms/phrase in strongs_def or kjv_def
  // if so, RECURSIVLY search the derivation field for a strongs number (H + any number of digits)
  // if found, search the dictionary for that strongs number
  // if found, add the strongs_def and kjv_def to the suggestions
  for (const strongsNumber in STRONGS_DICTIONARY) {
    const entry = STRONGS_DICTIONARY[strongsNumber];
    const strongsDef = entry.strongs_def?.toLowerCase();
    const normalizedStrongsDef = strongsDef === undefined ? '' : strongsDef;
    const kjvDef = entry.kjv_def?.toLowerCase();
    const normalizedKjvDef = kjvDef === undefined ? '' : kjvDef;
    // Check if the normalized proper noun is found at the beginning of the strongs_def or kjv_def
    if (normalizedStrongsDef.includes(normalizedProperNoun) || normalizedKjvDef.includes(normalizedProperNoun)) {
      suggestions = suggestions.concat(get_suggestions_from_entry_number_derivations(strongsNumber))
    }
  }

  // sanitize suggestions
  const uniqueSuggestions = [...new Set(suggestions)];
  // escape single quotes
  const escapedSuggestions = uniqueSuggestions.map((suggestion) => suggestion.replace(/'/g, "\\'"));

  // break suggestions into words by splitting on commas
  const words = escapedSuggestions.map((suggestion) => suggestion.split(","));
  return { word: properNoun, replacements: words.flat().map((word) => word.trim()) }
}


function get_suggestions_from_entry_number_derivations(entryNumber, entriesSeen = [], suggestions = [], recursive = true) {
  const entry = STRONGS_DICTIONARY[entryNumber];
  const strongsDef = entry.strongs_def?.toLowerCase();
  const normalizedStrongsDef = strongsDef || '';
  const kjvDef = entry.kjv_def?.toLowerCase();
  const normalizedKjvDef = kjvDef || '';
  const normalizedXlit = entry.xlit?.toLowerCase() || ''
  suggestions.push(normalizedStrongsDef);
  suggestions.push(normalizedKjvDef);
  suggestions.push(normalizedXlit)

  if (!recursive) return suggestions;
  console.log(entriesSeen);
  if (entriesSeen.includes(entryNumber)) return suggestions;
  entriesSeen.push(entryNumber)
  // Search the derivation field for a strongs number (H + any number of digits)
  const derivationMatch = entry.derivation?.match(/H\d+/);
  if (derivationMatch) {
    const derivedNumber = derivationMatch[0];
    // Search the dictionary for that strongs number
    const derivedEntry = STRONGS_DICTIONARY[derivedNumber];
    if (derivedEntry) {
      // suggestions.push(derivedEntry.strongs_def);
      // suggestions.push(derivedEntry.kjv_def);
      return get_suggestions_from_entry_number_derivations(derivedNumber, entriesSeen, suggestions)
    }
  }

  return suggestions
}