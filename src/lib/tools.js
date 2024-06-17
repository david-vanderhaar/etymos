import MdExposurePlus1 from 'svelte-icons/md/MdExposurePlus1.svelte'
import MdSwapCalls from 'svelte-icons/md/MdSwapCalls.svelte'
import MdCallSplit from 'svelte-icons/md/MdCallSplit.svelte'
import MdTonality from 'svelte-icons/md/MdTonality.svelte'

const toolIconMap = {
  'n_plus_1': MdExposurePlus1,
  'translate_traversal': MdSwapCalls,
  'etymology_traversal': MdCallSplit,
  'definition_swap': MdTonality,
}

export function getToolIcon(toolType) {
  return toolIconMap[toolType];
}