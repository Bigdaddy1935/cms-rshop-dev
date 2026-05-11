export type HeroSlider = {
  id: number;
  title: string;
  description?: string | null;
  image_url: string;
  background_color?: string | null;
  button_text?: string | null;
  button_link?: string | null;
  is_active: boolean;
  is_dark: boolean;
  display_order: number;
};
