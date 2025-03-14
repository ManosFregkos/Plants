import {PlantRepository} from "../repositories/PlantRepository.ts";
import {DatapointReport} from "../entities/DatapointReport.ts";

export class GetPlantDatapointReportUseCase {
  constructor(private readonly repository: PlantRepository) {
  }

  async execute(plantId: string, date: string): Promise<DatapointReport[]> {
    return await this.repository.getDatapointReport(plantId, date);
  }
}