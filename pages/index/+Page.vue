<template>
  <h1>My Vike app</h1>
  This page is:
  <ul>
    <li>Rendered to HTML.</li>
    <li data-allow-mismatch>App State: {{ appState }}</li>
    <li>Client counter: <Counter /></li>
    <li>Server counter: {{ counter }}</li>
    <li>Random: {{ random }} <RandomButton /></li>
    <li>Async counter: {{ appCounter }} <button @click="incCounterFx">Inc Async</button></li>
  </ul>
</template>

<script lang="ts" setup>
import { appService } from '@services/app';
import { useUnit } from '@utils/effector';

import Counter from './Counter.vue';
import { service } from './model';
import RandomButton from './RandomButton.vue';

const [counter, random, appState, appCounter, incCounterFx] = useUnit([
  service.$counterServer,
  service.$random,
  appService.$appState,
  appService.$appCounter,
  appService.incCounterFx,
]);
</script>
