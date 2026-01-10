'use client';

import type { PropsWithChildren } from 'react';
import { Provider } from 'jotai';

export default function Providers({ children }: PropsWithChildren<unknown>) {
  return <Provider>{children}</Provider>;
}
