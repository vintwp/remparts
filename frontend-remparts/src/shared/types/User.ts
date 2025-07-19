import { UserRole } from './UserRole';

type CustomerPriceTier = 'WHOLESALE_TOP' | 'WHOLESALE_STANDARD' | 'WHOLESALE_BASIC' | 'RETAIL';
type Shipping = {
  id: string;
  name: string;
};

interface User {
  id: number;
  oauthId: string | null;
  email: string;
  firstName: string;
  lastName: string;
  patronymicName: string;
  area: Shipping;
  city: Shipping;
  warehouse: Shipping;
  phoneNumber: string;
  role: UserRole;
  isVerifiedEmail: boolean;
  isBanned: boolean;
  isPersonalDataFilled: boolean;
  id1c: null | string;
  customerPriceTier: CustomerPriceTier;
  createdAt: string;
  updatedAt: string;
}

export type { User, CustomerPriceTier, UserRole };
