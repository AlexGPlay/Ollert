import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useList = (listId) => {
  const { setItem, getItem } = useLocalStorage();
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const savedData = getItem(listId)?.split(",") || [];
    setListData(savedData);
  }, []);

  const setListDataInternalFn = (tasks) => {
    setListData(tasks);
    setItem(listId, tasks.join(","));
  };

  return { listData, setListData: setListDataInternalFn };
};
