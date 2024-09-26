'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from './ui/navigation-menu';
import { usePathname } from 'next/navigation';

const links = [
  { label: 'Home', href: '/dashboard' },
  { label: 'Schedule', href: '/dashboard/trains-schedule' },
  { label: 'About', href: '/dashboard/about' },
];

export default function NavigationBar() {
  const pathname = usePathname();

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
      </NavigationMenu>
    </nav>
  );
}
