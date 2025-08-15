// src/components/AnimatedBorder.jsx
export default function AnimatedBorder({ children, className = '' }) {
  return (
    <div className={`p-[2px] rounded-lg bg-gradient-to-tr from-amarillo to-base ${className}`}>
      <div className="w-full h-full rounded-md bg-white dark:bg-gray-800">
        {children}
      </div>
    </div>
  );
}
