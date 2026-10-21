"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bot,
  Brain,
  Compass,
  Code2,
  Leaf,
  MessageCircle,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { set } from "date-fns";
import { useRouter } from "next/navigation";

const avatars = [
  { Icon: Bot, color: "from-indigo-500 to-violet-500" },
  { Icon: Brain, color: "from-rose-400 to-orange-400" },
  { Icon: Code2, color: "from-cyan-500 to-blue-600" },
  { Icon: Compass, color: "from-emerald-400 to-teal-600" },
  { Icon: MessageCircle, color: "from-amber-400 to-pink-500" },
  { Icon: Leaf, color: "from-lime-500 to-green-600" },
];

export default function CreateAgentPage() {
  const initialSeed = crypto.randomUUID();
  const [avatarSeed, setAvatarSeed] = useState<string>(initialSeed);
  const [description, setDescription] = useState<string>();
  const [name, setName] = useState<string>("Helpful Assistant Agent");
  const [image, setImage] = useState<string>(
    `https://api.dicebear.com/10.x/clay/svg?tags=animation&seed=${initialSeed}`,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  function shuffleAvatar() {
    const seed = crypto.randomUUID();
    setAvatarSeed(seed);
    setImage(
      `https://api.dicebear.com/10.x/clay/svg?tags=animation&seed=${seed}`,
    );
  }

  const onClickCreateAgent = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    console.log({ name, description, avatarSeed, image });
    try {
      const result = await axios.post("/api/agent", {
        name: name,
        description: description,
        avatarSeed: avatarSeed,
        image: image,
      });
      console.log(result.data);

      router.push("/workspace/" + result.data.agentConfig.id);
    } catch (error) {
      console.error("Error creating agent:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen px-5 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            Create New Agent
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Set up your AI agent by choosing an avatar, name, and description.
            You can configure its tools and behavior later.
          </p>
        </header>

        <form className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <section className="mb-8 flex flex-col items-center border-b border-slate-100 pb-8">
            <img
              src={image}
              alt="avatar"
              className={`flex size-32 items-center justify-center rounded-[2rem] bg-gradient-to-br shadow-lg shadow-slate-900/10 ring-1 ring-black/5`}
            />
            <Button
              type="button"
              variant="outline"
              onClick={shuffleAvatar}
              className="mt-4 h-9 rounded-lg px-3 text-slate-600"
            >
              <RefreshCw className="size-4" />
              Shuffle Image
            </Button>
          </section>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="agent-name" className="text-slate-800">
                Agent Name
              </Label>
              <Input
                id="agent-name"
                name="name"
                placeholder="e.g. Research Assistant"
                required
                className="h-11 rounded-lg border-slate-200 px-3"
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between gap-3">
                <Label htmlFor="agent-description" className="text-slate-800">
                  Agent Description
                </Label>
                <span className="text-xs text-slate-400">Optional</span>
              </div>
              <Textarea
                id="agent-description"
                name="description"
                placeholder="Describe what this agent will help you with..."
                rows={4}
                className="min-h-28 resize-y rounded-lg border-slate-200 px-3 py-2.5"
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
            <Link href="/workspace">
              <Button variant="outline" className="h-10 rounded-lg px-5">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="h-10 rounded-lg bg-slate-900 px-5 text-white hover:bg-slate-700"
              onClick={onClickCreateAgent}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create Agent"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
