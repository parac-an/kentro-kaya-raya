import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ArticleCard from "@/components/ArticleCard";
import VideoCard from "@/components/VideoCard";
import SearchFilter from "@/components/SearchFilter";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");

  const articles = [
    {
      title: "Cara Membuat Budget Bulanan yang Efektif",
      excerpt: "Pelajari langkah-langkah praktis untuk membuat anggaran bulanan yang sesuai dengan kebutuhan dan tujuan finansial Anda.",
      category: "Budgeting",
      date: "15 Okt 2024",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80"
    },
    {
      title: "Investasi untuk Pemula: Mulai dari Mana?",
      excerpt: "Panduan lengkap memulai investasi bagi pemula, mulai dari memahami jenis-jenis investasi hingga strategi yang tepat.",
      category: "Investasi",
      date: "12 Okt 2024",
      image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&q=80"
    },
    {
      title: "Tips Menabung untuk Dana Darurat",
      excerpt: "Mengapa dana darurat penting dan bagaimana cara mengumpulkannya dengan strategi yang tepat dan mudah diterapkan.",
      category: "Tabungan",
      date: "10 Okt 2024",
      image: "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?w=800&q=80"
    },
    {
      title: "Mengelola Keuangan Pribadi di Usia 20-an",
      excerpt: "Panduan praktis untuk anak muda dalam mengelola uang, membangun kebiasaan finansial yang baik sejak dini.",
      category: "Finansial Pribadi",
      date: "8 Okt 2024",
      image: "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=800&q=80"
    },
    {
      title: "Strategi Investasi Jangka Panjang yang Menguntungkan",
      excerpt: "Pelajari berbagai strategi investasi jangka panjang yang terbukti menguntungkan dan sesuai dengan profil risiko Anda.",
      category: "Investasi",
      date: "5 Okt 2024",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
    },
    {
      title: "Memahami Asuransi: Mana yang Anda Butuhkan?",
      excerpt: "Kenali jenis-jenis asuransi yang tersedia dan pelajari cara memilih asuransi yang sesuai dengan kebutuhan Anda.",
      category: "Asuransi",
      date: "3 Okt 2024",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80"
    }
  ];

  const videos = [
    {
      title: "Panduan Lengkap Budgeting untuk Pemula",
      description: "Video tutorial lengkap tentang cara membuat dan mengelola budget bulanan yang efektif.",
      youtubeId: "dQw4w9WgXcQ",
      category: "Budgeting"
    },
    {
      title: "Investasi Saham: Dari Nol hingga Mahir",
      description: "Pelajari dasar-dasar investasi saham dan strategi yang tepat untuk pemula.",
      youtubeId: "dQw4w9WgXcQ",
      category: "Investasi"
    },
    {
      title: "Tips Menabung 30% dari Gaji Bulanan",
      description: "Strategi praktis untuk menabung lebih banyak tanpa mengurangi kualitas hidup Anda.",
      youtubeId: "dQw4w9WgXcQ",
      category: "Tabungan"
    },
    {
      title: "Financial Planning untuk Generasi Milenial",
      description: "Panduan perencanaan keuangan yang sesuai dengan gaya hidup milenial dan Gen Z.",
      youtubeId: "dQw4w9WgXcQ",
      category: "Finansial Pribadi"
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Semua Kategori" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Semua Kategori" || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      <section id="articles" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Artikel Edukasi
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pelajari berbagai topik finansial melalui artikel-artikel berkualitas yang mudah dipahami
            </p>
          </div>

          <SearchFilter 
            onSearchChange={setSearchQuery}
            onCategoryChange={setSelectedCategory}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredArticles.map((article, index) => (
              <ArticleCard key={index} {...article} />
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Tidak ada artikel yang sesuai dengan pencarian Anda
              </p>
            </div>
          )}
        </div>
      </section>

      <section id="videos" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Video Edukasi
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tonton video pembelajaran yang menarik dan mudah dipahami untuk meningkatkan literasi finansial Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {filteredVideos.map((video, index) => (
              <VideoCard key={index} {...video} />
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Tidak ada video yang sesuai dengan pencarian Anda
              </p>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">RICHRED</h3>
              <p className="text-secondary-foreground/80">
                Platform edukasi finansial gratis untuk semua kalangan Indonesia.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Navigasi</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' })} className="text-secondary-foreground/80 hover:text-primary transition-colors">
                    Artikel
                  </button>
                </li>
                <li>
                  <button onClick={() => document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' })} className="text-secondary-foreground/80 hover:text-primary transition-colors">
                    Video
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hubungi Kami</h4>
              <p className="text-secondary-foreground/80">
                Email: info@richred.id<br />
                Bangun literasi finansial bersama!
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-secondary-foreground/20 text-center text-secondary-foreground/60">
            <p>&copy; 2024 RICHRED. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;