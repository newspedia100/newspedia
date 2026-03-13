import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET - Fetch all marquee news
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const activeOnly = searchParams.get("active") === "true";
    const where = activeOnly ? { isActive: true } : {};
    const marqueeNews = await db.marqueeNews.findMany({
      where,
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ marqueeNews });
  } catch (error) {
    console.error("Error fetching marquee news:", error);
    return NextResponse.json({ error: "Failed to fetch marquee news" }, { status: 500 });
  }
}

// POST - Create new marquee news
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, link, isActive, order } = body;
    if (!text || text.trim() === "") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }
    let newsOrder = order;
    if (newsOrder === undefined || newsOrder === null) {
      const maxOrder = await db.marqueeNews.aggregate({ _max: { order: true } });
      newsOrder = (maxOrder._max.order || 0) + 1;
    }
    const marqueeNews = await db.marqueeNews.create({
      data: { text: text.trim(), link: link?.trim() || null, isActive: isActive ?? true, order: newsOrder },
    });
    return NextResponse.json({ marqueeNews });
  } catch (error) {
    console.error("Error creating marquee news:", error);
    return NextResponse.json({ error: "Failed to create marquee news" }, { status: 500 });
  }
}

// PUT - Update marquee news
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, text, link, isActive, order } = body;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const updateData: Record<string, unknown> = {};
    if (text !== undefined) updateData.text = text.trim();
    if (link !== undefined) updateData.link = link?.trim() || null;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (order !== undefined) updateData.order = order;
    const marqueeNews = await db.marqueeNews.update({ where: { id }, data: updateData });
    return NextResponse.json({ marqueeNews });
  } catch (error) {
    console.error("Error updating marquee news:", error);
    return NextResponse.json({ error: "Failed to update marquee news" }, { status: 500 });
  }
}

// DELETE - Delete marquee news
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    await db.marqueeNews.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting marquee news:", error);
    return NextResponse.json({ error: "Failed to delete marquee news" }, { status: 500 });
  }
}
