import { Button } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Wrap } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { useBoards } from "../hooks/useBoards";

export default function Home() {
  const { boards, addBoard } = useBoards();
  const router = useRouter();

  if (boards?.length === 0) router.push("/new_board");

  return (
    <Box w="100%" h="100%" p={25} bgColor="gray.900">
      <Navbar />
    </Box>
  );
}
