export const OriginalFetch = window.fetch;
export const OriginalConsole = { ...console };
export const OriginalXHR = window.XMLHttpRequest;

export function getUnique() {
  let key = window.localStorage.getItem("zoomphant-utils-unique");
  if (!key) {
    key = Array.from({ length: 4 })
      .map(() => Math.ceil(Math.random() * 1e4))
      .join("-");
    window.localStorage.setItem("zoomphant-utils-unique", key);
  }

  return key;
}

export function hashCode(str: string) {
  let hash = 0;
  if (str.length == 0) return String(hash);
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return String(hash);
}

export function pick(obj: Record<string, any>, keys: string[]) {
  return keys.reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {} as Record<string, any>);
}

export function omit(obj: Record<string, any>, keys: string[]) {
  return Object.keys(obj)
    .filter((key) => !keys.includes(key))
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {} as Record<string, any>);
}

export function detectOS() {
  const { userAgent } = window.navigator;
  let os = "Unknown";

  if (/Windows/.test(userAgent)) {
    os = "Windows";
  } else if (/Mac OS|Macintosh/.test(userAgent)) {
    os = "macOS";
  } else if (/Linux/.test(userAgent)) {
    os = "Linux";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (/iOS|iPad|iPhone|iPod/.test(userAgent)) {
    os = "iOS";
  }

  return os;
}

export function getBrowserInfo() {
  const { userAgent } = window.navigator;
  let browserName = "Unknown";
  let browserVersion = "Unknown";

  // 使用正则表达式匹配常见的浏览器标识符
  if (/Firefox\/([\d.]+)/.test(userAgent)) {
    browserName = "Firefox";
    browserVersion = RegExp.$1;
  } else if (/Chrome\/([\d.]+)/.test(userAgent)) {
    browserName = "Chrome";
    browserVersion = RegExp.$1;
  } else if (/Safari\/([\d.]+)/.test(userAgent)) {
    browserName = "Safari";
    browserVersion = RegExp.$1;
  } else if (/MSIE (\d+\.\d+);/.test(userAgent)) {
    browserName = "Internet Explorer";
    browserVersion = RegExp.$1;
  } else if (/Edge\/([\d.]+)/.test(userAgent)) {
    browserName = "Edge";
    browserVersion = RegExp.$1;
  } else if (/Opera\/([\d.]+)/.test(userAgent)) {
    browserName = "Opera";
    browserVersion = RegExp.$1;
  }

  return {
    name: browserName,
    version: browserVersion,
  };
}

export const JSONStringify = (obj: Record<string, any>) => {
  try {
    return JSON.stringify(obj);
  } catch (e) {
    return String(obj);
  }
};

export function safeJoin(arr: any[], splitWord = "") {
  if (!Array.isArray(arr)) {
    arr = [arr];
  }

  return arr
    .map((o) => (typeof o === "object" ? JSONStringify(o) : o))
    .join(splitWord);
}
