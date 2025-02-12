import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Schedule from "@/components/Schedule";
import Gallery from "@/components/Gallery";
import Registration from "@/components/Registration";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Video } from "@/components/Video";

export default function Home() {
  return (
    <main className="bg-background">
      <Navbar />
      <Hero />
      {/* <About /> */}
      <Video/>
      <Registration />
      <Schedule />
      <Contact />
      <Footer />
    </main>
  );
}
