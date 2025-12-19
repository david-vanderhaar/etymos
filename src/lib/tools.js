import MdExposurePlus1 from 'svelte-icons/md/MdExposurePlus1.svelte'
import MdSwapCalls from 'svelte-icons/md/MdSwapCalls.svelte'
import MdCallSplit from 'svelte-icons/md/MdCallSplit.svelte'
import MdTonality from 'svelte-icons/md/MdTonality.svelte'
import MdExposureNeg1 from 'svelte-icons/md/MdExposureNeg1.svelte'
import MdErrorOutline from 'svelte-icons/md/MdErrorOutline.svelte'
import MdApps from 'svelte-icons/md/MdApps.svelte'
import MdSelectAll from 'svelte-icons/md/MdSelectAll.svelte'
import MdRadioButtonUnchecked from 'svelte-icons/md/MdRadioButtonUnchecked.svelte'
import MdRadioButtonChecked from 'svelte-icons/md/MdRadioButtonChecked.svelte'
import MdMic from 'svelte-icons/md/MdMic.svelte'
import MdContentCopy from 'svelte-icons/md/MdContentCopy.svelte'
import GiFamilyTree from 'svelte-icons/gi/GiFamilyTree.svelte'

const toolIconMap = {
  'synonym': MdExposurePlus1,
  'antonym': MdExposureNeg1,
  'generalization': MdTonality,
  'reverse_definition': MdSwapCalls,
  'more_specific': MdSelectAll,
  'comprised_of': MdApps,
  'part_of': MdRadioButtonChecked,
  'homophone': MdMic,
  'consonant_match': MdContentCopy,
  'etymology': GiFamilyTree,
  'strongs_concordance': MdRadioButtonUnchecked,
}

export function getToolIcon(toolType) {
  return toolIconMap[toolType] || MdErrorOutline
}