import React from 'react'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="relative container mx-auto px-4 md:px-8 py-20 md:py-32">
        <div className="max-w-2xl">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Legacy Stars of Ibadan
          </h1>
          <p className="font-body text-xl md:text-2xl text-amber-50 mb-8 leading-relaxed">
            Celebrating the rich heritage, cultural pride, and community spirit of Ibadan's most distinguished socio-cultural group.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button data-slot="button" className="justify-center whitespace-nowrap rounded-md disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 has-[>svg]:px-3 bg-[#B85C3C] hover:bg-[#A04A2E] text-white px-8 py-3 text-lg font-semibold flex items-center gap-2 transition-colors duration-300">
              "Discover our Story"
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-5 h-5" data-loc="client/src/components/Hero.tsx:50">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>

            <button data-slot="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-transparent shadow-xs dark:bg-transparent dark:border-input dark:hover:bg-input/50 h-9 has-[>svg]:px-3 border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold transition-colors duration-300">
                Get In Touch
            </button>
            

          </div>
        </div>
      </div>
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg data-loc="client/src/components/Hero.tsx:67" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path data-loc="client/src/components/Hero.tsx:73" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
      </div>
    </section>
  )
}

export default HeroSection

