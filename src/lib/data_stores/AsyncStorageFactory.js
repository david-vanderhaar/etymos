import localforage from 'localforage'
import { uuid as uuidv1 } from "$lib/helper";
const STORE_NAME = 'etymos_web_store'

localforage.config({
  driver: [
    localforage.INDEXEDDB,
    localforage.WEBSQL,
    localforage.LOCALSTORAGE,
  ],
  name: STORE_NAME,
});

const withUuid = (json, uuid) => {
  json['uuid'] = uuid || uuidv1()
  return json
}

export const AsyncStorageFactory = (storageKey) => {
  const save = async (json) => {
    try {
      await localforage.setItem(storageKey, JSON.stringify(json))
      return true
    } catch (error) {
      if (catchQuotaExceededError(error)) {
        return false
      } else {
        throw error
      }
    }
  }

  const fetch = async () => {
    try {
      const data = await localforage.getItem(storageKey)
      return JSON.parse(data)
    } catch (error) {
      return null
    }
  }

  const saveItem = async (name, existingUuid, itemData) => {
    const newItem = {...withUuid(itemData, existingUuid), name, timestamp: Date.now()}
    const previousItems = await fetchAllItems()
    const filtered = previousItems.filter(({uuid}) => uuid !== existingUuid)

    const items = [...filtered, newItem]
    return save(items)
  }

  const deleteItem = async (uuid) => {
    const previousItems = await fetchAllItems()
    const items = previousItems.filter((item) => item.uuid !== uuid)
    return save(items)
  }
  
  const fetchItem = async (uuid) => {
    const items = await fetchAllItems()
    const item = items.find((item) => item.uuid === uuid)
    return item || null
  }
  
  const fetchAllItemNames = async () => {
    const items = await fetchAllItems()
    return items.map((item) => item.name)
  }
  
  const fetchAllItems = async () => {
    const items = await fetch() || []
    return items
  }

  const fetchLatestItem = async () => {
    const items = await fetch() || []
    const sorted = items.filter((item) => item.hasOwnProperty('timestamp')).sort((a, b) => b?.timestamp - a?.timestamp)
    return sorted[0] || null
  }


  return () => ({
    saveItem,
    deleteItem,
    fetchItem,
    fetchAllItemNames,
    fetchAllItems,
    fetchLatestItem,
  })
}

const quotaExceededErrorMessage = 'Session data exceeds this browsers capicty. Try removing some sounds.'
const catchQuotaExceededError = (error) => {
  const search = 'exceeded the quota'
  if (error.message.search(search) > -1) {
    Toaster.error(quotaExceededErrorMessage)
    return true
  }

  return false
}

