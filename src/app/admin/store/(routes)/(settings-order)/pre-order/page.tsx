"use client"

import { NumberInput, Switch } from "@heroui/react"
import { useState } from "react"

const PreOrder = () => {

    const [isActiveCard, setIsActiveCard] = useState(false)
    const [selectItem, setSelectItem] = useState<"limit" | "unlimit">("unlimit")

    return (
        <>
            <div>
                <div className="bg-white rounded-2xl p-4 mt-6">
                    <div className="flex flex-col gap-4 mb-6">
                        <Switch
                            size="sm"
                            isSelected={isActiveCard}
                            onValueChange={setIsActiveCard}
                        >
                            امکان پیش سفارش
                        </Switch>
                        <p className="text-gray-600 text-right">می توانید امکان پیش سفارش را در فروشگاه خود برای محصولات ناموجود داشته باشید.</p>
                    </div>

                    <div className={`${!isActiveCard ? "select-none opacity-55 pointer-events-none" : ""} flex flex-col gap-6`}>
                        <div className="bg-slate-50 rounded-2xl p-2 py-4 flex flex-col gap-6">
                            <NumberInput
                                label="حداکثر زمان آماده سازی محصول"
                                placeholder="3"
                                labelPlacement={"outside"}
                                minValue={1}
                                endContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">روز</span>
                                    </div>
                                }
                                onValueChange={() => { }}
                            />

                            <div className={`flex flex-col justify-between ${selectItem === "limit" ? "bg-white rounded-xl p-2" : ""}`}>
                                <div className="flex items-center justify-between mb-4 text-gray-700">
                                    <p>محدودیت تعداد برای هر سفارش</p>
                                    <Switch isSelected={selectItem === "limit" ? true : false} onValueChange={() => setSelectItem(prev => prev === "limit" ? "unlimit" : "limit")} aria-label="Automatic updates" size="sm" />
                                </div>
                                {
                                    selectItem === "limit"
                                        ?
                                        <NumberInput
                                            label="حداکثر تعداد پیش سفارش"
                                            placeholder="3"
                                            minValue={1}
                                            endContent={
                                                <div className="pointer-events-none flex items-center">
                                                    <span className="text-default-400 text-small">عدد</span>
                                                </div>
                                            }
                                            labelPlacement={"outside"}
                                        />
                                        : ""
                                }
                            </div>
                        </div>

                        {/* Products List */}

                    </div>
                </div>
            </div>
        </>
    )

}

export default PreOrder