# 🚀 Panduan Deployment NewsPedia ke Vercel

## 📋 Prasyarat

Sebelum memulai, pastikan Anda memiliki:
- Akun GitHub (gratis)
- Akun Vercel (gratis)
- Akun Supabase (gratis) - untuk database PostgreSQL
- Domain: newspedia.my.id (sudah Anda miliki)

---

## 🔧 Langkah 1: Setup Database di Supabase

### 1.1 Buat Akun Supabase
1. Kunjungi [supabase.com](https://supabase.com)
2. Klik "Start your project"
3. Sign up dengan GitHub atau Email

### 1.2 Buat Project Baru
1. Klik "New Project"
2. Isi form:
   - **Name**: `newspedia`
   - **Database Password**: Buat password yang kuat (simpan baik-baik!)
   - **Region**: Pilih `Southeast Asia (Singapore)` - terdekat dengan Indonesia
3. Klik "Create new project"
4. Tunggu ± 2 menit sampai project siap

### 1.3 Dapatkan Connection String
1. Di dashboard Supabase, pergi ke **Settings** (⚙️) > **Database**
2. Scroll ke bagian **Connection string**
3. Copy **Connection string** untuk **Mode: Session** (port 5432)
4. Copy juga **Connection string** untuk **Mode: Transaction** (port 6543)

Format connection string:
```
# Transaction mode (untuk DATABASE_URL)
postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres

# Session mode (untuk DIRECT_URL)
postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
```

**Penting:** Ganti `[YOUR-PASSWORD]` dengan password database yang Anda buat!

---

## 🐙 Langkah 2: Push Code ke GitHub

### 2.1 Buat Repository Baru
1. Kunjungi [github.com](https://github.com)
2. Klik "+" > "New repository"
3. Isi:
   - **Repository name**: `newspedia`
   - **Visibility**: Private (recommended) atau Public
4. Klik "Create repository"

### 2.2 Push Code dari Local
Di terminal lokal Anda:

```bash
# Inisialisasi git (jika belum)
git init

# Tambahkan semua file
git add .

# Commit
git commit -m "Initial commit - NewsPedia website"

# Tambahkan remote repository
git remote add origin https://github.com/USERNAME/newspedia.git

# Push ke GitHub
git branch -M main
git push -u origin main
```

**Catatan:** Ganti `USERNAME` dengan username GitHub Anda!

---

## ▲ Langkah 3: Deploy ke Vercel

### 3.1 Buat Akun Vercel
1. Kunjungi [vercel.com](https://vercel.com)
2. Klik "Sign Up"
3. Pilih "Continue with GitHub" (lebih mudah)

### 3.2 Import Project
1. Di dashboard Vercel, klik "Add New..." > "Project"
2. Pilih repository `newspedia` dari daftar
3. Klik "Import"

### 3.3 Konfigurasi Project
1. **Framework Preset**: Next.js (otomatis terdeteksi)
2. **Root Directory**: `./` (default)
3. **Build Command**: `bun run build` (atau biarkan default)
4. **Output Directory**: `.next` (default)

### 3.4 Tambahkan Environment Variables
Klik "Environment Variables" dan tambahkan:

| Name | Value |
|------|-------|
| `DATABASE_URL` | `postgresql://postgres.[REF]:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres` |
| `DIRECT_URL` | `postgresql://postgres.[REF]:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres` |
| `NEXT_PUBLIC_SITE_URL` | `https://newspedia.my.id` |
| `NEXT_PUBLIC_SITE_NAME` | `NewsPedia` |

**Penting:** Ganti `[REF]` dan `[PASSWORD]` dengan nilai dari Supabase!

### 3.5 Deploy
1. Klik "Deploy"
2. Tunggu ± 3-5 menit untuk proses build
3. Jika berhasil, Anda akan melihat confetti! 🎉

---

## 🌐 Langkah 4: Setup Custom Domain (newspedia.my.id)

### 4.1 Tambahkan Domain di Vercel
1. Di dashboard project Vercel, pergi ke **Settings** > **Domains**
2. Ketik `newspedia.my.id` dan klik "Add"
3. Pilih opsi untuk menambahkan juga `www.newspedia.my.id`

### 4.2 Konfigurasi DNS di Provider Domain
Di panel DNS tempat Anda membeli domain:

**Untuk domain utama (newspedia.my.id):**
| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |

**Untuk www subdomain:**
| Type | Name | Value |
|------|------|-------|
| CNAME | www | cname.vercel-dns.com |

### 4.3 Tunggu Propagasi DNS
- Proses ini memakan waktu 5 menit - 48 jam (biasanya < 1 jam)
- Vercel akan otomatis issue SSL certificate

---

## 🗄️ Langkah 5: Setup Database (Migration & Seed)

### 5.1 Jalankan Migration
Setelah deploy berhasil, Anda perlu migrate database:

**Opsi A: Via Vercel CLI (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Pull environment variables
vercel env pull .env.production

# Run migration
npx prisma migrate deploy
```

**Opsi B: Via Supabase SQL Editor**
1. Buka Supabase Dashboard > SQL Editor
2. Copy isi file `prisma/migrations/.../migration.sql`
3. Paste dan jalankan

### 5.2 Seed Database (Data Awal)
```bash
# Setelah migration berhasil
bun run db:seed
```

Atau gunakan Prisma Studio untuk input data manual:
```bash
npx prisma studio
```

---

## ✅ Langkah 6: Verifikasi Deployment

### 6.1 Checklist
- [ ] Website bisa diakses di https://newspedia.my.id
- [ ] SSL certificate aktif (https hijau)
- [ ] Halaman utama tampil dengan benar
- [ ] Admin login berfungsi di https://newspedia.my.id/admin/login
- [ ] Database terhubung dengan benar

### 6.2 Troubleshooting
Jika ada error:
1. Cek **Deployment Logs** di Vercel dashboard
2. Cek **Function Logs** untuk error API
3. Pastikan environment variables sudah benar
4. Cek koneksi database di Supabase

---

## 🔄 Update & Maintenance

### Update Code
```bash
# Setelah membuat perubahan
git add .
git commit -m "Update feature XYZ"
git push

# Vercel akan otomatis deploy ulang!
```

### Backup Database
Supabase membuat backup otomatis, tapi Anda juga bisa:
1. Pergi ke Supabase > Database > Backups
2. Download backup secara manual

### Monitor Performance
- Vercel Analytics: gratis untuk hobby plan
- Supabase Dashboard: monitor database usage

---

## 📞 Support

Jika mengalami masalah:
1. **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
2. **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
3. **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)

---

## 🎉 Selesai!

Website NewsPedia Anda sekarang sudah online di:
- **URL**: https://newspedia.my.id
- **Admin**: https://newspedia.my.id/admin/login
- **Default Login**: admin / admin123

**Jangan lupa ganti password admin setelah login pertama!**
