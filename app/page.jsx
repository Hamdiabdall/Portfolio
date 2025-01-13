// @flow strict

import AboutSection from './components/homepage/about';
import BlogSection from './components/homepage/blogs';
import ContactSection from './components/homepage/contact';
import Education from './components/homepage/education';
import Experience from './components/homepage/experience';
import HeroSection from './components/homepage/hero-section';
import Skills from './components/homepage/skills';

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <AboutSection />
      <Skills />
      <Experience />
      <Education />
      <BlogSection />
      <ContactSection />
    </main>
  );
} 