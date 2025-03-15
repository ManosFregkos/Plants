import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { Plant } from "../../../domain/entities/Plant.ts";

type PlantCardProps = {
  plant: Plant;
  handlePlantSelect?: (plant: Plant) => void;
  enableHover?: boolean;
};

const PlantCard = ({
  plant,
  handlePlantSelect,
  enableHover,
}: PlantCardProps) => {
  return (
    <Card
      key={plant.uid}
      sx={{
        maxWidth: 345,
        cursor: enableHover ? "pointer" : "default",
        transition: enableHover ? "transform 0.3s ease-in-out" : "none",
        "&:hover": enableHover
          ? {
              transform: "scale(1.05)",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            }
          : undefined,
      }}
    >
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
      <Divider />
      {handlePlantSelect && (
        <CardActions sx={{ justifyContent: "center" }}>
          <Button onClick={() => handlePlantSelect(plant)} size="small">
            Show More
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
export default PlantCard;
