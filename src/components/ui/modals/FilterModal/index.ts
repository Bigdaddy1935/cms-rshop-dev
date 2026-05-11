export type FieldOption = { key: string | number; title: string };

export type FilterField =
  | {
      key: string;
      label: string;
      type: "boolean01";
      default?: "" | "1" | "0";
    }
  | {
      key: string;
      label: string;
      type: "select";
      options?: FieldOption[];
      remoteOptions?: () => Promise<FieldOption[]>;
      placeholder?: string;
      searchable?: boolean;
      syncSearchToUrl?: boolean;
      searchKey?: string;
    }
  | {
      key: string;
      label: string;
      type: "multiSelect";
      options?: FieldOption[];
      remoteOptions?: () => Promise<FieldOption[]>;
      placeholder?: string;
    }
  | {
      key: string;
      label: string;
      type: "numberRange";
      placeholderMin?: string;
      placeholderMax?: string;
    }
  | {
      key: string;
      label: string;
      type: "unitNumber";
      unitOptions: FieldOption[];
      placeholderMin?: string;
      placeholderMax?: string;
    }
  | {
      key: string;
      label: string;
      type: "discount";
      placeholderMin?: string;
      placeholderMax?: string;
    }
  | {
      key: string;
      label: string;
      type: "dateRange";
      placeholder?: string;
    }
  | {
      key: string;
      label: string;
      type: "singleDate";
      placeholder?: string;
    }
  | {
      key: string;
      label: string;
      type: "text";
      placeholder?: string;
    };
