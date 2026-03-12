import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET - Fetch all articles with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    const skip = (page - 1) * limit;

    // Build filter conditions
    const where: Record<string, unknown> = {};
    
    if (category) {
      where.categoryId = category;
    }
    
    if (featured === "true") {
      where.isFeatured = true;
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
        { content: { contains: search } },
      ];
    }

    const [articles, total] = await Promise.all([
      db.article.findMany({
        where,
        include: {
          category: {
            select: { id: true, name: true, slug: true, color: true },
          },
        },
        orderBy: { publishedAt: "desc" },
        skip,
        take: limit,
      }),
      db.article.count({ where }),
    ]);

    return NextResponse.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Fetch articles error:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

// POST - Create new article
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      excerpt,
      content,
      imageUrl,
      imageAlt,
      author,
      authorAvatar,
      readTime,
      isFeatured,
      isPublished,
      categoryId,
      tags,
      metaTitle,
      metaDesc,
    } = body;

    // Validate required fields
    if (!title || !excerpt || !content || !categoryId) {
      return NextResponse.json(
        { error: "Missing required fields: title, excerpt, content, categoryId" },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 100) + "-" + Date.now();

    // Check if category exists
    const category = await db.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 400 }
      );
    }

    const article = await db.article.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        imageUrl: imageUrl || null,
        imageAlt: imageAlt || null,
        author: author || "NewsPedia Team",
        authorAvatar: authorAvatar || null,
        readTime: readTime || 5,
        isFeatured: isFeatured || false,
        isPublished: isPublished !== false,
        categoryId,
        tags: tags || null,
        metaTitle: metaTitle || title,
        metaDesc: metaDesc || excerpt,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("Create article error:", error);
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}
