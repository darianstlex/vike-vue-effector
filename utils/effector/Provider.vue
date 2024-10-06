<template><slot /></template>

<script lang="ts" setup>
import { usePageContext } from 'vike-vue/usePageContext';

import { injectScope } from './useScope';

const pageContext = usePageContext();

injectScope(pageContext.scopeValues);
</script>
