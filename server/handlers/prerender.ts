import { prerender } from 'vike/api';

(async () => {
  try {
    await prerender();
  } catch (e) {
    console.log(e);
    return e;
  }
})();
