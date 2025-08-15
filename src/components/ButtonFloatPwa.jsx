import { usePwaInstall } from '@/hooks/usePwaInstall';

export default function ButtonFloatPwa() {
  const { changeValueShow } = usePwaInstall();

  return (
    <button
      onClick={changeValueShow}
      className="fixed bottom-20 right-6 z-40 rounded-full w-12 h-12 flex items-center justify-center bg-gray-800 dark:bg-slate-100 shadow-lg transition-all duration-300 cursor-pointer dark:text-gray-900 text-white"
    >
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    </button>
  );
}
