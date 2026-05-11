"use client";

import { useSearchParams } from "next/navigation";
import {
  useGetSupportDetail,
  useReplySupport,
} from "@/core/hooks/api/support/useSupport";
import { toPersianUTC } from "@/core/utils/date";
import { useState, useRef, useEffect } from "react";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlinePaperAirplane,
} from "react-icons/hi2";
import { BsEmojiSmile } from "react-icons/bs";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import Link from "next/link";
import { SiOpencollective, SiTicktick } from "react-icons/si";
import { IoCloseCircle } from "react-icons/io5";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { BiArrowBack } from "react-icons/bi";

// ایموجی‌های کاملاً بدون تکرار
const EMOJI_CATEGORIES: Record<string, string[]> = {
  صورتک‌ها: [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "🙂",
    "🙃",
    "😉",
    "😊",
    "😇",
    "🥰",
    "😍",
    "🤩",
    "😘",
    "😗",
    "☺️",
    "😚",
    "😙",
    "😋",
    "😛",
    "😜",
    "🤪",
    "😏",
    "🥳",
    "🤗",
    "🤭",
    "🤫",
    "🤔",
    "😎",
  ],
  احساسات: [
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🖤",
    "🤍",
    "💔",
    "❣️",
    "💕",
    "💞",
    "💓",
    "💗",
    "💖",
    "✨",
    "⭐",
    "🌟",
    "💫",
  ],
  "حرکات دست": [
    "👍",
    "👎",
    "👌",
    "✌️",
    "🤞",
    "🤟",
    "👈",
    "👉",
    "👆",
    "👇",
    "☝️",
    "✋",
    "🤚",
    "🖐️",
  ],
  "غذا و نوشیدنی": [
    "🍎",
    "🍊",
    "🍋",
    "🍌",
    "🍉",
    "🍇",
    "🍓",
    "🍑",
    "🍍",
    "🥭",
    "🍔",
    "🍕",
    "🌮",
    "🍣",
    "🍰",
    "🎂",
    "☕",
    "🍵",
    "🍺",
  ],
  "فعالیت و اشیاء": [
    "⚽",
    "🏀",
    "🏈",
    "⚾",
    "🎾",
    "🏐",
    "🏓",
    "🎯",
    "🎮",
    "🎲",
    "🎨",
    "🎭",
    "✈️",
    "🚗",
    "🚀",
    "🏃",
    "🚴",
    "🏊",
    "🎪",
  ],
};

type ConversationDetailProps = {
  showBackBtn?: boolean;
};

