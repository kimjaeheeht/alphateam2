import CaseBand from "@/components/case/CaseBand";
import CaseCards from "@/components/case/CaseCards";
import CaseFeature from "@/components/case/CaseFeature";
import CaseHero from "@/components/case/CaseHero";
import CaseIntro from "@/components/case/CaseIntro";
import CasePager from "@/components/case/CasePager";
import CaseVisual from "@/components/case/CaseVisual";
import HeroPlanes from "@/components/case/HeroPlanes";
import { ggparrotContent } from "@/lib/content";
import { getAdjacentProjects, getProject, heroPlanesOnLight } from "@/lib/projects";

export default function GgparrotPage() {
  const project = getProject("ggparrot");
  const adjacent = getAdjacentProjects(project.slug);

  return (
    <>
      <CaseHero
        wordmark="GGPARROT"
        kicker={ggparrotContent.heroKicker}
        background={project.accent}
        color={project.onAccent}
        planes={heroPlanesOnLight}
      />
      <CaseIntro
        logo={project.assets.logo}
        name={project.name}
        body={ggparrotContent.introBody}
        meta={ggparrotContent.caseMeta}
        note={ggparrotContent.disclaimer}
        cta={ggparrotContent.cta}
        href={project.liveUrl}
      />
      <CaseBand color={project.accent} />
      <CaseFeature
        kicker={ggparrotContent.backgroundTitle}
        title={ggparrotContent.backgroundLead}
        accent="#111111"
        rails={project.accent}
      >
        <CaseVisual
          src={project.assets.mark}
          alt=""
          background="#fff8d1"
        />
      </CaseFeature>
      <CaseFeature
        kicker={ggparrotContent.serviceTitle}
        title={ggparrotContent.serviceLead}
        accent="#111111"
      />
      <CaseCards color={project.accent} items={ggparrotContent.services} />
      <CaseFeature
        kicker={ggparrotContent.brandTitle}
        title={ggparrotContent.brandLead}
        body={ggparrotContent.brandBody}
        accent="#111111"
      >
        <CaseVisual src={project.assets.logo} alt="껄무새 로고" />
      </CaseFeature>
      <section
        className="relative flex min-h-[48vh] items-center justify-center overflow-hidden"
        style={{ background: project.accent, color: project.onAccent }}
      >
        <HeroPlanes
          layers={heroPlanesOnLight}
        />
        <p className="relative z-10 text-[clamp(1.5rem,5vw,3rem)] font-bold">
          GGPARROT
        </p>
      </section>
      <CasePager prev={adjacent.prev} next={adjacent.next} />
    </>
  );
}
