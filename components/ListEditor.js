import { Button, IconButton } from "@chakra-ui/button";
import { CloseIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Flex, Text, Wrap } from "@chakra-ui/layout";
import { useState } from "react";

const ListEditor = ({ name, onCancel, onSubmit }) => {
  const [newName, setNewName] = useState(name);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!newName || newName.length === 0) return setIsError(true);
    onSubmit(newName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Wrap>
        <Input
          fontSize="sm"
          bgColor="whiteAlpha.800"
          placeholder="New list title"
          isInvalid={isError}
          value={newName}
          onChange={(evt) => setNewName(evt.target.value)}
        />
        <Button type="submit" colorScheme="blue">
          Save
        </Button>
        <IconButton
          variant="ghost"
          colorScheme="whiteAlpha"
          color="whiteAlpha.800"
          onClick={onCancel}
          icon={<CloseIcon />}
        />
      </Wrap>
    </form>
  );
};

export default ListEditor;
