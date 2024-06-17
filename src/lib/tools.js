import MdExposurePlus1 from 'svelte-icons/md/MdExposurePlus1.svelte'
import MdSwapCalls from 'svelte-icons/md/MdSwapCalls.svelte'
import MdCallSplit from 'svelte-icons/md/MdCallSplit.svelte'
import MdTonality from 'svelte-icons/md/MdTonality.svelte'

const toolIconMap = {
  'synonym': MdExposurePlus1,
  'antonym': MdSwapCalls,
  'generalization': MdCallSplit,
  'reverse_definition': MdTonality,
}

export function getToolIcon(toolType) {
  return toolIconMap[toolType];
}