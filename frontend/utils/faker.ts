import type {  } from "~/models";
import { faker } from "@faker-js/faker/locale/fr";
import { SUBJECTS } from "~/models";
import { LEVELS } from "~/models";
import type {Resource} from "#common/resource";

export const generateResources = (length: number): Resource[] => {
  const resources: Resource[] = [];
  const combinedTags = [...SUBJECTS, ...LEVELS.map((level) => level.label)];

  for (let i = 0; i < length; i++) {
    // Just to have uppercase first letter
    let fakeTitle = faker.company.buzzNoun();
    const id = i;
    const title = fakeTitle.charAt(0).toUpperCase() + fakeTitle.slice(1);
    const author = faker.person.fullName();
    const lastUpdated = faker.date.recent();
    const description = faker.lorem.sentences(3);
    const link = faker.internet.url();
    const nbTags = Math.floor(Math.random() * 4) + 1;
    // Take from subjects arrays or levels array or both
    const tags = Array.from(
      { length: nbTags },
      () => combinedTags[Math.floor(Math.random() * combinedTags.length)],
    );

    resources.push({ id, title, author, lastUpdated, description, link, tags });
  }

  return resources;
};
