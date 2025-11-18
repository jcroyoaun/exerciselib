import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
      <div>
        <h3 className="text-sm font-semibold text-red-900 mb-1">Error Loading Data</h3>
        <p className="text-sm text-red-700">{message}</p>
      </div>
    </div>
  );
}
