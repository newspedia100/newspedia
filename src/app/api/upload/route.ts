import { NextRequest, NextResponse } from "next/server";
import { supabase, STORAGE_BUCKET, isSupabaseConfigured } from "@/lib/supabase";

// POST - Upload image to Supabase Storage
export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured() || !supabase) {
      return NextResponse.json({
        success: false,
        error: "Storage belum dikonfigurasi. Silakan setup Supabase Storage terlebih dahulu.",
        instructions: "1. Buka Supabase Dashboard > Storage > Buat bucket 'uploads'\n2. Set bucket ke public\n3. Tambahkan NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY di Environment Variables"
      }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Tidak ada file yang dipilih" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Tipe file tidak didukung. Hanya JPEG, PNG, GIF, dan WebP yang diizinkan" },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File terlalu besar. Maksimum 10MB" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = file.name.split(".").pop() || "jpg";
    const filename = `${timestamp}-${randomString}.${extension}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return NextResponse.json(
        { error: "Gagal upload file: " + error.message },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(data.path);

    return NextResponse.json({
      success: true,
      imageUrl: urlData.publicUrl,
      filename,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Gagal upload file" },
      { status: 500 }
    );
  }
}

// GET - List uploaded images from Supabase Storage
export async function GET() {
  try {
    if (!isSupabaseConfigured() || !supabase) {
      return NextResponse.json({ images: [] });
    }

    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .list("", {
        limit: 100,
        sortBy: { column: "created_at", order: "desc" },
      });

    if (error) {
      console.error("Supabase list error:", error);
      return NextResponse.json({ images: [] });
    }

    // Filter only image files
    const imageFiles = (data || []).filter((file) =>
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
    );

    // Get public URLs for all images
    const images = imageFiles.map((file) => {
      const { data: urlData } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(file.name);

      return {
        filename: file.name,
        url: urlData.publicUrl,
        size: file.metadata?.size || 0,
        createdAt: file.created_at,
      };
    });

    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
