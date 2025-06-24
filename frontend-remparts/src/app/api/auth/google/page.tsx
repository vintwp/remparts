import { redirect } from 'next/navigation';

import { AUTH_GOOGLE_OAUTH_API } from '@/shared/config';

export default function BlankPage() {
  redirect(AUTH_GOOGLE_OAUTH_API);
}
