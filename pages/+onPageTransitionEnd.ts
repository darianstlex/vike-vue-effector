import type { PageContextClient } from 'vike/types';

export const onPageTransitionEnd = async (pageContext: Partial<PageContextClient>) => {
  if (pageContext.isHydration) {
    document.querySelector('body')?.classList.remove('page-is-transitioning');
  }
};
