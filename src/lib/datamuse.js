import { apiResponseStore } from "./data_stores/Stores";

export default {
  words: async (params) => {
    const url = `https://api.datamuse.com/words?${new URLSearchParams(params)}`;
    const previousRespone = apiResponseStore.findMatchingItemByKey({key: 'url', value: url})?.response;
    if (previousRespone) {
      console.log('returning from cache', url);
      return previousRespone;
    }

    console.log('fetching', url);
    const response = await fetch(url);
    const data = await response.json();
    apiResponseStore.add({url, response: data});

    return data;
  }
};