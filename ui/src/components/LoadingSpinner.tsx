export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-neutral-800"></div>
        <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent absolute top-0 left-0 animate-spin"></div>
      </div>
    </div>
  );
}
