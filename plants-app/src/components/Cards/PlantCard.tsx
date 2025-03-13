import {Button, Card, CardActions, CardContent, CardMedia, Divider, Typography} from "@mui/material";
import {Plant} from "../../../domain/entities/Plant.ts";

type PlantCardProps = {
  plant: Plant;
  handlePlantSelect?: (plant: Plant) => void;
}

const PlantCard = ({plant, handlePlantSelect}: PlantCardProps) => {
  return (
    <Card key={plant.uid} sx={{maxWidth: 345}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/public/plant.png"
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {plant.name}
        </Typography>
      </CardContent>
      <Divider/>
      {handlePlantSelect && (
        <CardActions sx={{justifyContent: "center"}}>
          <Button onClick={() => handlePlantSelect(plant)} size="small">
            Show More
          </Button>
        </CardActions>
      )}
    </Card>
  )
}
export default PlantCard;