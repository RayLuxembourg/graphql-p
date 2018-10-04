import { bootstrap } from 'vesper';
import { ProjectController, ArticleController } from './controller';
import { Project, Article } from './entity';

bootstrap({
  port: 3000,
  controllers: [ProjectController, ArticleController],
  entities: [Project, Article],
  schemas: [__dirname + '/schema/**/*.graphql']
})
  .then(() => {
    console.log(
      'Your app is up and running on http://localhost:3000. ' +
        'You can use playground in development mode on http://localhost:3000/playground'
    );
  })
  .catch(error => {
    console.error(error);
  });
