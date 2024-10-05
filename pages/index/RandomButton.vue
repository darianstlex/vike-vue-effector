<template>
  <button @click="onClick">Telefunc scope update</button>
</template>

<script lang="ts" setup>
import { getMergeScope } from '@utils/effector';

import { onGenerateRandom } from './RandomButton.telefunc';

const onClick = async () => {
  const scopeValues = await onGenerateRandom();
  getMergeScope(scopeValues);
};
</script>
