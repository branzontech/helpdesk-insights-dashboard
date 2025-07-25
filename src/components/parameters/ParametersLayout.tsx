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
import { ModuleSegmentation } from "./ModuleSegmentation";
import { useParametersData } from "@/hooks/useParametersData";

const ParametersLayout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedModule, setSelectedModule] = useState("all");
  
  const { categories, modules, filteredParameters } = useParametersData({
    searchTerm,
    selectedCategory,
    selectedStatus,
    selectedModule
  });

  return (
    <div className="min-h-screen bg-background">
      <ParametersHeader />
      <ModuleSegmentation
        modules={modules}
        selectedModule={selectedModule}
        onModuleChange={setSelectedModule}
      />
      
      <div className="container mx-auto px-6 py-6">
        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
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