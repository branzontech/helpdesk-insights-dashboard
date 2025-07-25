import { useState } from "react";
import { Search, Settings, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ParametersGrid } from "./ParametersGrid";
import { ParametersHeader } from "./ParametersHeader";
import { ParametersFilter } from "./ParametersFilter";
import { useParametersData } from "@/hooks/useParametersData";

const ParametersLayout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  
  const { categories, filteredParameters, stats } = useParametersData({
    searchTerm,
    selectedCategory,
    selectedStatus
  });

  return (
    <div className="min-h-screen bg-background">
      <ParametersHeader />
      
      <div className="container mx-auto px-6 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Funcionalidades</CardDescription>
              <CardTitle className="text-3xl font-bold text-primary">
                {stats.total}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Habilitadas</CardDescription>
              <CardTitle className="text-3xl font-bold text-green-600">
                {stats.enabled}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Deshabilitadas</CardDescription>
              <CardTitle className="text-3xl font-bold text-orange-600">
                {stats.disabled}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Categorías</CardDescription>
              <CardTitle className="text-3xl font-bold text-blue-600">
                {categories.length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar funcionalidades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <ParametersFilter
                categories={categories}
                selectedCategory={selectedCategory}
                selectedStatus={selectedStatus}
                onCategoryChange={setSelectedCategory}
                onStatusChange={setSelectedStatus}
              />
            </div>
          </CardContent>
        </Card>

        {/* Parameters Grid */}
        <ParametersGrid parameters={filteredParameters} />
      </div>
    </div>
  );
};

export default ParametersLayout;