import {
  type GitLabProject,
  LEVELS,
  SUBJECTS,
  type Tag,
} from '~/models';
import type {Resource} from "#common/resource";

export const convertToResource = (project: GitLabProject): Resource => {
  const tags: Tag[] = project.tag_list;

  return {
    id: project.id,
    title: project.name,
    description: project.description,
    lastUpdated: new Date(project.last_activity_at),
    author: project.namespace.name,
    link: project.web_url,
    tags,
  };
};
