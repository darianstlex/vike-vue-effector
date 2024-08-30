<template>
  <button type="button" @click="inc">Counter {{ counter }}</button>
</template>

<script lang="ts" setup>
import { useUnit } from '@utils/effector';

import { service } from './model';

const [counter, inc] = useUnit([service.$counterClient, service.inc]);
</script>
