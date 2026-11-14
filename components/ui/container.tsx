import { cn } from "@/lib/utils";

export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)} {...props} />;
}

export function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("font-mono text-xs font-medium uppercase tracking-[0.18em]", className)} {...props} />;
}
