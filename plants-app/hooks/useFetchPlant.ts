import {useEffect, useState} from "react";
import {GetSpecificPlantUseCase} from "../domain/useCases/GetSpecificPlantUseCase.ts";
import {Plant} from "../domain/entities/Plant.ts";
import {PlantRepositoryAPI} from "../infrastructure/PlantRepositoryAPI.ts";

const useFetchPlant = (repository: PlantRepositoryAPI, plantUID: string) => {
  const [loading, setLoading] = useState(true);
  const [plant, setPlant] = useState<Plant>();

  useEffect(() => {
    (async () => {
      if (!plantUID) return;
      try {
        setLoading(true);
        const getSpecificPlant = new GetSpecificPlantUseCase(repository);
        const plant = await getSpecificPlant.execute(plantUID);
        setPlant(plant);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [repository, plantUID]);

  return {
    plant,
    loading,
  }
}
export default useFetchPlant;