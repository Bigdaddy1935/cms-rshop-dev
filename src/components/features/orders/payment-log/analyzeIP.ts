export interface IPAnalysisResult {
  originalIp: string;
  ip: string;
  version: 'IPv4' | 'IPv6';
  isIPv6Mapped: boolean;
  isPrivate: boolean;
  isLocalhost: boolean;
  isLoopback: boolean;
  isReserved: boolean;
  isCGNAT: boolean;
  isCarrierGradeNAT: boolean;
  isMulticast: boolean;
  isBroadcast: boolean;
  isTeredo: boolean;
  is6to4: boolean;
  type: string;
  possibleLocation: string;
  possibleISP: string;
  networkClass: 'A' | 'B' | 'C' | 'D' | 'E' | 'Unknown';
  subnetMask: string | null;
  binaryRepresentation: string;
  hexRepresentation: string;
  decimalRepresentation: string;
  rir: string | null;
  asn: string | null;
  isIranianIP: boolean;
  ispTypes: string[];
  securityLevel: 'very-high' | 'high' | 'medium' | 'low';
  securityThreats: string[];
  geolocation: {
    country: string;
    region: string;
    city: string;
    timezone: string;
    coordinates: { lat: number; lon: number } | null;
  };
  technicalDetails: {
    octets: number[];
    firstOctet: number;
    networkPortion: string;
    hostPortion: string;
    isRoutable: boolean;
    isLinkLocal: boolean;
    isDocumentation: boolean;
  };
}

// دیکشنری ISP‌های ایرانی
const IRANIAN_ISPS = {
  'MCI': ['5.', '79.175.', '85.185.', '94.183.', '95.38.'],
  'Irancell': ['2.144.', '2.145.', '37.27.'],
  'Rightel': ['46.209.', '78.38.'],
  'Shatel': ['79.175.', '85.185.'],
  'Pars Online': ['46.209.', '85.185.'],
  'HiWeb': ['37.27.', '94.183.'],
  'AsiaTech': ['5.'],
  'Fanava': ['95.38.'],
  'Respina': ['78.38.'],
  'Afranet': ['2.144.', '2.145.'],
  'Iran Telecommunication': ['2.145.', '95.38.'],
  'Shuttle': ['79.175.'],
  'Sabanet': ['78.38.'],
  'AryaHamrah': ['5.'],
  'Rayaneh': ['37.27.'],
  'Arsia': ['46.209.'],
  'Webafzar': ['94.183.'],
  'Aban': ['85.185.'],
  'Atrin': ['95.38.'],
  'HostIran': ['5.'],
  'Parsonline': ['46.209.'],
  'Iran Server': ['2.144.'],
  'Server.ir': ['2.145.'],
  'Asiatech': ['5.'],
  'Parspack': ['37.27.'],
  'Saba': ['94.183.'],
  'Ariana': ['78.38.'],
  'Resaneh': ['79.175.'],
  'Soroush': ['85.185.'],
  'Mihan': ['95.38.'],
  'Tehran': ['5.'], // دیتاسنترهای تهران
  'Mashhad': ['2.144.'], // دیتاسنترهای مشهد
  'Isfahan': ['46.209.'], // دیتاسنترهای اصفهان
  'Shiraz': ['37.27.'], // دیتاسنترهای شیراز
  'Tabriz': ['78.38.'], // دیتاسنترهای تبریز
} as const;

// دیتاسنترهای ایرانی
const IRANIAN_DATACENTERS = {
  'دیتاسنتر تهران': ['5.', '37.', '46.', '78.', '79.', '85.', '94.', '95.'],
  'دیتاسنتر مشهد': ['2.144.', '2.145.'],
  'دیتاسنتر اصفهان': ['46.', '78.'],
  'دیتاسنتر شیراز': ['37.', '79.'],
  'دیتاسنتر تبریز': ['78.', '94.'],
  'دیتاسنتر کرج': ['5.', '46.'],
  'دیتاسنتر قم': ['2.145.'],
  'دیتاسنتر یزد': ['37.'],
  'دیتاسنتر رشت': ['46.'],
  'دیتاسنتر اهواز': ['78.'],
  'دیتاسنتر کرمانشاه': ['79.'],
  'دیتاسنتر ارومیه': ['85.'],
  'دیتاسنتر زاهدان': ['94.'],
  'دیتاسنتر بندرعباس': ['95.'],
} as const;

