import { type ReactNode } from 'react';
import type { Route } from '@/hooks/useRouter';

type Props = {
  children: ReactNode;
  route: Route;
};

export function PageMeta({ route }: { route: Route }) {
  return null;
}

export default function PageShell({ children, route }: Props) {
  return (
    <div key={route.path} className="page-fade">
      {children}
    </div>
  );
}
