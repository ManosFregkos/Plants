import { useCallback } from "react";

import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import PlantsList from "./PlantsList/PlantsList.tsx";
import { Plant } from "../../domain/entities/Plant.ts";
import { PlantRepositoryAPI } from "../../infrastructure/PlantRepositoryAPI.ts";
import CreatePlant from "./CreatePlantSection/CreatePlant.tsx";
import usePlants from "../../hooks/usePlants.ts";

type HomePageProps = {
  repository: PlantRepositoryAPI;
};

const HomePage = ({ repository }: HomePageProps) => {
  const { setPlants, plants, loading } = usePlants(repository);
  const updatePlants = useCallback((response: Plant) => {
    setPlants((prevPlants) => ({
      ...prevPlants,
      results: [...prevPlants.results, response],
      count: prevPlants.count + 1,
    }));
  }, []);

  return (
    <Container maxWidth={"xl"} sx={{ padding: "24px" }}>
      <Backdrop sx={{ color: "#fff", zIndex: 1000 }} open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
      {!loading && plants.results.length === 0 && (
        <Typography>There are no plants yet !!</Typography>
      )}

      {!loading && plants.results.length > 0 && (
        <Stack rowGap={2}>
          {" "}
          <Typography variant={"h4"}>
            Plants Count: <b>{plants.count}</b>
          </Typography>
          <PlantsList plants={plants.results} />
        </Stack>
      )}
      <Box mt={4} />

      <CreatePlant repository={repository} updatePlants={updatePlants} />
    </Container>
  );
};
export default HomePage;
