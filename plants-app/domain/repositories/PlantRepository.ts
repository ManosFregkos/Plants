import {Plant, PlantContent} from "../entities/Plant.ts";

export interface PlantRepository {
  createPlant(name: string): Promise<Plant>
  getAllPlants(): Promise<PlantContent>
  getSpecificPlant(plantId: string): Promise<Plant>
}