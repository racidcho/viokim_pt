import { useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { CustomCursor } from '../components/CustomCursor';
import { CinematicAperture } from '../components/CinematicAperture';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Works } from '../sections/Works';
import { Filmography } from '../sections/Filmography';
import { Credentials } from '../sections/Credentials';
import { Contact } from '../sections/Contact';
import { Footer } from '../sections/Footer';
import { siteConfig } from '../config';

export default function Home() {
  useEffect(() => {
    document.title = siteConfig.title;
    document.documentElement.lang = siteConfig.language;
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-black text-white">
      <CustomCursor />
      <Navigation />
      <main>
        <CinematicAperture />
        <Hero />
        <About />
        <Works />
        <Filmography />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