// شهرهای ایران و IP Range آنها
const IRANIAN_CITIES = {
  'تهران': ['5.', '37.27.', '46.209.', '78.38.', '79.175.', '85.185.', '94.183.', '95.38.'],
  'مشهد': ['2.144.', '2.145.', '5.32.', '37.32.', '46.102.', '78.156.', '79.127.', '85.133.', '94.74.', '95.80.'],
  'اصفهان': ['2.176.', '5.42.', '37.10.', '46.100.', '78.39.', '79.132.', '85.15.', '94.101.', '95.42.'],
  'شیراز': ['2.178.', '5.52.', '37.27.', '46.102.', '78.39.', '79.127.', '85.15.', '94.101.', '95.42.'],
  'تبریز': ['2.179.', '5.62.', '37.27.', '46.100.', '78.38.', '79.127.', '85.15.', '94.101.', '95.42.'],
  'کرج': ['5.22.', '37.27.', '46.209.', '78.38.', '79.175.', '85.185.', '94.183.', '95.38.'],
  'قم': ['2.145.', '5.45.', '37.27.', '46.209.', '78.38.', '79.175.', '85.185.', '94.183.', '95.38.'],
  'اهواز': ['2.146.', '5.55.', '37.27.', '46.209.', '78.38.', '79.175.', '85.185.', '94.183.', '95.38.'],
  'کرمانشاه': ['2.147.', '5.65.', '37.27.', '46.209.', '78.38.', '79.175.', '85.185.', '94.183.', '95.38.'],
  'ارومیه': ['2.148.', '5.75.', '37.27.', '46.209.', '78.38.', '79.175.', '85.185.', '94.183.', '95.38.'],
  'رشت': ['2.149.', '5.85.', '37.27.', '46.209.', '78.38.', '79.175.', '85.185.', '94.183.', '95.38.'],
  'یزد': ['2.150.', '5.95.', '37.27.', '46.209.', '78.38.', '79.175.', '85.185.', '94.183.', '95.38.'],
  'اردبیل': ['2.151.', '5.105.', '37.27.', '46.209.', '78.38.', '79.175.', '85.185.', '94.183.', '95.38.'],
  'بندرعباس': ['2.152.', '5.115.', '37.27.', '46.209.', '78.38.', '79.175.', '85.185.', '94.183.', '95.38.'],
  'همدان': ['2.153.', '5.125.', '37.27.', '46.209.', '78.38.', '79.175.', '85.185.', '94.183.', '95.38.'],
  'کاشان': ['2.154.', '5.135.', '37.27.', '46.209.', '78.38.', '79.175.', '85.185.', '94.183.', '95.38.'],
  'گرگان': ['2.155.', '5.145.', '37.27.', '46.209.', '78.38.', '79.175.', '85.185.', '94.183.', '95.38.'],
  'ساری': ['2.156.', '5.155.', '37.27.', '46.209.', '78.38.', '79.175.', '85.185.', '94.183.', '95.38.'],
  'بوشهر': ['2.157.', '5.165.', '37.27.', '46.209.', '78.38.', '79.175.', '85.185.', '94.183.', '95.38.'],
  'خرم‌آباد': ['2.158.', '5.175.', '37.27.', '46.209.', '78.38.', '79.175.', '85.185.', '94.183.', '95.38.'],
  'سنندج': ['2.159.', '5.185.', '37.27.', '46.209.', '78.38.', '79.175.', '85.185.', '94.183.', '95.38.'],
  'زاهدان': ['2.160.', '5.195.', '37.27.', '46.209.', '78.38.', '79.175.', '85.185.', '94.183.', '95.38.'],
  'کرمان': ['2.161.', '5.205.', '37.27.', '46.209.', '78.38.', '79.175.', '85.185.', '94.183.', '95.38.'],
  'شهرکرد': ['2.162.', '5.215.', '37.27.', '46.209.', '78.38.', '79.175.', '85.185.', '94.183.', '95.38.'],
  'ایلام': ['2.163.', '5.225.', '37.27.', '46.209.', '78.38.', '79.175.', '85.185.', '94.183.', '95.38.'],
  'بیرجند': ['2.164.', '5.235.', '37.27.', '46.209.', '78.38.', '79.175.', '85.185.', '94.183.', '95.38.'],
  'زنجان': ['2.165.', '5.245.', '37.27.', '46.209.', '78.38.', '79.175.', '85.185.', '94.183.', '95.38.'],
} as const;