const ConversationDetail: React.FC<ConversationDetailProps> = ({
  showBackBtn = false,
}) => {
  const searchParams = useSearchParams();
  const chatId = Number(searchParams.get("chat-id"));

  const [message, setMessage] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useGetSupportDetail(chatId);
  const replyMutation = useReplySupport(chatId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  const placeCaretAtEnd = () => {
    const input = inputRef.current;
    if (!input) return;
    input.focus();
    const length = input.value.length;
    input.setSelectionRange(length, length);
  };

  const handleSend = () => {
    if (!message.trim() || replyMutation.isPending) return;

    replyMutation.mutate(message, {
      onSuccess: () => {
        setMessage("");
        setTimeout(placeCaretAtEnd, 100);
      },
    });
  };

  const handleEmojiClick = (emoji: string) => {
    const newMessage = message + emoji;
    setMessage(newMessage);
    setIsPopoverOpen(false);

    setTimeout(() => {
      const input = inputRef.current;
      if (input) {
        input.focus();
        input.setSelectionRange(newMessage.length, newMessage.length);
      }
    }, 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!chatId || !data?.data) {
    return (
      <div className="w-full relative flex flex-col min-h-[73vh] h-full overflow-hidden">
        {/* هدر */}
        <div className="p-4 pt-0 bg border-b border-gray-100 bg-white flex items-center justify-between">
          <div>
            <p className="text-lg text-gray-800 truncate">موضوع تیکت</p>
            <p className="text-xs text-gray-500 mt-1">
              پشتیبانی • تیکت #{chatId}
            </p>
          </div>
          {showBackBtn ? (
            <ActionButton
              route="/admin/store/support"
              icon={<BiArrowBack size={16} className="text-gray-700" />}
            />
          ) : (
            ""
          )}
        </div>

        {/* پیام‌ها */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 text-center text-gray-400">
          {/* آیکون بزرگ */}
          <HiOutlineChatBubbleLeftRight className="text-6xl text-gray-300" />

          {/* متن راهنمای اصلی */}
          <p className="text-lg font-semibold">
            برای شروع، یک گفت‌وگو را انتخاب کنید
          </p>

          {/* متن توضیحی کوچک‌تر */}
          <p className="text-sm text-gray-500 max-w-xs">
            پس از انتخاب یک چت، پیام‌ها و جزئیات آن در اینجا نمایش داده می‌شوند.
          </p>

          {/* می‌توان یک تصویر یا آیکون اضافی برای جذابیت اضافه کرد */}
        </div>

        <div className="p-4 pt-3 bg-white border-t border-gray-100">
          <div className="flex items-end gap-3">
            <button
              className="p-2.5 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
              aria-label="انتخاب ایموجی"
            >
              <BsEmojiSmile size={22} />
            </button>

            <div className="flex-1">
              <div className="w-full px-5 py-2.5 text-gray-500 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all placeholder-gray-400">
                پیام خود را بنویسید...
              </div>
            </div>

            <button
              onClick={handleSend}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white shadow-md transition-all hover:shadow-xl active:scale-95"
            >
              <HiOutlinePaperAirplane size={22} className="rotate-[-45deg]" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  let conv = data.data;
  if (conv?.product_id) {
    conv = { ...conv, messages: conv?.messages.slice(1) };
  }

  return (
    <div
      className={`w-full relative flex flex-col ${showBackBtn ? "max-h-[100vh]" : "h-[73vh]"} overflow-hidden`}
    >
      <div className="flex items-center justify-between p-4 pb-3 bg border-b border-gray-100 bg-white">
        <div>
          <p className="text-[14px] text-gray-700 truncate">{conv.subject}</p>
          <div className="flex items-center gap-2 mt-2.5">
            <div>
              {conv.status === "open" ||
                (conv.status === "waiting" && (
                  <SiOpencollective size={16} className="text-orange-400" />
                ))}
              {conv.status === "answered" && (
                <SiTicktick size={16} className="text-green-500" />
              )}
              {conv.status === "closed" && (
                <IoCloseCircle size={17} className="text-red-500" />
              )}
            </div>
            <p className="text-xs text-gray-500">تیکت #{chatId}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {conv?.product ? (
            <Link
              href={`/admin/products/create?edit_id=${conv.product.id}&type=infos`}
              target="_blank"
            >
              <img
                src={conv.product.image}
                alt={conv.product.title}
                className="w-10 h-10 object-cover rounded-md"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/images/logo.png";
                }}
              />
            </Link>
          ) : (
            ""
          )}
          {showBackBtn ? (
            <ActionButton
              route="/admin/store/support"
              icon={<BiArrowBack size={16} className="text-gray-700" />}
            />
          ) : (
            ""
          )}
        </div>
      </div>

      {/* پیام‌ها */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {conv?.messages?.map((msg: any) => {
          const isAdmin =
            msg.sender?.role === "admin" || msg.sender?.role === "super_admin";

          return (
            <div
              key={msg.id}
              className={`flex ${!isAdmin ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex flex-col items-start max-w-52`}>
                <span className="text-xs font-medium text-gray-500 mb-1.5 px-1">
                  {isAdmin ? `${msg.sender?.name} (ادمین)` : msg.sender?.name}
                </span>

                <div
                  className={`relative px-4 py-3 rounded-2xl max-w-52 shadow-sm transition-all ${
                    isAdmin
                      ? "bg-gradient-to-l from-blue-500 to-blue-400 text-white rounded-tr-sm"
                      : "bg-white border border-gray-200 text-gray-800 rounded-tl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed break-words">
                    {msg.content}
                  </p>
                  <span
                    className={`block text-xs mt-2 ${
                      isAdmin ? "text-blue-100" : "text-gray-400"
                    }`}
                  >
                    {toPersianUTC(msg.created_at)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* نوار ورودی */}
      <div className="p-4 pt-3 bg-white border-t border-gray-100">
        <div className="flex items-end gap-3">
          {/* ایموجی - بدون asChild و بدون warning */}
          <Popover
            isOpen={isPopoverOpen}
            onOpenChange={setIsPopoverOpen}
            placement="top-start"
          >
            <PopoverTrigger>
              <button
                className="p-2.5 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
                aria-label="انتخاب ایموجی"
              >
                <BsEmojiSmile size={22} />
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-72 px-0 py-3 max-h-52">
              <div className="h-52 overflow-y-auto pr-2 pl-4">
                {Object?.entries(EMOJI_CATEGORIES)?.map(
                  ([category, emojis]) => (
                    <div key={category} className="mb-5 last:mb-0">
                      <h4 className="text-xs font-semibold text-gray-600 mb-2 px-1">
                        {category}
                      </h4>
                      <div className="grid grid-cols-6 gap-2.5">
                        {emojis.map((emoji) => (
                          <button
                            key={emoji} // key منحصر به فرد
                            onClick={() => handleEmojiClick(emoji)}
                            className="p-1 pb-0 hover:bg-gray-100 rounded-lg transition-all hover:scale-110 text-xl"
                            aria-label={emoji}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </PopoverContent>
          </Popover>

          {/* اینپوت */}
          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="پیام خود را بنویسید..."
              className="w-full px-5 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all placeholder-gray-400"
            />
          </div>

          {/* ارسال */}
          <button
            onClick={handleSend}
            disabled={!message.trim() || replyMutation.isPending}
            className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white shadow-md transition-all hover:shadow-xl active:scale-95"
            aria-label="ارسال پیام"
          >
            <HiOutlinePaperAirplane size={22} className="rotate-[-45deg]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationDetail;
