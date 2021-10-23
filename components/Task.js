import { IconButton } from "@chakra-ui/button";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/layout";
import { useState } from "react";

const Task = ({ text, onEditClick, onDeleteClick }) => {
  const [hover, setHover] = useState();

  return (
    <Box
      bgColor="whiteAlpha.800"
      borderRadius={5}
      p={2}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      position="relative"
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
