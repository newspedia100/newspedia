// NewsPedia Article Data Store
// Sample articles for the news website

export type CategoryType = 
  | "teknologi" 
  | "gaming" 
  | "tips-trik" 
  | "ai-tools" 
  | "politik" 
  | "hukum" 
  | "sosial" 
  | "news-video";

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageAlt: string;
  author: string;
  authorAvatar: string;
  readTime: number;
  views: number;
  isFeatured: boolean;
  category: CategoryType;
  tags: string[];
  publishedAt: string;
}

export interface CategoryInfo {
  id: CategoryType;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
}

export const categories: CategoryInfo[] = [
  // Tech & Lifestyle
  {
    id: "teknologi",
    name: "Teknologi",
    slug: "teknologi",
    description: "Berita terkini seputar gadget, software, dan inovasi teknologi",
    color: "teal",
    icon: "Cpu",
  },
  {
    id: "gaming",
    name: "Gaming",
    slug: "gaming",
    description: "Review game, tips gaming, dan berita esports",
    color: "purple",
    icon: "Gamepad2",
  },
  {
    id: "tips-trik",
    name: "Tips & Trik",
    slug: "tips-trik",
    description: "Tutorial praktis dan tips produktivitas untuk kehidupan sehari-hari",
    color: "orange",
    icon: "Lightbulb",
  },
  {
    id: "ai-tools",
    name: "AI Tools",
    slug: "ai-tools",
    description: "Review dan tutorial AI tools terbaru untuk produktivitas maksimal",
    color: "cyan",
    icon: "Sparkles",
  },
  // News Categories
  {
    id: "politik",
    name: "Politik",
    slug: "politik",
    description: "Berita politik terkini dari dalam dan luar negeri",
    color: "red",
    icon: "Landmark",
  },
  {
    id: "hukum",
    name: "Hukum",
    slug: "hukum",
    description: "Kasus hukum, peraturan baru, dan update legislatif",
    color: "blue",
    icon: "Scale",
  },
  {
    id: "sosial",
    name: "Sosial",
    slug: "sosial",
    description: "Isu sosial, komunitas, dan kehidupan masyarakat",
    color: "green",
    icon: "Users",
  },
  {
    id: "news-video",
    name: "News Video",
    slug: "news-video",
    description: "Video berita terkini dan dokumenter singkat",
    color: "rose",
    icon: "Video",
  },
];

