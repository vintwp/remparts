'use client';

import { SWRDevTools } from 'swr-devtools';

type Props = {
  children: React.ReactNode;
};

export function SWRDevTool({ children }: Props) {
  return <SWRDevTools>{children}</SWRDevTools>;
}
