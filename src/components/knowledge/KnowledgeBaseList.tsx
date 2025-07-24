import React, { useState } from 'react';
import { 
  Eye, 
  Edit, 
  Calendar, 
  User, 
  Tag, 
  Clock, 
  Star,
  BookOpen,
  MoreHorizontal,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { knowledgeBaseArticles, knowledgeBaseCategories, type KnowledgeBaseArticle } from '@/lib/knowledgeBaseData';

interface KnowledgeBaseListProps {
  searchQuery: string;
  selectedCategory: string;
  viewMode: 'grid' | 'list';
  onViewArticle: (articleId: string) => void;
  onEditArticle: (articleId: string) => void;
}

const KnowledgeBaseList: React.FC<KnowledgeBaseListProps> = ({
  searchQuery,
  selectedCategory,
  viewMode,
  onViewArticle,
  onEditArticle
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  // Filter articles based on search and category
  const filteredArticles = knowledgeBaseArticles.filter((article) => {
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory && article.status === 'published';
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const getCategoryName = (categoryId: string) => {
    return knowledgeBaseCategories.find(cat => cat.id === categoryId)?.name || 'Sin categoría';
  };

  const getCategoryColor = (categoryId: string) => {
    return knowledgeBaseCategories.find(cat => cat.id === categoryId)?.color || '#6B7280';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const ArticleCard: React.FC<{ article: KnowledgeBaseArticle }> = ({ article }) => (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: getCategoryColor(article.category) }}
              />
              <Badge variant="secondary" className="text-xs">
                {getCategoryName(article.category)}
              </Badge>
              <Badge className={`text-xs ${getStatusColor(article.status)}`}>
                {article.status === 'published' ? 'Publicado' : 
                 article.status === 'draft' ? 'Borrador' : 'Archivado'}
              </Badge>
            </div>
            <CardTitle 
              className="text-lg hover:text-primary transition-colors cursor-pointer line-clamp-2"
              onClick={() => onViewArticle(article.id)}
            >
              {article.title}
            </CardTitle>
            <CardDescription className="mt-2 line-clamp-3">
              {article.summary}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewArticle(article.id)}>
                <Eye className="mr-2 h-4 w-4" />
                Ver artículo
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEditArticle(article.id)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {article.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              <Tag className="mr-1 h-3 w-3" />
              {tag}
            </Badge>
          ))}
          {article.tags.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{article.tags.length - 4} más
            </Badge>
          )}
        </div>

        <Separator className="my-3" />

        {/* Author and metadata */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={article.author.avatar} />
              <AvatarFallback>{article.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <span>{article.author.name}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{article.viewCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4" />
              <span>{article.rating.average}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{article.metadata.estimatedReadTime} min</span>
            </div>
          </div>
        </div>

        <div className="mt-2 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Actualizado: {formatDate(article.updatedAt)}</span>
            <span>v{article.version}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ArticleListItem: React.FC<{ article: KnowledgeBaseArticle }> = ({ article }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div 
              className="w-4 h-4 rounded-full mt-1" 
              style={{ backgroundColor: getCategoryColor(article.category) }}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <Badge variant="secondary" className="text-xs">
                {getCategoryName(article.category)}
              </Badge>
              <Badge className={`text-xs ${getStatusColor(article.status)}`}>
                {article.status === 'published' ? 'Publicado' : 
                 article.status === 'draft' ? 'Borrador' : 'Archivado'}
              </Badge>
            </div>
            
            <h3 
              className="text-lg font-semibold hover:text-primary transition-colors cursor-pointer truncate"
              onClick={() => onViewArticle(article.id)}
            >
              {article.title}
            </h3>
            
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {article.summary}
            </p>
            
            <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>{article.author.name}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(article.updatedAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-3 w-3" />
                <span>{article.viewCount}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3" />
                <span>{article.rating.average}</span>
              </div>
            </div>
          </div>
          
          <div className="flex-shrink-0 flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onViewArticle(article.id)}
            >
              <BookOpen className="h-4 w-4 mr-1" />
              Ver
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onEditArticle(article.id)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (filteredArticles.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No se encontraron artículos</h3>
        <p className="text-muted-foreground mb-4">
          {searchQuery ? 
            `No hay artículos que coincidan con "${searchQuery}"` : 
            'No hay artículos en esta categoría'
          }
        </p>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Limpiar filtros
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Mostrando {startIndex + 1}-{Math.min(endIndex, filteredArticles.length)} de {filteredArticles.length} artículos
        </p>
        {totalPages > 1 && (
          <p className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
          </p>
        )}
      </div>

      {/* Articles grid/list */}
      <div className={
        viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : "space-y-4"
      }>
        {currentArticles.map((article) => (
          viewMode === 'grid' ? (
            <ArticleCard key={article.id} article={article} />
          ) : (
            <ArticleListItem key={article.id} article={article} />
          )
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              >
                Anterior
              </PaginationPrevious>
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              >
                Siguiente
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default KnowledgeBaseList;