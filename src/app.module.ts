import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumsModule } from './modules/albums/albums.module';
import { UsersModule } from './modules/users/users.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import * as config from '../ormconfig.js';
import { LoggingMiddleware } from './common/middlewares/logging.middleware';
import { LoggingModule } from './common/services/custom-logger/custom-logger.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthMiddleware } from './common/middlewares/jwt-auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(config),
    AlbumsModule,
    UsersModule,
    TracksModule,
    ArtistsModule,
    FavoritesModule,
    LoggingModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes('*')
      .apply(JwtAuthMiddleware)
      .forRoutes(
        { path: 'user', method: RequestMethod.ALL },
        { path: 'track', method: RequestMethod.ALL },
        { path: 'album', method: RequestMethod.ALL },
        { path: 'favs', method: RequestMethod.ALL },
        { path: 'artist', method: RequestMethod.ALL },
        { path: 'user/*', method: RequestMethod.ALL },
        { path: 'track/*', method: RequestMethod.ALL },
        { path: 'album/*', method: RequestMethod.ALL },
        { path: 'favs/*', method: RequestMethod.ALL },
        { path: 'artist/*', method: RequestMethod.ALL },
      );
  }
}
