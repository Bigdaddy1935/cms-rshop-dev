"use client"

import { Switch } from "@heroui/react"
import { useState } from "react"

const AutoApproval = () => {

    const [cashOnDelivery, setCashOnDelivery] = useState(false)

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-4 flex flex-col gap-2">
                <Switch
                    size="sm"
                    isSelected={cashOnDelivery}
                    onValueChange={setCashOnDelivery}
                >
                    تایید خودکار سفارش
                </Switch>
                <small className="text-gray-600 text-right">با فعال‌شدن این گزینه، سفارش‌های فروشگاه بدون نیاز به تایید شما، به‌صورت خودکار تایید می‌شوند.</small>
            </div>
        </div>
    )

}

export default AutoApproval