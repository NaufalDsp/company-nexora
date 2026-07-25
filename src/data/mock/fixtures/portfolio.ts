import { portfolioSchema } from "../../contracts/portfolio";

const categories = [
  { id: "category-residential", name: "Hunian", slug: "hunian" },
  { id: "category-commercial", name: "Komersial", slug: "komersial" },
  { id: "category-workplace", name: "Ruang Kerja", slug: "ruang-kerja" },
] as const;

export const portfolioFixture = portfolioSchema.parse({
  categories,
  projects: [
    {
      id: "project-sela-house",
      category: categories[0],
      title: "Sela House",
      slug: "sela-house",
      location: "Bandung, Jawa Barat",
      completionYear: 2026,
      areaSize: 148,
      summary:
        "Transformasi hunian kompak dengan bukaan terukur, bidang beton, dan ruang bersama yang mengalir.",
      description: [
        "Sela House menghadirkan cahaya alami dan ruang bernapas pada tapak hunian yang terbatas.",
        "Susunan ruang dibuat berlapis dari area publik menuju privat, dengan void kecil sebagai penghubung visual antarlantai.",
      ],
      challenge:
        "Membawa pencahayaan alami ke bagian tengah bangunan tanpa mengurangi privasi penghuni.",
      solution:
        "Void, kisi vertikal, dan bidang transparan ditempatkan pada titik yang mengarahkan cahaya tanpa membuka pandangan langsung.",
      coverImage: {
        id: "sela-cover",
        src: "/projects/sela-house-cover.svg",
        alt: "Ruang keluarga Sela House dengan bidang beton dan pencahayaan hangat.",
      },
      gallery: [
        {
          id: "sela-gallery-1",
          src: "/projects/sela-house-cover.svg",
          alt: "Ruang utama Sela House.",
          caption: "Ruang utama dan hubungan ke area terbuka.",
        },
        {
          id: "sela-gallery-2",
          src: "/projects/sela-house-detail.svg",
          alt: "Detail material dan bukaan Sela House.",
          caption: "Detail bidang, kisi, dan cahaya.",
        },
      ],
      isFeatured: true,
      status: "published",
      contentLabel: "Proyek Nexora Space",
    },
    {
      id: "project-rivet-workspace",
      category: categories[2],
      title: "Rivet Workspace",
      slug: "rivet-workspace",
      location: "Jakarta Selatan",
      completionYear: 2026,
      areaSize: 320,
      summary:
        "Ruang kerja modular yang menyeimbangkan area fokus, kolaborasi, dan pertemuan informal.",
      description: [
        "Rivet Workspace dirancang sebagai sistem zona yang dapat berubah mengikuti pertumbuhan tim.",
        "Material metal gelap dipadukan dengan kayu dan pencahayaan difus agar karakter industrial tetap nyaman digunakan sepanjang hari.",
      ],
      challenge:
        "Menciptakan pemisahan akustik tanpa menjadikan ruang kerja terasa tertutup dan terfragmentasi.",
      solution:
        "Panel berpori, tanaman dalam ruang, dan furnitur modular membentuk batas lunak antaraktivitas.",
      coverImage: {
        id: "rivet-cover",
        src: "/projects/rivet-workspace-cover.svg",
        alt: "Rivet Workspace dengan meja modular dan panel industrial.",
      },
      gallery: [
        {
          id: "rivet-gallery-1",
          src: "/projects/rivet-workspace-cover.svg",
          alt: "Area kolaborasi Rivet Workspace.",
          caption: "Zona kolaborasi modular.",
        },
        {
          id: "rivet-gallery-2",
          src: "/projects/rivet-workspace-detail.svg",
          alt: "Detail panel dan pencahayaan Rivet Workspace.",
          caption: "Sistem panel akustik dan pencahayaan.",
        },
      ],
      isFeatured: true,
      status: "published",
      contentLabel: "Proyek Nexora Space",
    },
    {
      id: "project-ember-eatery",
      category: categories[1],
      title: "Ember Eatery",
      slug: "ember-eatery",
      location: "Tangerang, Banten",
      completionYear: 2026,
      areaSize: 186,
      summary:
        "Interior restoran kasual dengan sirkulasi jelas dan material hangat yang membingkai aktivitas dapur.",
      description: [
        "Ember Eatery menyusun pengalaman pengunjung dari fasad, antrean, area makan, hingga dapur terbuka.",
        "Warna tembaga menjadi penanda orientasi, sementara permukaan netral menjaga fokus pada makanan dan interaksi.",
      ],
      challenge:
        "Menjaga kelancaran sirkulasi pada jam sibuk di dalam denah yang memanjang.",
      solution:
        "Jalur pelayanan dan pengunjung dipisahkan, lalu dipertemukan hanya pada titik transaksi dan pengantaran.",
      coverImage: {
        id: "ember-cover",
        src: "/projects/ember-eatery-cover.svg",
        alt: "Interior Ember Eatery dengan aksen tembaga.",
      },
      gallery: [
        {
          id: "ember-gallery-1",
          src: "/projects/ember-eatery-cover.svg",
          alt: "Area makan Ember Eatery.",
          caption: "Area makan dan dapur terbuka.",
        },
        {
          id: "ember-gallery-2",
          src: "/projects/ember-eatery-detail.svg",
          alt: "Detail meja dan material Ember Eatery.",
          caption: "Palet material dan elemen wayfinding.",
        },
      ],
      isFeatured: true,
      status: "published",
      contentLabel: "Proyek Nexora Space",
    },
    {
      id: "project-nadi-apartment",
      category: categories[0],
      title: "Nadi Apartment",
      slug: "nadi-apartment",
      location: "Surabaya, Jawa Timur",
      completionYear: 2026,
      areaSize: 72,
      summary:
        "Penataan apartemen dua kamar melalui penyimpanan terintegrasi dan furnitur multifungsi.",
      description: [
        "Nadi Apartment mengoptimalkan hunian kompak agar tetap terasa ringan melalui garis furnitur yang konsisten.",
        "Setiap elemen tetap memiliki fungsi nyata tanpa menambah dekorasi yang tidak diperlukan.",
      ],
      challenge:
        "Menyediakan penyimpanan yang cukup tanpa mengurangi kelapangan ruang utama.",
      solution:
        "Penyimpanan disatukan ke bidang dinding dan bangku, sehingga volume ruang tetap terbaca sederhana.",
      coverImage: {
        id: "nadi-cover",
        src: "/projects/nadi-apartment-cover.svg",
        alt: "Nadi Apartment dengan furnitur terintegrasi.",
      },
      gallery: [
        {
          id: "nadi-gallery-1",
          src: "/projects/nadi-apartment-cover.svg",
          alt: "Ruang utama Nadi Apartment.",
          caption: "Ruang utama dan penyimpanan terintegrasi.",
        },
        {
          id: "nadi-gallery-2",
          src: "/projects/nadi-apartment-detail.svg",
          alt: "Detail furnitur Nadi Apartment.",
          caption: "Detail furnitur multifungsi.",
        },
      ],
      isFeatured: false,
      status: "published",
      contentLabel: "Proyek Nexora Space",
    },
  ],
});
