import ServicePage from "@/components/service/ServicePage";
import { serviceContent } from "@/lib/content";
import {
  getAdjacentProjects,
  getProject,
  type ProjectSlug,
} from "@/lib/projects";

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
