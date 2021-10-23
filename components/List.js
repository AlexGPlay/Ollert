import { Button } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useState } from "react";
import Task from "./Task";
import TaskEditor from "./TaskEditor";

const List = ({ name, tasks, onCreateTask, onRemoveTask, onEditTask }) => {
  const [editTaskList, setEditTaskList] = useState([]);
  const [isCreating, setCreating] = useState(false);

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
            {tasks.map((text, idx) =>
              editTaskList.includes(idx) ? (
                <TaskEditor
                  taskText={text}
                  onTaskEditorCancel={() =>
                    setEditTaskList((taskList) => taskList.filter((taskIdx) => taskIdx !== idx))
                  }
                  onTaskSubmit={(text) => {
                    onEditTask(idx, text);
                    setEditTaskList((taskList) => taskList.filter((taskIdx) => taskIdx !== idx));
                  }}
                />
              ) : (
                <Task
                  text={text}
                  onDeleteClick={() => onRemoveTask(idx)}
                  key={idx}
                  onEditClick={() => setEditTaskList((taskList) => [...taskList, idx])}
                />
              )
            )}
          </Stack>
        </Box>
      )}
      <Box p={2}>
        {isCreating ? (
          <TaskEditor
            onTaskSubmit={(taskText) => {
              onCreateTask(taskText);
              setCreating(false);
            }}
            onTaskEditorCancel={() => setCreating(false)}
          />
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
