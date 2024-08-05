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
  {
    keys: new Set(['escape']),
    events: ['escape'],
  },
  {
    keys: new Set(['alt', 'z']),
    events: ['remove_translation'],
  },
  {
    keys: new Set(['alt', 'shift', '!']),
    events: ['copy_noun_editor']
  },
  {
    keys: new Set(['alt', 'shift', '@']),
    events: ['copy_quill_editor']
  },
  // noun transform tools
  ...Array(9).fill('').map((_, index) => {
    return {
      keys: new Set([`${index + 1}`]),
      events: [`activate_tool_${index}`],
    }
  })
]

function handleKeyDown(event) {
  console.log(event.key);
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