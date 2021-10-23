import { Box } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import Board from "../../components/Board";
import Navbar from "../../components/Navbar";

const BoardPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Box overflow="auto" w="100%" h="100%" p={25} bgColor="gray.900">
      <Navbar boardId={id} />
      <Board boardId={id} />
    </Box>
  );
};

export default BoardPage;
