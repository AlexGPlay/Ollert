import { IconButton } from "@chakra-ui/button";
import { InfoIcon } from "@chakra-ui/icons";
import { Flex, Text, Box } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { useRouter } from "next/router";
import { useBoards } from "../hooks/useBoards";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";

const Navbar = ({ boardId }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const { boardsWithTitle } = useBoards();
  const router = useRouter();

  return (
    <Flex w="100%" p={2} borderRadius={5} bgColor="gray.600">
      <Text fontSize="2xl" color="whiteAlpha.900" cursor="pointer" onClick={() => router.push("/")}>
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
      <Box ml="auto">
        <IconButton
          bgColor="transparent"
          colorScheme="whiteAlpha"
          color="white"
          onClick={() => window.open("https://github.com/AlexGPlay/Ollert", "_blank")}
          icon={<FaGithub />}
        />
        <IconButton
          bgColor="transparent"
          colorScheme="whiteAlpha"
          color="white"
          onClick={() => setIsInfoOpen(true)}
          icon={<InfoIcon />}
        />
      </Box>
      <Modal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)}>
        <ModalOverlay />
        <ModalContent bgColor="gray.700" color="whiteAlpha.900">
          <ModalHeader>Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Ollert is a Trello clone built with NextJS, Chakra UI and React DnD. It stores all the
            info on local storage, there is no backend server.
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Navbar;
