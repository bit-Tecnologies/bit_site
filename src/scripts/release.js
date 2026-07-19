const REPO = 'bit-Tecnologies/bit_hub';
const TIMEOUT = 10000;

function getLang() {
  const path = window.location.pathname;
  return path.startsWith('/en/') || path === '/en' ? 'en' : 'ru';
}

async function fetchRelease() {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), TIMEOUT);
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases`, {
      headers: { Accept: 'application/vnd.github.v3+json', 'User-Agent': 'bit-tecnologies-website/1.0' },
      signal: controller.signal,
    });
    clearTimeout(id);
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data)) return null;

    const lang = getLang();
    const sizeUnit = lang === 'en' ? 'MB' : 'МБ';

    for (const release of data) {
      const asset = release.assets?.find((a) => a?.name?.match?.(/^bithub-\d+-v\d+\.\d+\.\d+\.\d+-release\.apk$/));
      if (asset) {
        return {
          version: release.tag_name || release.name || null,
          url: asset.browser_download_url || null,
          size: asset.size ? (asset.size / (1024 * 1024)).toFixed(1) + ' ' + sizeUnit : null,
        };
      }
    }
  } catch {
    // Silently fail — build-time values remain
  }
  return null;
}

function updateDOM(release) {
  if (!release) return;
  if (release.version) {
    document.querySelectorAll('[data-release="version"]').forEach((el) => {
      el.textContent = release.version;
    });
  }
  if (release.size) {
    document.querySelectorAll('[data-release="size"]').forEach((el) => {
      el.textContent = release.size;
    });
  }
  if (release.url) {
    document.querySelectorAll('[data-release="url"]').forEach((el) => {
      el.href = release.url;
    });
  }
}

async function init() {
  const release = await fetchRelease();
  updateDOM(release);
}

init();
document.addEventListener('astro:after-swap', init);
