import {Plant, PlantContent} from "../entities/Plant.ts";
import {DatapointReport} from "../entities/DatapointReport.ts";

export interface PlantRepository {
  createPlant(name: string): Promise<Plant>
  getAllPlants(): Promise<PlantContent>
  getSpecificPlant(plantId: string): Promise<Plant>
  getDatapointReport(plantId: string, date: string): Promise<DatapointReport[]>
  updateDatapointReport(from_date: string, to_date: string, plantId: string): Promise<any>
}