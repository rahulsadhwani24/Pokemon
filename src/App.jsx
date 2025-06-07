import React from "react";
import Home from "./components/Home";
import PokemonDetail from "./components/PokemonDetail";
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";

const App = () => {
  const routes = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/pokemon/:name", element: <PokemonDetail /> },
  ]);

  return (
    <RouterProvider router={routes} />
  );
};

export default App;
