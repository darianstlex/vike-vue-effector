<template><slot /></template>

<script lang="ts" setup>
import { usePageContext } from 'vike-vue/usePageContext';

import { getMergeScope } from './scope';
import { provideScope } from './useScope';

const pageContext = usePageContext();
const scope = getMergeScope(pageContext.scopeValues);
provideScope(scope);
</script>
