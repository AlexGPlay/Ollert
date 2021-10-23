import { Button, IconButton } from "@chakra-ui/button";
import { CloseIcon } from "@chakra-ui/icons";
import { Flex, Wrap } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useEffect, useRef, useState } from "react";

const TaskEditor = ({ taskText: taskTextProp, onTaskSubmit, onTaskEditorCancel }) => {
  const [taskText, setTaskText] = useState(taskTextProp);
  const textAreaRef = useRef();
  useEffect(() => {
    textAreaRef.current?.focus();
    textAreaRef.current?.setSelectionRange(
      textAreaRef.current?.value?.length,
      textAreaRef.current?.value?.length
    );
  }, []);

  const handleTaskSubmit = (evt) => {
    evt.preventDefault();
    onTaskSubmit(taskText);
  };

  return (
    <form onSubmit={handleTaskSubmit}>
      <Textarea
        resize="none"
        fontSize="sm"
        bgColor="whiteAlpha.800"
        ref={textAreaRef}
        value={taskText}
        placeholder={taskTextProp?.length > 0 ? "Edit your task text" : "Write your new task text"}
        onKeyPress={(evt) => evt.code === "Enter" && handleTaskSubmit(evt)}
        onChange={(evt) => setTaskText(evt.target.value)}
      />
      <Flex mt={2}>
        <Wrap spacing={2}>
          <Button colorScheme="blue" type="submit">
            {taskTextProp?.length ? "Edit task" : "Add task"}
          </Button>
          <IconButton
            variant="ghost"
            colorScheme="whiteAlpha"
            color="whiteAlpha.800"
            onClick={onTaskEditorCancel}
            icon={<CloseIcon />}
          />
        </Wrap>
      </Flex>
    </form>
  );
};

export default TaskEditor;
