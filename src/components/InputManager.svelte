<script>
import { GlobalEventBus } from "../lib/events";

const currentKeys = new Set() 

const keyComboToEvent = [
  // alt: for window keyboard
  {
    keys: new Set(['alt', '1']),
    events: ['activate_noun_editor']
  },
  {
    keys: new Set(['alt', '2']),
    events: ['activate_quill_editor']
  },
  // ctrl: for mac keyboard
  {
    keys: new Set(['control', '1']),
    events: ['activate_noun_editor']
  },
  {
    keys: new Set(['control', '2']),
    events: ['activate_quill_editor']
  },
]

function handleKeyDown(event) {
  // log key down
  currentKeys.add(event.key.toLowerCase())

  // find events based on key presses
  const appEvents = keyComboToEvent.find(({keys}) => {
    return keys.difference(currentKeys).size === 0
  })?.events || []
  

  // dispatch events
  appEvents.forEach((appEvent) => GlobalEventBus.emit(appEvent))
}

function handleKeyUp(event) {
  currentKeys.delete(event.key.toLowerCase())
}
</script>

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />