export function Badge({ children, className = '', variant = 'default' }) {
  const base = "inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium";
  const styles = {
    default: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 text-gray-800",
    secondary: "bg-gray-200 text-gray-700"
  };
  return (
    <span className={`${base} ${styles[variant] || styles.default} ${className}`}>
      {children}
    </span>
  );
}