export const articles: Article[] = [
  // ========== TEKNOLOGI ==========
  {
    id: "tech-1",
    title: "iPhone 17 Pro Resmi Dirilis! Kamera Periscope dan Chip A20 yang Mengejutkan",
    slug: "iphone-17-pro-resmi-dirilis-kamera-periscope-chip-a20",
    excerpt: "Apple menggebrak pasar dengan iPhone 17 Pro yang mengusung kamera periscope 12x optical zoom dan chip A20 dengan 3nm+ process.",
    content: `
<p>Apple kembali menggebrak pasar smartphone dengan rilisnya iPhone 17 Pro. Smartphone terbaru ini membawa berbagai peningkatan signifikan yang membuatnya layak dijadikan upgrade dari seri sebelumnya.</p>

<h2>Desain Premium dengan Material Titan Grade 5</h2>
<p>iPhone 17 Pro mengusung desain premium dengan frame titanium grade 5 yang sama kuatnya dengan yang digunakan pada pesawat luar angkasa. Material ini membuat ponsel lebih ringan namun tetap kokoh dan tahan lama.</p>

<h2>Kamera Periscope dengan 12x Optical Zoom</h2>
<p>Sistem kamera iPhone 17 Pro kini dilengkapi sensor 64MP dengan kamera periscope yang menawarkan 12x optical zoom. Hasil foto dengan detail yang luar biasa bahkan dalam kondisi cahaya rendah.</p>

<h2>Chip A20 dengan 3nm+ Process</h2>
<p>Chip A20 yang digunakan pada iPhone 17 Pro menawarkan performa hingga 50% lebih cepat dibanding generasi sebelumnya dengan efisiensi energi yang lebih baik.</p>

<h2>Harga dan Ketersediaan</h2>
<p>iPhone 17 Pro dibanderol dengan harga mulai dari Rp 24.999.000 untuk varian 256GB. Tersedia dalam lima pilihan warna eksklusif.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=400&fit=crop",
    imageAlt: "iPhone 17 Pro dengan desain premium",
    author: "Ahmad Rizky",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmad",
    readTime: 5,
    views: 15420,
    isFeatured: true,
    category: "teknologi",
    tags: ["iPhone", "Apple", "Smartphone", "Gadget"],
    publishedAt: "2026-03-15T08:00:00Z",
  },
  {
    id: "tech-2",
    title: "Samsung Galaxy S26 Ultra Leak: Foldable Display dan Battery 7000mAh",
    slug: "samsung-galaxy-s26-ultra-leak-foldable-display",
    excerpt: "Leak mengejutkan mengungkap Samsung Galaxy S26 Ultra akan mengusung teknologi foldable display dan baterai jumbo 7000mAh.",
    content: `
<p>Samsung diperkirakan akan merilis Galaxy S26 Ultra dengan teknologi revolusioner pada kuartal ketiga 2026. Berikut adalah leak spesifikasi yang beredar.</p>

<h2>Foldable Display Technology</h2>
<p>Galaxy S26 Ultra dikabarkan akan mengusung teknologi foldable display yang memungkinkan layar melipat secara horizontal untuk portabilitas maksimal.</p>

<h2>Baterai 7000mAh</h2>
<p>Samsung akan memasang baterai jumbo 7000mAh dengan fast charging 100W. Wireless charging juga mendapat peningkatan menjadi 45W.</p>

<h2>Kamera 300MP</h2>
<p>Sensor utama 300MP dengan AI enhancement akan menjadi fitur utama, mengalahkan semua kompetitor di pasaran.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=400&fit=crop",
    imageAlt: "Samsung Galaxy S26 Ultra",
    author: "Rina Marlina",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rina",
    readTime: 4,
    views: 12890,
    isFeatured: false,
    category: "teknologi",
    tags: ["Samsung", "Galaxy S26", "Android", "Smartphone"],
    publishedAt: "2026-02-28T10:00:00Z",
  },
  // ========== GAMING ==========
  {
    id: "game-1",
    title: "GTA 6 Resmi Rilis Maret 2026! Berikut Fitur yang Membuat Gamer Tidak Sabar",
    slug: "gta-6-resmi-rilis-maret-2026-fitur-baru",
    excerpt: "Rockstar Games akhirnya merilis GTA 6 dengan fitur revolusioner termasuk Vice City yang diperluas dan sistem ekonomi realistis.",
    content: `
<p>Para gamer akhirnya bisa bernapas lega setelah Rockstar Games merilis GTA 6 secara resni pada Maret 2026. Game yang ditunggu-tunggu ini membawa berbagai fitur revolusioner.</p>

<h2>Vice City Yang Diperluas</h2>
<p>GTA 6 membawa pemain ke Vice City yang jauh lebih luas dari versi sebelumnya. Kota ini digambarkan dengan detail yang luar biasa, dari pantai hingga kehidupan malam.</p>

<h2>Sistem Ekonomi Realistis</h2>
<p>Game ini menghadirkan sistem ekonomi yang sangat realistis dengan inflasi, investasi properti, dan bisnis yang bisa dikelola pemain.</p>

<h2>Multiplayer Terintegrasi</h2>
<p>GTA Online 2 hadir dengan integrasi sempurna ke single player, memungkinkan transisi mulus antara mode solo dan multiplayer.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=400&fit=crop",
    imageAlt: "GTA 6 Vice City",
    author: "Budi Santoso",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=budi",
    readTime: 6,
    views: 89420,
    isFeatured: true,
    category: "gaming",
    tags: ["GTA 6", "Rockstar", "Gaming", "Vice City"],
    publishedAt: "2026-03-10T15:00:00Z",
  },
  {
    id: "game-2",
    title: "PlayStation 6 Diumumkan! Spesifikasi yang Mengalahkan PC Gaming High-End",
    slug: "playstation-6-diumumkan-spesifikasi-pc-gaming",
    excerpt: "Sony mengumumkan PlayStation 6 dengan custom AMD chip, 32GB RAM, dan teknologi ray tracing generasi ketiga.",
    content: `
<p>Sony secara resmi mengumumkan PlayStation 6 yang akan menjadi konsol paling powerful di pasaran saat rilis nanti.</p>

<h2>Custom AMD Chip</h2>
<p>PS6 mengusung custom AMD chip dengan arsitektur 2nm yang menawarkan performa 4x lipat dari PS5. Ray tracing generasi ketiga hadir dengan kualitas sinematik.</p>

<h2>32GB Unified Memory</h2>
<p>Dengan 32GB unified memory, PS6 mampu menjalankan game 8K dengan frame rate stabil 60fps.</p>

<h2>Backward Compatibility</h2>
<p>Sony memastikan PS6 mendukung semua game dari PS1 hingga PS5, menjadikannya konsol yang sempurna untuk kolektor.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=400&fit=crop",
    imageAlt: "PlayStation 6 console",
    author: "Yoga Pratama",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=yoga",
    readTime: 5,
    views: 67890,
    isFeatured: false,
    category: "gaming",
    tags: ["PlayStation", "Sony", "Console", "Gaming"],
    publishedAt: "2026-02-20T12:00:00Z",
  },
  // ========== AI TOOLS ==========
  {
    id: "ai-1",
    title: "GPT-5 Resmi Rilis! Kemampuan Reasoning yang Mendekati Manusia",
    slug: "gpt-5-resmi-rilis-kemampuan-reasoning-manusia",
    excerpt: "OpenAI merilis GPT-5 dengan kemampuan reasoning yang mengejutkan, mendekati level manusia dalam berbagai tes standar.",
    content: `
<p>OpenAI secara resmi merilis GPT-5 yang membawa AI ke level baru dengan kemampuan reasoning yang mendekati manusia.</p>

<h2>Reasoning Capability</h2>
<p>GPT-5 mampu menyelesaikan masalah kompleks dengan pendekatan logis yang mirip manusia. Dalam tes standar, GPT-5 mencapai skor 95% pada tes reasoning profesional.</p>

<h2>Context Window Unlimited</h2>
<p>Berbeda dengan pendahulunya, GPT-5 menawarkan context window yang praktis unlimited, memungkinkan analisis dokumen tanpa batas.</p>

<h2>Multimodal Native</h2>
<p>GPT-5 dirancang sebagai model multimodal native, memahami teks, gambar, audio, dan video secara seamless.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    imageAlt: "GPT-5 AI Technology",
    author: "Dewi Sartika",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dewi",
    readTime: 7,
    views: 45230,
    isFeatured: true,
    category: "ai-tools",
    tags: ["AI", "GPT-5", "OpenAI", "Technology"],
    publishedAt: "2026-03-12T09:00:00Z",
  },
  {
    id: "ai-2",
    title: "10 AI Tools Gratis Terbaik 2026 yang Wajib Dicoba untuk Produktivitas",
    slug: "10-ai-tools-gratis-terbaik-2026-produktivitas",
    excerpt: "Tingkatkan produktivitas Anda dengan 10 AI tools gratis terbaik di 2026, dari writing assistant hingga video generator.",
    content: `
<p>Perkembangan AI semakin pesat dan kini banyak tools canggih yang bisa diakses secara gratis. Berikut 10 AI tools yang wajib Anda coba.</p>

<h2>1. ChatGPT Free</h2>
<p>Versi gratis ChatGPT kini mendukung GPT-4.5 mini yang cukup powerful untuk kebutuhan sehari-hari.</p>

<h2>2. Claude Free Tier</h2>
<p>Anthropic menawarkan tier gratis Claude dengan context window 100K tokens.</p>

<h2>3. Perplexity AI</h2>
<p>Mesin pencari AI dengan akses real-time ke informasi terbaru dari web.</p>

<h2>4. Canva AI Studio</h2>
<p>Desain visual dengan AI yang semakin canggih, termasuk video generation.</p>

<h2>5. Notion AI</h2>
<p>Produktivitas maksimal dengan AI writing dan database automation.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&h=400&fit=crop",
    imageAlt: "AI Tools untuk produktivitas",
    author: "Andi Wijaya",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=andi",
    readTime: 8,
    views: 31200,
    isFeatured: false,
    category: "ai-tools",
    tags: ["AI", "Productivity", "Tools", "Gratis"],
    publishedAt: "2026-02-15T14:00:00Z",
  },
  // ========== TIPS & TRIK ==========
  {
    id: "tips-1",
    title: "Cara Menghemat Baterai Android Hingga 70% Lebih Lama di 2026",
    slug: "cara-menghemat-baterai-android-70-persen-2026",
    excerpt: "Tips dan trik terbaru untuk menghemat baterai Android dengan fitur Android 17 yang lebih efisien.",
    content: `
<p>Masalah baterai cepat habis memang menjadi keluhan umum pengguna Android. Berikut tips terbaru untuk 2026.</p>

<h2>1. AI Battery Optimization</h2>
<p>Android 17 menghadirkan AI battery optimization yang belajar dari pola penggunaan Anda untuk mengoptimalkan konsumsi baterai secara otomatis.</p>

<h2>2. Dark Mode Adaptive</h2>
<p>Fitur dark mode adaptive akan mengaktifkan mode gelap berdasarkan kondisi pencahayaan dan level baterai.</p>

<h2>3. App Hibernation</h2>
<p>Aplikasi yang jarang digunakan akan otomatis di-hibernate untuk mencegah drain baterai di background.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1605170439002-90845e8c0137?w=800&h=400&fit=crop",
    imageAlt: "Tips hemat baterai Android",
    author: "Siti Nurhaliza",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=siti",
    readTime: 5,
    views: 28340,
    isFeatured: false,
    category: "tips-trik",
    tags: ["Android", "Tips", "Baterai", "Tutorial"],
    publishedAt: "2026-03-05T09:00:00Z",
  },
  {
    id: "tips-2",
    title: "Cara Membuat CV Profesional dengan AI dalam 3 Menit - Template 2026",
    slug: "cara-membuat-cv-profesional-ai-3-menit-2026",
    excerpt: "Tutorial membuat CV profesional dengan AI tools terbaru, lengkap dengan template ATS-friendly untuk 2026.",
    content: `
<p>CV yang profesional adalah kunci untuk mendapatkan perhatian recruiter. Dengan AI terbaru, Anda bisa membuat CV yang menonjol dalam 3 menit.</p>

<h2>Langkah 1: Pilih AI CV Builder</h2>
<p>Gunakan tools seperti ChatGPT CV Mode, Claude Resume, atau Kickresume AI untuk hasil terbaik.</p>

<h2>Langkah 2: Input Data</h2>
<p>Masukkan pengalaman kerja, skill, dan pencapaian Anda. AI akan mengoptimalkan kata-kata secara otomatis.</p>

<h2>Langkah 3: Pilih Template</h2>
<p>Pilih template ATS-friendly yang sudah dioptimasi untuk sistem rekrutmen modern.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    imageAlt: "Membuat CV dengan AI",
    author: "Maya Sari",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maya",
    readTime: 4,
    views: 19870,
    isFeatured: false,
    category: "tips-trik",
    tags: ["CV", "AI", "Karir", "Tutorial"],
    publishedAt: "2026-02-10T08:00:00Z",
  },
  // ========== POLITIK ==========
  {
    id: "politik-1",
    title: "Pemilu Legislatif 2026: Hasil Quick Count Menunjukkan Persaingan Ketat",
    slug: "pemilu-legislatif-2026-hasil-quick-count-persaingan-ketat",
    excerpt: "Quick count pemilu legislatif 2026 menunjukkan persaingan ketat antar partai politik dengan selisih suara yang tipis.",
    content: `
<p>Hasil quick count pemilu legislatif 2026 menunjukkan persaingan yang sangat ketat. Berbagai lembaga survei merilis hasilnya dengan perbedaan tipis.</p>

<h2>Hasil Quick Count</h2>
<p>Dari 5 lembaga survei terpercaya, hasil menunjukkan tidak ada partai yang meraih suara mayoritas mutlak. Ini mengindikasikan parlemen akan lebih beragam.</p>

<h2>Partai Pemuncak</h2>
<p>Tiga partai besar bersaing di posisi teratas dengan selisih suara kurang dari 2%. Hal ini membuat koalisi menjadi sangat penting.</p>

<h2>Resmi KPU</h2>
<p>KPU akan mengumumkan hasil resmi dalam 7 hari ke depan setelah proses rekapitulasi selesai di seluruh TPS.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&h=400&fit=crop",
    imageAlt: "Pemilu Legislatif 2026",
    author: "Agus Prabowo",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=agus",
    readTime: 6,
    views: 125670,
    isFeatured: true,
    category: "politik",
    tags: ["Pemilu", "Politik", "Legislatif", "2026"],
    publishedAt: "2026-03-08T18:00:00Z",
  },
  {
    id: "politik-2",
    title: "Presiden Tetapkan UU Perlindungan Data Pribadi, Sanksi Lebih Berat",
    slug: "presiden-tetapkan-uu-perlindungan-data-pribadi-sanksi-berat",
    excerpt: "Undang-Undang Perlindungan Data Pribadi resmi ditandatangani dengan sanksi pidana hingga 10 tahun penjara bagi pelanggar.",
    content: `
<p>Presiden resmi menandatangani Undang-Undang Perlindungan Data Pribadi yang telah dibahas sejak tahun lalu. UU ini memberikan perlindungan lebih bagi warga.</p>

<h2>Poin Utama UU</h2>
<p>UU ini mengatur tentang izin penggunaan data, hak untuk dilupakan, dan sanksi tegas bagi perusahaan yang menyalahgunakan data pribadi.</p>

<h2>Sanksi Berat</h2>
<p>Pelanggaran berat seperti penjualan data pribadi dapat dikenakan sanksi pidana hingga 10 tahun penjara dan denda miliaran rupiah.</p>

<h2>Implikasi Bisnis</h2>
<p>Perusahaan teknologi harus menyesuaikan sistem mereka dalam waktu 12 bulan untuk mematuhi regulasi baru ini.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=400&fit=crop",
    imageAlt: "UU Perlindungan Data Pribadi",
    author: "Bambang Sutrisno",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bambang",
    readTime: 5,
    views: 78450,
    isFeatured: false,
    category: "politik",
    tags: ["UU", "Data Pribadi", "Regulasi", "Pemerintah"],
    publishedAt: "2026-02-25T14:00:00Z",
  },
  {
    id: "politik-3",
    title: "KTT ASEAN 2026: Indonesia Ajukan Proposal Zona Bebas Nuklir Asia Tenggara",
    slug: "ktt-asean-2026-indonesia-ajukan-proposal-zona-bebas-nuklir",
    excerpt: "Indonesia mengajukan proposal zona bebas nuklir di Asia Tenggara dalam KTT ASEAN yang diselenggarakan di Jakarta.",
    content: `
<p>Dalam KTT ASEAN 2026 yang berlangsung di Jakarta, Indonesia mengajukan proposal penting tentang zona bebas nuklir di kawasan Asia Tenggara.</p>

<h2>Isi Proposal</h2>
<p>Proposal tersebut mencakup larangan pengembangan, pengujian, dan penempatan senjata nuklir di wilayah ASEAN. Semua negara anggota diminta untuk menandatangani perjanjian.</p>

<h2>Respons Negara Lain</h2>
<p>Sebagian besar negara ASEAN menyambut baik proposal ini. Filipina dan Vietnam menyatakan dukungan penuh, sementara beberapa negara lain masih mempelajari implikasinya.</p>

<h2>Langkah Selanjutnya</h2>
<p>Proposal akan dibahas lebih lanjut dalam pertemuan menteri luar negeri sebelum disahkan dalam KTT mendatang.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=400&fit=crop",
    imageAlt: "KTT ASEAN 2026",
    author: "Dewi Lestari",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dewilestari",
    readTime: 5,
    views: 45230,
    isFeatured: false,
    category: "politik",
    tags: ["ASEAN", "Diplomasi", "Indonesia", "Internasional"],
    publishedAt: "2026-03-02T16:00:00Z",
  },
  {
    id: "politik-4",
    title: "Pemprov DKI Resmikan Program Jakarta Smart City 2026, Layanan Publik Digital",
    slug: "pemprov-dki-resmikan-jakarta-smart-city-2026",
    excerpt: "Pemerintah Provinsi DKI Jakarta meresmikan program Jakarta Smart City 2026 dengan layanan publik terintegrasi berbasis AI.",
    content: `
<p>Gubernur DKI Jakarta meresmikan program Jakarta Smart City 2026 yang mengintegrasikan seluruh layanan publik dalam satu platform digital.</p>

<h2>Fitur Utama</h2>
<p>Warga Jakarta dapat mengakses layanan KTP, pengadilan, perizinan, hingga transportasi umum melalui satu aplikasi super-app.</p>

<h2>AI-Powered Services</h2>
<p>Chatbot AI tersedia 24/7 untuk menjawab pertanyaan warga. Sistem prediktif juga digunakan untuk manajemen lalu lintas.</p>

<h2>Target 2027</h2>
<p>Dalam setahun, seluruh kecamatan di Jakarta diharapkan terlayani sistem ini dengan tingkat kepuasan warga minimal 90%.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=400&fit=crop",
    imageAlt: "Jakarta Smart City 2026",
    author: "Rizki Ramadhan",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rizki",
    readTime: 4,
    views: 34120,
    isFeatured: false,
    category: "politik",
    tags: ["Jakarta", "Smart City", "Pemerintah", "Digital"],
    publishedAt: "2026-02-18T10:00:00Z",
  },
  // ========== HUKUM ==========
  {
    id: "hukum-1",
    title: "MA Tetapkan Putusan Permohonan Uji Judicial Review UU ITE, Pasal Karet Dihapus",
    slug: "ma-tetapkan-putusan-judicial-review-uu-ite-pasal-karet-dihapus",
    excerpt: "Mahkamah Agung mengabulkan permohonan judicial review UU ITE dan menghapuskan pasal karet yang kerap dikritik.",
    content: `
<p>Mahkamah Agung mengeluarkan putusan penting terkait judicial review UU ITE. Putusan ini mengubah secara signifikan implementasi undang-undang tersebut.</p>

<h2>Pasal yang Dihapus</h2>
<p>Pasal 28 ayat 2 yang dianggap sebagai "pasal karet" telah dihapus. Pasal ini sebelumnya sering digunakan untuk menjerat warga atas unggahan di media sosial.</p>

<h2>Alasan Putusan</h2>
<p>MA menilai pasal tersebut bertentangan dengan prinsip kepastian hukum dan potensial melanggar hak kebebasan berpendapat yang dijamin konstitusi.</p>

<h2>Dampak Putusan</h2>
<p>Dengan dihapusnya pasal ini, penegak hukum tidak dapat lagi menggunakan pasal tersebut. Ribuan kasus yang sedang berjalan akan diperiksa ulang.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop",
    imageAlt: "Putusan MA UU ITE",
    author: "Hendra Wijaya",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=hendra",
    readTime: 6,
    views: 98760,
    isFeatured: true,
    category: "hukum",
    tags: ["MA", "UU ITE", "Judicial Review", "Hukum"],
    publishedAt: "2026-03-12T11:00:00Z",
  },
  {
    id: "hukum-2",
    title: "KPK Tetapkan Tersangka Baru Kasus Korupsi Proyek Infrastruktur Rp 2,5 Triliun",
    slug: "kpk-tetapkan-tersangka-korupsi-proyek-infrastruktur-2-5-triliun",
    excerpt: "Komisi Pemberantasan Korupsi menetapkan mantan menteri sebagai tersangka dalam kasus korupsi proyek infrastruktur.",
    content: `
<p>KPK menetapkan mantan menteri sebagai tersangka dalam kasus dugaan korupsi proyek infrastruktur senilai Rp 2,5 triliun.</p>

<h2>Identitas Tersangka</h2>
<p>Tersangka adalah mantan menteri yang menjabat periode sebelumnya. Ia diduga terlibat dalam penggelembungan anggaran proyek.</p>

<h2>Modus Operandi</h2>
<p>KPK mengungkap modus mark-up anggaran proyek dan penerimaan fee dari kontraktor pemenang tender. Bukti sudah cukup kuat untuk stage penyidikan.</p>

<h2>Penyitaan Aset</h2>
<p>KPK telah menyita berbagai aset tersangka termasuk properti di beberapa kota dan rekening bank dengan nilai total Rp 500 miliar.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop",
    imageAlt: "KPK Tetapkan Tersangka",
    author: "Sri Mulyani",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=srimulyani",
    readTime: 5,
    views: 87230,
    isFeatured: false,
    category: "hukum",
    tags: ["KPK", "Korupsi", "Hukum", "Infrastruktur"],
    publishedAt: "2026-02-22T09:00:00Z",
  },
  {
    id: "hukum-3",
    title: "Pengadilan Negeri Jakarta Pusat Vonis Koruptor Dana Bantuan 15 Tahun Penjara",
    slug: "pn-jakarta-pusat-vonis-koruptor-dana-bantuan-15-tahun",
    excerpt: "Pengadilan Negeri Jakarta Pusat menjatuhkan vonis 15 tahun penjara kepada terdakwa koruptor dana bantuan sosial.",
    content: `
<p>Pengadilan Negeri Jakarta Pusat menjatuhkan vonis 15 tahun penjara kepada terdakwa kasus korupsi dana bantuan sosial.</p>

<h2>Putusan Pengadilan</h2>
<p>Majelis hakim memutuskan terdakwa terbukti secara sah melakukan korupsi dana bantuan sosial senilai Rp 150 miliar.</p>

<h2>Hukuman Tambahan</h2>
<p>Selain hukuman penjara, terdakwa juga diwajibkan membayar uang pengganti Rp 100 miliar atau diganti dengan hukuman tambahan 3 tahun.</p>

<h2>Respons Jaksa</h2>
<p>Tim jaksa penuntut umum menyatakan puas dengan putusan yang sejalan dengan tuntutan. Pihak terdakwa menyatakan akan pikir-pikir banding.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop",
    imageAlt: "Vonis Koruptor",
    author: "Ahmad Yani",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmadyani",
    readTime: 4,
    views: 45670,
    isFeatured: false,
    category: "hukum",
    tags: ["Pengadilan", "Korupsi", "Vonis", "Hukum"],
    publishedAt: "2026-03-05T13:00:00Z",
  },
  {
    id: "hukum-4",
    title: "RUU Cipta Kerja Omnibus Law Disahkan DPR, Buruh Gelar Unjuk Rasa Besar",
    slug: "ruu-cipta-kerja-omnibus-law-disahkan-dpr-buruh-unjuk-rasa",
    excerpt: "DPR resmi mengesahkan RUU Cipta Kerja Omnibus Law di tengah protes besar dari serikat buruh di berbagai kota.",
    content: `
<p>DPR RI resmi mengesahkan RUU Cipta Kerja Omnibus Law menjadi undang-undang di tengah aksi protes dari berbagai serikat buruh.</p>

<h2>Isi Undang-Undang</h2>
<p>UU ini mengkonsolidasikan 79 undang-undang terkait ketenagakerjaan dengan tujuan menyederhanakan regulasi dan meningkatkan investasi.</p>

<h2>Protes Buruh</h2>
<p>Serikat buruh di berbagai kota menggelar aksi unjuk rasa besar-besaran. Mereka menuntut penghapusan beberapa pasal yang dianggap merugikan pekerja.</p>

<h2>Respons Pemerintah</h2>
<p>Pemerintah menyatakan UU ini penting untuk menarik investasi dan menciptakan lapangan kerja baru. Implementasi akan dilakukan bertahap.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=400&fit=crop",
    imageAlt: "Protes Buruh RUU Cipta Kerja",
    author: "Budi Hartono",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=budihartono",
    readTime: 5,
    views: 67890,
    isFeatured: false,
    category: "hukum",
    tags: ["UU", "Buruh", "DPR", "Legislatif"],
    publishedAt: "2026-02-28T15:00:00Z",
  },
  // ========== SOSIAL ==========
  {
    id: "sosial-1",
    title: "BMKG Keluarkan Peringatan Dini Potensi Banjir Jakarta, Warga Diminta Waspada",
    slug: "bmkg-peringatan-dini-potensi-banjir-jakarta-warga-waspada",
    excerpt: "BMKG mengeluarkan peringatan dini potensi banjir di Jakarta akibat hujan intensitas tinggi selama 3 hari ke depan.",
    content: `
<p>BMKG mengeluarkan peringatan dini potensi banjir di wilayah DKI Jakarta dan sekitarnya akibat curah hujan tinggi yang diprediksi berlangsung 3 hari.</p>

<h2>Wilayah Terdampak</h2>
<p>Wilayah yang berpotensi banjir meliputi Jakarta Timur, Jakarta Utara, dan sebagian Jakarta Barat. Tinggi air diperkirakan mencapai 50-100cm.</p>

<h2>Status Siaga</h2>
<p>BPBD Jakarta telah menetapkan status siaga darurat dan menyiapkan ratusan personel untuk evakuasi jika diperlukan.</p>

<h2>Warga Diminta Waspada</h2>
<p>Warga di daerah rawan banjir diminta untuk menyiapkan barang berharga, mengecek saluran air, dan mengikuti informasi resmi dari pemerintah.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1446034295857-c39f8844fad4?w=800&h=400&fit=crop",
    imageAlt: "Peringatan Banjir Jakarta",
    author: "Andi Prasetyo",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=andiprasetyo",
    readTime: 4,
    views: 156780,
    isFeatured: true,
    category: "sosial",
    tags: ["BMKG", "Banjir", "Jakarta", "Peringatan"],
    publishedAt: "2026-03-15T06:00:00Z",
  },
  {
    id: "sosial-2",
    title: "UNICEF: Stunting Indonesia Turun ke 19%, Target 2027 Capai 14%",
    slug: "unicef-stunting-indonesia-turun-19-persen-target-2027",
    excerpt: "UNICEF melaporkan prevalensi stunting di Indonesia turun menjadi 19% pada 2026, mendekati target pemerintah 14% di 2027.",
    content: `
<p>UNICEF merilis laporan terbaru yang menunjukkan prevalensi stunting di Indonesia turun menjadi 19% pada 2026.</p>

<h2>Perkembangan Positif</h2>
<p>Angka ini menunjukkan penurunan signifikan dari 21.6% di tahun sebelumnya. Pemerintah optimistis mencapai target 14% pada 2027.</p>

<h2>Program Pemerintah</h2>
<p>Penurunan ini didorong oleh program pemerintah seperti pemberian makanan tambahan, edukasi gizi, dan integrasi layanan kesehatan.</p>

<h2>Tantangan yang Tersisa</h2>
<p>Wilayah timur Indonesia masih menjadi fokus utama dengan prevalensi yang lebih tinggi. Pemerintah akan intensifkan intervensi di daerah tersebut.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=400&fit=crop",
    imageAlt: "Program Stunting Indonesia",
    author: "Dewi Anggraini",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dewianggraini",
    readTime: 5,
    views: 45670,
    isFeatured: false,
    category: "sosial",
    tags: ["Stunting", "Kesehatan", "UNICEF", "Indonesia"],
    publishedAt: "2026-02-20T10:00:00Z",
  },
  {
    id: "sosial-3",
    title: "Kasus DBD Meningkat Drastis, Kemenkes Minta Warga Aktif 3M Plus",
    slug: "kasus-dbd-meningkat-kemenkes-minta-warga-3m-plus",
    excerpt: "Kasus Demam Berdarah Dengue meningkat drastis di awal 2026, Kemenkes mengimbau warga aktif melakukan 3M Plus.",
    content: `
<p>Kementerian Kesehatan mencatat peningkatan kasus DBD yang signifikan di awal tahun 2026, terutama di wilayah Jawa dan Sumatera.</p>

<h2>Data Kasus</h2>
<p>Hingga Maret 2026, tercatat lebih dari 45.000 kasus DBD dengan 350 kematian. Angka ini meningkat 40% dibanding periode sama tahun lalu.</p>

<h2>Imbauan 3M Plus</h2>
<p>Kemenkes mengimbau warga untuk aktif menguras, menutup, dan mengubur tempat penampungan air. Plus menaburkan larvasida dan menggunakan kelambu.</p>

<h2>Ketersediaan Vaksin</h2>
<p>Vaksin DBD tersedia gratis di puskesmas untuk anak usia 6-14 tahun. Warga diharapkan memanfaatkan program imunisasi ini.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&h=400&fit=crop",
    imageAlt: "Kasus DBD Meningkat",
    author: "Dr. Siti Aminah",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sitiaminah",
    readTime: 4,
    views: 78900,
    isFeatured: false,
    category: "sosial",
    tags: ["DBD", "Kesehatan", "Kemenkes", "Wabah"],
    publishedAt: "2026-03-10T08:00:00Z",
  },
  {
    id: "sosial-4",
    title: "Indonesia Berhasil Kurangi Kemiskinan Ekstrem, BPS Catat Angka 0,8%",
    slug: "indonesia-kurangi-kemiskinan-ekstrem-bps-catat-0-8-persen",
    excerpt: "BPS mencatat angka kemiskinan ekstrem di Indonesia turun ke 0,8% pada Maret 2026, capai target RPJMN lebih awal.",
    content: `
<p>Badan Pusat Statistik merilis data kemiskinan ekstrem yang menunjukkan penurunan ke level 0,8% pada Maret 2026.</p>

<h2>Pencapaian Lebih Awal</h2>
<p>Target RPJMN sebesar 0% kemiskinan ekstrem pada 2024 hampir tercapai lebih cepat dari jadwal. Pemerintah optimistis bisa mencapai target akhir tahun.</p>

<h2>Program Pendukung</h2>
<p>Pencapaian ini didukung program PKH, bantuan sembako, dan program jaminan sosial lainnya yang menjangkau keluarga miskin ekstrem.</p>

<h2>Wilayah Fokus</h2>
<p>Papua dan NTT masih menjadi wilayah dengan prevalensi kemiskinan ekstrem tertinggi. Pemerintah akan intensifkan program khusus di daerah tersebut.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=400&fit=crop",
    imageAlt: "Program Kemiskinan Ekstrem",
    author: "Bambang Susanto",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bambangsusanto",
    readTime: 5,
    views: 34120,
    isFeatured: false,
    category: "sosial",
    tags: ["Kemiskinan", "BPS", "Pemerintah", "Sosial"],
    publishedAt: "2026-02-15T12:00:00Z",
  },
  // ========== NEWS VIDEO ==========
  {
    id: "video-1",
    title: "[VIDEO] Dokumenter: Perjalanan Indonesia Menuju Negara Maju 2026",
    slug: "video-dokumenter-indonesia-negara-maju-2026",
    excerpt: "Video dokumenter eksklusif mengulas perjalanan Indonesia menuju status negara maju dan tantangan yang dihadapi.",
    content: `
<p>NewsPedia menghadirkan dokumenter eksklusif tentang perjalanan Indonesia menuju status negara maju di tahun 2026.</p>

<h2>Isi Dokumenter</h2>
<p>Dokumenter 45 menit ini mengulas transformasi ekonomi, infrastruktur, dan SDM Indonesia. Termasuk wawancara dengan pakar ekonomi dan pejabat pemerintah.</p>

<h2>Pencapaian Ekonomi</h2>
<p>Ekonomi Indonesia tumbuh stabil di 5.5% dengan PDB per kapita mendekati $7.000, mendekati batas negara berpenghasilan tinggi.</p>

<h2>Tantangan ke Depan</h2>
<p>Dokumenter juga membahas tantangan yang masih dihadapi seperti kesenjangan, infrastruktur di timur Indonesia, dan transisi energi.</p>

<p><strong>Durasi:</strong> 45 menit<br />
<strong>Produksi:</strong> NewsPedia Documentary</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=400&fit=crop",
    imageAlt: "Dokumenter Indonesia Maju",
    author: "Tim Redaksi",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=timredaksi",
    readTime: 1,
    views: 234560,
    isFeatured: true,
    category: "news-video",
    tags: ["Video", "Dokumenter", "Indonesia", "Ekonomi"],
    publishedAt: "2026-03-14T18:00:00Z",
  },
  {
    id: "video-2",
    title: "[VIDEO] Liputan Khusus: Teknologi AI di Indonesia, Peluang dan Tantangan",
    slug: "video-liputan-khusus-teknologi-ai-indonesia",
    excerpt: "Liputan video tentang perkembangan teknologi AI di Indonesia dan bagaimana perusahaan lokal mengadopsinya.",
    content: `
<p>NewsPedia menghadirkan liputan khusus tentang perkembangan teknologi AI di Indonesia tahun 2026.</p>

<h2>Isi Video</h2>
<p>Liputan 20 menit ini menampilkan wawancara dengan startup AI lokal, perusahaan yang mengadopsi AI, dan pakar teknologi Indonesia.</p>

<h2>Startup AI Lokal</h2>
<p>Indonesia kini memiliki lebih dari 200 startup AI dengan valuasi total mencapai $5 miliar. Beberapa sudah go international.</p>

<h2>Adopsi Industri</h2>
<p>Berbagai industri dari fintech, e-commerce, hingga manufaktur telah mengadopsi AI untuk meningkatkan efisiensi.</p>

<p><strong>Durasi:</strong> 20 menit<br />
<strong>Produksi:</strong> NewsPedia Tech</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    imageAlt: "Liputan AI Indonesia",
    author: "Tech Desk",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=techdesk",
    readTime: 1,
    views: 156780,
    isFeatured: false,
    category: "news-video",
    tags: ["Video", "AI", "Teknologi", "Startup"],
    publishedAt: "2026-03-08T15:00:00Z",
  },
  {
    id: "video-3",
    title: "[VIDEO] Wawancara Eksklusif: Menteri Pendidikan Bahas Kurikulum Baru 2026",
    slug: "video-wawancara-eksklusif-menteri-pendidikan-kurikulum-baru-2026",
    excerpt: "Wawancara eksklusif dengan Menteri Pendidikan membahas implementasi kurikulum baru yang berfokus pada skill digital.",
    content: `
<p>NewsPedia menayangkan wawancara eksklusif dengan Menteri Pendidikan, Kebudayaan, Riset, dan Teknologi tentang kurikulum baru 2026.</p>

<h2>Poin Utama Wawancara</h2>
<p>Mendikbud menjelaskan fokus kurikulum baru pada pengembangan skill digital, literasi AI, dan pembelajaran berbasis proyek.</p>

<h2>Implementasi Bertahap</h2>
<p>Kurikulum baru akan diimplementasikan bertahap mulai Juli 2026 untuk jenjang SMA, menyusul SMP dan SD di tahun berikutnya.</p>

<h2>Persiapan Guru</h2>
<p>Pelatihan guru telah dimulai sejak 2025 dengan target 1 juta guru terlatih sebelum implementasi penuh.</p>

<p><strong>Durasi:</strong> 35 menit<br />
<strong>Produksi:</strong> NewsPedia News</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=400&fit=crop",
    imageAlt: "Wawancara Menteri Pendidikan",
    author: "News Desk",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=newsdesk",
    readTime: 1,
    views: 89560,
    isFeatured: false,
    category: "news-video",
    tags: ["Video", "Pendidikan", "Kurikulum", "Wawancara"],
    publishedAt: "2026-02-25T16:00:00Z",
  },
  {
    id: "video-4",
    title: "[VIDEO] Jejak Langkah: Kisah Pengusaha Muda Sukses dari Desa Terpencil",
    slug: "video-jejak-langkah-pengusaha-muda-sukses-desa-terpencil",
    excerpt: "Video feature tentang perjalanan pengusaha muda yang sukses membangun bisnis dari desa terpencil di NTT.",
    content: `
<p>NewsPedia menghadirkan episode terbaru Jejak Langkah tentang pengusaha muda sukses dari desa terpencil.</p>

<h2>Kisah Inspiratif</h2>
<p>Video 25 menit ini menceritakan perjalanan Markus, pemuda dari desa terpencil di NTT yang membangun bisnis kopi premium dengan omzet miliaran.</p>

<h2>Tantangan yang Dihadapi</h2>
<p>Dari akses internet terbatas hingga infrastruktur yang minim, Markus berhasil mengatasi semua hambatan dengan kreativitas.</p>

<h2>Pesan untuk Generasi Muda</h2>
<p>Markus berbagi pesan inspiratif bagi generasi muda Indonesia untuk terus berjuang mewujudkan mimpi.</p>

<p><strong>Durasi:</strong> 25 menit<br />
<strong>Produksi:</strong> NewsPedia Features</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&h=400&fit=crop",
    imageAlt: "Pengusaha Muda Desa",
    author: "Feature Desk",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=featuredesk",
    readTime: 1,
    views: 123450,
    isFeatured: false,
    category: "news-video",
    tags: ["Video", "Inspirasi", "Bisnis", "NTT"],
    publishedAt: "2026-02-12T14:00:00Z",
  },
];

// Helper functions
export function getArticlesByCategory(category: CategoryType): Article[] {
  return articles.filter((article) => article.category === category);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((article) => article.isFeatured);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(article: Article, limit: number = 3): Article[] {
  return articles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, limit);
}

export function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return "Hari ini";
  }
  if (diffDays === 1) {
    return "Kemarin";
  }
  if (diffDays < 7) {
    return `${diffDays} hari lalu`;
  }
  
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
