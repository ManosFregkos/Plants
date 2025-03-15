import * as React from "react";
import {PlantContent} from "../domain/entities/Plant.ts";
import {useEffect} from "react";
import {GetAllPlantsUseCase} from "../domain/useCases/GetAllPlantsUseCase.ts";
import {PlantRepositoryAPI} from "../infrastructure/PlantRepositoryAPI.ts";

const PLANTS_INITIAL_STATE = {
  count: 0,
  results: [],
  next: null,
  previous: null,
};

const usePlants = (repository: PlantRepositoryAPI) => {
  const [loading, setLoading] = React.useState(false);
  const [plants, setPlants] =
    React.useState<PlantContent>(PLANTS_INITIAL_STATE);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const getAllPlantsAction = new GetAllPlantsUseCase(repository);
        const plants = await getAllPlantsAction.execute();
        setPlants(plants);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [repository]);

  return {
    plants,
    setPlants,
    loading,
  }
}
export default usePlants