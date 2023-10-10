import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CocktailsModule } from './modules/cocktails/cocktails.module';
import { UsersModule } from './modules/users/users.module';
import { CommentsModule } from './modules/comments/comments.module';
import { RatingsModule } from './modules/ratings/ratings.module';
import { IngredientsModule } from './modules/ingredients/ingredients.module';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './auth/guards/at.guard';
import { APP_GUARD } from '@nestjs/core';
import { PreparationStepsModule } from './modules/preparation-steps/preparation-steps.module';
import configuration from "./config/configuration";
import {TypeOrmConfigService} from "./config/typeOrmConfigService";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useClass: TypeOrmConfigService,
        inject: [ConfigService]
      }),
    UsersModule,
    CocktailsModule,
    CommentsModule,
    RatingsModule,
    IngredientsModule,
    PreparationStepsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
