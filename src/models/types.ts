export type selectedMode = 'lost' | 'found';

export type inputFieldEvent = {
  target: {
    value: string;
  };
};

export type searchData = {
  animal?: string;
  breed?: string;
  imgSrc?: string;
};
