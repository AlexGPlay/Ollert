import { IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { DeleteIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, Text, Flex, Wrap } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useState } from "react";

const BoardPreview = ({ id, title, lists, onRemove }) => {
  const router = useRouter();
  const [hover, setHover] = useState(false);

  return (
    <Box
      bgColor="gray.600"
      borderRadius={5}
      p={2}
      cursor="pointer"
      minW={200}
      height="fit-content"
      position="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => router.push(`/board/${id}`)}
    >
      {hover && (
        <Box position="absolute" top={1} right={1}>
          <IconButton mr={1} size="xs" icon={<EditIcon />} />
          <IconButton
            size="xs"
            icon={<DeleteIcon />}
            onClick={(evt) => {
              evt.stopPropagation();
              onRemove();
            }}
          />
        </Box>
      )}
      <Text fontWeight="500" fontSize="md" color="whiteAlpha.900">
        {title}
      </Text>
      <Flex mt={5} bgColor="gray.300" borderRadius={5} p={2} width="100%" flex={1}>
        <Wrap>
          {lists.slice(0, 4).map((list) => (
            <Box bgColor="gray.500" p={2} borderRadius={5} height="fit-content">
              <Text fontSize="md" color="whiteAlpha.900">
                {list.name}
              </Text>
              <Flex flexDir="column" alignItems="center">
                {new Array(list.tasks.length > 3 ? 3 : list.tasks.length).fill(0).map(() => (
                  <Icon color="whiteAlpha.800" as={HamburgerIcon} />
                ))}
              </Flex>
            </Box>
          ))}
          {lists.length === 0 && <Text>This board is empty!</Text>}
        </Wrap>
      </Flex>
    </Box>
  );
};

export default BoardPreview;
