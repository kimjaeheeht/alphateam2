import CaseBand from "@/components/case/CaseBand";
import CaseCards from "@/components/case/CaseCards";
import CaseFeature from "@/components/case/CaseFeature";
import CaseHero from "@/components/case/CaseHero";
import CaseIntro from "@/components/case/CaseIntro";
import CasePager from "@/components/case/CasePager";
import CaseTags from "@/components/case/CaseTags";
import CaseVisual from "@/components/case/CaseVisual";
import HeroPlanes from "@/components/case/HeroPlanes";
import { tripditoContent } from "@/lib/content";
import { brandGradient, getAdjacentProjects, getProject, heroPlanes } from "@/lib/projects";

export default function TripditoPage() {
  const project = getProject("tripdito");
  const adjacent = getAdjacentProjects(project.slug);

  return (
    <div className="bg-white text-[#111]">
      <CaseHero
        wordmark="TRIPDITO"
        kicker={tripditoContent.heroKicker}
        background={brandGradient(project)}
        planes={heroPlanes}
      />
      <CaseIntro
        logo={project.assets.logo}
        name={project.name}
        body={tripditoContent.introBody}
        meta={tripditoContent.caseMeta}
        cta={tripditoContent.cta}
        href={project.liveUrl}
      />
      <CaseBand color={project.accent} />
      <CaseFeature
        kicker={tripditoContent.backgroundTitle}
        title={tripditoContent.backgroundLead}
        body={tripditoContent.backgroundBody}
        accent={project.accent}
        rails={project.accent}
      >
        <CaseVisual src={project.assets.mark} alt="" />
      </CaseFeature>
      <CaseFeature
        kicker={tripditoContent.serviceTitle}
        title={tripditoContent.serviceLead}
        accent={project.accent}
      />
      <CaseCards color={project.accent} items={tripditoContent.services} />
      <CaseFeature
        kicker={tripditoContent.brandTitle}
        title={tripditoContent.brandLead}
        body={tripditoContent.brandBody}
        accent={project.accent}
      >
        <CaseVisual src={project.assets.logo} alt="TripDito 로고" />
      </CaseFeature>
      <section
        className="relative flex min-h-[48vh] items-center justify-center overflow-hidden"
        style={{ background: project.accent, color: project.onAccent }}
      >
        <HeroPlanes layers={heroPlanes} />
        <p className="relative z-10 pl-[0.38em] text-[clamp(1.5rem,5vw,3rem)] font-bold tracking-[0.38em] text-white">
          TRIPDITO
        </p>
      </section>
      <CaseTags tags={tripditoContent.tags} />
      <CasePager prev={adjacent.prev} next={adjacent.next} />
    </div>
  );
}
