import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import About from "@/components/About";
import MatajiQuote from "@/components/MatajiQuote";
import Stats from "@/components/Stats";
import Announcements from "@/components/Announcements";
import { Video } from "@/components/Video";
import Registration from "@/components/Registration";
import Schedule from "@/components/Schedule";
import ShantiMantra from "@/components/ShantiMantra";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-background">
      <Navbar />
      <Hero />
      <Welcome />
      <About />
      <MatajiQuote />
      <Stats />
      <Announcements />
      <Video />
      <Registration />
      <Schedule />
      <ShantiMantra />
      <Footer />
    </main>
  );
}
