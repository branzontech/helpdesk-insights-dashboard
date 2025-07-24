import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Edit, 
  Eye, 
  Star, 
  Clock, 
  Calendar, 
  User, 
  Tag, 
  ThumbsUp, 
  ThumbsDown,
  Share2,
  Bookmark,
  History,
  Download,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { knowledgeBaseArticles, knowledgeBaseCategories, articleHistory } from '@/lib/knowledgeBaseData';

interface KnowledgeBaseArticleProps {
  articleId: string | null;
  onBack: () => void;
  onEdit: (articleId: string) => void;
}

const KnowledgeBaseArticle: React.FC<KnowledgeBaseArticleProps> = ({
  articleId,
  onBack,
  onEdit
}) => {
  const [userRating, setUserRating] = useState<'helpful' | 'not-helpful' | null>(null);
  
  const article = knowledgeBaseArticles.find(a => a.id === articleId);
  
  if (!article) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">Artículo no encontrado</h3>
        <p className="text-muted-foreground mb-4">
          El artículo que buscas no existe o ha sido eliminado.
        </p>
        <Button onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
      </div>
    );
  }

  const category = knowledgeBaseCategories.find(cat => cat.id === article.category);
  const relatedArticles = knowledgeBaseArticles.filter(a => 
    article.relatedArticles?.includes(a.id)
  );
  const articleHistoryItems = articleHistory.filter(h => h.articleId === article.id);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRating = (rating: 'helpful' | 'not-helpful') => {
    setUserRating(rating);
    // Here you would typically send the rating to your backend
    console.log(`User rated article ${article.id} as ${rating}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'Principiante';
      case 'intermediate':
        return 'Intermedio';
      case 'advanced':
        return 'Avanzado';
      default:
        return 'No especificado';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a la lista
        </Button>
        
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Descargar PDF
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Imprimir
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bookmark className="mr-2 h-4 w-4" />
                Guardar favorito
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button onClick={() => onEdit(article.id)}>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-3 flex-1">
              <div className="flex items-center space-x-2">
                {category && (
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                )}
                <Badge variant="secondary">{category?.name}</Badge>
                <Badge className={getDifficultyColor(article.metadata.difficulty)}>
                  {getDifficultyText(article.metadata.difficulty)}
                </Badge>
                <Badge variant="outline">v{article.version}</Badge>
              </div>
              
              <CardTitle className="text-2xl">{article.title}</CardTitle>
              <CardDescription className="text-base">{article.summary}</CardDescription>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={article.author.avatar} />
                  <AvatarFallback>
                    {article.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{article.author.name}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Actualizado: {formatDate(article.updatedAt)}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {article.metadata.estimatedReadTime} min de lectura
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{article.viewCount} visualizaciones</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{article.rating.average}/5</span>
                <span className="text-xs text-muted-foreground">
                  ({article.rating.helpful + article.rating.notHelpful} evaluaciones)
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">¿Te resultó útil?</span>
              <Button
                variant={userRating === 'helpful' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleRating('helpful')}
                disabled={userRating !== null}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                Sí ({article.rating.helpful})
              </Button>
              <Button
                variant={userRating === 'not-helpful' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleRating('not-helpful')}
                disabled={userRating !== null}
              >
                <ThumbsDown className="h-4 w-4 mr-1" />
                No ({article.rating.notHelpful})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="content" className="space-y-6">
        <TabsList>
          <TabsTrigger value="content">Contenido</TabsTrigger>
          <TabsTrigger value="history">
            <History className="h-4 w-4 mr-2" />
            Historial ({articleHistoryItems.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          {/* Article Content */}
          <Card>
            <CardContent className="p-8">
              <div 
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: article.content.replace(/\n/g, '<br>').replace(/#{1,6}\s/g, '<h3>').replace(/<h3>/g, '<h3 class="text-lg font-semibold mt-6 mb-3">') 
                }}
              />
            </CardContent>
          </Card>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Artículos Relacionados</CardTitle>
                <CardDescription>
                  Otros artículos que podrían interesarte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedArticles.map((relatedArticle) => (
                    <div 
                      key={relatedArticle.id}
                      className="p-3 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                      onClick={() => window.location.reload()} // Simulate navigation
                    >
                      <h4 className="font-medium mb-1 line-clamp-2">
                        {relatedArticle.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedArticle.summary}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <span>{relatedArticle.metadata.estimatedReadTime} min</span>
                        <span>{relatedArticle.viewCount} vistas</span>
                        <span>★ {relatedArticle.rating.average}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Versiones</CardTitle>
              <CardDescription>
                Registro de cambios y actualizaciones del artículo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {articleHistoryItems.map((historyItem, index) => (
                  <div key={historyItem.id} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-medium">
                        v{historyItem.version}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-medium">{historyItem.changeDescription}</h4>
                        <Badge variant="outline" className="text-xs">
                          {historyItem.changeType === 'created' && 'Creado'}
                          {historyItem.changeType === 'updated' && 'Actualizado'}
                          {historyItem.changeType === 'published' && 'Publicado'}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Avatar className="h-4 w-4">
                            <AvatarImage src={historyItem.changedBy.avatar} />
                            <AvatarFallback>
                              {historyItem.changedBy.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{historyItem.changedBy.name}</span>
                        </div>
                        <span>{formatDate(historyItem.changedAt)}</span>
                      </div>
                    </div>
                    {index === 0 && (
                      <Badge variant="default" className="text-xs">
                        Actual
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgeBaseArticle;