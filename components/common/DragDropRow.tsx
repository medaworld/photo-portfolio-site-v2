import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { styled } from 'styled-components';
import ImageCard from './ImageCard';

export const ItemsRow = styled.div`
  display: flex;
  overflow-x: scroll;
  padding-bottom: 5px;
  gap: 1rem;
  justify-content: start;
  align-items: center;
  white-space: nowrap;
`;

export const ItemCardContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  flex: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function DragDropRow({
  items,
  setItems,
  onSetCover,
  onRemove,
  cover,
}) {
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setItems(reorderedItems);
  };

  return (
    <>
      {items.length > 0 ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="photosGrid" direction="horizontal">
            {(provided) => (
              <ItemsRow ref={provided.innerRef} {...provided.droppableProps}>
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <ItemCardContainer
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ImageCard
                          image={item}
                          onSetCover={onSetCover}
                          onRemove={onRemove}
                          cover={cover}
                        />
                      </ItemCardContainer>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ItemsRow>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <p>Nothing added yet. Add to get started!</p>
      )}
    </>
  );
}
