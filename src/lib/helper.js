export function uuid() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function cacheFetch(url, store) {
  const previousResponse = store.findMatchingItemByKey({key: 'url', value: url})?.response;
  if (previousResponse) {
    console.log('returning from cache', url);
    return previousResponse;
  }

  console.log('fetching', url);
  const response = await fetch(url);
  const data = await response.json();
  store.add({url, response: data});

  return data;
}