// مختصات جغرافیایی شهرهای ایران
const IRAN_COORDINATES: Record<string, { lat: number; lon: number }> = {
  'تهران': { lat: 35.6892, lon: 51.3890 },
  'مشهد': { lat: 36.2605, lon: 59.6168 },
  'اصفهان': { lat: 32.6546, lon: 51.6680 },
  'شیراز': { lat: 29.5918, lon: 52.5837 },
  'تبریز': { lat: 38.0962, lon: 46.2738 },
  'کرج': { lat: 35.8327, lon: 50.9915 },
  'قم': { lat: 34.6416, lon: 50.8746 },
  'اهواز': { lat: 31.3183, lon: 48.6706 },
  'کرمانشاه': { lat: 34.3277, lon: 47.0778 },
  'ارومیه': { lat: 37.5527, lon: 45.0761 },
  'رشت': { lat: 37.2808, lon: 49.5832 },
  'یزد': { lat: 31.8974, lon: 54.3569 },
  'اردبیل': { lat: 38.2493, lon: 48.2960 },
  'بندرعباس': { lat: 27.1865, lon: 56.2808 },
  'همدان': { lat: 34.7989, lon: 48.5150 },
  'کاشان': { lat: 33.9850, lon: 51.4100 },
  'گرگان': { lat: 36.8456, lon: 54.4393 },
  'ساری': { lat: 36.5633, lon: 53.0601 },
  'بوشهر': { lat: 28.9234, lon: 50.8203 },
  'خرم‌آباد': { lat: 33.4878, lon: 48.3558 },
  'سنندج': { lat: 35.3219, lon: 46.9862 },
  'زاهدان': { lat: 29.4960, lon: 60.8629 },
  'کرمان': { lat: 30.2839, lon: 57.0834 },
  'شهرکرد': { lat: 32.3256, lon: 50.8646 },
  'ایلام': { lat: 33.2959, lon: 46.6707 },
  'بیرجند': { lat: 32.8649, lon: 59.2262 },
  'زنجان': { lat: 36.6769, lon: 48.4963 },
};

// توابع کمکی
const ipToBinary = (ip: string): string => {
  return ip.split('.')
    .map(octet => parseInt(octet).toString(2).padStart(8, '0'))
    .join('.');
};

const ipToHex = (ip: string): string => {
  return ip.split('.')
    .map(octet => parseInt(octet).toString(16).padStart(2, '0'))
    .join('.');
};

const ipToDecimal = (ip: string): string => {
  return ip.split('.')
    .reduce((acc, octet, index) => acc + (parseInt(octet) * Math.pow(256, 3 - index)), 0)
    .toString();
};

const getNetworkClass = (firstOctet: number): 'A' | 'B' | 'C' | 'D' | 'E' | 'Unknown' => {
  if (firstOctet >= 1 && firstOctet <= 126) return 'A';
  if (firstOctet >= 128 && firstOctet <= 191) return 'B';
  if (firstOctet >= 192 && firstOctet <= 223) return 'C';
  if (firstOctet >= 224 && firstOctet <= 239) return 'D';
  if (firstOctet >= 240 && firstOctet <= 255) return 'E';
  return 'Unknown';
};

