import { useState } from 'react';

export function Dialog({ children }) {
  return children;
}

export function DialogTrigger({ children, asChild, onClick }) {
  return (
    <div onClick={onClick}>
      {children}
    </div>
  );
}

export function DialogContent({ children }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
export function DialogClose({ children, onClick }) {
  return (
    <div onClick={onClick}>
      {children}
    </div>
  );
}
export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

export function DialogDescription({ children }) {
  return <p className="text-sm text-gray-600">{children}</p>;
}
