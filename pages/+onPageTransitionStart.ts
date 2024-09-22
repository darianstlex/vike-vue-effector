import type { OnPageTransitionStartAsync } from 'vike/types';

export const onPageTransitionStart: OnPageTransitionStartAsync = async (pageContext) => {
  if (pageContext.isHydration) {
    document.querySelector('body')?.classList.add('page-is-transitioning');
  }
};
