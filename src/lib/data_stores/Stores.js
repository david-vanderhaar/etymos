import { createPersistentStore } from './PersistentStore'

export const translationStore = createPersistentStore('translations', [])
export const apiResponseStore = createPersistentStore('apiResponse', [])
