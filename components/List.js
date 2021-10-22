import { Button, IconButton } from "@chakra-ui/button";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, Spacer, Stack, Text, Wrap } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useEffect, useRef, useState } from "react";
import Task from "./Task";

const List = ({ name, tasks, onCreateTask }) => {
  const [isCreating, setCreating] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const textAreaRef = useRef();

  const handleCreateTask = (evt) => {
    evt?.preventDefault();
    setCreating(false);
    setNewTaskText("");
    onCreateTask(newTaskText);
  };

  useEffect(() => {
    if (isCreating) textAreaRef.current?.focus();
  }, [isCreating]);

  return (
    <Box bgColor="gray.600" minW={300} height="fit-content" borderRadius={5} overflow="hidden">
      <Box p={2}>
        <Text fontWeight="500" fontSize="md" color="whiteAlpha.900">
          {name}
        </Text>
      </Box>
      {tasks?.length > 0 && (
        <Box p={2}>
          <Stack>
            {tasks.map((text, idx) => (
              <Task text={text} key={idx} />
            ))}
          </Stack>
        </Box>
      )}
      <Box p={2}>
        {isCreating ? (
          <form onSubmit={handleCreateTask}>
            <Textarea
              resize="none"
              fontSize="sm"
              bgColor="whiteAlpha.800"
              ref={textAreaRef}
              value={newTaskText}
              placeholder="Write your new task text"
              onKeyPress={(evt) => evt.code === "Enter" && handleCreateTask(evt)}
              onChange={(evt) => setNewTaskText(evt.target.value)}
            />
            <Flex mt={2}>
              <Wrap spacing={2}>
                <Button colorScheme="blue" type="submit">
                  Add task
                </Button>
                <IconButton
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  color="whiteAlpha.800"
                  onClick={() => {
                    setNewTaskText("");
                    setCreating(false);
                  }}
                  icon={<CloseIcon />}
                />
              </Wrap>
            </Flex>
          </form>
        ) : (
          <Button
            p={2}
            colorScheme="whiteAlpha"
            color="whiteAlpha.800"
            fontSize="sm"
            variant="ghost"
            leftIcon={<AddIcon />}
            onClick={() => setCreating(true)}
          >
            Add a task
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default List;
