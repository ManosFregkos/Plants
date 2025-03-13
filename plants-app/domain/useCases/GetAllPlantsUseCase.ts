import {PlantRepository} from "../repositories/PlantRepository.ts";
import {Plant} from "../entities/Plant.ts";

export class GetAllPlantsUseCase {
  constructor(private readonly repository: PlantRepository) {}

  async execute(): Promise<Plant[]> {
    return await this.repository.getAllPlants();
  }
}