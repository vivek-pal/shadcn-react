import { BrowserRouter, useRoutes } from "react-router-dom";

import "./App.css";
import Home from "./app/pages/Home";
import Main from "./app/pages/Main";
import Header from "./app/components/ui/header";

const Routes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/:id", element: <Home /> },
    { path: "/main", element: <Main /> },
  ]);
  return routes;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  );
}

export default App;
