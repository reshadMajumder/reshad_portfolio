import { useState, useEffect } from 'react';
import { BASE_URL } from '../services/Api';

export const ImageCarousel3D = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(`${BASE_URL}/api/about/`);
      const data = await response.json();
      const imageUrls = data.images.map((image: { image: string }) => `${BASE_URL}${image.image}`);
      setImages(imageUrls);
    };

    fetchImages();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      <div className="absolute w-full h-full flex items-center justify-center">
        {images.map((image, index) => {
          const offset = (index - currentIndex) % images.length;
          const isActive = offset === 0;
          const zIndex = isActive ? 30 : 20 - Math.abs(offset);
          
          return (
            <div
              key={index}
              className="absolute transition-all duration-500 ease-out cursor-pointer"
              style={{
                transform: `
                  translateX(${offset * 60}%) 
                  scale(${isActive ? 1.2 : 0.8}) 
                  rotateY(${offset * -5}deg)
                `,
                zIndex,
                opacity: Math.abs(offset) <= 2 ? 1 : 0,
              }}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className={`w-[300px] h-[200px] object-cover rounded-lg shadow-xl 
                  ${isActive ? 'shadow-2xl' : 'shadow-lg filter brightness-75'}`}
              />
              {isActive && (
                <div className="absolute inset-0 rounded-lg ring-2 ring-primary/50 ring-offset-2" />
              )}
            </div>
          );
        })}
      </div>
      
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white text-primary w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white text-primary w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      >
        →
      </button>
    </div>
  );
}; 