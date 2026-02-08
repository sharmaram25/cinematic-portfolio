import Hero from "@/components/home/Hero";
import About from "@/components/about/About";
import Projects from "@/components/projects/Projects";
import Experience from "@/components/experience/Experience";
import TechArsenal from "@/components/skills/TechArsenal";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black text-white selection:bg-gold selection:text-black">
      <Hero />
      <About />
      <TechArsenal />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
