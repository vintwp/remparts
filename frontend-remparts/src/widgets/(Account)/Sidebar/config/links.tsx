import { LogOut, Logs, ShoppingBasket, Undo2, User } from 'lucide-react';

export const navLinks = [
  { href: '/api/account', text: 'Акаунт', icon: <User /> },
  { href: '/api/account/orders', text: 'Замовлення', icon: <Logs /> },
  { href: '/api/account/cart', text: 'Кошик', icon: <ShoppingBasket /> },
  { href: '/api/account/returns', text: 'Повернення', icon: <Undo2 /> },
];

export const authLinks = [{ href: '/api/auth/logout', text: 'Вийти', icon: <LogOut /> }];
