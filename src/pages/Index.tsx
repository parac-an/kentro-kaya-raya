import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ArticleCard from "@/components/ArticleCard";
import VideoCard from "@/components/VideoCard";
import SearchFilter from "@/components/SearchFilter";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image?: string;
}

interface Video {
  id: string;
  title: string;
  description: string;
  youtube_id: string;
  category: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [articles, setArticles] = useState<Article[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch articles
      const { data: articlesData, error: articlesError } = await supabase
        .from('articles')
        .select('*')
        .order('date', { ascending: false });

      if (articlesError) throw articlesError;

      // Fetch videos
      const { data: videosData, error: videosError } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (videosError) throw videosError;

      // Format articles data
      const formattedArticles = articlesData?.map(article => ({
        id: article.id,
        title: article.title,
        excerpt: article.excerpt,
        category: article.category,
        date: new Date(article.date).toLocaleDateString('id-ID', { 
          day: 'numeric', 
          month: 'short', 
          year: 'numeric' 
        }),
        image: article.image
      })) || [];

      // Format videos data
      const formattedVideos = videosData?.map(video => ({
        id: video.id,
        title: video.title,
        description: video.description,
        youtube_id: video.youtube_id,
        category: video.category
      })) || [];

      setArticles(formattedArticles);
      setVideos(formattedVideos);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error("Gagal memuat data. Silakan refresh halaman.");
    } finally {
      setLoading(false);
    }
  };

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

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Memuat artikel...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.id} {...article} />
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    Tidak ada artikel yang sesuai dengan pencarian Anda
                  </p>
                </div>
              )}
            </>
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

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Memuat video...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                {filteredVideos.map((video) => (
                  <VideoCard key={video.id} title={video.title} description={video.description} youtubeId={video.youtube_id} category={video.category} />
                ))}
              </div>

              {filteredVideos.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    Tidak ada video yang sesuai dengan pencarian Anda
                  </p>
                </div>
              )}
            </>
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
