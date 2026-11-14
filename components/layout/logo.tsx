/** Mark: a small tree whose nodes link, i.e. a hierarchy becoming a graph. */
export function LogoMark({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
      <rect x="1" y="1" width="26" height="26" rx="7" fill="#f6b93b" />
      <path d="M14 8v5M14 13 8.5 19M14 13l5.5 6" stroke="#090e1c" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="14" cy="8" r="2.3" fill="#090e1c" />
      <circle cx="8.5" cy="19" r="2.3" fill="#090e1c" />
      <circle cx="19.5" cy="19" r="2.3" fill="#090e1c" />
      <path d="M10.6 19h6.8" stroke="#090e1c" strokeWidth="1.4" strokeDasharray="1.6 2" strokeLinecap="round" />
    </svg>
  );
}
