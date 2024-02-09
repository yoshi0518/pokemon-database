import { ReactElement } from 'react';

export const DefaultLayout = ({ children }: { children: ReactElement }) => (
  <>
    <header>Default Header</header>
    <div>{children}</div>
    <footer>Default Footer</footer>
  </>
);
