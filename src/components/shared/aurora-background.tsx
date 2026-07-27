"use client";

export function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-[20%] -top-[20%] h-[70vh] w-[70vh] rounded-full bg-violet-600/20 blur-[120px] animate-aurora-drift" />
      <div className="absolute -right-[15%] top-[10%] h-[60vh] w-[60vh] rounded-full bg-indigo-600/15 blur-[120px] animate-aurora-drift-2" />
      <div className="absolute bottom-[10%] left-[20%] h-[50vh] w-[50vh] rounded-full bg-purple-600/15 blur-[120px] animate-aurora-drift-3" />
      <div className="absolute bottom-[-10%] right-[20%] h-[40vh] w-[40vh] rounded-full bg-cyan-500/10 blur-[100px] animate-aurora-drift" />
    </div>
  );
}
