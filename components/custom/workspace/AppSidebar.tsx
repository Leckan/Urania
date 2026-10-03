"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Bot, Compass, Plus, Sparkles } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { fetch } from "inngest";
import axios from "axios";
import { AgentConfigType } from "@/type/Agent";
import { usePathname } from "next/navigation";

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

  const [agents, setAgents] = useState<AgentConfigType[]>([]);

  const GetUserAgents = async () => {
    const result = await axios.get("/api/agent");
    console.log(result.data);
    setAgents(result.data.agentConfigs);
  };

  const path = usePathname();
  useEffect(() => {
    GetUserAgents();
  }, [path]);

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="gap-4 px-3 py-4">
        <div className="flex items-center justify-between gap-2">
          <Link
            href="/workspace"
            aria-label="Urania AI Agent home"
            className=" group-data-[collapsible=icon]:hidden"
          >
            <Image
              src="/logo.png"
              alt="Urania AI Agent"
              width={180}
              height={180}
              className="w-auto object-contain object-left"
              priority
            />
          </Link>
          <SidebarTrigger className="shrink-0" />
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/workspace/create-agent" />}
              size="lg"
              tooltip="Create New Agent"
              className="bg-slate-900 text-white hover:bg-slate-700  hover:text-white active:bg-slate-800 active:text-white"
            >
              <Plus strokeWidth={2.25} />
              <span>Create New Agent</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Your Agents</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {agents.map((agent, index) => (
                <SidebarMenuItem key={agent.name} className=" flex items-center py-2">
                  <SidebarMenuButton
                    render={<Link href={`/workspace/${agent.id}`} />}
                    tooltip={agent.description}
                  >
                    <span className="size-16 ">
                      <img src={agent.image} alt="avatar"  />
                    </span>
                    <span className="font-semibold">{agent.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <div className="mt-4 flex items-center gap-2 px-2 text-sm text-sidebar-foreground/50 group-data-[collapsible=icon]:hidden">
              <Sparkles className="size-3.5" />
              Your AI workspace
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-2 px-3 py-3">
        <SidebarSeparator className="mx-0 w-full" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/workspace/marketplace" />}
              tooltip="Marketplace"
            >
              <Compass strokeWidth={1.8} />
              <span>Marketplace</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="cursor-default hover:bg-sidebar-accent"
            >
              {user?.image ? (
                <span
                  role="img"
                  aria-label={`${displayName} avatar`}
                  className="size-8 shrink-0 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url("${user.image}")` }}
                />
              ) : (
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                  {initials || <Bot className="size-4" />}
                </span>
              )}
              <span className="font-medium">{displayName}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
