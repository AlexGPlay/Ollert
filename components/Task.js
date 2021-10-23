import { IconButton } from "@chakra-ui/button";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/layout";
import { useRef, useState } from "react";
import { useTaskReorder } from "../hooks/useTaskReorder";

const Task = ({ id, text, onEditClick, onDeleteClick, index, onMove }) => {
  const taskRef = useRef();
  const [hover, setHover] = useState();
  const { isDragging } = useTaskReorder(taskRef, id, index, onMove);

  return (
    <Box
      bgColor="whiteAlpha.800"
      opacity={isDragging ? 0 : 1}
      borderRadius={5}
      p={2}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      position="relative"
      ref={taskRef}
    >
      {hover && (
        <Box position="absolute" top={1} right={1}>
          <IconButton mr={1} onClick={onEditClick} size="xs" icon={<EditIcon />} />
          <IconButton onClick={onDeleteClick} size="xs" icon={<DeleteIcon />} />
        </Box>
      )}
      <Text fontSize="sm">{text}</Text>
    </Box>
  );
};

export default Task;
