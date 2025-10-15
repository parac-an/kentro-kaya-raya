import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Share2 } from "lucide-react";
import { toast } from "sonner";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image?: string;
}

const ArticleCard = ({ title, excerpt, category, date, image }: ArticleCardProps) => {
  const handleShare = () => {
    const text = `${title} - RICHRED`;
    const url = window.location.href;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`;
    window.open(whatsappUrl, '_blank');
    toast.success("Membuka WhatsApp...");
  };

  return (
    <Card className="group hover:shadow-hover transition-all duration-300 overflow-hidden border-border">
      {image && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
            {category}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-1" />
            {date}
          </div>
        </div>
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed line-clamp-3">
          {excerpt}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="default" className="bg-primary hover:bg-primary/90">
          Baca Selengkapnya
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleShare}
          className="border-border hover:border-primary"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;