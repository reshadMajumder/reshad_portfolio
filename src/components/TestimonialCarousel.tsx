import { useState, useEffect } from 'react';
import { Card } from './ui/card';

const testimonials = [
  {
    image: '/avatars/avatar1.jpg',
    name: 'Shahabuddin Ahmed',
    rating: 5,
    date: '12/3/2024',
    comment: 'Great experience at the Gastroenterology Department. Dr. Sheikh Abdullah Al-Mamun explained everything clearly.'
  },
  {
    image: '/avatars/avatar2.jpg',
    name: 'Alim Hossain',
    rating: 4,
    date: '9/11/2024',
    comment: 'I had a consultation with Dr. Md. Samiul Hossain, and he was incredibly patient and thorough. Highly recommended!'
  },
  {
    image: '/avatars/avatar3.jpg',
    name: 'Rafiq Islam',
    rating: 5,
    date: '12/3/2024',
    comment: 'Efficient service and professional staff. However, the wait time could be reduced. Overall, a good experience.'
  },
  {
    image: '/avatars/avatar4.jpg',
    name: 'Khaleda Begum',
    rating: 4,
    date: '12/11/2024',
    comment: 'Very organized and hygienic clinic. The reception was helpful and the consultation was thorough.'
  },
];

export const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[500px] w-full overflow-hidden perspective-1000">
      <div className="absolute w-full h-full flex items-center justify-center">
        {testimonials.map((item, index) => {
          const offset = (index - currentIndex) % testimonials.length;
          const zIndex = offset === 0 ? 10 : 5;
          
          return (
            <Card
              key={index}
              className={`absolute w-[350px] transition-all duration-500 ease-in-out 
                ${Math.abs(offset) <= 2 ? 'opacity-100' : 'opacity-0'}`}
              style={{
                transform: `
                  translateX(${offset * 120}%) 
                  translateZ(${offset === 0 ? 0 : -100}px) 
                  rotateY(${offset * -25}deg)
                `,
                zIndex,
              }}
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < item.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm">{item.comment}</p>
                
                <div className="text-sm text-muted-foreground">
                  {item.date}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-primary/10 hover:bg-primary/20 text-primary w-8 h-8 flex items-center justify-center rounded-full"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-primary/10 hover:bg-primary/20 text-primary w-8 h-8 flex items-center justify-center rounded-full"
      >
        →
      </button>
    </div>
  );
}; 