import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const queryLang = url.searchParams.get('lang');
  if (queryLang && queryLang in ui) return queryLang as keyof typeof ui;

  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function translatePath(url: URL) {
  const lang = getLangFromUrl(url);

  return function translatePath(path: string, targetLang?: string) {
    const l = targetLang || lang;
    const [pathAndQuery, hash = ''] = path.split('#');
    const [pathname, query = ''] = pathAndQuery.split('?');
    const params = new URLSearchParams(query);
    params.delete('lang');
    const queryString = params.toString();
    const cleanPath = pathname.replace(/^\/(ru|en)(?=\/|$)/, '') || '/';
    const localizedPath = l === defaultLang ? cleanPath : `/${l}${cleanPath === '/' ? '/' : cleanPath}`;
    return `${localizedPath}${queryString ? `?${queryString}` : ''}${hash ? `#${hash}` : ''}`;
  }
}
