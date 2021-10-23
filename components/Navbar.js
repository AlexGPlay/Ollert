import { Flex, Wrap, Text, Box } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { useRouter } from "next/router";
import { useBoards } from "../hooks/useBoards";

const Navbar = ({ boardId }) => {
  const { boardsWithTitle } = useBoards();
  const router = useRouter();

  return (
    <Flex w="100%" p={2} borderRadius={5} bgColor="gray.600">
      <Text fontSize="2xl" color="whiteAlpha.900">
        Ollert
      </Text>
      <Box ml={5}>
        <Select
          bgColor="whiteAlpha.800"
          placeholder={boardId ? "Home" : "Pick a board"}
          value={boardId}
          onChange={(evt) =>
            evt.target.value && evt.target.value.length !== 0
              ? router.push(`/board/${evt.target.value}`)
              : router.push("/")
          }
        >
          {boardsWithTitle.map((board) => (
            <option key={board.id} value={board.id}>
              {board.title}
            </option>
          ))}
        </Select>
      </Box>
    </Flex>
  );
};

export default Navbar;
