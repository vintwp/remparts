import { notFound } from 'next/navigation';

import { ChangePasswordForm } from '@/features/Auth';

type Params = {
  params: Promise<{ token: string }>;
};

export default async function Page({ params }: Params) {
  const { token } = await params;

  if (!token) {
    notFound();
  }

  return <ChangePasswordForm token={token} />;
}
