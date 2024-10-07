import { prerender } from 'vike/prerender';

(async () => {
  try {
    await prerender();
  } catch (e) {
    console.log(e);
    return e;
  }
})();