const getSubnetMask = (networkClass: string): string => {
  switch (networkClass) {
    case 'A': return '255.0.0.0';
    case 'B': return '255.255.0.0';
    case 'C': return '255.255.255.0';
    default: return 'N/A';
  }
};

const getRIR = (ip: string): string | null => {
  const firstOctet = parseInt(ip.split('.')[0]);
  
  // RIR ranges
  if (firstOctet >= 1 && firstOctet <= 126) return 'ARIN (آمریکای شمالی)';
  if (firstOctet >= 128 && firstOctet <= 191) {
    // APNIC, RIPE, etc. - بررسی دقیق‌تر
    const secondOctet = parseInt(ip.split('.')[1]);
    if (firstOctet === 172 && secondOctet >= 16 && secondOctet <= 31) return 'IANA (خصوصی)';
    return 'RIPE NCC (اروپا)';
  }
  if (firstOctet >= 192 && firstOctet <= 223) return 'APNIC (آسیا-اقیانوسیه)';
  return null;
};

const getIranianISP = (ip: string): { isp: string; types: string[] } => {
  const ispTypes: string[] = [];
  let matchedISP = 'نامشخص';
  
  for (const [isp, prefixes] of Object.entries(IRANIAN_ISPS)) {
    for (const prefix of prefixes) {
      if (ip.startsWith(prefix)) {
        matchedISP = isp;
        if (isp.includes('MCI') || isp.includes('Irancell') || isp.includes('Rightel')) {
          ispTypes.push('اپراتور موبایل');
        }
        if (isp.includes('Pars Online') || isp.includes('HiWeb') || isp.includes('Afranet')) {
          ispTypes.push('ارائه‌دهنده اینترنت');
        }
        if (isp.includes('دیتاسنتر')) {
          ispTypes.push('دیتاسنتر');
        }
        if (isp.includes('Server') || isp.includes('Host')) {
          ispTypes.push('هاستینگ');
        }
        break;
      }
    }
  }
  
  // اگر ISP مشخص نشد، بر اساس محدوده IP حدس بزن
  if (matchedISP === 'نامشخص') {
    if (ip.startsWith('5.') || ip.startsWith('37.') || ip.startsWith('46.') || 
        ip.startsWith('78.') || ip.startsWith('79.') || ip.startsWith('85.') || 
        ip.startsWith('94.') || ip.startsWith('95.')) {
      matchedISP = 'ارائه‌دهنده اینترنت ایرانی';
      ispTypes.push('اینترنت ملی');
    }
  }
  
  return { isp: matchedISP, types: ispTypes };
};

const getIranianCity = (ip: string): { city: string; coordinates: { lat: number; lon: number } | null } => {
  for (const [city, prefixes] of Object.entries(IRANIAN_CITIES)) {
    for (const prefix of prefixes) {
      if (ip.startsWith(prefix)) {
        return { 
          city, 
          coordinates: IRAN_COORDINATES[city] || null 
        };
      }
    }
  }
  
  // اگر شهر مشخص نشد، بر اساس ISP حدس بزن
  const { isp } = getIranianISP(ip);
  if (isp !== 'نامشخص') {
    return { 
      city: 'تهران', // بیشتر دیتاسنترها در تهران هستند
      coordinates: IRAN_COORDINATES['تهران']
    };
  }
  
  return { city: 'نامشخص', coordinates: null };
};

