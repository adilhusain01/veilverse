"use client";

import { ScrollyVideo } from "../components/ScrollyVideo";
import { cn } from "../lib/utils";
import { ShoppingBag, Menu, Search, ArrowRight, Star, ArrowDown } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderOverlay = (progress: number) => {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none w-full h-full">
         
         {/* Scene 1: Intro */}
         <div 
           className={cn("transition-all duration-1000 ease-out transform absolute inset-0 flex flex-col items-center justify-center", 
             progress < 0.20 
               ? "opacity-100 translate-y-0 filter blur-0" 
               : "opacity-0 -translate-y-20 filter blur-sm"
           )}
         >
            <p className="text-amber-300/80 text-sm md:text-base tracking-[0.4em] uppercase mb-6 font-sans">The New Collection</p>
            <h1 className="text-7xl md:text-9xl font-serif text-white tracking-wider uppercase mb-8 leading-none">
              Veil<span className="text-amber-500">Verse</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-light tracking-[0.2em] font-sans max-w-xl leading-relaxed">
              Redefining Modesty with <br/> Unparalleled Elegance
            </p>
            <div className="absolute bottom-20 animate-bounce opacity-50">
                <ArrowDown className="text-white w-6 h-6" />
            </div>
         </div>

         {/* Scene 2: Materials */}
         <div 
           className={cn("transition-all duration-1000 ease-out absolute inset-0 flex items-center justify-center flex-col", 
             progress > 0.25 && progress < 0.45 
               ? "opacity-100 translate-y-0 scale-100" 
               : "opacity-0 translate-y-10 scale-95"
           )}
         >
            <div className="w-px h-20 bg-amber-500/50 mb-8"></div>
            <h2 className="text-6xl md:text-8xl font-serif text-white mb-6">Silk & Soul</h2>
            <div className="flex gap-8 text-white/60 font-sans tracking-widest text-sm uppercase">
                <span>100% Mulberry Silk</span>
                <span>•</span>
                <span>Hand-Stitched Borders</span>
            </div>
         </div>

         {/* Scene 3: Motion */}
         <div 
           className={cn("transition-all duration-1000 ease-out absolute inset-0 flex items-center justify-center flex-col", 
             progress > 0.50 && progress < 0.70 
               ? "opacity-100 translate-y-0" 
               : "opacity-0 translate-y-10"
           )}
         >
             <div className="border border-white/20 p-12 backdrop-blur-sm bg-black/20">
                <h2 className="text-5xl md:text-7xl font-serif text-white italic mb-4">"Grace in every movement"</h2>
                <div className="w-full flex justify-end">
                    <p className="text-white/70 mt-4 text-base font-sans tracking-widest">— THE VEILVERSE PROMISE</p>
                </div>
            </div>
         </div>
         
         {/* Scene 4: CTA */}
         <div 
           className={cn("transition-all duration-1000 ease-out absolute inset-0 flex items-center justify-center flex-col", 
             progress > 0.8 
               ? "opacity-100 translate-y-0" 
               : "opacity-0 translate-y-10"
           )}
         >
            <h2 className="text-5xl md:text-8xl font-serif text-white mb-12">Unveil Your Style</h2>
            <button className="pointer-events-auto group relative px-12 py-4 bg-transparent overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-amber-600/20 group-hover:bg-amber-600/30 transition-colors duration-300"></div>
                <div className="absolute inset-0 border border-amber-500/30 scale-95 group-hover:scale-100 transition-transform duration-500"></div>
                <span className="relative z-10 font-sans uppercase tracking-[0.25em] text-white group-hover:text-amber-200 transition-colors flex items-center gap-4">
                    Shop The Collection <ArrowRight className="w-4 h-4" />
                </span>
            </button>
         </div>
      </div>
    )
  }

  return (
    <div className="bg-neutral-950 min-h-screen text-white selection:bg-amber-900/50 selection:text-amber-100">
      
      {/* Navigation */}
      <nav 
        className={cn(
            "fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center transition-all duration-500",
            isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent"
        )}
      >
          <div className="flex items-center gap-8">
             <Menu className="w-6 h-6 text-white hover:text-amber-400 cursor-pointer transition-colors" />
             <div className="hidden md:flex gap-8 text-xs uppercase tracking-[0.2em] font-sans text-neutral-300">
                <Link href="#" className="hover:text-amber-400 transition-colors">Shop</Link>
                <Link href="#" className="hover:text-amber-400 transition-colors">Collections</Link>
                <Link href="#" className="hover:text-amber-400 transition-colors">About</Link>
             </div>
          </div>
          
          <div className="text-2xl font-serif tracking-widest font-bold text-white absolute left-1/2 transform -translate-x-1/2">
             VEILVERSE
          </div>

          <div className="flex items-center gap-6 text-white">
              <Search className="w-5 h-5 hover:text-amber-400 cursor-pointer transition-colors" />
              <div className="relative cursor-pointer group">
                  <ShoppingBag className="w-5 h-5 hover:text-amber-400 transition-colors" />
                  <span className="absolute -top-2 -right-2 bg-amber-600/80 text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-sans">0</span>
              </div>
          </div>
      </nav>

      {/* ScrollyTelling Section */}
      <ScrollyVideo
        numFrames={240}
        folderPath="/sequences/"
        imagePrefix="ezgif-frame-"
        imageExtension="jpg"
        scrollHeight="600vh"
        overlay={renderOverlay}
        className="opacity-90"
      />
      
      {/* Editorial Content Section */}
      <div className="bg-neutral-950 relative z-20 -mt-px pointer-events-auto">
        <div className="max-w-7xl mx-auto px-6 py-32">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                <div className="space-y-12">
                     <div>
                        <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-sans mb-4 block">Our Philosophy</span>
                        <h2 className="text-5xl md:text-6xl font-serif text-white mb-8 leading-tight">
                            Where Tradition Meets <br/> 
                            <span className="text-neutral-500 italic">Contemporary Grace</span>
                        </h2>
                     </div>
                    <div className="space-y-8 text-lg text-neutral-400 font-light leading-relaxed font-sans text-justify">
                        <p>
                            VeilVerse brings you the finest selection of premium hijabs, crafted from the world's most luxurious fabrics. 
                            Our collection is designed for the modern woman who values both modesty and style. 
                            Each piece tells a story of elegance, grace, and sophistication.
                        </p>
                        <p>
                            We travel the globe to source the finest mulberry silks, breathable chiffons, and structural georgettes. 
                            Every hem is hand-rolled, every dye is organic, and every design is exclusive to VeilVerse.
                        </p>
                        <Link href="#" className="inline-block text-amber-500 uppercase tracking-widest text-xs border-b border-amber-500/50 pb-1 hover:text-white hover:border-white transition-all">
                            Read Our Story
                        </Link>
                    </div>
                </div>
                
                <div className="relative">
                    <div className="aspect-[3/4] overflow-hidden bg-neutral-900 border border-neutral-800 relative z-10 group">
                        {/* Placeholder for editorial image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-20"></div>
                        <div className="absolute bottom-8 left-8 z-30">
                             <div className="flex gap-1 mb-2">
                                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                             </div>
                             <p className="text-white font-serif text-xl italic">"The most comfortable fabric I've ever worn."</p>
                             <p className="text-neutral-500 text-xs uppercase tracking-widest mt-2">— Sarah A., Verified Buyer</p>
                        </div>
                        {/* If real images exist, use <Image /> here */}
                        <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-800 font-serif text-4xl">
                            Editorial Shot
                        </div>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -top-8 -right-8 w-64 h-64 border border-amber-500/10 rounded-full z-0 animate-pulse-slow"></div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 border-t border-white/5 pt-20">
                {[
                    { title: "Premium Fabrics", desc: "Sourced sustainably from the finest mills in Italy and Turkey." },
                    { title: "Hand-Finished", desc: "Meticulous attention to detail with hand-rolled hems and reinforced stitching." },
                    { title: "Gift Packaging", desc: "Every order arrives in our signature matte black recyclable luxury box." }
                ].map((item, idx) => (
                    <div key={idx} className="text-center p-8 hover:bg-white/5 transition-colors duration-500 cursor-default">
                        <div className="w-12 h-12 mx-auto bg-neutral-900 rounded-full border border-neutral-800 mb-6 flex items-center justify-center text-amber-500 font-serif italic text-xl">
                            {idx + 1}
                        </div>
                        <h3 className="text-xl font-serif text-white mb-4">{item.title}</h3>
                        <p className="text-neutral-500 font-sans text-sm leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
            
        </div>
        
        <footer className="bg-black py-20 border-t border-neutral-900 relative overflow-hidden">
             {/* Big Background Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif text-white/[0.02] pointer-events-none select-none whitespace-nowrap">
                VEILVERSE
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                     <div>
                        <p className="text-3xl font-serif text-white mb-8">Join the inner circle.</p>
                        <div className="flex border-b border-neutral-700 pb-2 max-w-sm">
                            <input type="email" placeholder="Your email address" className="bg-transparent border-none outline-none text-white placeholder-neutral-600 w-full font-sans tracking-wide" />
                            <button className="text-neutral-400 hover:text-white uppercase text-xs tracking-widest transition-colors">Subscribe</button>
                        </div>
                     </div>

                     <div className="flex gap-12 text-xs uppercase tracking-widest text-neutral-500 font-sans">
                         <div className="flex flex-col gap-4">
                             <a href="#" className="hover:text-amber-500 transition-colors">Instagram</a>
                             <a href="#" className="hover:text-amber-500 transition-colors">TikTok</a>
                             <a href="#" className="hover:text-amber-500 transition-colors">Pinterest</a>
                         </div>
                         <div className="flex flex-col gap-4">
                             <a href="#" className="hover:text-white transition-colors">Shipping</a>
                             <a href="#" className="hover:text-white transition-colors">Returns</a>
                             <a href="#" className="hover:text-white transition-colors">Contact</a>
                         </div>
                     </div>
                </div>
                
                <div className="mt-20 pt-8 border-t border-neutral-900 flex justify-between items-center text-[10px] uppercase tracking-widest text-neutral-700 font-sans">
                    <p>&copy; 2026 VeilVerse. All rights reserved.</p>
                    <p>Designed for Elegance</p>
                </div>
            </div>
        </footer>
      </div>
    </div>
  );
}
