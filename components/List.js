import { Button, IconButton } from "@chakra-ui/button";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Box, Stack, Text, Flex } from "@chakra-ui/layout";
import { useState } from "react";
import Task from "./Task";
import TaskEditor from "./TaskEditor";
import ListEditor from "./ListEditor.js";

const List = ({ name, tasks, onCreateTask, onRemoveTask, onEditTask, onRemove, onEdit }) => {
  const [editTaskList, setEditTaskList] = useState([]);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isCreating, setCreating] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <Box
      bgColor="gray.600"
      minW={300}
      height="fit-content"
      borderRadius={5}
      overflow="hidden"
      position="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && !isEditingName && (
        <Box position="absolute" top={1} right={1}>
          <IconButton mr={1} size="xs" onClick={() => setIsEditingName(true)} icon={<EditIcon />} />
          <IconButton size="xs" onClick={onRemove} icon={<DeleteIcon />} />
        </Box>
      )}
      <Box p={2}>
        {isEditingName ? (
          <ListEditor
            name={name}
            onCancel={() => setIsEditingName(false)}
            onSubmit={(newName) => {
              setIsEditingName(false);
              onEdit(newName);
            }}
          />
        ) : (
          <Text fontWeight="500" fontSize="md" color="whiteAlpha.900">
            {name}
          </Text>
        )}
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
