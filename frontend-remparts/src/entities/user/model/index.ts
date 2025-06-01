// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ROLE = {
  admin: 'ADMIN',
  user: 'USER',
  manager: 'MANAGER',
} as const;

type Role = (typeof ROLE)[keyof typeof ROLE];

export type { Role };
