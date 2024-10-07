import type { Config } from 'vike/types';
import config from 'vike-vue/config';

import Head from '@layouts/HeadDefault.vue';
import Layout from '@layouts/LayoutDefault.vue';

// Default config (can be overridden by pages)
export default {
  Layout,
  Head,
  // https://vike.dev/meta
  meta: {
    // Event - fires on server side when the page gets initiated
    pageInitiated: {
      env: { client: false, server: true },
    },
    // Event - fires on client side when the page started
    pageStarted: {
      env: { client: true, server: false },
    },
  },
  passToClient: ['scopeValues'],
  prerender: false,

  // <title>
  title: 'My Vike App',
  extends: config,
} satisfies Config;
