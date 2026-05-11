"use client"

import { Accordion, AccordionItem, Button, Card, CardBody, Input, Textarea } from "@heroui/react"
import { useState, useEffect } from "react"
import { IoDocumentTextOutline } from "react-icons/io5"
import ImageBoxUploader from "@/components/media/ImageBoxUploader"
import GenericTagInput from "@/components/forms/Inputs/GenericTagInput"

type Props = {
    cardType: "new" | "update"
    title?: string,
    closed?: boolean,
    onSubmit?: (data: {
        title: string
        description: string
        imageFile: File | null
        tags: string[]
    }) => void
    onDelete?: () => void
    onChange?: (data: {
        title: string
        description: string
        imageFile: File | null
        tags: string[]
    }) => void
    defaultValues?: {
        title: string
        description: string
        imageFile?: File | null
        tags?: string[]
    }
}

const BlogCard: React.FC<Props> = ({
    cardType,
    title: titleCard = "",
    onSubmit,
    onDelete,
    onChange,
    defaultValues,
    closed
}) => {
    const [title, setTitle] = useState(defaultValues?.title || "")
    const [description, setDescription] = useState(defaultValues?.description || "")
    const [imageFile, setImageFile] = useState<File | null>(defaultValues?.imageFile || null)
    const [tags, setTags] = useState<string[]>(defaultValues?.tags || [])

    useEffect(() => {
        if (cardType === "new" && onChange) {
            onChange({ title, description, imageFile, tags })
        }
    }, [title, description, imageFile, tags])

    const isDisabled =
        !title.trim() || !description.trim() || !imageFile || tags.length === 0

    const handleSubmit = () => {
        if (isDisabled || !onSubmit) return
        onSubmit({ title, description, imageFile, tags })
    }

    return (
        <Card className={cardType === "new" ? "shadow-md shadow-purple-300" : ""}>
         {/*    <BoxHeader
                title={cardType === "new" ? "تعریف بلاگ جدید" : titleCard}
                color={
                    cardType === "new"
                        ? "bg-purple-700/10 text-purple-700"
                        : "bg-green-700/10 text-green-700"
                }
                icon={<IoDocumentTextOutline className="text-3xl" />}
            /> */}
            <CardBody className="shadow-md flex flex-col gap-6">
                {
                    closed
                        ?
                        <Accordion>
                            <AccordionItem key="1" aria-label="Accordion 1" title="ویرایش بلاگ">
                                <div className="flex flex-col gap-4 text-right">
                                    <ImageBoxUploader
                                        textBtn={imageFile ? "تغییر تصویر" : "+ افزودن تصویر"}
                                        title="کاور بلاگ"
                                        changeStatusFile={imageFile}
                                        onFile={(file) => setImageFile(file)}
                                        sizeText="سایز تصویر: 16.9"
                                    />

                                    <Input
                                        label="عنوان پست"
                                        labelPlacement="outside"
                                        placeholder="عنوان پست را وارد کنید"
                                        value={title}
                                        onValueChange={setTitle}
                                        autoFocus
                                    />

                                    <GenericTagInput
                                        label="تگ‌ها"
                                        defaultTags={tags}
                                        onChange={setTags}
                                    />

                                    <Textarea
                                        labelPlacement="outside"
                                        label="محتوای پست"
                                        placeholder="توضیحات پست را وارد کنید"
                                        variant="flat"
                                        value={description}
                                        onValueChange={setDescription}
                                    />
                                </div>
                                <div className="flex items-center justify-end gap-2 mt-4">
                                    {cardType === "update" && (
                                        <>
                                            <Button color="danger" variant="flat" onPress={onDelete}>
                                                حذف
                                            </Button>
                                            <Button
                                                color="primary"
                                                variant="flat"
                                                onPress={handleSubmit}
                                                isDisabled={isDisabled}
                                            >
                                                به‌روزرسانی
                                            </Button>
                                        </>
                                    )}

                                    {cardType === "new" && (
                                        <Button
                                            color="success"
                                            variant="flat"
                                            onPress={handleSubmit}
                                            isDisabled={isDisabled}
                                        >
                                            ثبت
                                        </Button>
                                    )}
                                </div>
                            </AccordionItem>
                        </Accordion>
                        :
                        <>
                            <div className="flex flex-col gap-4 text-right">
                                <ImageBoxUploader
                                    textBtn={imageFile ? "تغییر تصویر" : "+ افزودن تصویر"}
                                    title="کاور بلاگ"
                                    changeStatusFile={imageFile}
                                    onFile={(file) => setImageFile(file)}
                                    sizeText="سایز تصویر: 16.9"
                                />

                                <Input
                                    label="عنوان پست"
                                    labelPlacement="outside"
                                    placeholder="عنوان پست را وارد کنید"
                                    value={title}
                                    onValueChange={setTitle}
                                    autoFocus
                                />

                                <GenericTagInput
                                    label="تگ‌ها"
                                    defaultTags={tags}
                                    onChange={setTags}
                                />

                                <Textarea
                                    labelPlacement="outside"
                                    label="محتوای پست"
                                    placeholder="توضیحات پست را وارد کنید"
                                    variant="flat"
                                    value={description}
                                    onValueChange={setDescription}
                                />
                            </div>

                            <div className="flex items-center justify-end gap-2">
                                {cardType === "update" && (
                                    <>
                                        <Button color="danger" variant="flat" onPress={onDelete}>
                                            حذف
                                        </Button>
                                        <Button
                                            color="primary"
                                            variant="flat"
                                            onPress={handleSubmit}
                                            isDisabled={isDisabled}
                                        >
                                            به‌روزرسانی
                                        </Button>
                                    </>
                                )}

                                {cardType === "new" && (
                                    <Button
                                        color="success"
                                        variant="flat"
                                        onPress={handleSubmit}
                                        isDisabled={isDisabled}
                                    >
                                        ثبت
                                    </Button>
                                )}
                            </div>
                        </>
                }
            </CardBody>
        </Card>
    )
}

export default BlogCard
