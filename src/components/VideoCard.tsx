import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { toast } from "sonner";

interface VideoCardProps {
  title: string;
  description: string;
  youtubeId: string;
  category: string;
}

const VideoCard = ({ title, description, youtubeId, category }: VideoCardProps) => {
  const handleShare = () => {
    const text = `${title} - RICHRED`;
    const videoUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text}\n${videoUrl}`)}`;
    window.open(whatsappUrl, '_blank');
    toast.success("Membuka WhatsApp...");
  };

  const handleDownload = () => {
    toast.info("Fitur download sedang dalam pengembangan");
  };

  return (
    <Card className="group hover:shadow-hover transition-all duration-300 overflow-hidden border-border">
      <div className="aspect-video overflow-hidden bg-secondary">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <CardHeader className="space-y-3">
        <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit">
          {category}
        </Badge>
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed line-clamp-2">
          {description}
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1 border-border hover:border-primary"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        <Button 
          variant="default"
          size="icon"
          onClick={handleShare}
          className="bg-primary hover:bg-primary/90"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VideoCard;