const getSecurityAnalysis = (ipInfo: any): { level: 'very-high' | 'high' | 'medium' | 'low'; threats: string[] } => {
  const threats: string[] = [];
  let level: 'very-high' | 'high' | 'medium' | 'low' = 'low';
  
  if (ipInfo.isPrivate || ipInfo.isLocalhost) {
    level = 'very-high';
    threats.push('IP خصوصی - دسترسی محدود');
  } else if (ipInfo.isReserved) {
    level = 'high';
    threats.push('IP رزرو شده - ممکن است غیرمعمول باشد');
  } else if (ipInfo.type.includes('TEST')) {
    level = 'high';
    threats.push('IP تست شبکه - استفاده غیرمعمول');
  } else if (ipInfo.isIPv6Mapped) {
    level = 'medium';
    threats.push('IPv6-mapped - ممکن است نشانه‌ی NAT باشد');
  } else if (!ipInfo.isIranianIP) {
    level = 'medium';
    threats.push('IP غیرایرانی - دسترسی بین‌المللی');
  } else {
    level = 'low';
    threats.push('IP ایرانی - دسترسی عادی');
  }
  
  // بررسی تهدیدات اضافی
  if (ipInfo.isCGNAT) {
    threats.push('CGNAT - اشتراک IP با کاربران دیگر');
    level = level === 'low' ? 'medium' : level;
  }
  
  if (ipInfo.isMulticast) {
    threats.push('Multicast - برای پخش گروهی استفاده می‌شود');
    level = level === 'low' ? 'medium' : level;
  }
  
  if (ipInfo.isBroadcast) {
    threats.push('Broadcast - برای پخش عمومی استفاده می‌شود');
    level = 'high';
  }
  
  return { level, threats };
};

