import {fetchData, postData} from "../utils/networking.ts";
import {PlantRepository} from "../domain/repositories/PlantRepository.ts";
import {PlantCreation} from "../domain/entities/PlantCreation.ts";
import {API_URL} from "../config.ts";
import {Plant} from "../domain/entities/Plant.ts";

export class PlantRepositoryAPI implements PlantRepository {
  async createPlant(name: string,): Promise<PlantCreation> {
    return await postData<PlantCreation>(`${API_URL}/plants`, {
      name: name,
    });
  }

  async getAllPlants(): Promise<Plant[]> {
    return await fetchData<Plant[]>(`${API_URL}/plants`);
  }

  async getSpecificPlant(plantId: string): Promise<Plant> {
    return await fetchData<Plant>(`${API_URL}/plants/${plantId}`);
  }
}