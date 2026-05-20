import type { IconType } from "react-icons";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiLaravel,
  SiDjango,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiRailway,
  SiVercel,
  SiCloudinary,
  SiOpenai,
} from "react-icons/si";

import { Cpu } from "lucide-react";

interface Props {
  name: string;
}

const iconMap: Record<string, IconType> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  Tailwind: SiTailwindcss,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  NestJS: SiNestjs,
  Laravel: SiLaravel,
  Django: SiDjango,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  Docker: SiDocker,
  Railway: SiRailway,
  Vercel: SiVercel,
  Cloudinary: SiCloudinary,
  OpenAI: SiOpenai,
};

export default function TechLogo({ name }: Props) {
  const Icon = iconMap[name];

  return (
    <div className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 transition-all duration-300 hover:border-cyan-500/20 hover:bg-white/[0.06]">

      {Icon ? (
        <Icon className="text-sm text-cyan-400 transition-transform duration-300 group-hover:scale-110" />
      ) : (
        <Cpu className="h-4 w-4 text-cyan-400" />
      )}

      <span className="text-xs font-medium text-zinc-300">
        {name}
      </span>
    </div>
  );
}