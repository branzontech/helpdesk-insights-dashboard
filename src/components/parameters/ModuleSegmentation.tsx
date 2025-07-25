import { Badge } from "@/components/ui/badge";
import { ParameterModule } from "@/types/parameters";

interface ModuleSegmentationProps {
  modules: ParameterModule[];
  selectedModule: string;
  onModuleChange: (moduleId: string) => void;
}

export const ModuleSegmentation = ({
  modules,
  selectedModule,
  onModuleChange
}: ModuleSegmentationProps) => {
  return (
    <div className="border-b bg-card mb-6">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center space-x-2 overflow-x-auto">
          <button
            onClick={() => onModuleChange("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              selectedModule === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
            }`}
          >
            Todos los Módulos
          </button>
          
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => onModuleChange(module.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                selectedModule === module.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="text-base">{module.icon}</span>
              <span>{module.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};