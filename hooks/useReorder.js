import { useDrag, useDrop } from "react-dnd";

export const useTaskReorder = (taskRef, id, index, listId, onMove) => {
  const [, drop] = useDrop({
    accept: "task",
    collect(monitor) {
      return { handlerId: monitor.getHandlerId() };
    },
    hover(item, monitor) {
      const needsToReorder = calculateIfNeedsToReorderVertical(taskRef, item, index, monitor);
      if (!needsToReorder) return;
      onMove(item.index, index);
      item.index = index;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: () => ({ index, id, listId }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  drag(drop(taskRef));

  return { isDragging };
};

export const useListReorder = (listRef, id, index, onMove) => {
  const [, drop] = useDrop({
    accept: "list",
    collect(monitor) {
      return { handlerId: monitor.getHandlerId() };
    },
    hover(item, monitor) {
      const needsToReorder = calculateIfNeedsToReorderHorizontal(listRef, item, index, monitor);
      if (!needsToReorder) return;
      onMove(item.index, index);
      item.index = index;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "list",
    item: () => ({ index, id }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  drag(drop(listRef));

  return { isDragging };
};

const calculateIfNeedsToReorderVertical = (ref, item, index, monitor) => {
  if (!ref) return false;

  const dragIndex = item.index;
  const hoverIndex = index;

  if (dragIndex === hoverIndex) return false;

  const hoverBoundingRect = ref.current?.getBoundingClientRect();
  const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

  const clientOffset = monitor.getClientOffset();
  const hoverClientY = clientOffset.y - hoverBoundingRect.top;

  if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return false;
  if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return false;

  return true;
};

const calculateIfNeedsToReorderHorizontal = (ref, item, index, monitor) => {
  if (!ref) return false;

  const dragIndex = item.index;
  const hoverIndex = index;

  if (dragIndex === hoverIndex) return false;

  const hoverBoundingRect = ref.current?.getBoundingClientRect();
  const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

  const clientOffset = monitor.getClientOffset();
  const hoverClientX = clientOffset.x - hoverBoundingRect.left;

  if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) return false;
  if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) return false;

  return true;
};
