import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CocktailsModule } from './modules/cocktails/cocktails.module';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'cocktails_db',
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
    CocktailsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
