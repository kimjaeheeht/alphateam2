import CaseBand from "@/components/case/CaseBand";
import CaseCards from "@/components/case/CaseCards";
import CaseFeature from "@/components/case/CaseFeature";
import CaseHero from "@/components/case/CaseHero";
import CaseIntro from "@/components/case/CaseIntro";
import CasePager from "@/components/case/CasePager";
import CaseVisual from "@/components/case/CaseVisual";
import HeroPlanes from "@/components/case/HeroPlanes";
import { torikongContent } from "@/lib/content";
import { getAdjacentProjects, getProject, heroPlanes } from "@/lib/projects";

export default function TorikongPage() {
  const project = getProject("torikong");
  const adjacent = getAdjacentProjects(project.slug);

  return (
    <>
      <CaseHero
        wordmark="TORIKONG"
        kicker={torikongContent.heroKicker}
        background={project.accent}
        color={project.onAccent}
        planes={heroPlanes}
      />
      <CaseIntro
        logo={project.assets.logo}
        name={project.name}
        body={torikongContent.introBody}
        meta={torikongContent.caseMeta}
        cta={torikongContent.cta}
        href={project.liveUrl}
      />
      <CaseBand color={project.accent} />
      <CaseFeature
        kicker={torikongContent.backgroundTitle}
        title={torikongContent.backgroundLead}
        accent={project.accent}
        rails={project.accent}
      >
        <CaseVisual
          src={project.assets.mark}
          alt=""
          background="#FEF2F4"
        />
      </CaseFeature>
      <CaseFeature
        kicker={torikongContent.serviceTitle}
        title={torikongContent.serviceLead}
        accent={project.accent}
      />
      <CaseCards color={project.accent} items={torikongContent.services} />
      <CaseFeature
        kicker={torikongContent.brandTitle}
        title={torikongContent.brandLead}
        body={torikongContent.brandBody}
        accent={project.accent}
      >
        <CaseVisual
          src={project.assets.logo}
          alt="토리콩 로고"
          background="#FEF2F4"
        />
      </CaseFeature>
      <section
        className="relative flex min-h-[48vh] items-center justify-center overflow-hidden"
        style={{ background: project.accent, color: project.onAccent }}
      >
        <HeroPlanes
          layers={heroPlanes}
        />
        <p className="relative z-10 text-[clamp(1.5rem,5vw,3rem)] font-bold text-white">
          TORIKONG
        </p>
      </section>
      <CasePager prev={adjacent.prev} next={adjacent.next} />
    </>
  );
}
