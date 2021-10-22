import { Box, Flex } from "@chakra-ui/layout";
import { useState } from "react";
import List from "../components/List";
import Navbar from "../components/Navbar";
import { useList, useListStorage } from "../hooks/useList";

export default function Home() {
  const { listData: tasks, setListData } = useList("1");

  const handleCreateTask = (task) => setListData([...tasks, task]);

  return (
    <Box w="100%" h="100%" p={25} bgColor="gray.900">
      <Navbar />
      <Flex mt={25}>
        <List name="test" tasks={tasks} onCreateTask={handleCreateTask} />
      </Flex>
    </Box>
  );
}
