// datamuse.words({rel_syn: noun})

export default {
  words: async (params) => {
    const response = await fetch(`https://api.datamuse.com/words?${new URLSearchParams(params)}`);
    const data = await response.json();

    return data;
  }
};