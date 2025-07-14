import Image from "@/components/Image";
import { Button } from "@/components/ui/button";
import { LightbulbIcon, PlusIcon, UploadIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";

type Photo = {
  id: number;
  file: File;
  url: string;
  name: string;
};
type PhotoUploaderProps = {
  uploadedPhotos: Photo[];
  onPhotosUpload: (photos: Photo[]) => void;
  onPhotoRemove: (photos: Photo[], id: number) => void;
};

const PhotoUploader = ({
  uploadedPhotos,
  onPhotosUpload,
  onPhotoRemove,
}: PhotoUploaderProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const newPhotos = imageFiles.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    onPhotosUpload(newPhotos);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Ajoutez vos photos
        </h2>
        <p className="text-muted-foreground">
          Glissez-déposez vos photos ou cliquez pour les sélectionner
        </p>
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
          isDragOver
            ? "border-primary bg-primary/5 scale-105"
            : "border-muted-foreground/30 hover:border-primary hover:bg-muted/50"
        }`}
      >
        <div className="flex flex-col items-center space-y-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isDragOver
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <UploadIcon name="Upload" size={32} />
          </div>
          <div>
            <p className="text-lg font-medium text-foreground mb-1">
              {isDragOver ? "Déposez vos photos ici" : "Glissez vos photos ici"}
            </p>
            <p className="text-sm text-muted-foreground">
              ou cliquez pour parcourir vos fichiers
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Formats supportés: JPG, PNG, GIF (max 10MB par photo)
          </p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Photo Gallery */}
      {uploadedPhotos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Photos sélectionnées ({uploadedPhotos.length})
            </h3>
            <Button
              variant="outline"
              size="sm"
              //   iconName="Plus"
              //   iconPosition="left"
              onClick={openFileDialog}
            >
              <span>
                <PlusIcon></PlusIcon>
                Ajouter plus
              </span>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedPhotos.map((photo) => (
              <div key={photo.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={photo.url}
                    alt={photo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => onPhotoRemove(uploadedPhotos, photo.id)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110"
                >
                  <XIcon name="X" size={14} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <p className="text-xs truncate">{photo.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Suggestions */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <LightbulbIcon
              name="Lightbulb"
              size={16}
              className="text-primary"
            />
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-1">
              Conseils pour de meilleures photos
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Utilisez des photos de haute qualité (minimum 1080p)</li>
              <li>• Variez les angles et les moments capturés</li>
              <li>• Incluez des photos de groupe et des portraits</li>
              <li>• Évitez les photos floues ou mal éclairées</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploader;
