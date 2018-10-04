import { Controller, Query, Mutation } from 'vesper';
import { EntityManager } from 'typeorm';
import { Article } from '../entity/Article';

@Controller()
export class ArticleController {
  constructor(private entityManager: EntityManager) {}

  // serves "posts: [Post]" requests
  @Query()
  articles() {
    return this.entityManager.find(Article);
  }

  @Query()
  article({ id }: any) {
    return this.entityManager.findOne(Article, id);
  }

  @Mutation()
  async articleSave(args: any) {
    const hasArticle = await this.entityManager.find(Article, { where: { title: args.title } });
    if (!hasArticle.length) {
      const article = this.entityManager.create(Article, args);
      return this.entityManager.save(Article, article);
    }

    throw new Error('duplicate');
  }

  @Mutation()
  async articleDelete({ id }: any) {
    await this.entityManager.remove(Article, { id });
    return true;
  }
}
