import './App.css'
import {Backdrop, Button, CircularProgress, Stack, TextField} from "@mui/material";
import {PlantRepositoryAPI} from "../infrastructure/PlantRepositoryAPI.ts";
import * as React from "react";
import {CreatePlantUseCase} from "../domain/useCases/CreatePlantUseCase.ts";

const repository = new PlantRepositoryAPI()

function App() {
  const [loading, setLoading] = React.useState(false);
  const [plantName, setPlantName] = React.useState("");

  const createPlant = async () => {
    if (plantName.length === 0) return
    try {
      setLoading(true);
      const createPlantAction = new CreatePlantUseCase(repository)
      await createPlantAction.execute(plantName)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setPlantName("")
    }
  }

  return (
    <Stack>
      <Backdrop sx={{ color: "#fff", zIndex: 1000}} open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
      <TextField label={'Plant Name'} placeholder={'Enter a plant name..'} value={plantName} required
                 onChange={e => setPlantName(e.target.value)}/>
      <Button disabled={plantName.length === 0} onClick={createPlant}>Create a Plant</Button>
    </Stack>
  )
}

export default App
