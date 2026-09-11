import ServicePage from "@/components/service/ServicePage";
import { serviceContent } from "@/lib/content";
import {
  getAdjacentProjects,
  getProject,
  type ProjectSlug,
} from "@/lib/projects";

/** slug로 프로젝트·카피·이전/다음 서비스를 묶어 공통 레이아웃에 넘깁니다. */
export default function ServiceProjectPage({ slug }: { slug: ProjectSlug }) {
  const project = getProject(slug);
  const { prev, next } = getAdjacentProjects(slug);

  return (
    <ServicePage
      project={project}
      content={serviceContent[slug]}
      prev={prev}
      next={next}
    />
  );
}
