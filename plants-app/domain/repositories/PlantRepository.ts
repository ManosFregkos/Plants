import {PlantCreation} from "../entities/PlantCreation.ts";
import {Plant} from "../entities/Plant.ts";

export interface PlantRepository {
  createPlant(name: string): Promise<PlantCreation>
  getAllPlants(): Promise<Plant[]>
  getSpecificPlant(plantId: string): Promise<Plant>
}