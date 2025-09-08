import { User } from '@prisma/client';

type TJwtUser = Pick<User, 'id' | 'email' | 'role' | 'customerPriceTier'>;

export { TJwtUser };
