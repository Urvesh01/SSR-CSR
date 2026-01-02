export interface Step {
  title: string;
  description: string;
  server: string;
  browser: string;
  userSees: string;
  highlight: 'request' | 'server' | 'transfer' | 'browser' | 'rendering' | 'hydration' | 'complete';
}

export type DemoMode = 'ssr' | 'csr';