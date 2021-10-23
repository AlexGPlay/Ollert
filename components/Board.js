import { Button, IconButton } from "@chakra-ui/button";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Wrap } from "@chakra-ui/layout";
import { useState } from "react";
import { useBoard } from "../hooks/useBoard";
import List from "./List";

const Board = ({ boardId }) => {
  const { boardData, addList, addItemToList, removeItemFromList, editItemFromList } =
    useBoard(boardId);

  const [isCreatingList, setCreatingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

  const createNewList = (evt) => {
    evt?.preventDefault();
    setCreatingList(false);
    setNewListTitle("");
    addList(newListTitle);
  };

  return (
    <Flex mt={25}>
      <Wrap spacing={5}>
        {boardData?.lists?.map((list) => (
          <List
            key={list.id}
            name={list.name}
            tasks={list.tasks}
            onCreateTask={(task) => addItemToList(list.id, task)}
            onRemoveTask={(taskIdx) => removeItemFromList(list.id, taskIdx)}
            onEditTask={(taskIdx, newText) => editItemFromList(list.id, taskIdx, newText)}
          />
        ))}
        {isCreatingList ? (
          <Box bgColor="gray.600" p={2} minW={300} borderRadius={5} overflow="hidden">
            <form onSubmit={createNewList}>
              <Input
                fontSize="sm"
                bgColor="whiteAlpha.800"
                placeholder="New list title"
                value={newListTitle}
                onChange={(evt) => setNewListTitle(evt.target.value)}
              />
              <Flex mt={2}>
                <Wrap spacing={2}>
                  <Button colorScheme="blue" type="submit">
                    Add list
                  </Button>
                  <IconButton
                    variant="ghost"
                    colorScheme="whiteAlpha"
                    color="whiteAlpha.800"
                    onClick={() => {
                      setCreatingList("");
                      setNewListTitle(false);
                    }}
                    icon={<CloseIcon />}
                  />
                </Wrap>
              </Flex>
            </form>
          </Box>
        ) : (
          <Button onClick={() => setCreatingList(true)} colorScheme="blue" leftIcon={<AddIcon />}>
            Add list
          </Button>
        )}
      </Wrap>
    </Flex>
  );
};

export default Board;
