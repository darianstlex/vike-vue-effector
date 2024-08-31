<template>
  <h1>My Vike app</h1>
  This page is:
  <ul>
    <li>Rendered to HTML.</li>
    <li>Client counter: <Counter /></li>
    <li>Server counter: {{ counter }}</li>
    <li>Random: {{ random }} <RandomButton /></li>
  </ul>
</template>

<script lang="ts" setup>
import { useUnit } from '@utils/effector';

import Counter from './Counter.vue';
import { service } from './model';
import RandomButton from './RandomButton.vue';

const [counter, random] = useUnit([service.$counterServer, service.$random]);
</script>
