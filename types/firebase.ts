export type Album = {
  title: string;
  pathTitle: string;
  id: string;
  description: string;
  createdAt: Date;
  cover: any;
  photos: any[];
  dateTaken?: Date;
  coverURL?: string;
  photosURLs?: string[];
  collection?: string;
  collectionPath?: string;
};

export type Collection = {
  title: string;
  pathTitle: string;
  id: string;
  description: string;
  createdAt: Date;
  cover: any;
  albums: any[];
  coverURL?: string;
  photosURLs?: string[];
};

export type FetchImagesOptions = {
  orderByField?: string;
  orderDirection?: 'asc' | 'desc';
  lastVisible?: any;
  limitCount?: number;
};

export type ImageDataProps = {
  title?: string;
  description?: string;
  dateTaken?: Date;
  uploadedAt?: Date;
};
