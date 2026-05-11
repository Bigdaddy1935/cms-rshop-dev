"use client"

import HeaderAction from "@/components/common/Card/HeaderAction"
import BlogCard from "@/components/features/store/blog/BlogCard"
import { useState } from "react"
import { TbFolderOpen } from "react-icons/tb"

type FaqItem = {
  id: number
  title: string
  description: string
  imageFile: File | null
  tags: string[]
}

const Blog = () => {
  const [isNewFaq, setIsNewFaq] = useState(false)
  const [faqList, setFaqList] = useState<FaqItem[]>([])

  const [tempTitle, setTempTitle] = useState("")
  const [tempDescription, setTempDescription] = useState("")
  const [tempImageFile, setTempImageFile] = useState<File | null>(null)
  const [tempTags, setTempTags] = useState<string[]>([])

  const handleAddFaq = () => {
    if (!tempTitle || !tempDescription || !tempImageFile || !tempTags.length) return

    setFaqList(prev => [
      ...prev,
      {
        id: Date.now(),
        title: tempTitle,
        description: tempDescription,
        imageFile: tempImageFile,
        tags: tempTags
      }
    ])

    setIsNewFaq(false)
    setTempTitle("")
    setTempDescription("")
    setTempImageFile(null)
    setTempTags([])
  }

  const handleRemoveFaq = (id: number) => {
    setFaqList(prev => prev.filter(f => f.id !== id))
  }

  const handleUpdateFaq = (
    id: number,
    data: {
      title: string
      description: string
      imageFile: File | null
      tags: string[]
    }
  ) => {
    setFaqList(prev =>
      prev.map(faq => (faq.id === id ? { ...faq, ...data } : faq))
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white p-4 rounded-2xl">
        <HeaderAction
          title="بلاگ ها"
          textBtn={isNewFaq ? "x لغو بلاگ جدید" : "+ بلاگ جدید"}
          onPress={() => setIsNewFaq(prev => !prev)}
        />

        <div className="flex flex-col gap-6 mt-6">
          {isNewFaq && (
            <div className={!faqList.length ? "mb-10" : ""}>
              <BlogCard
                cardType="new"
                onSubmit={handleAddFaq}
                onChange={(data) => {
                  setTempTitle(data.title)
                  setTempDescription(data.description)
                  setTempImageFile(data.imageFile)
                  setTempTags(data.tags)
                }}
              />
            </div>
          )}

          {faqList.map(faq => (
            <BlogCard
              key={faq.id}
              cardType="update"
              title={faq.title}
              defaultValues={{
                title: faq.title,
                description: faq.description,
                imageFile: faq.imageFile,
                tags: faq.tags
              }}
              onDelete={() => handleRemoveFaq(faq.id)}
              onSubmit={(data) => handleUpdateFaq(faq.id, data)}
              closed
            />
          ))}

          {!faqList.length && (
            <div className="flex items-center flex-col gap-2">
              <TbFolderOpen className="text-[90px] text-gray-600 animate-bounce" />
              <p className="text-center animate-pulse pb-4">
                هنوز هیچ بلاگی ساخته نشده است
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Blog
