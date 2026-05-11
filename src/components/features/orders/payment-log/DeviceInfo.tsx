import {
  MdDesktopWindows,
  MdPhoneIphone,
  MdTabletMac,
  MdLaptop,
  MdComputer,
  MdLanguage,
  MdSecurity,
  MdInfoOutline,
} from "react-icons/md";
import { FaWindows, FaApple, FaLinux, FaAndroid } from "react-icons/fa";
import { SiGooglechrome, SiFirefox, SiSafari, SiOpera } from "react-icons/si";
import { FaEdgeLegacy } from "react-icons/fa6";
import { useState } from "react";
import SimpleIPInfo from "./SimpleIPInfo";

interface DeviceInfoProps {
  userAgent: string;
  ip: string;
  timestamp?: string;
}

// Helper function to format dates
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

// Function to extract detailed device info
const parseUserAgent = (ua: string) => {
  const info = {
    device: {
      type: "دسکتاپ" as "موبایل" | "تبلت" | "دسکتاپ" | "لپ‌تاپ",
      model: "",
      manufacturer: "",
      icon: <MdDesktopWindows className="text-gray-400" />,
    },
    os: {
      name: "نامشخص",
      version: "",
      icon: <MdComputer className="text-gray-400" />,
    },
    browser: {
      name: "نامشخص",
      version: "",
      engine: "",
      icon: <MdLanguage className="text-gray-400" />,
    },
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isBot: /bot|crawler|spider/i.test(ua),
  };

  // Detect device type
  if (/mobile|iphone|ipod|android.*mobile/i.test(ua)) {
    info.device.type = "موبایل";
    info.device.icon = <MdPhoneIphone className="text-blue-500" />;
    info.isMobile = true;
    info.isDesktop = false;

    // Detect mobile manufacturer/model
    if (/iphone/i.test(ua)) {
      info.device.manufacturer = "Apple";
      info.device.model = "iPhone";
    } else if (/samsung/i.test(ua)) {
      info.device.manufacturer = "Samsung";
    } else if (/xiaomi|redmi|poco/i.test(ua)) {
      info.device.manufacturer = "Xiaomi";
    } else if (/huawei|honor/i.test(ua)) {
      info.device.manufacturer = "Huawei";
    }
  } else if (/tablet|ipad|android(?!.*mobile)/i.test(ua)) {
    info.device.type = "تبلت";
    info.device.icon = <MdTabletMac className="text-purple-500" />;
    info.isTablet = true;
    info.isDesktop = false;
  } else if (/laptop/i.test(ua)) {
    info.device.type = "لپ‌تاپ";
    info.device.icon = <MdLaptop className="text-green-500" />;
  }

  // Detect operating system
  const osPatterns = [
    {
      pattern: /windows nt 10/i,
      name: "Windows 10/11",
      icon: <FaWindows className="text-blue-600" />,
    },
    {
      pattern: /windows nt 6\.3/i,
      name: "Windows 8.1",
      icon: <FaWindows className="text-blue-500" />,
    },
    {
      pattern: /windows nt 6\.2/i,
      name: "Windows 8",
      icon: <FaWindows className="text-blue-400" />,
    },
    {
      pattern: /windows nt 6\.1/i,
      name: "Windows 7",
      icon: <FaWindows className="text-blue-300" />,
    },
    {
      pattern: /mac os x 10[._](?:15|14|13)/i,
      name: "macOS Sonoma/Ventura",
      icon: <FaApple className="text-gray-700" />,
    },
    {
      pattern: /mac os x 10[._](?:12|11)/i,
      name: "macOS Monterey/Big Sur",
      icon: <FaApple className="text-gray-600" />,
    },
    {
      pattern: /mac os x/i,
      name: "macOS",
      icon: <FaApple className="text-gray-800" />,
    },
    {
      pattern: /linux/i,
      name: "Linux",
      icon: <FaLinux className="text-orange-600" />,
    },
    {
      pattern: /android 1[0-9]/i,
      name: "Android 10+",
      icon: <FaAndroid className="text-green-600" />,
    },
    {
      pattern: /android [5-9]/i,
      name: "Android 5-9",
      icon: <FaAndroid className="text-green-500" />,
    },
    {
      pattern: /android/i,
      name: "Android",
      icon: <FaAndroid className="text-green-400" />,
    },
    {
      pattern: /ios|iphone os/i,
      name: "iOS",
      icon: <FaApple className="text-blue-400" />,
    },
  ];

  for (const osPattern of osPatterns) {
    if (osPattern.pattern.test(ua)) {
      info.os.name = osPattern.name;
      info.os.icon = osPattern.icon;
      break;
    }
  }

  // Extract OS version
  const osVersionMatch = ua.match(
    /(?:windows|mac os x|android|ios|iphone os)[\s\/]?([\d._]+)/i,
  );
  if (osVersionMatch) {
    info.os.version = osVersionMatch[1].replace(/_/g, ".");
  }

  // Detect browser
  const browserPatterns = [
    {
      pattern: /chrome\/([\d.]+)/i,
      name: "Chrome",
      icon: <SiGooglechrome className="text-green-600" />,
      engine: "Blink",
    },
    {
      pattern: /firefox\/([\d.]+)/i,
      name: "Firefox",
      icon: <SiFirefox className="text-orange-500" />,
      engine: "Gecko",
    },
    {
      pattern: /safari\/([\d.]+)/i,
      name: "Safari",
      icon: <SiSafari className="text-blue-500" />,
      engine: "WebKit",
    },
    {
      pattern: /edg\/([\d.]+)/i,
      name: "Edge",
      icon: <FaEdgeLegacy className="text-blue-700" />,
      engine: "Blink",
    },
    {
      pattern: /edge\/([\d.]+)/i,
      name: "Edge Legacy",
      icon: <FaEdgeLegacy className="text-blue-600" />,
      engine: "EdgeHTML",
    },
    {
      pattern: /opr\/([\d.]+)/i,
      name: "Opera",
      icon: <SiOpera className="text-red-500" />,
      engine: "Blink",
    },
    {
      pattern: /opera\/([\d.]+)/i,
      name: "Opera",
      icon: <SiOpera className="text-red-400" />,
      engine: "Presto/Blink",
    },
  ];

  for (const browserPattern of browserPatterns) {
    const match = ua.match(browserPattern.pattern);
    if (match) {
      info.browser.name = browserPattern.name;
      info.browser.icon = browserPattern.icon;
      info.browser.engine = browserPattern.engine;
      info.browser.version = match[1];
      break;
    }
  }

  return info;
};

