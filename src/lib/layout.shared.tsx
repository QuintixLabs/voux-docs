import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <img
            src="/assets/logo-dark.svg"
            alt="Voux"
            className="h-8 dark:hidden"
          />
          <img
            src="/assets/logo-light.svg"
            alt="Voux"
            className="hidden h-8 dark:block"
          />
        </>
      ),
    },
    githubUrl: 'https://github.com/QuintixLabs/Voux',
  };
}
