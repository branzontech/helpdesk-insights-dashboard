import React from 'react';
import { 
  BookOpen, 
  Eye, 
  Users, 
  Star, 
  TrendingUp, 
  Calendar,
  FileText,
  Archive,
  PenTool,
  ChartBar
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { knowledgeBaseStats, knowledgeBaseCategories } from '@/lib/knowledgeBaseData';

interface KnowledgeBaseDashboardProps {
  onViewAllArticles: () => void;
}

const KnowledgeBaseDashboard: React.FC<KnowledgeBaseDashboardProps> = ({ onViewAllArticles }) => {
  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Artículos</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{knowledgeBaseStats.totalArticles}</div>
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <span>Publicados: {knowledgeBaseStats.publishedArticles}</span>
              <span>Borradores: {knowledgeBaseStats.draftArticles}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizaciones Totales</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{knowledgeBaseStats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-2">
              +12% vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Autores Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{knowledgeBaseStats.totalAuthors}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Contribuyendo este mes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calificación Promedio</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{knowledgeBaseStats.averageRating}/5</div>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3 w-3 ${
                      star <= Math.round(knowledgeBaseStats.averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Views Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Visualizaciones Mensuales
            </CardTitle>
            <CardDescription>
              Evolución de visualizaciones en los últimos 6 meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {knowledgeBaseStats.monthlyViews.map((item, index) => (
                <div key={item.month} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.month}</span>
                  <div className="flex items-center space-x-2 flex-1 mx-4">
                    <Progress 
                      value={(item.views / Math.max(...knowledgeBaseStats.monthlyViews.map(m => m.views))) * 100} 
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground w-16 text-right">
                      {item.views.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ChartBar className="h-5 w-5 mr-2" />
              Categorías Más Populares
            </CardTitle>
            <CardDescription>
              Categorías con más artículos y visualizaciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {knowledgeBaseStats.topCategories.map((category, index) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="w-6 h-6 rounded-full p-0 flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium">{category.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {category.articles} artículos
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{category.views.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">visualizaciones</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Actividad Reciente
            </CardTitle>
            <CardDescription>
              Últimas actualizaciones en la base de conocimiento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {knowledgeBaseStats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {activity.type === 'article_created' && (
                      <PenTool className="h-4 w-4 text-green-600 mt-1" />
                    )}
                    {activity.type === 'article_updated' && (
                      <FileText className="h-4 w-4 text-blue-600 mt-1" />
                    )}
                    {activity.type === 'article_published' && (
                      <BookOpen className="h-4 w-4 text-purple-600 mt-1" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {activity.articleTitle}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{activity.author}</span>
                      <span>•</span>
                      <span>
                        {new Date(activity.timestamp).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="flex-shrink-0 text-xs"
                  >
                    {activity.type === 'article_created' && 'Creado'}
                    {activity.type === 'article_updated' && 'Actualizado'}
                    {activity.type === 'article_published' && 'Publicado'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Categories Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Archive className="h-5 w-5 mr-2" />
              Categorías
            </CardTitle>
            <CardDescription>
              Resumen de todas las categorías disponibles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {knowledgeBaseCategories.slice(0, 6).map((category) => (
                <div key={category.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  <Badge variant="secondary">
                    {category.articleCount} artículos
                  </Badge>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onViewAllArticles}
            >
              Ver Todos los Artículos
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KnowledgeBaseDashboard;