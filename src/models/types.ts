export type selectedMode = 'lost' | 'found' | 'myad';

export type inputFieldEvent = {
  target: {
    value: string;
  };
};

export type searchData = {
  animal?: string;
  breed?: string;
  imgSrc?: string;
  coordinates?: coordinates;
};

export type coordinates = {
  lat: number;
  lng: number;
};