// تابع اصلی تحلیل IP
export const analyzeIP = (ip: string): IPAnalysisResult => {
  // حذف ::ffff: از ابتدای IP اگر وجود دارد
  let cleanIP = ip;
  let isIPv6Mapped = false;
  
  if (ip.startsWith('::ffff:')) {
    cleanIP = ip.substring(7);
    isIPv6Mapped = true;
  }
  
  // جداسازی اکتت‌ها
  const octets = cleanIP.split('.').map(oct => parseInt(oct));
  const firstOctet = octets[0];
  const secondOctet = octets[1];
  
  // تشخیص نسخه IP
  const version = cleanIP.includes(':') ? 'IPv6' : 'IPv4';
  
  // تشخیص کلاس شبکه
  const networkClass = getNetworkClass(firstOctet);
  
  // تشخیص ISP ایرانی
  const { isp: possibleISP, types: ispTypes } = getIranianISP(cleanIP);
  
  // تشخیص شهر ایرانی
  const { city: possibleCity, coordinates } = getIranianCity(cleanIP);
  
  // تشخیص IP ایرانی
  const isIranianIP = possibleISP !== 'نامشخص' || possibleCity !== 'نامشخص';
  
  // تشخیص انواع خاص IP
  const isPrivate = (
    (firstOctet === 10) ||
    (firstOctet === 172 && secondOctet >= 16 && secondOctet <= 31) ||
    (firstOctet === 192 && secondOctet === 168) ||
    (firstOctet === 169 && secondOctet === 254)
  );
  
  const isLocalhost = cleanIP === '127.0.0.1';
  const isLoopback = firstOctet === 127;
  
  const isReserved = (
    (firstOctet === 0) ||
    (firstOctet === 100 && secondOctet >= 64 && secondOctet <= 127) || // CGNAT
    (firstOctet === 192 && secondOctet === 0 && octets[2] === 0) || // IETF Protocol
    (firstOctet === 192 && secondOctet === 0 && octets[2] === 2) || // TEST-NET-1
    (firstOctet === 198 && secondOctet === 51 && octets[2] === 100) || // TEST-NET-2
    (firstOctet === 203 && secondOctet === 0 && octets[2] === 113) || // TEST-NET-3
    (firstOctet >= 224 && firstOctet <= 239) || // Multicast
    (firstOctet >= 240) || // Reserved
    (cleanIP === '255.255.255.255') // Broadcast
  );
  
  const isCGNAT = firstOctet === 100 && secondOctet >= 64 && secondOctet <= 127;
  const isCarrierGradeNAT = isCGNAT;
  const isMulticast = firstOctet >= 224 && firstOctet <= 239;
  const isBroadcast = cleanIP === '255.255.255.255';
  const isTeredo = isIPv6Mapped;
  const is6to4 = isIPv6Mapped;
  
  // تشخیص نوع IP
  let type = 'عمومی';
  if (isPrivate) {
    if (firstOctet === 10) type = 'کلاس A خصوصی';
    else if (firstOctet === 172) type = 'کلاس B خصوصی';
    else if (firstOctet === 192 && secondOctet === 168) type = 'کلاس C خصوصی';
    else if (firstOctet === 169 && secondOctet === 254) type = 'Link-local';
  } else if (isLocalhost || isLoopback) {
    type = 'Loopback';
  } else if (isReserved) {
    if (isCGNAT) type = 'CGNAT (Carrier-Grade NAT)';
    else if (isMulticast) type = 'Multicast';
    else if (isBroadcast) type = 'Broadcast';
    else if (firstOctet === 0) type = 'Current Network';
    else type = 'رزرو شده';
  }
  
  // تشخیص موقعیت احتمالی
  let possibleLocation = 'نامشخص';
  if (isIranianIP) {
    possibleLocation = `ایران${possibleCity !== 'نامشخص' ? `، ${possibleCity}` : ''}`;
  } else if (isPrivate) {
    possibleLocation = 'شبکه خصوصی داخلی';
  } else if (isLocalhost) {
    possibleLocation = 'localhost (دستگاه محلی)';
  }
  
  // تحلیل امنیتی
  const { level: securityLevel, threats: securityThreats } = getSecurityAnalysis({
    isPrivate, isLocalhost, isReserved, isIPv6Mapped, isIranianIP, isCGNAT, isMulticast, isBroadcast, type
  });
  
  // اطلاعات جغرافیایی
  const geolocation = {
    country: isIranianIP ? 'ایران' : 'نامشخص',
    region: isIranianIP ? 'خاورمیانه' : 'نامشخص',
    city: possibleCity,
    timezone: isIranianIP ? 'Asia/Tehran (IRST)' : 'نامشخص',
    coordinates
  };
  
  // اطلاعات فنی
  const technicalDetails = {
    octets,
    firstOctet,
    networkPortion: octets.slice(0, networkClass === 'A' ? 1 : networkClass === 'B' ? 2 : 3).join('.'),
    hostPortion: octets.slice(networkClass === 'A' ? 1 : networkClass === 'B' ? 2 : 3).join('.'),
    isRoutable: !isPrivate && !isReserved && !isLocalhost,
    isLinkLocal: firstOctet === 169 && secondOctet === 254,
    isDocumentation: (
      (firstOctet === 192 && secondOctet === 0 && octets[2] === 2) || // TEST-NET-1
      (firstOctet === 198 && secondOctet === 51 && octets[2] === 100) || // TEST-NET-2
      (firstOctet === 203 && secondOctet === 0 && octets[2] === 113) // TEST-NET-3
    )
  };
  
  return {
    originalIp: ip,
    ip: cleanIP,
    version,
    isIPv6Mapped,
    isPrivate,
    isLocalhost,
    isLoopback,
    isReserved,
    isCGNAT,
    isCarrierGradeNAT,
    isMulticast,
    isBroadcast,
    isTeredo,
    is6to4,
    type,
    possibleLocation,
    possibleISP,
    networkClass,
    subnetMask: getSubnetMask(networkClass),
    binaryRepresentation: ipToBinary(cleanIP),
    hexRepresentation: ipToHex(cleanIP),
    decimalRepresentation: ipToDecimal(cleanIP),
    rir: getRIR(cleanIP),
    asn: null, // نیاز به API خارجی دارد
    isIranianIP,
    ispTypes,
    securityLevel,
    securityThreats,
    geolocation,
    technicalDetails
  };
};

export default analyzeIP;