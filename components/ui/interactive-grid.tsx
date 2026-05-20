"use client";

export default function InteractiveGrid() {
  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        e.currentTarget.style.setProperty(
          "--x",
          `${e.clientX - rect.left}px`
        );

        e.currentTarget.style.setProperty(
          "--y",
          `${e.clientY - rect.top}px`
        );
      }}
    >

      {/* Base Grid */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(#06B6D408_1px,transparent_1px),linear-gradient(to_right,#06B6D408_1px,transparent_1px)]
          bg-[size:50px_50px]
        "
      />

      {/* Spotlight Grid */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-[linear-gradient(#06B6D440_1px,transparent_1px),linear-gradient(to_right,#06B6D440_1px,transparent_1px)]
          bg-[size:50px_50px]
        "
        style={{
          maskImage:
            "radial-gradient(240px circle at var(--x, 50%) var(--y, 50%), black 0%, transparent 100%)",

          WebkitMaskImage:
            "radial-gradient(240px circle at var(--x, 50%) var(--y, 50%), black 0%, transparent 100%)",
        }}
      />
    </div>
  );
}