"use client"

import { Card, CardBody, Input, NumberInput, Select, SelectItem, Switch } from "@heroui/react"
import { useState } from "react"

type Props = {
    children: React.ReactNode,
    childrenBody?: React.ReactNode,
    isActiveCard?: boolean
}

const SendTypeCard: React.FC<Props> = ({ children, childrenBody, isActiveCard = true }) => {

    const [localPaymentType, setLocalPaymentType] = useState<any>()
    const [localTimeValue, setLocalTimeValue] = useState<any>()
    const [localCost, setLocalCost] = useState("")
    const [freeLocal, setFreeLocal] = useState(false)
    const [weightCost, setWeightCost] = useState("")
    const [cashOnDelivery, setCashOnDelivery] = useState(false)

    return (
        <Card className="shadow-md">
            {children}
            <CardBody>
                {childrenBody}
                <div className={`flex flex-col gap-6 ${!isActiveCard ? "pointer-events-none opacity-55 select-none" : ""}`}>
                    <Select
                        label="نوع پرداخت"
                        placeholder="شیوه پرداخت را انتخاب نمایید"
                        labelPlacement="outside"
                        value={localPaymentType}
                        onChange={setLocalPaymentType}
                    >
                        <SelectItem key="before">پیش کرایه</SelectItem>
                        <SelectItem key="after">پس کرایه</SelectItem>
                    </Select>

                    <div className="flex flex-col gap-2">
                        <NumberInput
                            label="زمان ارسال"
                            placeholder="3"
                            labelPlacement={"outside"}
                            minValue={1}
                            endContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">روز</span>
                                </div>
                            }
                            onValueChange={setLocalTimeValue}
                        />
                        <small className="text-gray-600 text-start">مدت زمانی که پس از آماده‌سازی سفارش، تحویل به مسئول ارسال و تحویل به کاربر برای تکمیل سفارش لازم است.</small>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Input
                            label="هزینه ارسال (تومان)"
                            labelPlacement="outside"
                            placeholder="60,000"
                            type="number"
                            value={localCost}
                            onChange={e => setLocalCost(e.target.value)}
                            disabled={freeLocal}
                        />
                        <Switch
                            size="sm"
                            isSelected={freeLocal}
                            onValueChange={setFreeLocal}
                        >
                            میخواهم هزینه ارسال رایگان باشد
                        </Switch>
                    </div>

                    <div className="bg-slate-300/10 flex flex-col gap-6 rounded-2xl p-4 py-6">
                        <div className="flex flex-col gap-4 text-start">
                            <p className="-mb-2 text-black/80">تعین بازه وزنی (اختیاری)</p>
                            <div className="w-full flex flex-wrap justify-between md:flex-nowrap mb-6 md:mb-0 gap-4">
                                <NumberInput
                                    hideStepper
                                    label="از"
                                    placeholder="3"
                                    minValue={1}
                                    labelPlacement={"outside"}
                                    endContent={
                                        <div className="flex items-center">
                                            <label className="sr-only" htmlFor="currency">
                                                Currency
                                            </label>
                                            <select
                                                aria-label="Select currency"
                                                className="outline-none border-0 bg-transparent text-default-400 text-small"
                                                defaultValue="USD"
                                                id="currency"
                                                name="currency"
                                            >
                                                <option aria-label="US Dollar" value="USD">
                                                    کیلوگرم
                                                </option>
                                                <option aria-label="Argentine Peso" value="ARS">
                                                    گرم
                                                </option>
                                            </select>
                                        </div>
                                    }
                                    className="w-full md:w-1/2 justify-center"
                                />
                                <NumberInput
                                    hideStepper
                                    label="تا"
                                    placeholder="10"
                                    minValue={2}
                                    labelPlacement={"outside"}
                                    endContent={
                                        <div className="flex items-center">
                                            <label className="sr-only" htmlFor="currency">
                                                Currency
                                            </label>
                                            <select
                                                aria-label="Select currency"
                                                className="outline-none border-0 bg-transparent text-default-400 text-small"
                                                defaultValue="USD"
                                                id="currency"
                                                name="currency"
                                            >
                                                <option aria-label="Argentine Peso" value="ARS">
                                                    گرم
                                                </option>
                                                <option aria-label="US Dollar" value="USD">
                                                    کیلوگرم
                                                </option>
                                            </select>
                                        </div>
                                    }
                                    className="w-full md:w-1/2 justify-center"
                                />
                            </div>
                        </div>

                        <Input
                            label="هزینه وزنی (تومان)"
                            labelPlacement="outside"
                            placeholder="120,000"
                            type="number"
                            value={weightCost}
                            onChange={e => setWeightCost(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Switch
                            size="sm"
                            isSelected={cashOnDelivery}
                            onValueChange={setCashOnDelivery}
                        >
                            پرداخت در محل (اختیاری)
                        </Switch>
                        <small className="text-gray-600 text-right">امکان پرداخت مبلغ سفارش و ارسال، به هنگام دریافت مرسوله توسط کاربر</small>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default SendTypeCard