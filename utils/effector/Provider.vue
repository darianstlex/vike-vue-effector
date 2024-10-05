<template><slot /></template>

<script lang="ts" setup>
import { usePageContext } from 'vike-vue/usePageContext';

import { getUpdateScope } from './scope';
import { provideScope } from './useScope';

const pageContext = usePageContext();
const scope = getUpdateScope(pageContext.scopeValues);
provideScope(scope);
</script>
