import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link 
      to="/dashboard" 
      className="group flex items-center gap-3 transition-opacity hover:opacity-80 active:scale-[0.98]"
    >
      {/* 
        The Mark: Architectural, wireframe geometry. 
        Represents nodes, servers, or "flow". Zero gradients. Zero shadows.
      */}
      <div className="relative h-6 w-6">
        <div className="absolute left-0 top-0 h-4 w-4 rounded-[3px] border-[2px] border-zinc-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
        <div className="absolute bottom-0 right-0 h-4 w-4 rounded-[3px] border-[2px] border-cyan-500 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
      </div>
      
      {/* 
        The Typography: Unified, confident, tight tracking. 
        Dropping the two-tone text split makes it look established and authoritative.
      */}
      <span className="text-lg font-semibold tracking-tight text-zinc-100">
        Zaynex
      </span>
    </Link>
  );
};