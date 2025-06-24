'use server';

import { auth } from '@/shared/config/auth';

export async function getAuth() {
  const session = await auth();

  return session;
}
