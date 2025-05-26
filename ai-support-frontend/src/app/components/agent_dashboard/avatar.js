export function Avatar({ children }) {
  return <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">{children}</div>;
}

export function AvatarImage({ src, alt = "" }) {
  return <img src={src} alt={alt} className="h-full w-full object-cover" />;
}

export function AvatarFallback({ children }) {
  return <span className="text-sm font-medium text-gray-600">{children}</span>;
}
