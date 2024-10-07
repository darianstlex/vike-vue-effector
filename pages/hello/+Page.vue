<template>
  <h1>Hello</h1>
  <p>
    Hi
    <b> {{ data.name }} </b>.
  </p>
  <ul>
    <li>
      <a href="/hello/eli">/hello/eli</a>
    </li>
    <li>
      <a href="/hello/jon">/hello/jon</a>
    </li>
  </ul>
  <p>
    Parameterized routes can be defined by exporting a route string in
    <code>+route.ts</code>.
  </p>
  <p>Last page update: {{ data.date }}</p>
</template>

<script lang="ts" setup>
import { useData } from 'vike-vue/useData';

import type { Data } from './+data';

const data = useData<Data>();
</script>
