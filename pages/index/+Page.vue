<template>
  <h1>My Vike app</h1>
  This page is:
  <ul>
    <li>Rendered to HTML.</li>
    <li>Client counter: <Counter /></li>
    <li>Server counter: {{ counter }}</li>
  </ul>
</template>

<script lang="ts" setup>
import { useUnit } from '@utils/effector';

import Counter from './Counter.vue';
import { service } from './model';

const [counter] = useUnit([service.$counterServer]);
</script>
