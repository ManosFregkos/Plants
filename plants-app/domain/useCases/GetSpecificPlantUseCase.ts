import {PlantRepository} from "../repositories/PlantRepository.ts";
import {Plant} from "../entities/Plant.ts";

export class GetSpecificPlantUseCase {
  constructor(private readonly repository: PlantRepository) {}

  async execute(plantId: string): Promise<Plant> {
    return await this.repository.getSpecificPlant(plantId);
  }
}