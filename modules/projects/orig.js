const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

<DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
  <div className="flex p-5 m-5 overflow-scroll">
    <div className="flex flex-row items-start justify-between mx-auto space-x-3">
      {Object.entries(columns).map(([columnId, column], index) => {
        return (
          <Droppable key={index} droppableId={columnId}>
            {(provided, snapshot) => (
              <div
                className="flex  flex-col bg-gray-300 p-3 w-full h-full rounded-md"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <span className="flex text-gray-300 px-10 py-1 items-center justify-center bg-gray-600 rounded-md">
                  {column.title}
                </span>
                {column.items.map((item, index) => (
                  <TaskCard key={item.id} item={item} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        );
      })}
    </div>
  </div>
</DragDropContext>;
