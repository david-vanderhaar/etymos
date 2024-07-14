<script>
import { createEventDispatcher } from "svelte"

const currentKeys = new Set() 
const dispatch = createEventDispatcher() 

const keyComboToEvent = [
  {
    keys: new Set(['alt', '1']),
    events: ['activate_passage_editor']
  },
  {
    keys: new Set(['alt', '2']),
    events: ['activate_passage_display']
  },
]

function handleKeyDown(event) {
  console.log(event);
  // log key down
  currentKeys.add(event.key.toLowerCase())

  // find events based on key presses
  const appEvents = keyComboToEvent.find(({keys}) => {
    return keys.difference(currentKeys).size === 0
  })?.events || []
  
  // dispatch events
  appEvents.forEach((appEvent) => dispatch(appEvent))
}

function handleKeyUp(event) {
  currentKeys.delete(event.key.toLowerCase())
}
</script>

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />