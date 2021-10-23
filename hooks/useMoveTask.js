import { useDrop } from "react-dnd";

export const useMoveTask = (listRef, listId, onMove) => {
  const [, drop] = useDrop({
    accept: "task",
    collect(monitor) {
      return { handlerId: monitor.getHandlerId() };
    },
    drop: (item) => {
      if (item.listId === listId) return;
      onMove(item.id, item.listId, listId);
    },
  });

  drop(listRef);
};
