import React, { useState } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface ImageUploaderProps {
  onInsertImage: (imageMarkdown: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onInsertImage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [altText, setAltText] = useState('');

  const handleInsertImage = () => {
    if (imageUrl.trim()) {
      const markdown = `![${altText || 'Imagen'}](${imageUrl})`;
      onInsertImage(markdown);
      setImageUrl('');
      setAltText('');
      setIsOpen(false);
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
        <div className="space-y-4">
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
            <Label htmlFor="alt-text">Texto alternativo</Label>
            <Input
              id="alt-text"
              placeholder="Descripción de la imagen"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleInsertImage} disabled={!imageUrl.trim()}>
              Insertar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploader;