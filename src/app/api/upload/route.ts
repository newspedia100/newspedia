import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Check if Cloudinary is configured
function isCloudinaryConfigured(): boolean {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

// POST - Upload image to Cloudinary
export async function POST(request: NextRequest) {
  try {
    // Check if Cloudinary is configured
    if (!isCloudinaryConfigured()) {
      return NextResponse.json({
        success: false,
        error: "Cloudinary belum dikonfigurasi.",
        instructions: `Silakan daftar gratis di cloudinary.com dan tambahkan Environment Variables berikut di Vercel:
        
1. CLOUDINARY_CLOUD_NAME
2. CLOUDINARY_API_KEY  
3. CLOUDINARY_API_SECRET

Cara mendapatkannya:
1. Daftar gratis di cloudinary.com
2. Buka Dashboard
3. Copy nilai dari bagian "Account Details"`,
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

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "newspedia",
      resource_type: "image",
      transformation: [
        { quality: "auto:good" },
        { fetch_format: "auto" },
      ],
    });

    return NextResponse.json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      filename: result.original_filename,
      size: result.bytes,
      type: result.format,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Gagal upload file: " + (error instanceof Error ? error.message : "Unknown error") },
      { status: 500 }
    );
  }
}

// GET - List uploaded images from Cloudinary
export async function GET() {
  try {
    if (!isCloudinaryConfigured()) {
      return NextResponse.json({ images: [] });
    }

    const result = await cloudinary.search
      .expression("folder:newspedia")
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    const images = (result.resources || []).map((img: { public_id: string; secure_url: string; bytes: number; created_at: string; format: string }) => ({
      filename: img.public_id.split("/").pop(),
      url: img.secure_url,
      publicId: img.public_id,
      size: img.bytes,
      createdAt: img.created_at,
      type: img.format,
    }));

    return NextResponse.json({ images });
  } catch (error) {
    console.error("List images error:", error);
    return NextResponse.json({ images: [] });
  }
}

// DELETE - Delete image from Cloudinary
export async function DELETE(request: NextRequest) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json({ error: "Public ID diperlukan" }, { status: 400 });
    }

    if (!isCloudinaryConfigured()) {
      return NextResponse.json({ error: "Cloudinary tidak dikonfigurasi" }, { status: 500 });
    }

    await cloudinary.uploader.destroy(publicId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Gagal menghapus file" }, { status: 500 });
  }
}
