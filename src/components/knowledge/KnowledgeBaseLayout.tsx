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
    <div className="min-h-screen">
      {/* Simple Header */}
      <div className="border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Base de Conocimiento</h1>
            
            <div className="flex gap-2">
              <Button
                variant={currentView === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('dashboard')}
              >
                Dashboard
              </Button>
              <Button
                variant={currentView === 'browse' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('browse')}
              >
                Artículos
              </Button>
              <Button onClick={handleCreateArticle}>
                Nuevo
              </Button>
            </div>
          </div>

          {/* Simple search - only when browsing */}
          {currentView === 'browse' && (
            <div className="flex gap-3 mt-4">
              <Input
                placeholder="Buscar artículos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {knowledgeBaseCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                {viewMode === 'grid' ? 'Lista' : 'Grid'}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-6">
        {renderCurrentView()}
      </div>
    </div>
  );
};

export default KnowledgeBaseLayout;