import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';

const ImageUpload = ({ images, onChange, maxImages = 5, className = '' }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      onChange([...images, ...newFiles].slice(0, maxImages));
    }
  };

  const removeImage = (index) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-wrap gap-4">
        {images.map((img, index) => (
          <div key={index} className="relative h-24 w-24 rounded-md border border-gray-200 overflow-hidden">
            <img src={img} alt={`Preview ${index}`} className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-white/80 p-1 rounded-full text-gray-700 hover:text-red-500 hover:bg-white transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-24 w-24 flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 hover:border-amber-500 hover:bg-amber-50 transition-colors text-gray-500 hover:text-amber-500"
          >
            <Upload className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">Upload</span>
          </button>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="hidden"
      />
      <p className="text-xs text-gray-500">
        You can upload up to {maxImages} images.
      </p>
    </div>
  );
};

export default ImageUpload;
