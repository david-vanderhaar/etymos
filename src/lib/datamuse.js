import { apiResponseStore } from "./data_stores/Stores";
import { cacheFetch } from "./helper";

export default {
  words: async (params) => {
    const url = `https://api.datamuse.com/words?${new URLSearchParams(params)}`;
    
    return await cacheFetch(url, apiResponseStore);
  }
};