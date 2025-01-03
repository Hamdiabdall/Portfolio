'use client';

import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./about";
import Blog from "./blog";
import ContactSection from "./contact";
import Education from "./education";
import Experience from "./experience";
import HeroSection from "./hero-section";
import Projects from "./projects";
import Skills from "./skills";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`);
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        const filtered = data.filter((item) => item?.cover_image).sort(() => Math.random() - 0.5);
        setBlogs(filtered);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div suppressHydrationWarning>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      {!loading && <Blog blogs={blogs} />}
      <ContactSection />
    </div>
  );
}
