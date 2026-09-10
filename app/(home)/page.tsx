import HomeHero from "@/components/home/HomeHero";
import HomeManifesto from "@/components/home/HomeManifesto";
import HomeScrollCanvas from "@/components/home/HomeScrollCanvas";
import ProjectCards from "@/components/home/ProjectCards";

export default function HomePage() {
  return (
    <HomeScrollCanvas>
      <HomeHero />
      <div className="relative z-10">
        <HomeManifesto />
        <ProjectCards />
      </div>
    </HomeScrollCanvas>
  );
}
