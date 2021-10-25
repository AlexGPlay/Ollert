import { ChakraProvider } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { useIsMobile } from "../hooks/useIsMobile";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const isMobile = useIsMobile();

  return (
    <ChakraProvider>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <Component {...pageProps} />
      </DndProvider>
    </ChakraProvider>
  );
}

export default MyApp;
