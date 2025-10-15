import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchFilterProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

const SearchFilter = ({ onSearchChange, onCategoryChange }: SearchFilterProps) => {
  const categories = [
    "Semua Kategori",
    "Budgeting",
    "Investasi",
    "Tabungan",
    "Finansial Pribadi",
    "Asuransi",
    "Pajak"
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cari artikel atau video..."
          className="pl-10 border-border focus:border-primary"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Select onValueChange={onCategoryChange} defaultValue="Semua Kategori">
        <SelectTrigger className="w-full md:w-[200px] border-border focus:border-primary">
          <SelectValue placeholder="Pilih kategori" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchFilter;