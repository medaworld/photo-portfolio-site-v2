import Image from 'next/image';

import BackLink from '../../../common/BackLink';
import StyledInput from '../../../common/StyledInput';
import StyledTextArea from '../../../common/StyledTextArea';
import StyledButton from '../../../common/StyledButton';
import DragDropRow from '../DragDropRow';
import InfiniteImagesBox from '../InfiniteItemsBox';

import {
  AdminNewAlbumContainer,
  CoverImageContainer,
  CoverText,
  FormInputs,
  NewCollectionForm,
} from './AdminNewCollectionStyles';
import { capitalizeFirstLetter } from '../../../../utils/stringUtils';
import DateInput from '../../../common/DateInput';
import { useCollectionAdd } from '../../../../hooks/useCollectionAdd';

export default function AdminNewCollection({ items, type }) {
  const itemType = type === 'collection' ? 'Albums' : 'Images';
  const {
    pluralType,
    enteredTitle,
    enteredDescription,
    enteredDate,
    cover,
    selectedItems,
    allItems,
    loadMoreRef,
    handleInputChange,
    setEnteredDate,
    setSelectedItems,
    handleSetCover,
    removeFromCollection,
    addToCollection,
    submitHandler,
  } = useCollectionAdd(items, type);

  return (
    <AdminNewAlbumContainer>
      <BackLink
        href={`/secure/admin/${pluralType}`}
        text={`Back to ${pluralType}`}
      />

      <NewCollectionForm>
        <FormInputs>
          <label htmlFor="title">Title</label>
          <StyledInput
            name="title"
            variant="primary"
            type="text"
            placeholder="Title"
            onChange={handleInputChange}
          />
          <label htmlFor="description">Description</label>
          <StyledTextArea
            variant="primary"
            placeholder="Description"
            name="description"
            onChange={handleInputChange}
          />
          {type === 'album' && (
            <>
              <label htmlFor="date">Date Taken</label>
              <DateInput setSelectedDate={setEnteredDate} />
            </>
          )}
        </FormInputs>

        <CoverImageContainer>
          <CoverText>
            {enteredTitle && <div className="title">{enteredTitle}</div>}
            {enteredDescription && (
              <div className="description">{enteredDescription}</div>
            )}
            {enteredDate && (
              <div className="date">{enteredDate.toLocaleDateString()}</div>
            )}
          </CoverText>
          {cover ? (
            <>
              <Image
                src={cover.cover || cover.url}
                alt={cover.title || 'Image'}
                className={'image'}
                width={400}
                height={400}
              />
            </>
          ) : (
            <span>Select a cover</span>
          )}
        </CoverImageContainer>

        <h4>{`${itemType} in ${type}`}:</h4>
        <DragDropRow
          items={selectedItems}
          setItems={setSelectedItems}
          onSetCover={handleSetCover}
          onRemove={removeFromCollection}
          cover={cover}
        />

        <h4>{`All ${itemType}:`}</h4>
        <InfiniteImagesBox
          allItems={allItems}
          onAdd={addToCollection}
          loadMoreRef={loadMoreRef}
        />

        <StyledButton
          variant={'primary'}
          onClick={submitHandler}
          style={{ padding: '10px 20px' }}
        >
          Save {capitalizeFirstLetter(type)}
        </StyledButton>
      </NewCollectionForm>
    </AdminNewAlbumContainer>
  );
}
