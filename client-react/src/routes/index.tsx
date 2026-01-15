import { createFileRoute } from '@tanstack/react-router'
import { ScrollyVideo } from '../components/ScrollyVideo'
import { cn } from '../lib/utils'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const renderOverlay = (progress: number) => {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none w-full h-full">
         <div 
           className={cn("transition-all duration-700 ease-in-out transform", 
             progress > 0.02 && progress < 0.20 
               ? "opacity-100 translate-y-0 scale-100" 
               : "opacity-0 translate-y-10 scale-95"
           )}
         >
            <h1 className="text-6xl md:text-9xl font-serif text-white tracking-widest uppercase mb-4">VeilVerse</h1>
            <p className="text-xl md:text-3xl text-amber-200/80 font-light tracking-[0.2em]">REDEFINING MODESTY</p>
         </div>

         <div 
           className={cn("transition-all duration-700 ease-in-out absolute inset-0 flex items-center justify-center flex-col", 
             progress > 0.25 && progress < 0.45 
               ? "opacity-100 translate-y-0" 
               : "opacity-0 translate-y-10 pointer-events-none"
           )}
         >
            <h2 className="text-5xl md:text-7xl font-serif text-white mb-2">Elegance in Motion</h2>
            <div className="h-0.5 w-24 bg-amber-500 rounded-full mt-4"></div>
         </div>

         <div 
           className={cn("transition-all duration-700 ease-in-out absolute inset-0 flex items-center justify-center flex-col", 
             progress > 0.50 && progress < 0.70 
               ? "opacity-100 translate-y-0" 
               : "opacity-0 translate-y-10 pointer-events-none"
           )}
         >
            <h2 className="text-5xl md:text-7xl font-serif text-white italic">Premium Fabrics</h2>
            <p className="text-white/70 mt-4 text-xl">Silk • Chiffon • Georgette</p>
         </div>
         
         <div 
           className={cn("transition-all duration-700 ease-in-out absolute inset-0 flex items-center justify-center flex-col", 
             progress > 0.75 
               ? "opacity-100 translate-y-0" 
               : "opacity-0 translate-y-10 pointer-events-none"
           )}
         >
            <h2 className="text-5xl md:text-8xl font-serif text-white">Unveil Your Style</h2>
            <button className="pointer-events-auto mt-12 px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-none border border-amber-400/30 transition-colors uppercase tracking-widest text-sm">
                Shop Collection
            </button>
         </div>
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-amber-900 selection:text-white">
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference text-white">
          <div className="text-xl font-serif tracking-widest font-bold">VEILVERSE</div>
          <div className="space-x-8 text-sm uppercase tracking-widest hidden md:block">
              <a href="#" className="hover:text-amber-400 transition-colors">Shop</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Collections</a>
              <a href="#" className="hover:text-amber-400 transition-colors">About</a>
          </div>
      </nav>

      <ScrollyVideo
        numFrames={240}
        folderPath="/sequences/"
        imagePrefix="ezgif-frame-"
        imageExtension="jpg"
        scrollHeight="600vh"
        overlay={renderOverlay}
      />
      
      <div className="bg-zinc-950 border-t border-zinc-900 relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-32">
            <div className="flex flex-col md:flex-row gap-16 items-center">
                <div className="md:w-1/2">
                    <h2 className="text-5xl font-serif text-amber-500 mb-8 leading-tight">Where Tradition Meets <br/> <span className="text-white">Contemporary Grace</span></h2>
                    <div className="space-y-6 text-lg text-zinc-400 font-light leading-relaxed">
                        <p>
                            VeilVerse brings you the finest selection of premium hijabs, crafted from the world's most luxurious fabrics. 
                            Our collection is designed for the modern woman who values both modesty and style. 
                            Each piece tells a story of elegance, grace, and sophistication.
                        </p>
                        <p>
                            Experience the touch of pure silk, chiffon, and georgette. 
                            Our designs are inspired by contemporary aesthetics while honoring traditional values.
                            Join us in a journey of fashion that transcends boundaries.
                        </p>
                    </div>
                </div>
                <div className="md:w-1/2 w-full h-96 relative group">
                    <div className="absolute inset-0 bg-amber-900/10 border border-amber-500/20 transform translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                    <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center border border-zinc-800">
                        {/* Placeholder for a static image */}
                        <span className="text-zinc-700 font-serif text-2xl italic">Image Placeholder</span>
                    </div>
                </div>
            </div>
        </div>
        
        <footer className="bg-black py-16 border-t border-zinc-900">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="text-2xl font-serif text-white mb-4">VEILVERSE</p>
                <div className="text-zinc-500 text-sm">
                    &copy; 2026 VeilVerse. All rights reserved.
                </div>
            </div>
        </footer>
      </div>
    </div>
  )
}
