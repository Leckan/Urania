"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Bot, Compass, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const agents = [
  {
    name: "Research Assistant",
    initials: "RA",
    style: "bg-violet-100 text-violet-700",
  },
  {
    name: "Writing Partner",
    initials: "WP",
    style: "bg-amber-100 text-amber-700",
  },
  {
    name: "Code Reviewer",
    initials: "CR",
    style: "bg-emerald-100 text-emerald-700",
  },
  { name: "Travel Planner", initials: "TP", style: "bg-sky-100 text-sky-700" },
];

function AppSidebar() {
  const { data } = useSession();
  const user = data?.user;
  const displayName =
    user?.name || user?.email?.split("@")[0] || "Your account";
  const initials = displayName
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-5 text-slate-900">
      <Link
        href="/workspace"
        className="mb-8 flex items-center gap-3 px-2"
        aria-label="Urania AI Agent home"
      >
        <Image
          src="/logo.png"
          alt="Urania AI Agent"
          width={180}
          height={180}
          className="rounded-xl object-contain"
          priority
        />
      </Link>

      <Button className="mb-8 flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2">
        <Plus className="size-4" strokeWidth={2.25} />
        Create New Agent
      </Button>

      <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
        Your Agents
      </div>
      <nav
        aria-label="Your agents"
        className="min-h-0 flex-1 space-y-1 overflow-y-auto"
      >
        {agents.map((agent, index) => (
          <Link
            key={agent.name}
            href={`/workspace/agents/${index + 1}`}
            className="group flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
          >
            <span
              className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-semibold ${agent.style}`}
            >
              {agent.initials}
            </span>
            <span className="truncate">{agent.name}</span>
          </Link>
        ))}
        <div className="mt-4 flex items-center gap-2 px-2.5 py-2 text-xs text-slate-400">
          <Sparkles className="size-3.5" />
          Your AI workspace
        </div>
      </nav>

      <div className="mt-4 border-t border-slate-200 pt-3">
        <Link
          href="/workspace/marketplace"
          className="mb-3 flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
        >
          <Compass className="size-[18px]" strokeWidth={1.8} />
          Marketplace
        </Link>
        <div className="flex items-center gap-3 rounded-xl px-2.5 py-2.5">
          {user?.image ? (
            <span
              role="img"
              aria-label={`${displayName} avatar`}
              className="size-[34px] shrink-0 rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url("${user.image}")` }}
            />
          ) : (
            <span className="flex size-[34px] shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
              {initials || <Bot className="size-4" />}
            </span>
          )}
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700">
            {displayName}
          </span>
        </div>
      </div>
    </aside>
  );
}

export default AppSidebar;
