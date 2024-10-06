<template><slot /></template>

<script lang="ts" setup>
import { usePageContext } from 'vike-vue/usePageContext';

import { provideScope } from './useScope';

const { scopeValues } = usePageContext();

provideScope(scopeValues);
</script>
