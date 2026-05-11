"use client";

import {
  MdPublic,
  MdSecurity,
  MdLocationOn,
  MdNetworkCheck,
  MdWarning,
  MdInfo,
  MdExpandMore,
  MdExpandLess,
  MdCheckCircle,
  MdError,
  MdRouter,
  MdDevices,
  MdDns,
  MdSpeed,
  MdStorage,
  MdLanguage,
  MdVpnKey,
  MdCloud,
  MdBusiness,
  MdHome,
  MdSchool,
  MdCable,
  MdSatellite,
  MdWifi,
  MdPhoneIphone,
  MdComputer,
  MdLaptop,
  MdTabletMac,
  MdDesktopWindows,
} from "react-icons/md";
import {
  FaGlobeAmericas,
  FaNetworkWired,
  FaShieldAlt,
  FaFlag,
  FaMapMarkerAlt,
  FaDatabase,
  FaServer,
  FaCloud,
  FaWifi,
  FaEthernet,
  FaMobileAlt,
  FaLaptop,
  FaDesktop,
  FaTabletAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import { FaEdge } from "react-icons/fa6";
import {
  SiLinux,
  SiApple,
  SiAndroid,
  SiGooglechrome,
  SiFirefox,
  SiSafari,
  SiOpera,
  SiBrave,
} from "react-icons/si";
import { ImWindows8 } from "react-icons/im";
import { useState } from "react";
import analyzeIP, { IPAnalysisResult } from "./analyzeIP";

interface SimpleIPInfoProps {
  ip: string;
  userAgent?: string;
  showAdvancedByDefault?: boolean;
}

// تابع کمکی برای تشخیص دستگاه از User Agent
const getDeviceFromUserAgent = (userAgent?: string) => {
  if (!userAgent)
    return {
      type: "نامشخص",
      icon: <FaQuestionCircle className="text-gray-400" />,
    };

  const ua = userAgent.toLowerCase();

  if (/mobile|iphone|android.*mobile/.test(ua)) {
    return { type: "موبایل", icon: <FaMobileAlt className="text-blue-400" /> };
  } else if (/tablet|ipad/.test(ua)) {
    return { type: "تبلت", icon: <FaTabletAlt className="text-purple-400" /> };
  } else if (/laptop/.test(ua)) {
    return { type: "لپ‌تاپ", icon: <FaLaptop className="text-green-400" /> };
  } else {
    return { type: "دسکتاپ", icon: <FaDesktop className="text-gray-400" /> };
  }
};

// تابع کمکی برای تشخیص سیستم عامل
const getOSFromUserAgent = (userAgent?: string) => {
  if (!userAgent)
    return { os: "نامشخص", icon: <ImWindows8 className="text-gray-400" /> };

  const ua = userAgent.toLowerCase();

  if (/windows/.test(ua)) {
    return { os: "Windows", icon: <ImWindows8 className="text-blue-500" /> };
  } else if (/mac os|macintosh/.test(ua)) {
    return { os: "macOS", icon: <SiApple className="text-gray-800" /> };
  } else if (/linux/.test(ua)) {
    return { os: "Linux", icon: <SiLinux className="text-orange-600" /> };
  } else if (/android/.test(ua)) {
    return { os: "Android", icon: <SiAndroid className="text-green-500" /> };
  } else if (/ios|iphone|ipad/.test(ua)) {
    return { os: "iOS", icon: <SiApple className="text-blue-400" /> };
  }

  return { os: "نامشخص", icon: <ImWindows8 className="text-gray-400" /> };
};

// تابع کمکی برای تشخیص مرورگر
const getBrowserFromUserAgent = (userAgent?: string) => {
  if (!userAgent)
    return {
      browser: "نامشخص",
      icon: <SiGooglechrome className="text-gray-400" />,
    };

  const ua = userAgent.toLowerCase();

  if (/chrome/.test(ua) && !/edge/.test(ua)) {
    return {
      browser: "Chrome",
      icon: <SiGooglechrome className="text-green-500" />,
    };
  } else if (/firefox/.test(ua)) {
    return {
      browser: "Firefox",
      icon: <SiFirefox className="text-orange-500" />,
    };
  } else if (/safari/.test(ua) && !/chrome/.test(ua)) {
    return { browser: "Safari", icon: <SiSafari className="text-blue-500" /> };
  } else if (/edg/.test(ua)) {
    return { browser: "Edge", icon: <FaEdge className="text-blue-600" /> };
  } else if (/opr/.test(ua) || /opera/.test(ua)) {
    return { browser: "Opera", icon: <SiOpera className="text-red-500" /> };
  } else if (/brave/.test(ua)) {
    return { browser: "Brave", icon: <SiBrave className="text-orange-400" /> };
  }

  return {
    browser: "نامشخص",
    icon: <SiGooglechrome className="text-gray-400" />,
  };
};

const SimpleIPInfo = ({
  ip,
  userAgent,
  showAdvancedByDefault = false,
}: SimpleIPInfoProps) => {
  const [showAdvanced, setShowAdvanced] = useState(showAdvancedByDefault);
  const [showRawData, setShowRawData] = useState(false);

  const ipInfo = analyzeIP(ip);
  const deviceInfo = getDeviceFromUserAgent(userAgent);
  const osInfo = getOSFromUserAgent(userAgent);
  const browserInfo = getBrowserFromUserAgent(userAgent);

  // رنگ‌بندی سطح امنیت
  const getSecurityColor = (level: string) => {
    switch (level) {
      case "very-high":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          border: "border-green-200",
        };
      case "high":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-800",
          border: "border-yellow-200",
        };
      case "medium":
        return {
          bg: "bg-orange-100",
          text: "text-orange-800",
          border: "border-orange-200",
        };
      case "low":
        return {
          bg: "bg-red-100",
          text: "text-red-800",
          border: "border-red-200",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          border: "border-gray-200",
        };
    }
  };

  const securityColor = getSecurityColor(ipInfo.securityLevel);

  // آیکون سطح امنیت
  const getSecurityIcon = (level: string) => {
    switch (level) {
      case "very-high":
        return <MdCheckCircle className="text-green-500" />;
      case "high":
        return <MdSecurity className="text-yellow-500" />;
      case "medium":
        return <MdWarning className="text-orange-500" />;
      case "low":
        return <MdError className="text-red-500" />;
      default:
        return <MdSecurity className="text-gray-500" />;
    }
  };

  // متن سطح امنیت
  const getSecurityText = (level: string) => {
    switch (level) {
      case "very-high":
        return "خیلی امن";
      case "high":
        return "امن";
      case "medium":
        return "متوسط";
      case "low":
        return "نیاز به بررسی";
      default:
        return "نامشخص";
    }
  };

  return (
    <div className="space-y-4">
      {/* کارت اصلی (همیشه نمایش داده می‌شود) */}
      <div className="bg-gradient-to-br from-white via-gray-100 to-white rounded-lg">
        {/* هدر کارت */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${securityColor.bg} ${securityColor.border} border`}
              >
                <MdPublic className="text-xl text-blue-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">تحلیل پیشرفته IP</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`px-2 py-1 rounded text-xs ${securityColor.bg} ${securityColor.text}`}
                  >
                    {getSecurityText(ipInfo.securityLevel)}
                  </span>
                  {ipInfo.isIranianIP && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs flex items-center gap-1">
                      <FaFlag className="text-xs" />
                      ایرانی
                    </span>
                  )}
                  {ipInfo.isIPv6Mapped && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                      IPv6-mapped
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {showAdvanced ? (
                <>
                  <MdExpandLess className="text-lg" />
                  <span>بستن جزئیات</span>
                </>
              ) : (
                <>
                  <MdExpandMore className="text-lg" />
                  <span>نمایش جزئیات</span>
                </>
              )}
            </button>
          </div>

          {/* خلاصه اطلاعات */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2">
                <MdNetworkCheck className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">آدرس IP</p>
                  <code className="font-mono text-sm font-bold">
                    {ipInfo.ip}
                  </code>
                </div>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2">
                <FaGlobeAmericas className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">موقعیت</p>
                  <p className="text-sm font-medium">
                    {ipInfo.possibleLocation}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">سطح امنیت</p>
                  <div className="flex items-center gap-1">
                    {getSecurityIcon(ipInfo.securityLevel)}
                    <p className="text-sm font-medium">
                      {getSecurityText(ipInfo.securityLevel)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2">
                <FaNetworkWired className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">نوع شبکه</p>
                  <p className="text-sm font-medium">{ipInfo.type}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* اطلاعات پیشرفته (با قابلیت expand) */}
        {showAdvanced && (
          <div className="p-4 space-y-6">
            {/* بخش 1: اطلاعات شبکه و امنیت */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* کارت اطلاعات شبکه */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <MdRouter className="text-blue-600" />
                  <h4 className="font-bold text-gray-800">اطلاعات شبکه</h4>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-600">نسخه IP</p>
                      <p className="font-medium">{ipInfo.version}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">کلاس شبکه</p>
                      <p className="font-medium">{ipInfo.networkClass}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600">Subnet Mask</p>
                    <p className="font-mono text-sm">
                      {ipInfo.subnetMask || "N/A"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-600">قابل مسیریابی</p>
                      <p
                        className={`font-medium ${ipInfo.technicalDetails.isRoutable ? "text-green-600" : "text-red-600"}`}
                      >
                        {ipInfo.technicalDetails.isRoutable ? "بله" : "خیر"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">RIR</p>
                      <p className="font-medium text-sm">
                        {ipInfo.rir || "نامشخص"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* کارت امنیت */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <FaShieldAlt className="text-red-600" />
                  <h4 className="font-bold text-gray-800">تحلیل امنیتی</h4>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getSecurityIcon(ipInfo.securityLevel)}
                      <div>
                        <p className="text-sm font-medium">
                          سطح امنیت: {getSecurityText(ipInfo.securityLevel)}
                        </p>
                        <p className="text-xs text-gray-600">
                          {ipInfo.securityThreats.length} تهدید شناسایی شد
                        </p>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full ${securityColor.bg} ${securityColor.text}`}
                    >
                      {ipInfo.securityLevel === "very-high"
                        ? "🛡️"
                        : ipInfo.securityLevel === "high"
                          ? "✅"
                          : ipInfo.securityLevel === "medium"
                            ? "⚠️"
                            : "🚨"}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 mb-2">
                      تهدیدات شناسایی شده:
                    </p>
                    <ul className="space-y-1">
                      {ipInfo.securityThreats.map((threat, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <MdWarning className="text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span>{threat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-red-200">
                    <p className="text-xs text-gray-600 mb-2">
                      نوع‌های دسترسی:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ipInfo.ispTypes.map((type, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white border border-red-200 text-red-700 rounded text-xs"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* بخش 2: اطلاعات جغرافیایی و ISP */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* کارت جغرافیا */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <FaMapMarkerAlt className="text-green-600" />
                  <h4 className="font-bold text-gray-800">اطلاعات جغرافیایی</h4>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-lg border border-green-100">
                      <p className="text-xs text-gray-600">کشور</p>
                      <div className="flex items-center gap-2 mt-1">
                        <FaFlag className="text-blue-500" />
                        <p className="font-medium">
                          {ipInfo.geolocation.country}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-green-100">
                      <p className="text-xs text-gray-600">شهر</p>
                      <div className="flex items-center gap-2 mt-1">
                        <MdLocationOn className="text-red-500" />
                        <p className="font-medium">
                          {ipInfo.geolocation.city || "نامشخص"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-600">منطقه زمانی</p>
                      <p className="font-medium text-sm">
                        {ipInfo.geolocation.timezone}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600">منطقه</p>
                      <p className="font-medium text-sm">
                        {ipInfo.geolocation.region}
                      </p>
                    </div>
                  </div>

                  {ipInfo.geolocation.coordinates && (
                    <div className="bg-white p-3 rounded-lg border border-green-100">
                      <div className="flex items-center gap-2 mb-2">
                        <MdLocationOn className="text-green-500" />
                        <p className="text-sm font-medium">مختصات جغرافیایی</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-600">عرض جغرافیایی</p>
                          <p className="font-mono">
                            {ipInfo.geolocation.coordinates.lat}°
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">طول جغرافیایی</p>
                          <p className="font-mono">
                            {ipInfo.geolocation.coordinates.lon}°
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* کارت ISP و دیتاسنتر */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <FaServer className="text-purple-600" />
                  <h4 className="font-bold text-gray-800">ISP و دیتاسنتر</h4>
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-3 rounded-lg border border-purple-100">
                    <div className="flex items-center gap-2 mb-2">
                      <MdBusiness className="text-purple-500" />
                      <div>
                        <p className="text-sm font-medium">
                          ارائه‌دهنده اینترنت (ISP)
                        </p>
                        <p className="text-xs text-gray-600">ایران</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {ipInfo.possibleISP}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 mb-2">نوع‌های سرویس:</p>
                    <div className="flex flex-wrap gap-2">
                      {ipInfo.ispTypes.map((type, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white border border-purple-200 text-purple-700 rounded text-xs"
                        >
                          {type}
                        </span>
                      ))}
                      {ipInfo.isIranianIP && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 border border-blue-200 rounded text-xs">
                          اینترنت ملی
                        </span>
                      )}
                      {ipInfo.isCGNAT && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 border border-yellow-200 rounded text-xs">
                          CGNAT
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-purple-200">
                    <p className="text-xs text-gray-600 mb-2">
                      تکنولوژی‌های احتمالی:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        {ipInfo.isCGNAT ? (
                          <MdRouter className="text-yellow-500" />
                        ) : ipInfo.isPrivate ? (
                          <MdHome className="text-green-500" />
                        ) : (
                          <MdBusiness className="text-blue-500" />
                        )}
                        <span className="text-sm">
                          {ipInfo.isCGNAT
                            ? "CGNAT"
                            : ipInfo.isPrivate
                              ? "شبکه خصوصی"
                              : "شبکه عمومی"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {ipInfo.isIPv6Mapped ? (
                          <MdLanguage className="text-purple-500" />
                        ) : ipInfo.version === "IPv6" ? (
                          <MdDns className="text-blue-500" />
                        ) : (
                          <MdStorage className="text-gray-500" />
                        )}
                        <span className="text-sm">
                          {ipInfo.isIPv6Mapped ? "IPv6-mapped" : ipInfo.version}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* بخش 3: اطلاعات دستگاه (اگر user agent وجود دارد) */}
            {userAgent && (
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <MdDevices className="text-orange-600" />
                  <h4 className="font-bold text-gray-800">
                    اطلاعات دستگاه کاربر
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* دستگاه */}
                  <div className="bg-white p-3 rounded-lg border border-orange-100">
                    <div className="flex items-center gap-2 mb-2">
                      {deviceInfo.icon}
                      <div>
                        <p className="text-sm font-medium">نوع دستگاه</p>
                        <p className="text-xs text-gray-600">
                          {deviceInfo.type}
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">
                        {deviceInfo.type}
                      </p>
                    </div>
                  </div>

                  {/* سیستم عامل */}
                  <div className="bg-white p-3 rounded-lg border border-orange-100">
                    <div className="flex items-center gap-2 mb-2">
                      {osInfo.icon}
                      <div>
                        <p className="text-sm font-medium">سیستم عامل</p>
                        <p className="text-xs text-gray-600">{osInfo.os}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">
                        {osInfo.os}
                      </p>
                    </div>
                  </div>

                  {/* مرورگر */}
                  <div className="bg-white p-3 rounded-lg border border-orange-100">
                    <div className="flex items-center gap-2 mb-2">
                      {browserInfo.icon}
                      <div>
                        <p className="text-sm font-medium">مرورگر</p>
                        <p className="text-xs text-gray-600">
                          {browserInfo.browser}
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">
                        {browserInfo.browser}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-orange-200">
                  <button
                    onClick={() => setShowRawData(!showRawData)}
                    className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-800"
                  >
                    <MdInfo className="text-lg" />
                    {showRawData ? "مخفی کردن" : "نمایش"} User Agent کامل
                  </button>

                  {showRawData && (
                    <div className="mt-3 p-3 bg-white rounded border border-orange-200">
                      <p className="text-xs text-gray-600 mb-2">User Agent:</p>
                      <pre className="text-xs overflow-x-auto p-2 bg-gray-50 rounded">
                        {userAgent}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* بخش 4: اطلاعات فنی پیشرفته */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MdDns className="text-gray-600" />
                  <h4 className="font-bold text-gray-800">
                    اطلاعات فنی پیشرفته
                  </h4>
                </div>
                <span className="text-xs text-gray-500">
                  برای کارشناسان شبکه
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-600 mb-2">
                    نمایش دودویی (Binary)
                  </p>
                  <p className="font-mono text-sm break-all">
                    {ipInfo.binaryRepresentation}
                  </p>
                </div>

                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-600 mb-2">
                    نمایش هگزادسیمال (Hex)
                  </p>
                  <p className="font-mono text-sm break-all">
                    {ipInfo.hexRepresentation}
                  </p>
                </div>

                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-600 mb-2">
                    نمایش دهدهی (Decimal)
                  </p>
                  <p className="font-mono text-sm break-all">
                    {ipInfo.decimalRepresentation}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <p className="text-xs text-gray-600">اکتت اول</p>
                  <p className="font-mono text-lg font-bold">
                    {ipInfo.technicalDetails.firstOctet}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">بخش شبکه</p>
                  <p className="font-mono text-sm">
                    {ipInfo.technicalDetails.networkPortion}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">بخش میزبان</p>
                  <p className="font-mono text-sm">
                    {ipInfo.technicalDetails.hostPortion}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Link-local</p>
                  <p
                    className={`font-medium ${ipInfo.technicalDetails.isLinkLocal ? "text-green-600" : "text-gray-600"}`}
                  >
                    {ipInfo.technicalDetails.isLinkLocal ? "بله" : "خیر"}
                  </p>
                </div>
              </div>
            </div>

            {/* بخش 5: نکات و توصیه‌ها */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <MdInfo className="text-blue-600" />
                <h4 className="font-bold text-gray-800">نکات و توصیه‌ها</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-800">
                    ✅ نکات مثبت:
                  </p>
                  <ul className="space-y-1 text-sm text-blue-700">
                    {ipInfo.isIranianIP && (
                      <li className="flex items-start gap-2">
                        • سرعت دسترسی بهتر به خدمات ایرانی
                      </li>
                    )}
                    {ipInfo.isPrivate && (
                      <li className="flex items-start gap-2">
                        • امنیت بالا به دلیل شبکه خصوصی
                      </li>
                    )}
                    {ipInfo.securityLevel === "very-high" && (
                      <li className="flex items-start gap-2">
                        • سطح امنیتی بسیار مطلوب
                      </li>
                    )}
                    {ipInfo.possibleISP !== "نامشخص" && (
                      <li className="flex items-start gap-2">
                        • اتصال از ISP معتبر ایرانی
                      </li>
                    )}
                    {!ipInfo.technicalDetails.isDocumentation && (
                      <li className="flex items-start gap-2">
                        • IP معتبر و غیر تستی
                      </li>
                    )}
                  </ul>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-orange-800">
                    ⚠️ نکات احتیاطی:
                  </p>
                  <ul className="space-y-1 text-sm text-orange-700">
                    {ipInfo.isCGNAT && (
                      <li className="flex items-start gap-2">
                        • IP مشترک با کاربران دیگر (CGNAT)
                      </li>
                    )}
                    {ipInfo.isIPv6Mapped && (
                      <li className="flex items-start gap-2">
                        • استفاده از NAT ممکن است محدودیت ایجاد کند
                      </li>
                    )}
                    {ipInfo.securityThreats.length > 0 && (
                      <li className="flex items-start gap-2">
                        • بررسی تهدیدات امنیتی شناسایی شده
                      </li>
                    )}
                    {!ipInfo.isIranianIP && (
                      <li className="flex items-start gap-2">
                        • ممکن است محدودیت دسترسی به خدمات ایرانی وجود داشته
                        باشد
                      </li>
                    )}
                    {ipInfo.technicalDetails.isDocumentation && (
                      <li className="flex items-start gap-2">
                        • این IP برای تست شبکه است
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleIPInfo;
