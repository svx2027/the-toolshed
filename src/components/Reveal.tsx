// Kept for any import that still expects it. Nothing fades or slides in any more: content is simply there.
export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <div className={className}>{children}</div>;
}
