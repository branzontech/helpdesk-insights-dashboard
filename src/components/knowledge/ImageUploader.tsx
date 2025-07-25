import React, { useState, useRef } from 'react';
import { Upload, X, Image, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ImageUploaderProps {
  onInsertImage: (imageMarkdown: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onInsertImage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFilePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInsertFromFile = () => {
    if (selectedFile && filePreview) {
      const markdown = `![${altText || selectedFile.name}](${filePreview})`;
      onInsertImage(markdown);
      resetForm();
    }
  };

  const handleInsertFromUrl = () => {
    if (imageUrl.trim()) {
      const markdown = `![${altText || 'Imagen'}](${imageUrl})`;
      onInsertImage(markdown);
      resetForm();
    }
  };

  const resetForm = () => {
    setImageUrl('');
    setAltText('');
    setSelectedFile(null);
    setFilePreview('');
    setIsOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Image className="h-4 w-4" />
          Imagen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Imagen</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" className="gap-2">
              <Upload className="h-4 w-4" />
              Subir archivo
            </TabsTrigger>
            <TabsTrigger value="url" className="gap-2">
              <Link className="h-4 w-4" />
              Desde URL
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-4">
            <div>
              <Label htmlFor="file-upload">Seleccionar imagen</Label>
              <Input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                ref={fileInputRef}
              />
            </div>
            
            {filePreview && (
              <div className="space-y-2">
                <Label>Vista previa</Label>
                <img 
                  src={filePreview} 
                  alt="Preview" 
                  className="max-w-full h-32 object-cover rounded-lg border"
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="alt-text-file">Texto alternativo</Label>
              <Input
                id="alt-text-file"
                placeholder="Descripción de la imagen"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={resetForm}>
                Cancelar
              </Button>
              <Button onClick={handleInsertFromFile} disabled={!selectedFile}>
                Insertar
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="url" className="space-y-4">
            <div>
              <Label htmlFor="image-url">URL de la imagen</Label>
              <Input
                id="image-url"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="alt-text-url">Texto alternativo</Label>
              <Input
                id="alt-text-url"
                placeholder="Descripción de la imagen"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={resetForm}>
                Cancelar
              </Button>
              <Button onClick={handleInsertFromUrl} disabled={!imageUrl.trim()}>
                Insertar
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploader;