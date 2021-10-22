import { Box, Text } from "@chakra-ui/layout";

const Task = ({ text }) => {
  return (
    <Box bgColor="whiteAlpha.800" borderRadius={5} p={2}>
      <Text fontSize="sm">{text}</Text>
    </Box>
  );
};

export default Task;
