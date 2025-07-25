import { auth } from '@/shared/config/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await auth();

  return Response.json({ data: session });
}
