import { useEffect, useMemo, useState } from "react";
import { generateRandomId } from "../util/generateRandomId";
import { useLocalStorage } from "./useLocalStorage";

export const useBoards = () => {
  const { getItem, setItem } = useLocalStorage();
  const [boards, setBoards] = useState();

  useEffect(() => {
    const boards = getItem("boards")?.split(",") || [];
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

  const boardsWithTitle = useMemo(
    () =>
      boards?.map((board) => {
        const boardData = JSON.parse(getItem(`board_${board}`));
        const title = boardData.title;
        return { id: board, title };
      }) || [],
    [boards]
  );

  return { boards, boardsWithTitle, addBoard };
};
