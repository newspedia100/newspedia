import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const activeOnly = searchParams.get("active") === "true";
    const where = activeOnly ? { isActive: true } : {};
    const marqueeNews = await db.marqueeNews.findMany({ where, orderBy: { order: "asc" } });
    return NextResponse.json({ marqueeNews });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, link, isActive, order } = body;
    if (!text) return NextResponse.json({ error: "Text required" }, { status: 400 });
    let newsOrder = order;
    if (newsOrder === undefined) {
      const maxOrder = await db.marqueeNews.aggregate({ _max: { order: true } });
      newsOrder = (maxOrder._max.order || 0) + 1;
    }
    const marqueeNews = await db.marqueeNews.create({
      data: { text, link: link || null, isActive: isActive ?? true, order: newsOrder },
    });
    return NextResponse.json({ marqueeNews });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, text, link, isActive, order } = body;
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    const updateData: Record<string, unknown> = {};
    if (text !== undefined) updateData.text = text;
    if (link !== undefined) updateData.link = link || null;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (order !== undefined) updateData.order = order;
    const marqueeNews = await db.marqueeNews.update({ where: { id }, data: updateData });
    return NextResponse.json({ marqueeNews });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await db.marqueeNews.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
