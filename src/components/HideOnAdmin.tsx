'use client';

import { usePathname } from 'next/navigation';

// Wraps public site chrome (navbar, footer) so it is not shown inside /admin.
export default function HideOnAdmin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return <>{children}</>;
}
