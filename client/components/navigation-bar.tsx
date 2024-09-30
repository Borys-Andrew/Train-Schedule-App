'use client';

import { useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

import { AuthContext } from '@/context/AuthContext';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from './ui/navigation-menu';
import { Button } from './ui/button';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Schedule', href: '/trains-schedule' },
];

export default function NavigationBar() {
  const pathname = usePathname();
  const { isAuth, logout } = useContext(AuthContext);
  const router = useRouter();

  return (
    <nav>
      <NavigationMenu className="gap-6">
        {links.map(({ label, href }) => {
          const isActive = pathname === href ? 'font-bold' : '';

          return (
            <NavigationMenuItem
              key={label}
              className="list-none"
            >
              <Link
                href={href}
                legacyBehavior
                passHref
              >
                <NavigationMenuLink className={isActive}>
                  {label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}

        {isAuth ? (
          <Button
            onClick={() => {
              logout();
              router.push('/');
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={() => {
              router.push('/login');
            }}
          >
            Login
          </Button>
        )}
      </NavigationMenu>
    </nav>
  );
}
