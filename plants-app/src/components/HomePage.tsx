import {Backdrop, Box, CircularProgress, Container, Stack, Typography} from "@mui/material";
import PlantsList from "./PlantsList/PlantsList.tsx";
import * as React from "react";
import {useEffect} from "react";
import {GetAllPlantsUseCase} from "../../domain/useCases/GetAllPlantsUseCase.ts";
import {PlantContent} from "../../domain/entities/Plant.ts";
import {PlantRepositoryAPI} from "../../infrastructure/PlantRepositoryAPI.ts";
import CreatePlant from "./CreatePlantSection/CreatePlant.tsx";

type HomePageProps = {
  repository: PlantRepositoryAPI
}

const PLANTS_INITIAL_STATE = {count: 0, results: [], next: null, previous: null}

const HomePage = ({repository}: HomePageProps) => {
  const [loading, setLoading] = React.useState(false);
  const [plants, setPlants] = React.useState<PlantContent>(PLANTS_INITIAL_STATE);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const getAllPlantsAction = new GetAllPlantsUseCase(repository)
        setPlants(await getAllPlantsAction.execute())
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    })()
  }, [repository])

  return (
    <Container maxWidth={'xl'} sx={{padding: '24px'}}>
      <Backdrop sx={{color: "#fff", zIndex: 1000}} open={loading}>
        <CircularProgress color="primary"/>
      </Backdrop>
      {!loading && plants.results.length === 0 && <Typography>There are no plants yet !!</Typography>}
      {!loading && plants.results.length > 0 && <Stack rowGap={2}> <Typography variant={'h4'}>Plants
        Count: <b>{plants.count}</b></Typography><PlantsList plants={plants.results}/></Stack>}
      <Box mt={4}/>

      <CreatePlant repository={repository} setPlants={setPlants}/>
    </Container>
  )
}
export default HomePage;