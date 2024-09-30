import { LoaderCircleIcon } from 'lucide-react';

type LoaderProps = {
  size?: number;
  className?: string;
};

export default function Loader({ size = 50, className = '' }: LoaderProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900/50 z-[9999999]">
      <LoaderCircleIcon
        size={size}
        className={`animate-spin ${className}`}
      />
    </div>
  );
}
