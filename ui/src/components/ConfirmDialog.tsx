import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Delete',
  onConfirm,
  onCancel
}: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-neutral-900 border-4 border-red-500 shadow-2xl max-w-md w-full">
        <div className="border-b-4 border-red-500 px-6 py-4 flex items-center justify-between bg-neutral-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500 border-2 border-red-400">
              <AlertTriangle className="w-5 h-5 text-neutral-950" />
            </div>
            <h2 className="text-xl font-mono font-bold text-red-500 uppercase tracking-wider">{title}</h2>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-neutral-700 transition-colors"
          >
            <X className="w-5 h-5 text-yellow-400" />
          </button>
        </div>

        <div className="p-6">
          <p className="font-mono text-neutral-300 mb-6">{message}</p>

          <div className="flex gap-3">
            <button
              onClick={onConfirm}
              className="flex-1 bg-red-500 text-neutral-950 border-2 border-red-400 py-3 font-mono font-bold hover:bg-red-600 transition-colors uppercase tracking-wider"
            >
              {confirmLabel}
            </button>
            <button
              onClick={onCancel}
              className="px-6 py-3 border-2 border-yellow-400 bg-neutral-800 text-yellow-400 font-mono font-bold hover:bg-neutral-700 transition-colors uppercase tracking-wider"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
