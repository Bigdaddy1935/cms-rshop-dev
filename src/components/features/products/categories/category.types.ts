export type Media = {
  id: number;
  url: string;
  alt: string | null;
  type: "image";
};

export type Category = {
  id: number;
  title: string;
  slug: string;
  discount: string;
  level: number;
  parent_id: number;
  is_delete: boolean;
  media?: Media;
  children: Category[];
};
