import {PlantRepository} from "../repositories/PlantRepository.ts";
import {Plant} from "../entities/Plant.ts";

export class CreatePlantUseCase {
  constructor(private readonly repository: PlantRepository) {}

  async execute(name: string): Promise<Plant> {
    return await this.repository.createPlant(name);
  }
}