const RoleByDB = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  USER: 'USER',
} as const;

type ROLE = (typeof RoleByDB)[keyof typeof RoleByDB];

export { RoleByDB, type ROLE };
