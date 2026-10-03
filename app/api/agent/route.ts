import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { AgentConfig, db, users } from "@/db";
import { desc, eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
    const { name, description, avatarSeed, image } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const user = await db.select().from(users).where(eq(users.email, session.user.email));
        if (!user[0]) {
            console.error("User not found");
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const newAgentConfig = await db.insert(AgentConfig).values({
            userId: user[0].id,
            name: name,
            description: description,
            image: image,
            avatarSeed: avatarSeed
        }).returning();
        return NextResponse.json({ message: "Agent config created successfully", agentConfig: newAgentConfig });
    }
    catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
    }
}

export async function GET(req:NextRequest) {

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try{
        const user = await db.select().from(users).where(eq(users.email, session.user.email));
        if (!user[0]) {
            console.error("User not found");
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const agentConfigs = await db.select().from(AgentConfig).where(eq(AgentConfig.userId, user[0].id)).orderBy(desc(AgentConfig.createdAt));
        return NextResponse.json({ agentConfigs });
    }
    catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
    }
    
}