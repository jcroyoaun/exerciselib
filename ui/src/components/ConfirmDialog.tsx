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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-slate-700 mb-6">{message}</p>

          <div className="flex gap-3">
            <button
              onClick={onConfirm}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              {confirmLabel}
            </button>
            <button
              onClick={onCancel}
              className="px-6 py-3 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
