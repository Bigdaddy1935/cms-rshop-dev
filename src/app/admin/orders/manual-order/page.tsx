"use client";

import Breadcrumbs from "@/components/common/Breadcrumbs";
import ManualOrderForm from "@/components/features/orders/manual-order/ManualOrderForm";
import { ProductsSelectionProvider } from "@/components/features/products/SelectableProduct/ProductsSelectionContext";
import { CustomersSelectionProvider } from "@/components/features/store/customers/SelectableCustomersBox/CustomersSelectionContext";

const ManualOrder = () => {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs />
      <ProductsSelectionProvider initialProducts={[]}>
        <CustomersSelectionProvider initialCustomers={[]} singleSelect>
          <ManualOrderForm />
        </CustomersSelectionProvider>
      </ProductsSelectionProvider>
    </div>
  );
};

export default ManualOrder;
