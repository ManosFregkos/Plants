import {PlantRepository} from "../repositories/PlantRepository.ts";
import {PlantCreation} from "../entities/PlantCreation.ts";

export class CreatePlantUseCase {
  constructor(private readonly repository: PlantRepository) {}

  async execute(name: string): Promise<PlantCreation> {
    return await this.repository.createPlant(name);
  }
}