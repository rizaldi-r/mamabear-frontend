import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative h-[200px] sm:[350px] md:h-[500px] lg:min-h-screen overflow-hidden">
      <Image 
        src="/images/home/banner.webp" 
        alt="Hero Background" 
        fill className="object-cover object-center" />
    </section>
  );
}
