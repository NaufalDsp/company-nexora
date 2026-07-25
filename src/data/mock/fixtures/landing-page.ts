import { landingPageContentSchema } from "../../contracts/public-content";

export const landingPageFixture = landingPageContentSchema.parse({
  conceptNotice:
    "Seluruh nama proyek dan materi pada website ini merupakan data konsep fiktif.",
  hero: {
    eyebrow: "RENOVATION · INTERIOR · DESIGN & BUILD",
    title: "Membangun ulang ruang",
    highlightedTitle: "untuk hidup yang lebih baik.",
    description:
      "Nexora Space merancang transformasi ruang melalui perencanaan yang terukur, material yang relevan, dan pengerjaan yang menyatukan fungsi dengan karakter.",
    primaryCtaLabel: "Jelajahi layanan",
    primaryCtaHref: "#layanan",
    secondaryCtaLabel: "Kenali pendekatan",
    secondaryCtaHref: "#tentang",
    capabilities: [
      {
        label: "Fokus",
        value: "Renovasi & Interior",
      },
      {
        label: "Pendekatan",
        value: "Design & Build",
      },
      {
        label: "Status",
        value: "Studio Konsep",
      },
    ],
  },
  about: {
    label: "Tentang Nexora",
    title: "Dari struktur mentah menuju ruang yang terasa utuh.",
    paragraphs: [
      "Nexora Space adalah studio konsep renovasi dan interior yang memandang ruang sebagai sistem: struktur, sirkulasi, material, pencahayaan, dan kebiasaan penggunanya harus bekerja bersama.",
      "Setiap keputusan dimulai dari kebutuhan nyata, diterjemahkan ke rancangan yang jelas, lalu disusun menjadi proses pengerjaan yang dapat dipahami.",
    ],
    principles: [
      "Fungsi sebelum dekorasi",
      "Material dengan tujuan",
      "Komunikasi yang terstruktur",
    ],
  },
  services: [
    {
      id: "service-home-renovation",
      slug: "renovasi-rumah",
      title: "Renovasi Rumah",
      shortDescription:
        "Penataan ulang hunian yang mempertimbangkan kondisi bangunan, kebutuhan ruang, dan ritme hidup penghuninya.",
      icon: "house",
    },
    {
      id: "service-interior-design",
      slug: "desain-interior",
      title: "Desain Interior",
      shortDescription:
        "Konsep interior menyeluruh dari tata ruang, material, pencahayaan, hingga detail visual.",
      icon: "pen-tool",
    },
    {
      id: "service-office-renovation",
      slug: "renovasi-kantor",
      title: "Renovasi Kantor",
      shortDescription:
        "Ruang kerja adaptif yang mendukung fokus, kolaborasi, dan identitas perusahaan.",
      icon: "building",
    },
    {
      id: "service-commercial-interior",
      slug: "interior-komersial",
      title: "Interior Komersial",
      shortDescription:
        "Pengembangan ruang retail, kafe, dan area layanan yang menghubungkan alur pengunjung dengan pengalaman brand.",
      icon: "store",
    },
    {
      id: "service-custom-furniture",
      slug: "custom-furniture",
      title: "Custom Furniture",
      shortDescription:
        "Furnitur terukur yang dirancang mengikuti fungsi, proporsi ruang, dan bahasa material proyek.",
      icon: "armchair",
    },
    {
      id: "service-design-build",
      slug: "design-and-build",
      title: "Design & Build",
      shortDescription:
        "Satu alur terkoordinasi dari konsep, perencanaan teknis, pengadaan, hingga pelaksanaan.",
      icon: "layers",
    },
    {
      id: "service-space-planning",
      slug: "konsultasi-perencanaan",
      title: "Konsultasi Perencanaan",
      shortDescription:
        "Sesi awal untuk memetakan kebutuhan, prioritas, batasan, dan arah pengembangan ruang.",
      icon: "workflow",
    },
  ],
  process: {
    title: "Ruang yang baik dimulai dari proses yang terbaca.",
    description:
      "Setiap tahap memiliki tujuan dan keluaran yang jelas agar keputusan desain tidak terputus dari pelaksanaan.",
    steps: [
      {
        id: "process-consultation",
        title: "Konsultasi",
        description:
          "Memahami kebutuhan, karakter ruang, dan prioritas proyek.",
      },
      {
        id: "process-survey",
        title: "Survei",
        description: "Merekam kondisi aktual, ukuran, dan batas teknis lokasi.",
      },
      {
        id: "process-concept",
        title: "Konsep",
        description: "Menyusun arah ruang, material, dan pengalaman visual.",
      },
      {
        id: "process-budget",
        title: "Anggaran",
        description: "Menyelaraskan lingkup pekerjaan dengan prioritas biaya.",
      },
      {
        id: "process-approval",
        title: "Persetujuan",
        description: "Mengunci desain dan detail sebelum pekerjaan dimulai.",
      },
      {
        id: "process-build",
        title: "Pengerjaan",
        description:
          "Melaksanakan pekerjaan berdasarkan dokumen yang disepakati.",
      },
      {
        id: "process-supervision",
        title: "Pengawasan",
        description:
          "Memantau kualitas dan menyampaikan progres secara teratur.",
      },
      {
        id: "process-handover",
        title: "Serah Terima",
        description: "Memeriksa hasil dan menyerahkan ruang untuk digunakan.",
      },
    ],
  },
  consultation: {
    eyebrow: "MULAI DARI KEBUTUHAN",
    title: "Punya ruang yang perlu ditata ulang?",
    description:
      "Siapkan gambaran lokasi, fungsi ruang, dan prioritas utama. Form konsultasi akan tersedia setelah integrasi data lead selesai.",
    ctaLabel: "Lihat alur kerja",
    ctaHref: "#proses",
  },
});
