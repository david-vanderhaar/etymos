<script>
import { GlobalEventBus } from "../lib/events";

const currentKeys = new Set() 

const keyComboToEvent = [
  // alt: for window keyboard
  {
    keys: new Set(['AltLeft', 'Digit1']),
    events: ['activate_noun_editor']
  },
  {
    keys: new Set(['AltLeft', 'Digit2']),
    events: ['activate_quill_editor']
  },
  {
    keys: new Set(['AltRight', 'Digit1']),
    events: ['activate_noun_editor']
  },
  {
    keys: new Set(['AltRight', 'Digit2']),
    events: ['activate_quill_editor']
  },
  {
    keys: new Set(['AltLeft', 'KeyZ']),
    events: ['remove_translation'],
  },
  {
    keys: new Set(['AltLeft', 'KeyQ']),
    events: ['copy_noun_editor']
  },
  {
    keys: new Set(['AltLeft', 'KeyE']),
    events: ['copy_quill_editor']
  },
  // ctrl: for mac keyboard
  {
    keys: new Set(['ControlRight', 'Digit1']),
    events: ['activate_noun_editor']
  },
  {
    keys: new Set(['ControlRight', 'Digit2']),
    events: ['activate_quill_editor']
  },
  {
    keys: new Set(['ControlLeft', 'Digit1']),
    events: ['activate_noun_editor']
  },
  {
    keys: new Set(['ControlLeft', 'Digit2']),
    events: ['activate_quill_editor']
  },
  {
    keys: new Set(['ControlLeft', 'KeyZ']),
    events: ['remove_translation'],
  },
  {
    keys: new Set(['ControlLeft', 'KeyQ']),
    events: ['copy_noun_editor']
  },
  {
    keys: new Set(['ControlLeft', 'KeyW']),
    events: ['copy_quill_editor']
  },
  {
    keys: new Set(['ControlRight', 'KeyZ']),
    events: ['remove_translation'],
  },
  {
    keys: new Set(['ControlRight', 'KeyQ']),
    events: ['copy_noun_editor']
  },
  {
    keys: new Set(['ControlRight', 'KeyW']),
    events: ['copy_quill_editor']
  },
  // end mac
  {
    keys: new Set(['Escape']),
    events: ['escape'],
  },
  // noun transform tools
  ...Array(9).fill('').map((_, index) => {
    return {
      keys: new Set([`Digit${index + 1}`]),
      events: [`activate_tool_${index}`],
    }
  })
]

function handleKeyDown(event) {
  // console.log(event.code, ' ', event.key);

  // prevent default on Space key if it's not in the editor
  if (event.code === 'Space' && !event.target.isContentEditable) {
    event.preventDefault()
  }

  // prevent ctrl + number from changing browser tabs
  if (event.ctrlKey && event.key.match(/[0-9]/)) {
    event.preventDefault()
  }

  // prevent meta + number from changing browser tabs
  if (event.metaKey && event.key.match(/[0-9]/)) {
    event.preventDefault()
  }

  // log key down
  currentKeys.add(event.code)

  // find events based on key presses
  const appEvents = keyComboToEvent.find(({keys}) => {
    return keys.difference(currentKeys).size === 0
  })?.events || []

  // dispatch events
  appEvents.forEach((appEvent) => GlobalEventBus.emit(appEvent))

  // console.log(currentKeys)
  // console.log(appEvents);
}

function handleKeyUp(event) {
  currentKeys.delete(event.code)
}
</script>

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />
