import { useEffect, useMemo, useState } from "react";
import { generateRandomId } from "../util/generateRandomId";
import { useLocalStorage } from "./useLocalStorage";

export const useBoards = () => {
  const { getItem, setItem, removeItem } = useLocalStorage();
  const [boards, setBoards] = useState();
  const [updateHack, setUpdateHack] = useState(0);

  useEffect(() => {
    const boards = getItem("boards")?.split(",").filter(Boolean) || [];
    setBoards(boards);
  }, []);

  const addBoard = (boardName) => {
    const newId = generateRandomId();
    const newBoards = [...boards, newId];
    const newBoardData = {
      id: newId,
      title: boardName,
      lists: [],
    };

    setBoards(newBoards);
    setItem("boards", newBoards.join(","));
    setItem(`board_${newId}`, JSON.stringify(newBoardData));

    return newId;
  };

  const removeBoard = (boardId) => {
    removeItem(`board_${boardId}`);
    setItem("boards", boards.filter((board) => board !== boardId).join(","));
    setBoards((boards) => boards.filter((board) => board !== boardId));
  };

  const editBoardName = (boardId, boardName) => {
    const currentBoard = JSON.parse(getItem(`board_${boardId}`));
    setItem(`board_${boardId}`, JSON.stringify({ ...currentBoard, title: boardName }));
    setUpdateHack((currentValue) => currentValue + 1);
  };

  const boardsWithTitle = useMemo(
    () =>
      boards?.map((board) => {
        const boardData = JSON.parse(getItem(`board_${board}`));
        if(!boardData) return null;
        const title = boardData.title;
        return { id: board, title };
      }).filter(Boolean) || [],
    [boards, updateHack]
  );

  const boardsWithData = useMemo(
    () =>
      boards?.map((board) => {
        const boardData = JSON.parse(getItem(`board_${board}`));
        if(!boardData) return null;
        return boardData;
      }).filter(Boolean) || [],
    [boards, updateHack]
  );

  return { boards, boardsWithTitle, boardsWithData, addBoard, removeBoard, editBoardName };
};
