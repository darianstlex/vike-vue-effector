<template>
  <button @click="onClick">Generate</button>
</template>

<script lang="ts" setup>
import { updateScope } from '@utils/effector';

import { onGenerateRandom } from './RandomButton.telefunc';

const onClick = async () => {
  const scopeValues = await onGenerateRandom();
  updateScope(scopeValues);
};
</script>
