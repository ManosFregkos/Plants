import {PlantRepositoryAPI} from "../../../infrastructure/PlantRepositoryAPI.ts";
import {PlantContent} from "../../../domain/entities/Plant.ts";
import {Dispatch, SetStateAction} from "react";
import {Backdrop, Button, CircularProgress, Stack, TextField} from "@mui/material";
import * as React from "react";
import {CreatePlantUseCase} from "../../../domain/useCases/CreatePlantUseCase.ts";

type CreatePlantProps = {
  repository: PlantRepositoryAPI,
  setPlants: Dispatch<SetStateAction<PlantContent>>,
}

const CreatePlant = ({repository, setPlants}: CreatePlantProps) => {
  const [plantName, setPlantName] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);

  const handleCreatePlant = async () => {
    try {
      setLoading(true);
      const createPlantAction = new CreatePlantUseCase(repository);
      const res = await createPlantAction.execute(plantName)
      setPlants((prevPlants) => ({
        ...prevPlants,
        results: [...prevPlants.results, res],
        count: prevPlants.count + 1
      }));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setPlantName("")
    }
  }

  return (
    <Stack spacing={2}>
      <Backdrop sx={{color: "#fff", zIndex: 1000}} open={loading}>
        <CircularProgress color="primary"/>
      </Backdrop>
      <Stack direction={'row'} columnGap={10} alignItems={"center"}>
        <TextField sx={{width: 300}} value={plantName} label={'Plant Name'} placeholder={"Enter a plant name.."}
                   onChange={(e) => setPlantName(e.target.value)}/>
        <Button disabled={plantName.length === 0} onClick={handleCreatePlant}>Create Plant</Button>
      </Stack>
    </Stack>
  )
}
export default CreatePlant;