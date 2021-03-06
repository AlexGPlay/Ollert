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
      list.id !== listId
        ? list
        : { ...list, tasks: [...list.tasks, { id: generateRandomId(), text }] }
    );
    setBoardDataInternalFn(newData);
  };

  const removeItemFromList = (listId, taskId) => {
    const newData = { ...boardData };
    newData.lists = newData.lists.map((list) =>
      list.id !== listId
        ? list
        : { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
    );
    setBoardDataInternalFn(newData);
  };

  const editItemFromList = (listId, taskId, newText) => {
    const newData = { ...boardData };
    newData.lists = newData.lists.map((list) =>
      list.id !== listId
        ? list
        : {
            ...list,
            tasks: list.tasks.map((task) =>
              task.id !== taskId ? task : { ...task, text: newText }
            ),
          }
    );
    setBoardDataInternalFn(newData);
  };

  const reorderList = (listId, task1Idx, task2Idx) => {
    const newData = { ...boardData };

    newData.lists = newData.lists.map((list) => {
      if (list.id !== listId) return list;

      const task1 = list.tasks[task1Idx];
      const task2 = list.tasks[task2Idx];

      list.tasks[task2Idx] = task1;
      list.tasks[task1Idx] = task2;

      return list;
    });

    setBoardDataInternalFn(newData);
  };

  const changeTaskList = (taskId, currentListId, toListId) => {
    const newData = { ...boardData };

    const task = newData.lists
      .find((list) => list.id === currentListId)
      ?.tasks.find((task) => task.id === taskId);

    newData.lists = newData.lists.map((list) => {
      if (list.id !== currentListId && list.id !== toListId) return list;
      if (list.id === currentListId)
        return { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) };
      return { ...list, tasks: [...list.tasks, task] };
    });

    setBoardDataInternalFn(newData);
  };

  const removeList = (listId) => {
    const newData = { ...boardData };
    newData.lists = newData.lists.filter((list) => list.id !== listId);
    setBoardDataInternalFn(newData);
  };

  const editList = (listId, newListName) => {
    const newData = { ...boardData };
    newData.lists = newData.lists.map((list) =>
      list.id !== listId ? list : { ...list, name: newListName }
    );
    setBoardDataInternalFn(newData);
  };

  const reorderBoard = (list1Idx, list2Idx) => {
    const newData = { ...boardData };

    const list1 = newData.lists[list1Idx];
    const list2 = newData.lists[list2Idx];

    newData.lists[list1Idx] = list2;
    newData.lists[list2Idx] = list1;

    setBoardData(newData);
  };

  const setBoardDataInternalFn = (boardData) => {
    setBoardData(boardData);
    setItem(`board_${boardId}`, JSON.stringify(boardData));
  };

  return {
    boardData,
    addList,
    addItemToList,
    removeItemFromList,
    editItemFromList,
    removeList,
    editList,
    reorderList,
    reorderBoard,
    changeTaskList,
  };
};
