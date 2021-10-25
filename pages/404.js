import { Box, Flex, Text } from "@chakra-ui/layout";
import Navbar from "../components/Navbar";
import { WarningTwoIcon } from "@chakra-ui/icons";

const NotFound = () => {
  return (
    <Box w="100%" h="100%" overflow="auto" p={25} bgColor="gray.900">
      <Navbar />
      <Flex mt={25}>
        <Flex
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          bgColor="gray.600"
          borderRadius={5}
          p={2}
          minW={200}
        >
          <WarningTwoIcon color="whiteAlpha.900" w={20} h={20} />
          <Text color="whiteAlpha.900" fontSize="4xl">
            Page not found
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NotFound;
