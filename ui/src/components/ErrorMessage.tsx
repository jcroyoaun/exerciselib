import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-neutral-900 border-4 border-red-500 p-6 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
      <div>
        <h3 className="text-sm font-mono font-bold text-red-500 mb-1 uppercase tracking-wider">// ERROR LOADING DATA</h3>
        <p className="text-sm font-mono text-neutral-300">{message}</p>
      </div>
    </div>
  );
}
