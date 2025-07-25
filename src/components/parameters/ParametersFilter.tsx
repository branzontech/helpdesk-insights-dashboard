import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ParameterCategory } from "@/types/parameters";

interface ParametersFilterProps {
  categories: ParameterCategory[];
  selectedCategory: string;
  selectedStatus: string;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
}

export const ParametersFilter = ({
  categories,
  selectedCategory,
  selectedStatus,
  onCategoryChange,
  onStatusChange
}: ParametersFilterProps) => {
  const clearFilters = () => {
    onCategoryChange("all");
    onStatusChange("all");
  };

  const hasActiveFilters = selectedCategory !== "all" || selectedStatus !== "all";

  return (
    <div className="flex items-center gap-3">
      <Filter className="h-4 w-4 text-muted-foreground" />
      
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Todas las categorías" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las categorías</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              <div className="flex items-center space-x-2">
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedStatus} onValueChange={onStatusChange}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="enabled">Habilitadas</SelectItem>
          <SelectItem value="disabled">Deshabilitadas</SelectItem>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Limpiar
          <Badge variant="secondary" className="ml-2">
            {[selectedCategory !== "all", selectedStatus !== "all"].filter(Boolean).length}
          </Badge>
        </Button>
      )}
    </div>
  );
};