import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Habitaciones from "./componentes/Habitaciones.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Habitaciones />
  </StrictMode>
);
