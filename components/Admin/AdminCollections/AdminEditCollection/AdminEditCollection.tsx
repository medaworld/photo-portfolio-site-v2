import StyledButton from '../../../common/StyledButton';
import InfiniteItemsBox from '../../../common/InfiniteItemsBox';
import BackLink from '../../../common/BackLink';
import CoverCard from '../../../common/CoverCard';
import DragDropRow from '../../../common/DragDropRow';
import {
  AdminEditCollectionsContainer,
  Buttons,
} from './AdminEditCollectionStyles';
import useCollectionEdit from '../../../../hooks/useCollectionEdit';

export default function AdminEditCollection({ collection, type }) {
  const itemType = type === 'collection' ? 'Albums' : 'Images';
  const {
    pluralType,
    cover,
    enteredTitle,
    enteredDescription,
    enteredDate,
    items,
    addItems,
    allItems,
    loadMoreRef,
    setEnteredTitle,
    setEnteredDescription,
    setEnteredDate,
    setItems,
    handleSetCover,
    handleRemoveItem,
    handleAddItemToCollection,
    showAllItems,
    handleDeleteCollection,
    submitHandler,
  } = useCollectionEdit(collection, type);

  return (
    <AdminEditCollectionsContainer>
      <BackLink
        href={`/secure/admin/${pluralType}`}
        text={`Back to ${pluralType}`}
      />

      <CoverCard
        cover={cover}
        enteredTitle={enteredTitle}
        setEnteredTitle={setEnteredTitle}
        enteredDescription={enteredDescription}
        setEnteredDescription={setEnteredDescription}
        enteredDate={enteredDate}
        setEnteredDate={setEnteredDate}
        type={type}
      />

      <h4>{`${itemType} in ${type}`}:</h4>
      <DragDropRow
        items={items}
        setItems={setItems}
        onSetCover={handleSetCover}
        onRemove={handleRemoveItem}
        cover={cover}
      />

      {addItems ? (
        <>
          <h4>{`All ${itemType}:`}</h4>
          <InfiniteItemsBox
            allItems={allItems}
            onAdd={handleAddItemToCollection}
            loadMoreRef={loadMoreRef}
          />
        </>
      ) : (
        <StyledButton
          variant="neutral"
          onClick={showAllItems}
          style={{ margin: '1rem 0' }}
        >
          Add More {itemType}
        </StyledButton>
      )}

      <Buttons>
        <StyledButton
          variant="error"
          type="button"
          onClick={handleDeleteCollection}
          style={{ display: 'block' }}
        >
          Delete {type}
        </StyledButton>
        <StyledButton variant="primary" onClick={submitHandler}>
          Save changes
        </StyledButton>
      </Buttons>
    </AdminEditCollectionsContainer>
  );
}
