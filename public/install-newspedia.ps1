# =====================================================
# INSTALL SCRIPT NEWSPEDIA
# Cara pakai: Save file ini sebagai install.ps1, lalu klik kanan > Run with PowerShell
# =====================================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  INSTALLER NEWSPEDIA WEBSITE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Buat folder
$folder = "C:\newspedia"
Write-Host "[1/6] Membuat folder $folder..." -ForegroundColor Yellow
if (!(Test-Path $folder)) {
    New-Item -ItemType Directory -Path $folder | Out-Null
}
Set-Location $folder

# Step 2: Buat package.json
Write-Host "[2/6] Membuat package.json..." -ForegroundColor Yellow
$packageJson = @'
{
  "name": "newspedia",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:generate": "prisma generate",
    "postinstall": "prisma generate"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.1.1",
    "@prisma/client": "^6.11.1",
    "@radix-ui/react-accordion": "^1.2.11",
    "@radix-ui/react-alert-dialog": "^1.1.14",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.2",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-popover": "^1.1.14",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-scroll-area": "^1.2.9",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.5",
    "@radix-ui/react-tabs": "^1.1.12",
    "@radix-ui/react-toast": "^1.2.14",
    "@radix-ui/react-tooltip": "^1.2.7",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "framer-motion": "^12.23.2",
    "lucide-react": "^0.525.0",
    "next": "^15.3.1",
    "next-themes": "^0.4.6",
    "prisma": "^6.11.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.60.0",
    "react-markdown": "^10.1.0",
    "sonner": "^2.0.6",
    "tailwind-merge": "^3.3.1",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^4.0.2",
    "zustand": "^5.0.6"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "^15.3.1",
    "tailwindcss": "^4",
    "tw-animate-css": "^1.3.5",
    "typescript": "^5"
  }
}
'@
$packageJson | Out-File -FilePath "package.json" -Encoding utf8

# Step 3: Buat .env
Write-Host "[3/6] Membuat file .env..." -ForegroundColor Yellow
$envContent = @'
DATABASE_URL="postgresql://postgres.kbryqmfchrqzxzglbymz:newspedia123@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres.kbryqmfchrqzxzglbymz:newspedia123@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"
NEXT_PUBLIC_SITE_URL="https://newspedia.my.id"
NEXT_PUBLIC_SITE_NAME="NewsPedia"
'@
$envContent | Out-File -FilePath ".env" -Encoding utf8

# Step 4: Buat next.config.ts
Write-Host "[4/6] Membuat next.config.ts..." -ForegroundColor Yellow
$nextConfig = @'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
'@
$nextConfig | Out-File -FilePath "next.config.ts" -Encoding utf8

# Step 5: Buat tsconfig.json
Write-Host "[5/6] Membuat tsconfig.json..." -ForegroundColor Yellow
$tsConfig = @'
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
'@
$tsConfig | Out-File -FilePath "tsconfig.json" -Encoding utf8

# Step 6: Buat tailwind.config.ts
Write-Host "[6/6] Membuat tailwind.config.ts..." -ForegroundColor Yellow
$tailwindConfig = @'
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
        display: ["var(--font-geist-sans)"],
      },
    },
  },
  plugins: [],
};

export default config;
'@
$tailwindConfig | Out-File -FilePath "tailwind.config.ts" -Encoding utf8

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  FILE DASAR BERHASIL DIBUAT!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Folder: $folder" -ForegroundColor Cyan
Write-Host ""
Write-Host "LANGKAH SELANJUTNYA:" -ForegroundColor Yellow
Write-Host "1. Buka folder C:\newspedia di File Explorer" -ForegroundColor White
Write-Host "2. Klik kanan > Open in Terminal" -ForegroundColor White
Write-Host "3. Ketik: npm install" -ForegroundColor White
Write-Host "4. Tunggu sampai selesai" -ForegroundColor White
Write-Host ""
Write-Host "Tekan tombol apapun untuk keluar..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