const DeviceInfo = ({ userAgent, ip, timestamp }: DeviceInfoProps) => {
  const [showRawUA, setShowRawUA] = useState(false);
  const deviceInfo = parseUserAgent(userAgent);

  return (
    <div className="space-y-4 mt-4">
      {/* Header */}
      {deviceInfo.isBot && (
        <div className="w-full flex items-center justify-between">
          <span className="text-red-500 text-[13px] animate-pulse">
            هشدار. یک ربات شناسایی شد!
          </span>
          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full flex items-center gap-1">
            <MdSecurity size={12} />
            ربات/کراولر
          </span>
        </div>
      )}

      {/* Device Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Device Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white rounded-lg border border-blue-200">
              {deviceInfo.device.icon}
            </div>
            <div>
              <p className="font-bold text-gray-900">
                {deviceInfo.device.type}
              </p>
              {deviceInfo.device.manufacturer && (
                <p className="text-sm text-gray-600">
                  {deviceInfo.device.manufacturer}
                </p>
              )}
            </div>
          </div>
          {deviceInfo.device.model && (
            <p className="text-xs text-gray-500 mt-1">
              {deviceInfo.device.model}
            </p>
          )}
        </div>

        {/* OS Card */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white rounded-lg border border-gray-200">
              {deviceInfo.os.icon}
            </div>
            <div>
              <p className="font-bold text-gray-900">{deviceInfo.os.name}</p>
              {deviceInfo.os.version && (
                <p className="text-sm text-gray-600">
                  نسخه {deviceInfo.os.version}
                </p>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">سیستم عامل</p>
        </div>

        {/* Browser Card */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white rounded-lg border border-green-200">
              {deviceInfo.browser.icon}
            </div>
            <div>
              <p className="font-bold text-gray-900">
                {deviceInfo.browser.name}
              </p>
              {deviceInfo.browser.version && (
                <p className="text-sm text-gray-600">
                  نسخه {deviceInfo.browser.version}
                </p>
              )}
            </div>
          </div>
          {deviceInfo.browser.engine && (
            <p className="text-xs text-gray-500 mt-1">
              موتور: {deviceInfo.browser.engine}
            </p>
          )}
        </div>
      </div>

      {/* IP Information */}
      {ip !== undefined ? <SimpleIPInfo ip={ip} /> : ""}

      <div className="flex flex-row-reverse items-center gap-6 justify-between">
        {/* Advanced Details */}
        <button
          onClick={() => setShowRawUA(!showRawUA)}
          className="text-[13px] text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <MdLanguage size={16} />
          {showRawUA ? "مخفی کردن" : "نمایش"} User Agent
        </button>

        {/* Timestamp */}
        {timestamp && (
          <div className="text-xs text-gray-500 flex items-center justify-end gap-2">
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-yellow-500"></span>
            </span>
            آخرین فعالیت: {formatTime(timestamp)}
          </div>
        )}
      </div>

      {showRawUA && (
        <div className="mt-4">
          <pre className="p-3 bg-gray-100 rounded-lg text-xs overflow-x-auto">
            {userAgent}
          </pre>
        </div>
      )}
    </div>
  );
};

export default DeviceInfo;
