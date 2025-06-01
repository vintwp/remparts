import { notFound } from 'next/navigation';

import { ConfirmEmail } from '@/features/Auth';

type Params = {
  params: Promise<{ token: string }>;
};

export default async function Page({ params }: Params) {
  const { token } = await params;

  if (!token) {
    notFound();
  }

  return <ConfirmEmail token={token} />;
}
