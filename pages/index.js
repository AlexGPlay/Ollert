import { Box, Flex } from "@chakra-ui/layout";
import { useState } from "react";
import List from "../components/List";
import Navbar from "../components/Navbar";

export default function Home() {
  const [tasks, setTasks] = useState(["Esto es una prueba", "Esto es una prueba 2"]);

  return (
    <Box w="100%" h="100%" p={25} bgColor="gray.900">
      <Navbar />
      <Flex mt={25}>
        <List
          name="test"
          tasks={tasks}
          onCreateTask={(task) => setTasks((tasks) => [...tasks, task])}
        />
      </Flex>
    </Box>
  );
}
