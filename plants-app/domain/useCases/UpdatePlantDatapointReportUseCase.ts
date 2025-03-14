import {PlantRepository} from "../repositories/PlantRepository.ts";

export class UpdatePlantDatapointReportUseCase {
  constructor(private readonly repository: PlantRepository) {
  }

  async execute(from_date: string, to_date: string, plantId: string): Promise<any> {
    return await this.repository.updateDatapointReport(from_date, to_date, plantId);
  }
}