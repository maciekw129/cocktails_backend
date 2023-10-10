import {Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from '@nestjs/typeorm'
import {PreparationStep} from "../modules/preparation-steps/preparation-step.entity";
import {IngredientItem} from "../modules/ingredients/entities/ingredientItem.entity";
import {Ingredient} from "../modules/ingredients/entities/ingredient.entity";
import {Rating} from "../modules/ratings/rating.entity";
import {Comment} from "../modules/comments/comment.entity";
import {Cocktail} from "../modules/cocktails/cocktail.entity";
import {User} from "../modules/users/user.entity";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(protected readonly configService: ConfigService) {}
    createTypeOrmOptions(): TypeOrmModuleOptions {
        const {configService} = this
        return {
            type: 'mysql',
            host: configService.get('database.host'),
            port: configService.get('database.port'),
            username: configService.get('database.username'),
            password: configService.get('database.password'),
            database: configService.get('database.name'),
            entities: [
                User,
                Cocktail,
                Comment,
                Rating,
                Ingredient,
                IngredientItem,
                PreparationStep,
            ],
            synchronize: !configService.get<string>('production')
        }
    }
}