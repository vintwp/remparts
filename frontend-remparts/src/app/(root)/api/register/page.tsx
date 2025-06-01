import { Metadata } from 'next';

import { RegisterForm } from '@/features/Auth';

export const metadata: Metadata = {
  title: 'Реєстрація нового користувача',
};
export default function RegisterPage() {
  return <RegisterForm />;
}
