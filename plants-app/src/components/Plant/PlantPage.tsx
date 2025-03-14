import {Backdrop, CircularProgress, Stack} from "@mui/material";
import {PlantRepositoryAPI} from "../../../infrastructure/PlantRepositoryAPI.ts";
import {useEffect, useState} from "react";
import {Plant} from "../../../domain/entities/Plant.ts";
import {GetSpecificPlantUseCase} from "../../../domain/useCases/GetSpecificPlantUseCase.ts";
import {useParams} from 'react-router-dom';
import PlantCard from "../Cards/PlantCard.tsx";
import Header from "../Header.tsx";
import styles from './plant-page.module.css'
import UpdateDatapointView from "../UpdateDatapointView.tsx";

type PlantProps = {
  repository: PlantRepositoryAPI
}

const PlantPage = ({repository}: PlantProps) => {
  const {plantUID} = useParams();
  const [loading, setLoading] = useState(true);
  const [plant, setPlant] = useState<Plant>();
  useEffect(() => {
    (async () => {
      if (!plantUID) return
      try {
        setLoading(true)
        const getSpecificPlant = new GetSpecificPlantUseCase(repository)
        setPlant(await getSpecificPlant.execute(plantUID))
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    })()
  }, [repository, plantUID])

  return (
    <Stack>
      <Header />
      <UpdateDatapointView plantUID={plantUID!} repository={repository} />
      <Backdrop sx={{color: "#fff", zIndex: 1000}} open={loading}>
        <CircularProgress color="primary"/>
      </Backdrop>
      {!loading && plant && <Stack className={styles.centered}><PlantCard plant={plant!}/></Stack>}
    </Stack>
  )
}
export default PlantPage;