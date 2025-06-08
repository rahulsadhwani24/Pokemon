import React from "react";
import Home from "./components/Home";
import PokemonDetail from "./components/PokemonDetail";
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";

const App = () => {
  const routes = createBrowserRouter([
    { path: "/Pokemon/", element: <Home /> },
    { path: "/Pokemon/:name", element: <PokemonDetail /> },
  ]);

  return (
    <RouterProvider router={routes} />
  );
};

export default App;
