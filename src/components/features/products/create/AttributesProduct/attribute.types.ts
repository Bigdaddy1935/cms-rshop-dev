export type AttributeGroup = {
  id: number;
  name: string;
  slug: string;
  display_order: null | number;
  attributes?: Attribute[];
};

export type CreateAttributeGroup = Omit<AttributeGroup, "id" | "attributes">;

export type Attribute = {
  id: number;
  name: string;
  slug: string;
  is_public: boolean;
  group_id: number;
  type: AttributeTypes;
  is_active?: boolean;
  display_order: number | null;
  is_variant: boolean;
  group?: AttributeGroup;
};

export type CreateAttribute = Omit<Attribute, "id">;

export type AttributeValue = {
  id: number;
  value: string;
  attribute_id: number;
  display_color?: string | null;
  display_order?: number | null;
  is_active: boolean;
};

export type CreateAttributeValue = Omit<AttributeValue, "id">;

export type AttributeTypes =
  | "text"
  | "number"
  | "color"
  | "checkBox"
  | "radioButton"
  | "select"
  | "boolean";
