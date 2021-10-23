import { Button } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Wrap } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import BoardPreview from "../components/BoardPreview";
import Navbar from "../components/Navbar";
import { useBoards } from "../hooks/useBoards";

export default function Home() {
  const { boards, boardsWithData, removeBoard } = useBoards();
  const router = useRouter();

  if (boards?.length === 0) router.push("/new_board");

  return (
    <Box w="100%" h="100%" p={25} bgColor="gray.900">
      <Navbar />
      <Flex mt={25}>
        <Wrap>
          {boardsWithData.map((board) => (
            <BoardPreview key={board.id} {...board} onRemove={() => removeBoard(board.id)} />
          ))}
          <Button
            colorScheme="blue"
            leftIcon={<AddIcon />}
            onClick={() => router.push("/new_board")}
          >
            Create new board
          </Button>
        </Wrap>
      </Flex>
    </Box>
  );
}
