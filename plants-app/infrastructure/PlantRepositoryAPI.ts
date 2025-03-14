import {fetchData, postData} from "../utils/networking.ts";
import {PlantRepository} from "../domain/repositories/PlantRepository.ts";
import {API_URL} from "../config.ts";
import {Plant, PlantContent} from "../domain/entities/Plant.ts";
import {DatapointReport} from "../domain/entities/DatapointReport.ts";

export class PlantRepositoryAPI implements PlantRepository {
  async createPlant(name: string,): Promise<Plant> {
    return await postData<Plant>(`${API_URL}/plants`, {
      name: name,
    });
  }

  async getAllPlants(): Promise<PlantContent> {
    return await fetchData<PlantContent>(`${API_URL}/plants`);
  }

  async getSpecificPlant(plantId: string): Promise<Plant> {
    return await fetchData<Plant>(`${API_URL}/plants/${plantId}`);
  }

  async getDatapointReport(plantId: string, date: string): Promise<DatapointReport[]> {
    return await postData<DatapointReport[]>(`${API_URL}/datapoints/report`, {
      plant_id: plantId,
      date: date,
    });
  }

  async updateDatapointReport(from_date: string, to_date: string, plantId: string): Promise<DatapointReport[]> {
    return await postData<DatapointReport[]>(`${API_URL}/datapoints/update`, {
      from_date: from_date,
      to_date: to_date,
      plant_id: plantId,
    });
  }
}