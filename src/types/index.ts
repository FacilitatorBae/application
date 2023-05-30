export type FakeProduct = {
  id: string;
  title: string;
  image: string;
  price: number;
  fee: number;
  isHot: boolean;
  isBusiness: boolean;
  isNew: boolean;
};

export type FakeFooter = {
  title: string;
  subtitles: Array<{ label: string; url: string }>;
};
