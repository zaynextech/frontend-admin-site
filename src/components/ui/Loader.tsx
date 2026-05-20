"use client";


const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      {/* 
        Animated Logo Mark: 
        Uses custom keyframes to animate the wireframe nodes.
      */}
      <div className="relative h-10 w-10">
        {/* Top-Left Square (Zinc) */}
        <div className="absolute left-0 top-0 h-6 w-6 rounded-[4px] border-[2.5px] border-zinc-100 animate-loader-square-1" />
        
        {/* Bottom-Right Square (Cyan) */}
        <div className="absolute bottom-0 right-0 h-6 w-6 rounded-[4px] border-[2.5px] border-cyan-500 animate-loader-square-2" />
        
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-cyan-500/10 blur-xl rounded-full animate-pulse" />
      </div>

      {/* Confident Typography with a subtle "shimmer" effect */}
      <div className="flex flex-col items-center">
        <span className="text-sm font-bold tracking-[0.3em] uppercase text-zinc-100 antialiased overflow-hidden relative">
          Zaynex
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent -translate-x-full animate-shimmer" />
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-1">
          Synchronizing Nodes
        </span>
      </div>
    </div>
  );
};

export default Loader;