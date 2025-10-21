/**
 * 从HTML字符串中提取资源链接
 */

export interface ExtractedResources {
  stylesheets: string[];
  scripts: string[];
}

/**
 * 从HTML字符串中提取样式表和脚本资源
 * @param htmlString HTML字符串
 * @returns 包含样式表和脚本路径的对象
 */
export function extractResources(htmlString: string): ExtractedResources {
  const stylesheets: string[] = [];
  const scripts: string[] = [];

  // 创建临时DOM元素来解析HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  // 提取样式表链接 (rel="stylesheet" 的 link 标签)
  const linkElements = doc.querySelectorAll('link[rel="stylesheet"]');
  linkElements.forEach((link) => {
    const href = link.getAttribute('href');
    if (href) {
      stylesheets.push(href);
    }
  });

  // 提取脚本链接 (有 src 属性的 script 标签)
  const scriptElements = doc.querySelectorAll('script[src]');
  scriptElements.forEach((script) => {
    const src = script.getAttribute('src');
    if (src) {
      scripts.push(src);
    }
  });

  return {
    stylesheets,
    scripts
  };
}

/**
 * 从HTML字符串中提取样式表链接
 * @param htmlString HTML字符串
 * @returns 样式表路径数组
 */
export function extractStylesheets(htmlString: string): string[] {
  return extractResources(htmlString).stylesheets;
}

/**
 * 从HTML字符串中提取脚本链接
 * @param htmlString HTML字符串
 * @returns 脚本路径数组
 */
export function extractScripts(htmlString: string): string[] {
  return extractResources(htmlString).scripts;
}

/**
 * 加载并注入样式表到当前页面
 * @param href 样式表路径
 * @param baseUrl 基础URL，用于解析相对路径
 */
export function loadStylesheet(href: string, baseUrl?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // 如果已经是绝对URL，直接使用
    const absoluteUrl = href.startsWith('http')
      ? href
      : `${baseUrl || ''}${href}`;

    // 检查是否已经加载过
    const existingLink = document.querySelector(`link[href="${absoluteUrl}"]`);
    if (existingLink) {
      resolve();
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = absoluteUrl;
    link.onload = () => resolve();
    link.onerror = () =>
      reject(new Error(`Failed to load stylesheet: ${absoluteUrl}`));

    document.head.appendChild(link);
  });
}

/**
 * 加载并执行脚本
 * @param src 脚本路径
 * @param baseUrl 基础URL，用于解析相对路径
 */
export function loadScript(src: string, baseUrl?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // 如果已经是绝对URL，直接使用
    const absoluteUrl = src.startsWith('http') ? src : `${baseUrl || ''}${src}`;

    // 检查是否已经加载过
    const existingScript = document.querySelector(
      `script[src="${absoluteUrl}"]`
    );
    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = absoluteUrl;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error(`Failed to load script: ${absoluteUrl}`));

    document.head.appendChild(script);
  });
}

/**
 * 批量加载样式表和脚本
 * @param resources 资源对象
 * @param baseUrl 基础URL
 */
export async function loadResources(
  resources: ExtractedResources,
  baseUrl?: string
): Promise<void> {
  const promises: Promise<void>[] = [];

  // 加载所有样式表
  resources.stylesheets.forEach((href) => {
    promises.push(loadStylesheet(href, baseUrl));
  });

  // 加载所有脚本
  resources.scripts.forEach((src) => {
    promises.push(loadScript(src, baseUrl));
  });

  await Promise.all(promises);
}
