"use client";

import {
  Button,
  DatePicker,
  Divider,
  Input,
  NumberInput,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { useState } from "react";

const Sms = () => {
  const [value, setValue] = useState<any>();

  const smsType = [
    { key: "all", label: "تمام کاربران" },
    { key: "last_3_months", label: "کاربران سه ماه اخیر" },
    { key: "last_1_month", label: "کاربران یک ماه اخیر" },
    {
      key: "failed_1_year",
      label: "کاربرانی که در یک سال اخیر خرید ناموفق داشته اند",
    },
    {
      key: "failed_3_months",
      label: "کاربرانی که در سه ماه اخیر خرید ناموفق داسته اند",
    },
    {
      key: "failed_1_month",
      label: "کاربرانی که در یک ماه اخیر خرید ناموفق داشته اند",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-2xl p-4 py-6 flex flex-col items-center gap-4">
        <div className="w-full flex flex-col gap-6 text-start">
          <p className="text-sm text-gray-600">
            شما می‌توانید برای کاربرانتان پیامک بفرستید، و آنها را برای بازدید
            از سایت و یا خرید مجدد ترغیب کنید.
          </p>
          <Select
            labelPlacement="outside"
            label="انتخاب کاربران"
            placeholder="کاربرانی که میخواهید به آن ها پیامک فرستاده شود"
            selectedKeys={value}
            onSelectionChange={setValue}
          >
            {smsType.map((smsType) => (
              <SelectItem key={smsType.key}>{smsType.label}</SelectItem>
            ))}
          </Select>
        </div>

        {value?.anchorKey ? (
          <div className="w-full mt-4">
            <Textarea
              isRequired
              isClearable
              labelPlacement="outside"
              defaultValue="تخفیف ویژه شب سال نو!
کالاهای مورد نیازت رو با ۲۰٪ تخفیف تهیه کن! برای مشاهده محصولات وارد لینک زیر بشو و خریدت رو ثبت کن:"
              label="متن پیامک را می‌توانید از اینجا تغییر دهید."
              placeholder="توضیحات"
              variant="flat"
              onClear={() => {}}
            />
            <div className="w-full flex flex-col gap-6 mt-6">
              <Divider />
              <p>ایجاد و ارسال کد تخفیف در پیامک</p>
              <Input
                isRequired
                label="نام کد تخفیف"
                labelPlacement="outside"
                name="title"
                placeholder="مثال: First_Pr20"
              />

              <NumberInput
                isRequired
                label="تخفیف"
                labelPlacement={"outside"}
                placeholder="10"
                minValue={1}
                endContent={
                  <div className="flex items-center">
                    <label className="sr-only" htmlFor="stock">
                      stock
                    </label>
                    <select
                      aria-label="Select stock"
                      className="outline-none border-0 bg-transparent text-default-400 text-small"
                      defaultValue="percent"
                      id="stock"
                      name="stock"
                      onChange={(e: any) => {}}
                    >
                      <option aria-label="percent" value="percent">
                        درصد
                      </option>
                      <option aria-label="money" value="money">
                        مبلغ ثابت (تومان)
                      </option>
                    </select>
                  </div>
                }
                onValueChange={(value: any) => {}}
              />

              <NumberInput
                label="تعیین حداقل مبلغ خرید"
                labelPlacement={"outside"}
                placeholder="100,000"
                minValue={1}
                endContent={<p>تومان</p>}
                onValueChange={(value: any) => {}}
              />

              <NumberInput
                label="تعیین سقف تخفیف"
                labelPlacement={"outside"}
                placeholder="100,000"
                minValue={1}
                endContent={<p>تومان</p>}
                onValueChange={(value: any) => {}}
              />

              <DatePicker
                isRequired
                labelPlacement="outside"
                label="تعیین تاریخ پایان تخفیف"
              />
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="w-full text-end">
          <Button color="secondary" variant="flat">
            مشاهده فاکتور و ارسال
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sms;
