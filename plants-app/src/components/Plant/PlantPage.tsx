import {Backdrop, CircularProgress, Container} from "@mui/material";
import {PlantRepositoryAPI} from "../../../infrastructure/PlantRepositoryAPI.ts";
import {useEffect, useState} from "react";
import {Plant} from "../../../domain/entities/Plant.ts";
import {GetSpecificPlantUseCase} from "../../../domain/useCases/GetSpecificPlantUseCase.ts";
import {useParams} from 'react-router-dom';
import PlantCard from "../Cards/PlantCard.tsx";

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
    <Container maxWidth={'xl'}>
      <Backdrop sx={{color: "#fff", zIndex: 1000}} open={loading}>
        <CircularProgress color="primary"/>
      </Backdrop>
      {!loading && plant && <PlantCard plant={plant!}/>}
    </Container>
  )
}
export default PlantPage;