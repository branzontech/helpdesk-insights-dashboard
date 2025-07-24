import React, { useState, useEffect } from 'react';
import { 
  Save, 
  X, 
  Eye, 
  Upload, 
  Tag, 
  Settings, 
  Clock,
  User,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { knowledgeBaseArticles, knowledgeBaseCategories, type KnowledgeBaseArticle } from '@/lib/knowledgeBaseData';

interface KnowledgeBaseEditorProps {
  articleId: string | null;
  onSave: () => void;
  onCancel: () => void;
}

const KnowledgeBaseEditor: React.FC<KnowledgeBaseEditorProps> = ({
  articleId,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: '',
    tags: [] as string[],
    status: 'draft' as 'draft' | 'published' | 'archived',
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    estimatedReadTime: 5
  });
  
  const [newTag, setNewTag] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const existingArticle = articleId ? knowledgeBaseArticles.find(a => a.id === articleId) : null;
  const isEditing = !!existingArticle;

  useEffect(() => {
    if (existingArticle) {
      setFormData({
        title: existingArticle.title,
        summary: existingArticle.summary,
        content: existingArticle.content,
        category: existingArticle.category,
        tags: existingArticle.tags,
        status: existingArticle.status,
        difficulty: existingArticle.metadata.difficulty,
        estimatedReadTime: existingArticle.metadata.estimatedReadTime
      });
    }
  }, [existingArticle]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleInputChange('tags', [...formData.tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    handleInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = (saveAs: 'draft' | 'published') => {
    // Here you would typically send the data to your backend
    console.log('Saving article:', { ...formData, status: saveAs });
    
    // Simulate save
    setTimeout(() => {
      setIsDirty(false);
      onSave();
    }, 1000);
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  useEffect(() => {
    const estimated = estimateReadTime(formData.content);
    if (estimated !== formData.estimatedReadTime) {
      handleInputChange('estimatedReadTime', estimated);
    }
  }, [formData.content]);

  const renderPreview = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            {formData.category && (
              <Badge variant="secondary">
                {knowledgeBaseCategories.find(c => c.id === formData.category)?.name}
              </Badge>
            )}
            <Badge variant="outline">
              {formData.difficulty === 'beginner' ? 'Principiante' :
               formData.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
            </Badge>
            <Badge variant="outline">
              {formData.estimatedReadTime} min lectura
            </Badge>
          </div>
          <CardTitle className="text-2xl">{formData.title || 'Título del artículo'}</CardTitle>
          <CardDescription>{formData.summary || 'Resumen del artículo'}</CardDescription>
          
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div 
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: formData.content
                .replace(/\n/g, '<br>')
                .replace(/#{1,6}\s/g, '<h3>')
                .replace(/<h3>/g, '<h3 class="text-lg font-semibold mt-6 mb-3">')
            }}
          />
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {isEditing ? 'Editar Artículo' : 'Nuevo Artículo'}
          </h1>
          <p className="text-muted-foreground">
            {isEditing 
              ? `Editando: ${existingArticle?.title}` 
              : 'Crear un nuevo artículo para la base de conocimiento'
            }
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setIsPreview(!isPreview)}>
            <Eye className="h-4 w-4 mr-2" />
            {isPreview ? 'Editor' : 'Vista previa'}
          </Button>
          <Button variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button 
            variant="outline"
            onClick={() => handleSave('draft')}
            disabled={!formData.title.trim()}
          >
            <Save className="h-4 w-4 mr-2" />
            Guardar borrador
          </Button>
          <Button 
            onClick={() => handleSave('published')}
            disabled={!formData.title.trim() || !formData.content.trim()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Publicar
          </Button>
        </div>
      </div>

      {isDirty && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Tienes cambios sin guardar. Asegúrate de guardar antes de salir.
          </AlertDescription>
        </Alert>
      )}

      {isPreview ? renderPreview() : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contenido Principal</CardTitle>
                <CardDescription>
                  Información básica y contenido del artículo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    placeholder="Título del artículo"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary">Resumen *</Label>
                  <Textarea
                    id="summary"
                    placeholder="Breve descripción del artículo (máximo 200 caracteres)"
                    value={formData.summary}
                    onChange={(e) => handleInputChange('summary', e.target.value)}
                    maxLength={200}
                    rows={3}
                  />
                  <div className="text-xs text-muted-foreground text-right">
                    {formData.summary.length}/200 caracteres
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Contenido *</Label>
                  <Textarea
                    id="content"
                    placeholder="Contenido completo del artículo. Puedes usar Markdown básico como # para títulos, ** para negrita, etc."
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    rows={20}
                    className="font-mono text-sm"
                  />
                  <div className="text-xs text-muted-foreground">
                    Tiempo estimado de lectura: {formData.estimatedReadTime} minutos
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Publishing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Configuración
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select value={formData.status} onValueChange={(value: any) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Borrador</SelectItem>
                      <SelectItem value="published">Publicado</SelectItem>
                      <SelectItem value="archived">Archivado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoría *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {knowledgeBaseCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Nivel de dificultad</Label>
                  <Select value={formData.difficulty} onValueChange={(value: any) => handleInputChange('difficulty', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Principiante</SelectItem>
                      <SelectItem value="intermediate">Intermedio</SelectItem>
                      <SelectItem value="advanced">Avanzado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  Etiquetas
                </CardTitle>
                <CardDescription>
                  Agregar etiquetas para mejorar la búsqueda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Nueva etiqueta"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <Button onClick={handleAddTag} size="sm">
                    Agregar
                  </Button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                        <button
                          className="ml-1 hover:text-destructive"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Metadata */}
            {isEditing && existingArticle && (
              <Card>
                <CardHeader>
                  <CardTitle>Información del artículo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Autor: {existingArticle.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Creado: {new Date(existingArticle.createdAt).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Actualizado: {new Date(existingArticle.updatedAt).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span>{existingArticle.viewCount} visualizaciones</span>
                  </div>
                  <Separator />
                  <div className="text-xs text-muted-foreground">
                    Versión actual: {existingArticle.version}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBaseEditor;