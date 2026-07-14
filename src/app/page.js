import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
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
    /* min-h-screen + flex-col keeps the footer pinned to the bottom of the
       viewport even when a page is too short to fill it. */
    <div className="flex flex-col min-h-screen">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1 bg-background">
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
      </main>
      <Footer />
    </div>
  );
}
