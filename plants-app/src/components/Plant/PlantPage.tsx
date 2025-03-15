import { Backdrop, CircularProgress, Stack } from "@mui/material";
import { PlantRepositoryAPI } from "../../../infrastructure/PlantRepositoryAPI.ts";
import { useParams } from "react-router-dom";
import PlantCard from "../Cards/PlantCard.tsx";
import Header from "../Header.tsx";
import styles from "./plant-page.module.css";
import UpdateDatapointView from "../UpdateDatapointView.tsx";
import useFetchPlant from "../../../hooks/useFetchPlant.ts";

type PlantProps = {
  repository: PlantRepositoryAPI;
};

const PlantPage = ({ repository }: PlantProps) => {
  const { plantUID } = useParams();
  const {plant, loading} = useFetchPlant(repository, plantUID as string)

  return (
    <Stack>
      <Header />
      <UpdateDatapointView plantUID={plantUID!} repository={repository} />
      <Backdrop sx={{ color: "#fff", zIndex: 1000 }} open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
      {!loading && plant && (
        <Stack className={styles.centered}>
          <PlantCard plant={plant!} />
        </Stack>
      )}
    </Stack>
  );
};
export default PlantPage;
