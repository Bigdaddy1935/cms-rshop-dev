// src/utils/compressImageFile.ts
"use client";

const MAX_TARGET_SIZE_KB = 350;
const MAX_TARGET_SIZE_BYTES = MAX_TARGET_SIZE_KB * 1024;

export async function compressImageFile(file: File): Promise<File> {
  // اگر فایل از قبل WebP و کوچک‌تر از حد مجاز است، برگردان
  if (file.type === "image/webp" && file.size <= MAX_TARGET_SIZE_BYTES) {
    return file;
  }

  // تبدیل به WebP با کیفیت متعادل و سریع
  return await fastCompressToWebP(file);
}

async function fastCompressToWebP(file: File): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url); // پاکسازی حافظه
      
      let { width, height } = img;
      const maxSize = 1200; // حداکثر ابعاد (مناسب برای لوگو)
      
      // اگر ابعاد بزرگتر از حد بود، نسبت را حفظ کن
      if (width > maxSize || height > maxSize) {
        const ratio = Math.min(maxSize / width, maxSize / height);
        width = width * ratio;
        height = height * ratio;
      }
      
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        resolve(file);
        return;
      }
      
      ctx.drawImage(img, 0, 0, width, height);
      
      // تنظیم کیفیت: شروع با 0.85
      let quality = 0.85;
      
      const tryCompress = (currentQuality: number) => {
        canvas.toBlob(
          async (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }
            
            if (blob.size <= MAX_TARGET_SIZE_BYTES || currentQuality <= 0.3) {
              // حجم قابل قبول یا کیفیت خیلی کم شده
              const webpFile = new File(
                [blob],
                file.name.replace(/\.(jpe?g|png|webp)$/i, '.webp'),
                { type: 'image/webp', lastModified: Date.now() }
              );
              resolve(webpFile);
            } else {
              // کیفیت را کاهش بده و دوباره امتحان کن (حداکثر ۳ بار)
              const newQuality = Math.max(currentQuality - 0.1, 0.3);
              tryCompress(newQuality);
            }
          },
          'image/webp',
          currentQuality
        );
      };
      
      tryCompress(quality);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file);
    };
    
    img.src = url;
  });
}