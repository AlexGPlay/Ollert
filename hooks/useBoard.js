import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { generateRandomId } from "../util/generateRandomId";

export const useBoard = (boardId) => {
  const { setItem, getItem } = useLocalStorage();
  const [boardData, setBoardData] = useState({});

  useEffect(() => {
    const savedData = JSON.parse(getItem(`board_${boardId}`));
    setBoardData(savedData);
  }, [boardId]);

  const addList = (listTitle) => {
    const newData = { ...boardData };
    newData.lists = [...newData.lists, { id: generateRandomId(), name: listTitle, tasks: [] }];
    setBoardDataInternalFn(newData);
  };

  const addItemToList = (listId, text) => {
    const newData = { ...boardData };
    newData.lists = newData.lists.map((list) =>
      list.id !== listId ? list : { ...list, tasks: [...list.tasks, text] }
    );
    setBoardDataInternalFn(newData);
  };

  const removeItemFromList = (listId, taskIdx) => {
    const newData = { ...boardData };
    newData.lists = newData.lists.map((list) =>
      list.id !== listId ? list : { ...list, tasks: list.tasks.filter((_, idx) => idx !== taskIdx) }
    );
    setBoardDataInternalFn(newData);
  };

  const editItemFromList = (listId, taskIdx, newText) => {
    const newData = { ...boardData };
    newData.lists = newData.lists.map((list) =>
      list.id !== listId
        ? list
        : {
            ...list,
            tasks: list.tasks.map((currentText, idx) => (idx !== taskIdx ? currentText : newText)),
          }
    );
    setBoardDataInternalFn(newData);
  };

  const setBoardDataInternalFn = (boardData) => {
    setBoardData(boardData);
    setItem(`board_${boardId}`, JSON.stringify(boardData));
  };

  return { boardData, addList, addItemToList, removeItemFromList, editItemFromList };
};
