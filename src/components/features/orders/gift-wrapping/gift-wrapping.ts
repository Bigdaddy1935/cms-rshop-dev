export type CreateGiftWrappingRequest = {
  name: string;
  description: string;
  price: number;
  image_id: number | null;
  image: any;
  is_active: boolean;
  is_for_gift: boolean;
};