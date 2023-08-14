export type Album = {
  title: string;
  id: string;
  description: string;
  createdAt: Date;
  cover: any;
  photos: any[];
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
