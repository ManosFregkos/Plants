import {PlantRepository} from "../repositories/PlantRepository.ts";
import {PlantContent} from "../entities/Plant.ts";

export class GetAllPlantsUseCase {
  constructor(private readonly repository: PlantRepository) {}

  async execute(): Promise<PlantContent> {
    return await this.repository.getAllPlants();
  }
}