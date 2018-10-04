import { Controller, Query, Mutation } from 'vesper';
import { EntityManager } from 'typeorm';
import { Project } from '../entity/Project';

@Controller()
export class ProjectController {
  constructor(private entityManager: EntityManager) {}

  // serves "posts: [Post]" requests
  @Query()
  projects() {
    return this.entityManager.find(Project);
  }

  @Query()
  project({ id }: any) {
    return this.entityManager.findOne(Project, id);
  }

  @Mutation()
  async projectSave(args: any) {
    const hasProject = await this.entityManager.find(Project, { where: { title: args.title } });
    if (!hasProject.length) {
      const project = this.entityManager.create(Project, args);
      return this.entityManager.save(Project, project);
    }

    throw new Error('duplicate');
  }

  @Mutation()
  async projectDelete({ id }: any) {
    await this.entityManager.remove(Project, { id });
    return true;
  }
}
