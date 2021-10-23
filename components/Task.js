import { IconButton } from "@chakra-ui/button";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/layout";
import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const Task = ({ id, text, onEditClick, onDeleteClick, index, onMove }) => {
  const taskRef = useRef();
  const [hover, setHover] = useState();
  const [{ handlerId }, drop] = useDrop({
    accept: "task",
    collect(monitor) {
      return { handlerId: monitor.getHandlerId() };
    },
    hover(item, monitor) {
      if (!taskRef.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = taskRef.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: () => ({ index, id }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  drag(drop(taskRef));

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
