import React, { useState } from 'react';
import { Search, Plus, Filter, Grid, List, BookOpen, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import KnowledgeBaseList from './KnowledgeBaseList';
import KnowledgeBaseArticle from './KnowledgeBaseArticle';
import KnowledgeBaseEditor from './KnowledgeBaseEditor';
import KnowledgeBaseDashboard from './KnowledgeBaseDashboard';
import { knowledgeBaseCategories, knowledgeBaseStats } from '@/lib/knowledgeBaseData';

const KnowledgeBaseLayout = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'browse' | 'article' | 'editor'>('dashboard');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleViewArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    setCurrentView('article');
  };

  const handleCreateArticle = () => {
    setSelectedArticleId(null);
    setCurrentView('editor');
  };

  const handleEditArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    setCurrentView('editor');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <KnowledgeBaseDashboard onViewAllArticles={() => setCurrentView('browse')} />;
      case 'browse':
        return (
          <KnowledgeBaseList
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            viewMode={viewMode}
            onViewArticle={handleViewArticle}
            onEditArticle={handleEditArticle}
          />
        );
      case 'article':
        return (
          <KnowledgeBaseArticle
            articleId={selectedArticleId}
            onBack={() => setCurrentView('browse')}
            onEdit={handleEditArticle}
          />
        );
      case 'editor':
        return (
          <KnowledgeBaseEditor
            articleId={selectedArticleId}
            onSave={() => setCurrentView('browse')}
            onCancel={() => setCurrentView('browse')}
          />
        );
      default:
        return <KnowledgeBaseDashboard onViewAllArticles={() => setCurrentView('browse')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Base de Conocimiento</h1>
                <p className="text-sm text-muted-foreground">
                  Centro de información y documentación técnica
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setCurrentView('dashboard')}
                className={currentView === 'dashboard' ? 'bg-accent' : ''}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentView('browse')}
                className={currentView === 'browse' ? 'bg-accent' : ''}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Explorar
              </Button>
              <Button onClick={handleCreateArticle}>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Artículo
              </Button>
            </div>
          </div>

          {/* Search and filters - only show when browsing */}
          {currentView === 'browse' && (
            <div className="mt-4 flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar artículos, etiquetas o contenido..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Todas las categorías" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {knowledgeBaseCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Stats bar */}
          {currentView === 'browse' && (
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span>{knowledgeBaseStats.publishedArticles} artículos publicados</span>
                <span>{knowledgeBaseStats.totalViews.toLocaleString()} visualizaciones totales</span>
                <span>Calificación promedio: {knowledgeBaseStats.averageRating}/5</span>
              </div>
              <Badge variant="secondary">
                {searchQuery ? `Buscando: "${searchQuery}"` : 
                 selectedCategory !== 'all' ? 
                 `Categoría: ${knowledgeBaseCategories.find(c => c.id === selectedCategory)?.name}` : 
                 'Todos los artículos'}
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        {renderCurrentView()}
      </div>
    </div>
  );
};

export default KnowledgeBaseLayout;