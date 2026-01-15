"use client";

import { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils'; // Make sure this path is correct

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
            resolve();
          };
          loadedImages[i - 1] = img; // store at index 0-based
        });
        promises.push(promise);
      }

      await Promise.all(promises);
      setImages(loadedImages);
      setIsLoaded(true);
    };

    if (typeof window !== 'undefined') {
       loadImages();
    }
  }, [numFrames, folderPath, imagePrefix, imageExtension]);

  // Initial draw
  useEffect(() => {
    if (isLoaded && images.length > 0 && canvasRef.current) {
       // Draw first frame immediately
       const canvas = canvasRef.current;
       const img = images[0];
       if (!canvas || !img) return;
       const ctx = canvas.getContext('2d');
       if (!ctx) return;
       
       canvas.width = window.innerWidth;
       canvas.height = window.innerHeight;
       
       const hRatio = canvas.width / img.width;
       const vRatio = canvas.height / img.height;
       const ratio = Math.max(hRatio, vRatio);
       const centerShift_x = (canvas.width - img.width * ratio) / 2;
       const centerShift_y = (canvas.height - img.height * ratio) / 2;  
       
       ctx.drawImage(img, 0, 0, img.width, img.height, 
                     centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    }
  }, [isLoaded, images]);

  // Handle Scroll
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const handleScroll = () => {
      if (!containerRef.current || !canvasRef.current) return;
      
      const windowHeight = window.innerHeight;
      const startY = containerRef.current.offsetTop;
      // The scrollable distance is the total height of the container minus one viewport height
      // (because the content sticks for that duration)
      const scrollDistance = containerRef.current.offsetHeight - windowHeight;
      
      const scrollY = window.scrollY;
      
      // Calculate progress relative to the container's start pos
      const rawProgress = (scrollY - startY) / scrollDistance;
      
      const p = Math.max(0, Math.min(1, rawProgress));
      setProgress(p);
      
      const frameIndex = Math.min(
        numFrames - 1,
        Math.floor(p * (numFrames - 1))
      );
      
      const canvas = canvasRef.current;
      const img = images[frameIndex];
      if (!canvas || !img) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Use requestAnimationFrame for smoother performance if needed, 
      // but direct draw is often fine for scroll handlers unless complicated.
      // We will re-calc dimensions here to handle resize implicitly or use a ResizeObserver elsewhere.
      // Ideally move canvas sizing to a ResizeObserver to avoid thrashing, 
      // but for simplicity/robustness on dynamic resize we do it here or ensure it matches window.
      
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
         canvas.width = window.innerWidth;
         canvas.height = window.innerHeight;
      }

      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;  
      
      ctx.drawImage(img, 0, 0, img.width, img.height, 
                    centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Check initial position

    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
    };
  }, [isLoaded, images, numFrames]);

  return (
    <div 
      ref={containerRef} 
      className={cn("relative bg-black", containerClassName)}
      style={{ height: scrollHeight }}
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
         {!isLoaded && (
             <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
                 <div className="flex flex-col items-center">
                    <div className="w-16 h-1 bg-neutral-800 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-amber-500 animate-progress origin-left"></div>
                    </div>
                    <span className="mt-4 text-xs tracking-[0.3em] text-neutral-500 uppercase font-sans">Loading Experience</span>
                 </div>
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
