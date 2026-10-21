(() => {
  const STORE_KEY = 'almoghani-admin-state-v1';
  const PAGE_SIZE = 15;
  const DEFAULT_DESIGN = { brandName: 'ALMOGHANI', accent: '#71d8f5', violet: '#b79cff', background: '#090d13', panel: '#18212a', glow: 40, radius: 14, heroImage: '' };
  const SENSITIVE_KEYS = new Set(['token','access_token','auth','signature','sig','secret','api_key','key','wmsauthsign','userid','username','password','passwd','pass']);
  let defaults = [];
  let content = [];
  let design = { ...DEFAULT_DESIGN };
  let activeType = 'all';
  let page = 1;
  let toastTimer;
  const $ = (id) => document.getElementById(id);
  const typeNames = { live: 'قناة مباشرة', movie: 'فيلم', series: 'مسلسل', sports: 'رياضة' };

  function escapeHtml(value) { return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function toast(message) {
    const el = $('adminToast'); el.textContent = message; el.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2500);
  }
  function readStore() {
    try { const value = JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); return value && typeof value === 'object' ? value : {}; }
    catch { return {}; }
  }
  function safeUrl(value, { allowRelative = false } = {}) {
    const raw = String(value || '').trim();
    if (!raw) return '';
    if (allowRelative && /^(assets\/|\/assets\/)/.test(raw)) return raw;
    let url;
    try { url = new URL(raw); } catch { return null; }
    if (url.protocol !== 'https:' || url.username || url.password) return null;
    for (const key of url.searchParams.keys()) if (SENSITIVE_KEYS.has(key.toLowerCase())) return null;
    return url.href;
  }
  function youtubeEmbed(raw) {
    let url; try { url = new URL(raw); } catch { return null; }
    const host = url.hostname.toLowerCase();
    if (url.protocol === 'https:' && host === 'www.dailymotion.com' && /^\/embed\/video\/[A-Za-z0-9]+$/.test(url.pathname)) return url.href;
    let id = '';
    if (host === 'youtu.be') id = url.pathname.split('/').filter(Boolean)[0] || '';
    if (host === 'www.youtube.com' || host === 'youtube.com' || host === 'm.youtube.com') {
      if (url.pathname === '/watch') id = url.searchParams.get('v') || '';
      else if (/^\/(embed|shorts)\//.test(url.pathname)) id = url.pathname.split('/')[2] || '';
    }
    if (/^[A-Za-z0-9_-]{6,20}$/.test(id)) return `https://www.youtube-nocookie.com/embed/${id}`;
    if (host === 'www.youtube-nocookie.com' && /^\/embed\/[A-Za-z0-9_-]{6,20}$/.test(url.pathname)) return url.href;
    return null;
  }
  function mapPlaylistEntry(entry) {
    if (!entry || typeof entry.name !== 'string' || typeof entry.url !== 'string') return null;
    const url = safeUrl(entry.url); if (!url) return null;
    const item = { id: entry.id, title: entry.name, short: entry.name.slice(0,6), type: 'live', origin: 'foreign', country: 'other', genre: entry.group || 'العامة', groupKey: entry.groupKey || 'general', meta: 'قناة مباشرة', image: 'assets/live-stadium.png', badge: 'مباشر', description: `${entry.name} • ${entry.group || 'العامة'} — المصدر خارجي.`, source: url };
    if (entry.kind === 'youtube') { const embed = youtubeEmbed(entry.embed || ''); if (!embed) return null; item.embed = embed; }
    else if (entry.kind === 'hls') item.stream = url;
    else return null;
    return item;
  }
  function cleanItem(item) {
    if (!item || typeof item !== 'object' || !/^[a-zA-Z0-9_-]{1,90}$/.test(String(item.id || ''))) return null;
    if (!Object.hasOwn(typeNames, item.type) || !String(item.title || '').trim()) return null;
    const image = safeUrl(item.image, { allowRelative: true }); if (image === null) return null;
    const source = safeUrl(item.source || ''); if (source === null) return null;
    const stream = safeUrl(item.stream || ''); if (stream === null) return null;
    const embedUrl = item.embed ? safeUrl(item.embed) : '';
    if (item.embed && !embedUrl) return null;
    const embed = embedUrl ? youtubeEmbed(embedUrl) : '';
    if (item.embed && !embed) return null;
    return { ...item, id: String(item.id), title: String(item.title).trim().slice(0,80), genre: String(item.genre || 'عام').trim().slice(0,50), description: String(item.description || '').slice(0,240), image: image || 'assets/live-stadium.png', ...(source ? { source } : {}), ...(stream ? { stream } : {}), ...(embed ? { embed } : {}) };
  }
  async function loadDefaults() {
    const [baseResponse, channelResponse] = await Promise.all([
      fetch('assets/default-content.json'), fetch('assets/almoghani-public-channels.json')
    ]);
    if (!baseResponse.ok || !channelResponse.ok) throw new Error('تعذر تحميل كتالوج الموقع.');
    const base = await baseResponse.json(); const channels = await channelResponse.json();
    defaults = [...base, ...channels.map(mapPlaylistEntry).filter(Boolean)].map(cleanItem).filter(Boolean);
  }
  function applyTheme() {
    const root = document.documentElement;
    root.style.setProperty('--cyan', design.accent);
    root.style.setProperty('--violet', design.violet);
    root.style.setProperty('--bg', design.background);
    root.style.setProperty('--panel', design.panel);
    root.style.setProperty('--admin-glow-alpha', String(Math.max(0, Math.min(100, Number(design.glow) || 0)) / 100));
    root.style.setProperty('--admin-radius', `${Math.max(4, Math.min(28, Number(design.radius) || 14))}px`);
    $('previewBrand').textContent = design.brandName || 'ALMOGHANI';
    $('designPreview').style.borderRadius = `${design.radius}px`;
    $('designPreview').style.boxShadow = `0 0 ${Math.round(design.glow / 2)}px ${design.accent}${Math.round(design.glow * 2.55).toString(16).padStart(2,'0')}`;
    $('previewImage').style.backgroundImage = design.heroImage ? `linear-gradient(#07101a55,#07101a88),url("${design.heroImage.replace(/["\\]/g,'')}")` : '';
    $('previewImage').style.backgroundSize = 'cover'; $('previewImage').style.backgroundPosition = 'center';
    $('brandName').value = design.brandName;
    $('heroImageUrl').value = design.heroImage;
    $('accentColor').value = design.accent; $('violetColor').value = design.violet;
    $('backgroundColor').value = design.background; $('panelColor').value = design.panel;
    $('glowStrength').value = design.glow; $('tileRadius').value = design.radius;
    $('glowValue').value = `${design.glow}%`; $('radiusValue').value = `${design.radius}px`;
  }
  function saveStore(message = 'تم الحفظ في هذا المتصفح') {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ version: 1, content, design }));
      $('saveStatus').textContent = `آخر حفظ: ${new Intl.DateTimeFormat('ar-SA',{hour:'2-digit',minute:'2-digit'}).format(new Date())}`;
      updateStats(); renderTable(); if (message) toast(message); return true;
    } catch { toast('تعذر الحفظ؛ مساحة تخزين المتصفح ممتلئة.'); return false; }
  }
  function updateStats() {
    const channels = content.filter(x => x.type === 'live').length;
    const movies = content.filter(x => x.type === 'movie').length;
    const series = content.filter(x => x.type === 'series').length;
    const total = content.length;
    $('statChannels').textContent = channels; $('statMovies').textContent = movies; $('statSeries').textContent = series; $('statTotal').textContent = total;
    $('breakdownChannels').textContent = channels; $('breakdownMovies').textContent = movies; $('breakdownSeries').textContent = series;
    const max = Math.max(1, channels, movies, series);
    $('barChannels').style.width = `${Math.max(7, channels / max * 100)}%`;
    $('barMovies').style.width = `${Math.max(7, movies / max * 100)}%`;
    $('barSeries').style.width = `${Math.max(7, series / max * 100)}%`;
  }
  function currentRows() {
    const query = $('contentSearch').value.trim().toLocaleLowerCase('ar');
    return content.filter(item => (activeType === 'all' || item.type === activeType) && (!query || `${item.title} ${item.genre} ${item.description}`.toLocaleLowerCase('ar').includes(query)));
  }
  function renderTable() {
    const rows = currentRows(); const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE)); page = Math.min(page, pages);
    const shown = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    $('contentRows').innerHTML = shown.map(item => {
      const thumb = item.image ? `<img src="${escapeHtml(item.image)}" alt="" loading="lazy" onerror="this.remove()">` : escapeHtml((item.short || item.title).slice(0,2));
      const source = item.embed ? 'YouTube' : item.stream ? 'HLS' : item.source ? 'خارجي' : 'معاينة';
      return `<tr><td><div class="table-title"><span class="item-thumb">${thumb}</span><span><b>${escapeHtml(item.title)}</b><small>${escapeHtml(item.id)}</small></span></div></td><td><span class="type-badge ${item.type === 'live' ? 'live' : ''}">${typeNames[item.type]}</span></td><td>${escapeHtml(item.genre || 'عام')}</td><td>${source}</td><td><div class="row-actions"><button class="row-action" data-edit="${escapeHtml(item.id)}" aria-label="تعديل ${escapeHtml(item.title)}" title="تعديل">✎</button><button class="row-action delete" data-delete="${escapeHtml(item.id)}" aria-label="حذف ${escapeHtml(item.title)}" title="حذف">⌫</button></div></td></tr>`;
    }).join('');
    $('tableCount').textContent = `عرض ${shown.length} من ${rows.length} عنصر`;
    $('emptyContent').hidden = rows.length > 0; $('contentRows').closest('.table-card').hidden = rows.length === 0;
    $('tablePagination').innerHTML = pages > 1 ? Array.from({length: pages}, (_,i) => `<button class="table-page ${page === i + 1 ? 'active' : ''}" data-page="${i+1}" aria-label="الصفحة ${i+1}">${i+1}</button>`).join('') : '';
  }
  function switchScreen(name) {
    document.querySelectorAll('.screen').forEach(section => { section.hidden = section.id !== `screen-${name}`; section.classList.toggle('active', !section.hidden); });
    document.querySelectorAll('.nav-item').forEach(button => button.classList.toggle('active', button.dataset.screen === name));
    $('screenTitle').textContent = ({ overview: 'نظرة عامة', content: 'القنوات والأفلام', design: 'تخصيص التصميم' })[name] || 'لوحة الإدارة';
  }
  function setPlaybackUi() { $('streamUrl').disabled = $('playbackType').value === 'none'; $('streamUrl').placeholder = $('playbackType').value === 'youtube' ? 'https://youtube.com/watch?v=…' : 'https://…'; }
  function openEditor(item = null) {
    $('contentForm').reset(); $('contentId').value = item?.id || '';
    $('dialogTitle').textContent = item ? 'تعديل المحتوى' : 'إضافة محتوى';
    $('contentTitle').value = item?.title || ''; $('contentType').value = item?.type || 'live'; $('contentGenre').value = item?.genre || '';
    $('contentImage').value = item?.image || (item?.type === 'movie' ? 'assets/poster-city-thriller.png' : 'assets/live-stadium.png');
    $('contentDescription').value = item?.description || '';
    $('playbackType').value = item?.embed ? 'youtube' : item?.stream ? 'hls' : 'none';
    $('streamUrl').value = item?.source || item?.stream || item?.embed || '';
    setPlaybackUi(); $('contentDialog').showModal(); $('contentTitle').focus();
  }
  function makeYoutubeUrl(raw) { return youtubeEmbed(raw); }
  function saveContent(event) {
    event.preventDefault();
    const id = $('contentId').value || `custom-${crypto.randomUUID().slice(0,12)}`;
    const title = $('contentTitle').value.trim(); const type = $('contentType').value; const genre = $('contentGenre').value.trim();
    const image = safeUrl($('contentImage').value || (type === 'movie' ? 'assets/poster-city-thriller.png' : 'assets/live-stadium.png'), { allowRelative: true });
    const mode = $('playbackType').value; const rawUrl = $('streamUrl').value.trim();
    if (!title || !genre) return toast('أدخل الاسم والتصنيف أولاً.');
    if (image === null) return toast('رابط الصورة غير صالح؛ استخدم HTTPS أو مسار assets.');
    let stream = ''; let embed = ''; let source = '';
    if (mode !== 'none') {
      const parsed = safeUrl(rawUrl); if (!parsed) return toast('الرابط غير صالح أو يحتوي بيانات وصول؛ استخدم رابط HTTPS عاماً بلا token.');
      source = parsed;
      if (mode === 'youtube') { embed = makeYoutubeUrl(parsed); if (!embed) return toast('أدخل رابط YouTube صالحاً.'); }
      else stream = parsed;
    }
    const old = content.find(x => x.id === id) || {};
    const base = { ...old }; delete base.stream; delete base.embed; delete base.source;
    const item = cleanItem({ ...base, id, title, short: title.slice(0,6), type, origin: type === 'live' ? 'foreign' : (old.origin || 'arabic'), country: type === 'live' ? (old.country || 'other') : undefined, groupKey: type === 'live' ? (genre.toLocaleLowerCase('en').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') || 'general') : undefined, genre, meta: type === 'live' ? 'قناة مباشرة' : type === 'movie' ? 'فيلم' : type === 'series' ? 'موسم واحد' : 'رياضة', image, badge: type === 'live' ? 'مباشر' : typeNames[type], description: $('contentDescription').value.trim(), ...(source ? {source} : {}), ...(stream ? {stream} : {}), ...(embed ? {embed} : {}) });
    if (!item) return toast('تعذر التحقق من بيانات العنصر.');
    const index = content.findIndex(x => x.id === id); if (index >= 0) content[index] = item; else content.unshift(item);
    page = 1; saveStore(item.id === id && old.id ? 'تم تعديل المحتوى وحفظه محلياً' : 'تمت إضافة المحتوى وحفظه محلياً'); $('contentDialog').close();
  }
  function removeItem(id) {
    const item = content.find(x => x.id === id); if (!item) return;
    if (!window.confirm(`هل تريد حذف «${item.title}» من هذه المكتبة؟`)) return;
    content = content.filter(x => x.id !== id); saveStore('تم حذف العنصر من هذا المتصفح');
  }
  function collectDesign() {
    const heroImage = safeUrl($('heroImageUrl').value, { allowRelative: true });
    if (heroImage === null) { toast('رابط صورة العرض غير صالح.'); return null; }
    return { brandName: $('brandName').value.trim().slice(0,32) || 'ALMOGHANI', heroImage, accent: $('accentColor').value, violet: $('violetColor').value, background: $('backgroundColor').value, panel: $('panelColor').value, glow: Number($('glowStrength').value), radius: Number($('tileRadius').value) };
  }
  function exportData() {
    const blob = new Blob([JSON.stringify({version:1, content, design},null,2)], {type:'application/json'});
    const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'almoghani-content-backup.json'; link.click(); URL.revokeObjectURL(url); toast('تم تنزيل نسخة JSON احتياطية.');
  }
  async function importData(file) {
    if (!file) return;
    if (file.size > 3_000_000) { toast('حجم الملف أكبر من الحد المسموح (3MB).'); return; }
    try {
      const parsed = JSON.parse(await file.text());
      if (!Array.isArray(parsed.content) || parsed.content.length > 3000) throw new Error('صيغة المكتبة غير صحيحة.');
      const cleaned = parsed.content.map(cleanItem);
      if (cleaned.some(x => !x)) throw new Error('تحتوي النسخة على روابط غير آمنة أو بيانات ناقصة.');
      content = cleaned; design = { ...DEFAULT_DESIGN, ...(parsed.design || {}) };
      const validDesign = ['accent','violet','background','panel'].every(k => /^#[0-9a-f]{6}$/i.test(design[k]));
      if (!validDesign) throw new Error('ألوان التصميم غير صالحة.');
      const hero = safeUrl(design.heroImage, {allowRelative:true}); if (hero === null) throw new Error('رابط صورة العرض غير صالح.'); design.heroImage = hero;
      applyTheme(); saveStore('تم استيراد النسخة وحفظها محلياً');
    } catch (error) { toast(error.message || 'تعذر استيراد ملف JSON.'); }
    $('importFile').value = '';
  }
  async function init() {
    await loadDefaults();
    const saved = readStore();
    content = Array.isArray(saved.content) ? saved.content.map(cleanItem).filter(Boolean) : defaults;
    design = { ...DEFAULT_DESIGN, ...(saved.design || {}) };
    applyTheme(); updateStats(); renderTable();
    if (saved.content) $('saveStatus').textContent = 'تغييرات محفوظة على هذا المتصفح';
  }

  document.querySelectorAll('.nav-item').forEach(button => button.addEventListener('click', () => switchScreen(button.dataset.screen)));
  document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => switchScreen(button.dataset.go)));
  $('quickAdd').addEventListener('click', () => { switchScreen('content'); openEditor(); });
  $('addContent').addEventListener('click', () => openEditor());
  $('closeContentDialog').addEventListener('click', () => $('contentDialog').close());
  $('cancelContent').addEventListener('click', () => $('contentDialog').close());
  $('contentForm').addEventListener('submit', saveContent);
  $('playbackType').addEventListener('change', setPlaybackUi);
  $('contentRows').addEventListener('click', event => {
    const edit = event.target.closest('[data-edit]'); if (edit) { openEditor(content.find(x => x.id === edit.dataset.edit)); return; }
    const del = event.target.closest('[data-delete]'); if (del) removeItem(del.dataset.delete);
  });
  $('contentSearch').addEventListener('input', () => { page = 1; renderTable(); });
  $('typeFilter').addEventListener('change', event => { activeType = event.target.value; page = 1; renderTable(); });
  $('tablePagination').addEventListener('click', event => { const button = event.target.closest('[data-page]'); if (button) { page = Number(button.dataset.page); renderTable(); } });
  $('designForm').addEventListener('input', () => { const next = collectDesign(); if (next) { design = next; applyTheme(); } });
  $('designForm').addEventListener('submit', event => { event.preventDefault(); const next = collectDesign(); if (!next) return; design = next; applyTheme(); saveStore('تم حفظ تخصيص التصميم على هذا المتصفح'); });
  $('glowStrength').addEventListener('input', () => $('glowValue').value = `${$('glowStrength').value}%`);
  $('tileRadius').addEventListener('input', () => $('radiusValue').value = `${$('tileRadius').value}px`);
  $('resetDesign').addEventListener('click', () => { design = { ...DEFAULT_DESIGN }; applyTheme(); saveStore('أعيدت إعدادات التصميم الافتراضية'); });
  $('exportData').addEventListener('click', exportData);
  $('importFile').addEventListener('change', event => importData(event.target.files[0]));
  $('restoreContent').addEventListener('click', () => {
    if (!window.confirm('ستُحذف تعديلات المكتبة المحلية ويُستعاد المحتوى الافتراضي. هل تتابع؟')) return;
    content = defaults.map(item => ({ ...item })); page = 1; saveStore('تمت استعادة المكتبة الافتراضية');
  });

  init().catch(error => { console.error(error); toast('تعذر تحميل بيانات الموقع. حدّث الصفحة وحاول مجدداً.'); });
})();
