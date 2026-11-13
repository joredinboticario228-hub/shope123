import { useState } from 'react';
import { Laptop } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200">
        {activeImage ? (
          <img src={activeImage} alt={title} className="h-full w-full object-contain p-6 transition duration-300" />
        ) : (
          <Laptop className="h-16 w-16 text-slate-300" aria-label="No image available" />
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((src, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1}`}
                aria-pressed={isActive}
                className={`aspect-square overflow-hidden rounded-2xl bg-white p-2 ring-2 transition duration-200 focus-visible:outline-none focus-visible:ring-sky-500 ${
                  isActive ? 'ring-sky-600' : 'ring-slate-200 hover:ring-slate-400'
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-contain" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
