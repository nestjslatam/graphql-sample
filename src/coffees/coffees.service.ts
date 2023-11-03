import { NotFoundException } from '@nestjs/common';
// import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
// import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Connection, Repository } from 'typeorm';
// import { COFFEE_BRANDS } from './coffees.constants';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
// import coffeesConfig from './config/coffee.config';
import { Event } from '../events/entities/event.entity';

@Injectable()
export class CoffeesService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  // @Inject(COFFEE_BRANDS) coffeeBrands: string[],
  // private readonly configService: ConfigService,
  // @Inject(coffeesConfig.KEY)
  // private readonly coffeesConfiguration: ConfigType<typeof coffeesConfig>,
  // console.log('Coffee Brands injected:', coffeeBrands);
  // const databaseHost = this.configService.get<string>('DATABASE_HOST');
  // console.log('Database host:', databaseHost);
  // const coffeesConfig = this.configService.get('coffees');
  // console.log('module config:', coffeesConfig);
  // console.log('module config:', this.coffeesConfiguration.foo);

  async findAll({ offset, limit }: PaginationQueryDto) {
    return await this.coffeeRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: any) {
    const coffee = await this.coffeeRepository.findOneBy({
      id,
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee with ${id} does not found`);
    }

    return coffee;
  }

  async create(createCoffeeDto: any) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preLoadFlavorByName(name)),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });

    return await this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.preLoadFlavorByName(name)),
      ));

    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee with id: ${id} dows not exists`);
    }

    return await this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);

    return await this.coffeeRepository.remove(coffee);
  }

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      coffee.recomendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preLoadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOneBy({ name });

    if (existingFlavor) {
      return existingFlavor;
    }

    return this.flavorRepository.create({ name });
  }
}
