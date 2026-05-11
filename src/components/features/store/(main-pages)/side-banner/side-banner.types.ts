export type SideBanner = {
  id: number;
  position: SideBannerPosition;
  display_order: number;
  title: string;
  subtitle?: string;
  image_url: string;
  link?: string;
  is_active: boolean;
};

export const SIDE_BANNER_POSITIONS = [
  "top_right",
  "top_left",
  "bottom_right",
  "bottom_left",
] as const;

export type SideBannerPosition = (typeof SIDE_BANNER_POSITIONS)[number];
