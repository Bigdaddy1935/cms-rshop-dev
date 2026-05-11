export type Customer = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
  avatar_url?: string;
  is_active: boolean;
  is_phone_verified?: boolean;
  role: string;
};

export type CreateCustomer = Omit<Customer, "id">;

export type UserAddress = {
  id?: number;
  city_id: number;
  city: string;
  province: string;
  address_line: string;
  plaque: string;
  unit: string;
  address_name?: string | null;
  recipient_name?: string | null;
  recipient_phone?: string | null;
  postal_code: string;
  is_self: boolean;
  is_primary: boolean;
};
