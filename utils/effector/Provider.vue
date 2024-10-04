<template><slot /></template>

<script lang="ts" setup>
import { usePageContext } from 'vike-vue/usePageContext';

import { getScope } from './scope';
import { provideScope } from './useScope';

const pageContext = usePageContext();
const scope = getScope(pageContext.scopeValues);
provideScope(scope);
</script>
