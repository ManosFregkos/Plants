import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import {PlantRepositoryAPI} from "../infrastructure/PlantRepositoryAPI.ts";
import DefaultLayout from "../layouts/DefaultLayout.tsx";
import HomePage from "./components/HomePage.tsx";
import PlantPage from "./components/Plant/PlantPage.tsx";

const repository = new PlantRepositoryAPI()

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<HomePage repository={repository}/>} />
          <Route path="plants/:plantUID" element={<PlantPage repository={repository} />}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;