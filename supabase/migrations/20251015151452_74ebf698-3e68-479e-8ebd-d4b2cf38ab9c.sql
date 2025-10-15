-- Create articles table
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT,
  category TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create videos table
CREATE TABLE public.videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  youtube_id TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (educational content)
CREATE POLICY "Anyone can view articles" 
ON public.articles 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view videos" 
ON public.videos 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_videos_updated_at
BEFORE UPDATE ON public.videos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for articles
INSERT INTO public.articles (title, excerpt, content, category, date, image) VALUES
('Cara Membuat Budget Bulanan yang Efektif', 'Pelajari langkah-langkah praktis untuk membuat anggaran bulanan yang sesuai dengan kebutuhan dan tujuan finansial Anda.', 'Konten lengkap artikel...', 'Budgeting', '2024-10-15', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80'),
('Investasi untuk Pemula: Mulai dari Mana?', 'Panduan lengkap memulai investasi bagi pemula, mulai dari memahami jenis-jenis investasi hingga strategi yang tepat.', 'Konten lengkap artikel...', 'Investasi', '2024-10-12', 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&q=80'),
('Tips Menabung untuk Dana Darurat', 'Mengapa dana darurat penting dan bagaimana cara mengumpulkannya dengan strategi yang tepat dan mudah diterapkan.', 'Konten lengkap artikel...', 'Tabungan', '2024-10-10', 'https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?w=800&q=80'),
('Mengelola Keuangan Pribadi di Usia 20-an', 'Panduan praktis untuk anak muda dalam mengelola uang, membangun kebiasaan finansial yang baik sejak dini.', 'Konten lengkap artikel...', 'Finansial Pribadi', '2024-10-08', 'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=800&q=80'),
('Strategi Investasi Jangka Panjang yang Menguntungkan', 'Pelajari berbagai strategi investasi jangka panjang yang terbukti menguntungkan dan sesuai dengan profil risiko Anda.', 'Konten lengkap artikel...', 'Investasi', '2024-10-05', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'),
('Memahami Asuransi: Mana yang Anda Butuhkan?', 'Kenali jenis-jenis asuransi yang tersedia dan pelajari cara memilih asuransi yang sesuai dengan kebutuhan Anda.', 'Konten lengkap artikel...', 'Asuransi', '2024-10-03', 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80');

-- Insert sample data for videos
INSERT INTO public.videos (title, description, youtube_id, category) VALUES
('Panduan Lengkap Budgeting untuk Pemula', 'Video tutorial lengkap tentang cara membuat dan mengelola budget bulanan yang efektif.', 'dQw4w9WgXcQ', 'Budgeting'),
('Investasi Saham: Dari Nol hingga Mahir', 'Pelajari dasar-dasar investasi saham dan strategi yang tepat untuk pemula.', 'dQw4w9WgXcQ', 'Investasi'),
('Tips Menabung 30% dari Gaji Bulanan', 'Strategi praktis untuk menabung lebih banyak tanpa mengurangi kualitas hidup Anda.', 'dQw4w9WgXcQ', 'Tabungan'),
('Financial Planning untuk Generasi Milenial', 'Panduan perencanaan keuangan yang sesuai dengan gaya hidup milenial dan Gen Z.', 'dQw4w9WgXcQ', 'Finansial Pribadi');