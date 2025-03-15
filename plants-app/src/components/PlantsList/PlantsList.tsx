import {Stack} from "@mui/material";
import {Plant} from "../../../domain/entities/Plant.ts";
import PlantCard from "../Cards/PlantCard.tsx";
import {useNavigate} from "react-router-dom";
import styles from "./PlantCard.module.css"

type Props = {
  plants: Plant[];
}

const PlantsList = ({plants}: Props) => {
  const navigate = useNavigate();

  const handlePlantSelect = (plant: Plant) => {
    console.log(plant);
    navigate(`/plants/${plant.uid}`);
  }

  return (
    <Stack className={styles.cardContainer} direction="row" columnGap={2} flexWrap="wrap" alignItems="center">
      {plants.map((plant) => (
        <Stack mt={2} key={plant.uid}><PlantCard plant={plant} handlePlantSelect={handlePlantSelect} enableHover={true}/></Stack>
      ))}
    </Stack>
  )
}

export default PlantsList;