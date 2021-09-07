import React, { useContext, useEffect, useState } from "react";

import "./styles.css";
import { StateProvider } from "./core/app-context";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./core/theme";
import MainPage from "./pages/MainPage";
import Routes from "./core/routes";
import NotFound from "./pages/NotFoundPage";
import CharacterProfilePage from "./pages/CharacterProfilePage";

export default function App() {
  return (
    <StateProvider>
      <ChakraProvider theme={theme}>
        <Routes />
      </ChakraProvider>
    </StateProvider>
  );
}
