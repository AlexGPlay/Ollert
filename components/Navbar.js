import { Flex, Wrap, Text } from "@chakra-ui/layout";

const Navbar = () => {
  return (
    <Flex w="100%" p={2} borderRadius={5} bgColor="gray.600">
      <Wrap spacing={5}>
        <Text fontSize="2xl" color="whiteAlpha.900">
          Ollert
        </Text>
      </Wrap>
    </Flex>
  );
};

export default Navbar;
