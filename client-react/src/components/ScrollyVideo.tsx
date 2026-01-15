import { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';

interface ScrollyVideoProps {
  numFrames: number;
  folderPath: string;
  imagePrefix: string;
  imageExtension: string;
  className?: string; // For the canvas
  containerClassName?: string;
  scrollHeight?: string; // height of the scrollable area, e.g., "500vh"
  overlay?: (progress: number) => React.ReactNode;
}

export function ScrollyVideo({
  numFrames,
  folderPath,
  imagePrefix,
  imageExtension,
  className,
  containerClassName,
  scrollHeight = "500vh",
  overlay,
}: ScrollyVideoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      const promises: Promise<void>[] = [];

      for (let i = 1; i <= numFrames; i++) {
        const promise = new Promise<void>((resolve, reject) => {
          const img = new Image();
          // Pad with zeros (e.g., 1 -> 001, 25 -> 025)
          const paddedIndex = i.toString().padStart(3, '0');
          img.src = `${folderPath}${imagePrefix}${paddedIndex}.${imageExtension}`;
          img.onload = () => resolve();
          img.onerror = (e) => {
            console.error(`Failed to load image ${i}`, e);
            resolve(); // Resolve anyway to avoid blocking
          };
          loadedImages[i - 1] = img; // store at index 0-based
        });
        promises.push(promise);
      }

      await Promise.all(promises);
      setImages(loadedImages);
      setIsLoaded(true);
    };

    loadImages();
  }, [numFrames, folderPath, imagePrefix, imageExtension]);

  // Initial draw
  useEffect(() => {
    if (isLoaded && images.length > 0 && canvasRef.current) {
       renderFrame(0);
    }
  }, [isLoaded, images]);

  // Handle Scroll
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const handleScroll = () => {
      if (!containerRef.current || !canvasRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate start and end of the scroll interaction
      // When the top of the container hits the top of the viewport (or slightly before/after depending on sticky)
      
      // We want the animation to progress as the specific container scrolls through the viewport.
      // Since it's sticky, the container is usually taller than the viewport.
      // Progress 0: Top of container is at top of viewport.
      // Progress 1: Bottom of container is at bottom of viewport.
      
      const startY = containerRef.current.offsetTop;
      const endY = startY + containerRef.current.offsetHeight - windowHeight;
      
      // Global scroll position
      const scrollY = window.scrollY;
      
      const rawProgress = (scrollY - startY) / (containerRef.current.offsetHeight - windowHeight);
      
      // Clamp progress
      const p = Math.max(0, Math.min(1, rawProgress));
      setProgress(p);
      
      const frameIndex = Math.min(
        numFrames - 1,
        Math.floor(p * numFrames)
      );
      
      renderFrame(frameIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoaded, images, numFrames]);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img = images[index];
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Maintain aspect ratio cover
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // basic drawImage to cover
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    
    // Center the image
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;  
    
    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw
    ctx.drawImage(img, 0, 0, img.width, img.height, 
                  centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
  };

  return (
    <div 
      ref={containerRef} 
      className={cn("relative bg-black", containerClassName)}
      style={{ height: scrollHeight }}
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
         {!isLoaded && (
             <div className="absolute inset-0 flex items-center justify-center text-white z-10">
                 Loading Experience...
             </div>
         )}
        <canvas 
          ref={canvasRef} 
          className={cn("block w-full h-full object-cover", className)}
        />
        <div className="absolute inset-0 z-10 pointer-events-none">
           {overlay && overlay(progress)}
        </div>
      </div>
    </div>
  );
}
