"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Customer } from "../customer.types";

type CustomersSelectionContextType = {
  selectedCustomers: Customer[];
  addCustomer: (customer: Customer) => void;
  removeCustomer: (customerId: number) => void;
  setCustomers: (customers: Customer[]) => void;
};

const CustomersSelectionContext =
  createContext<CustomersSelectionContextType | null>(null);

export const useCustomersSelection = () => {
  const context = useContext(CustomersSelectionContext);
  if (!context)
    throw new Error(
      "useCustomersSelection must be used within CustomersSelectionProvider"
    );
  return context;
};

export const CustomersSelectionProvider: React.FC<{
  initialCustomers?: Customer[];
  children: React.ReactNode;
  singleSelect?: boolean;
}> = ({ initialCustomers = [], children, singleSelect = false }) => {
  const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    initialCustomers.length && setSelectedCustomers(initialCustomers);
  }, [initialCustomers]);

  const addCustomer = (customer: Customer) => {
    setSelectedCustomers((prev) => {
      if (singleSelect) {
        return [customer];
      }
      const filtered = prev.filter((u) => u.id !== customer.id);
      return [...filtered, customer];
    });
  };

  const removeCustomer = (customerId: number) => {
    setSelectedCustomers((prev) => prev.filter((u) => u.id !== customerId));
  };

  const setCustomers = (customers: Customer[]) => {
    setSelectedCustomers(customers);
  };

  return (
    <CustomersSelectionContext.Provider
      value={{ selectedCustomers, addCustomer, removeCustomer, setCustomers }}
    >
      {children}
    </CustomersSelectionContext.Provider>
  );
};
