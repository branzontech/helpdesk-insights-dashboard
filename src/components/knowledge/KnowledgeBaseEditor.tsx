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
  AlertCircle,
  Image,
  Code
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
import ImageUploader from './ImageUploader';
import CodeBlockInserter from './CodeBlockInserter';

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

  const handleInsertImage = (imageMarkdown: string) => {
    const newContent = formData.content + '\n' + imageMarkdown + '\n';
    handleInputChange('content', newContent);
  };

  const handleInsertCodeBlock = (codeMarkdown: string) => {
    const newContent = formData.content + '\n' + codeMarkdown + '\n';
    handleInputChange('content', newContent);
  };

  const renderMarkdownToHtml = (content: string) => {
    return content
      // Imágenes
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4 border border-border" />')
      // Bloques de código con mejor estilo
      .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        const language = lang || 'text';
        const trimmedCode = code.trim();
        const escapedCode = trimmedCode
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
        
        return `<div class="code-block-container my-6 rounded-lg overflow-hidden border border-slate-600">
          <div class="code-block-header px-4 py-2 text-sm font-mono flex items-center justify-between" style="background-color: #334155; color: #94a3b8;">
            <span class="font-semibold" style="color: #60a5fa;">${language}</span>
            <span class="text-xs" style="color: #94a3b8;">Código</span>
          </div>
          <pre class="m-0 p-4 overflow-x-auto" style="background-color: #0f172a; color: #e2e8f0;"><code class="text-sm font-mono">${escapedCode}</code></pre>
        </div>`;
      })
      // Código inline
      .replace(/`([^`]+)`/g, '<code class="px-2 py-1 rounded text-sm font-mono" style="background-color: #f1f5f9; color: #374151;">$1</code>')
      // Encabezados
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-6 mb-3 text-foreground">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mt-8 mb-4 text-foreground">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-8 mb-4 text-foreground">$1</h1>')
      // Texto en negrita
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold">$1</strong>')
      // Texto en cursiva
      .replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>')
      // Enlaces
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline hover:text-primary/80">$1</a>')
      // Saltos de línea
      .replace(/\n/g, '<br>');
  };

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
              __html: renderMarkdownToHtml(formData.content || 'Contenido del artículo...')
            }}
          />
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Simple Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">
          {isEditing ? 'Editar Artículo' : 'Nuevo Artículo'}
        </h1>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => setIsPreview(!isPreview)}>
            {isPreview ? 'Editar' : 'Vista previa'}
          </Button>
          <Button variant="outline" onClick={onCancel}>Cancelar</Button>
          <Button onClick={() => handleSave('published')} disabled={!formData.title.trim() || !formData.content.trim()}>
            Publicar
          </Button>
        </div>
      </div>

      {isPreview ? renderPreview() : (
        <div className="space-y-6">
          {/* Title */}
          <div>
            <Input
              placeholder="Título del artículo"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="text-lg font-medium border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
            />
          </div>

          {/* Summary */}
          <div>
            <Textarea
              placeholder="Resumen breve del artículo..."
              value={formData.summary}
              onChange={(e) => handleInputChange('summary', e.target.value)}
              maxLength={200}
              rows={2}
              className="border-0 border-b border-border rounded-none px-0 resize-none focus-visible:ring-0 focus-visible:border-primary"
            />
          </div>

          {/* Content */}
          <div>
            <Textarea
              placeholder="Escribe el contenido del artículo aquí..."
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              rows={15}
              className="min-h-[400px] border-0 focus-visible:ring-0 resize-none"
            />
            
            {/* Content Tools */}
            <div className="flex gap-2 mt-2 pt-2 border-t border-border">
              <ImageUploader onInsertImage={handleInsertImage} />
              <CodeBlockInserter onInsertCodeBlock={handleInsertCodeBlock} />
            </div>
          </div>

          {/* Simple metadata */}
          <div className="flex gap-4 pt-4 border-t">
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {knowledgeBaseCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Input
                placeholder="Agregar etiqueta"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                className="w-32"
              />
              <Button variant="ghost" onClick={handleAddTag} size="sm">+</Button>
            </div>

            {formData.tags.length > 0 && (
              <div className="flex gap-1 flex-wrap">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBaseEditor;