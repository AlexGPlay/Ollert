import { Button, IconButton } from "@chakra-ui/button";
import { CloseIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Stack, Text, Wrap } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useBoards } from "../hooks/useBoards";

const newBoard = () => {
  const router = useRouter();
  const { addBoard } = useBoards();
  const [boardName, setBoardName] = useState("");

  const handleSubmit = (evt) => {
    evt?.preventDefault();
    const routerId = addBoard(boardName);
    router.push(`/board/${routerId}`);
  };

  return (
    <Box overflow="auto" w="100%" h="100%" p={25} bgColor="gray.900">
      <Navbar />
      <Flex>
        <Box mt={25} bgColor="gray.600" borderRadius={5} overflow="hidden" p={2}>
          <Text fontSize="2xl" color="whiteAlpha.900">
            Create a board giving a name to it
          </Text>
          <Box mt={5}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={5}>
                <Input
                  fontSize="sm"
                  bgColor="whiteAlpha.800"
                  placeholder="New board name"
                  value={boardName}
                  onChange={(evt) => setBoardName(evt.target.value)}
                />
                <Button colorScheme="blue" type="submit">
                  Create board
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default newBoard;
