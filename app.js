(() => {
  const items = [
    { id:'layl-albadia', title:'ليل البادية', type:'series', origin:'arabic', genre:'دراما تاريخية', meta:'موسم واحد', image:'assets/hero-desert-series.png', badge:'اختيار اليوم', description:'حكاية عن الشجاعة والوفاء، في رحلة عبر الرمال وأسرار الماضي.' },
    { id:'bayt-alaaila', title:'بيت العائلة', type:'series', origin:'arabic', genre:'دراما اجتماعية', meta:'موسم واحد', image:'assets/poster-family-drama.png', badge:'مسلسل', description:'تفاصيل يومية تجمع عائلة كبيرة حول حكاياتها وذكرياتها.' },
    { id:'khalf-alofok', title:'خلف الأفق', type:'movie', origin:'foreign', genre:'خيال علمي', meta:'فيلم', image:'assets/poster-space-odyssey.png', badge:'فيلم', description:'رحلة خيالية إلى عوالم بعيدة، ضمن عنوان تجريبي للواجهة.' },
    { id:'zill-almadina', title:'ظل المدينة', type:'movie', origin:'arabic', genre:'أكشن', meta:'فيلم', image:'assets/poster-city-thriller.png', badge:'فيلم', description:'قصة خيالية تدور بين أضواء المدينة وأسرارها.' },
    { id:'layali-alasima', title:'ليالي العاصمة', type:'movie', origin:'foreign', genre:'دراما', meta:'فيلم', image:'assets/night-city-unsplash.jpg', badge:'فيلم', description:'مشهد مدينة ليلي ضمن مكتبة العناوين التوضيحية.' },
    { id:'hikayat-zaman', title:'حكاية زمن', type:'series', origin:'turkish', genre:'دراما', meta:'موسم واحد', image:'assets/poster-family-drama.png', badge:'مسلسل', description:'عنوان خيالي إضافي لتجربة التصفح والتصفية.' },
    { id:'rihlat-alrimal', title:'رحلة الرمال', type:'movie', origin:'arabic', genre:'مغامرة', meta:'فيلم', image:'assets/hero-desert-series.png', badge:'فيلم', description:'مغامرة سينمائية خيالية في أفق الصحراء.' },
    { id:'laylat-almalab', title:'ليلة الملعب', type:'sports', origin:'sports', genre:'رياضة', meta:'رياضة', image:'assets/live-stadium.png', badge:'رياضة', description:'بطاقة رياضية توضيحية بمحتوى غير مرتبط بمباراة فعلية.' },

    // روابط المصادر مأخوذة من قائمة Venezuela في Free-TV/IPTV المرفقة.
    // أُدرجت القنوات الموسومة [>] فقط؛ القنوات الموسومة [x] مستبعدة.
    { id:'venevision', title:'Venevisión', short:'VV', type:'live', origin:'foreign', country:'venezuela', genre:'فنزويلا', meta:'قناة مباشرة', image:'assets/live-stadium.png', badge:'مباشر', description:'قناة تلفزيونية فنزويلية. مصدر البث خارجي.', stream:'https://venevision.akamaized.net/hls/live/2098814/VENEVISION/master.m3u8' },
    { id:'vtv', title:'Venezolana de Televisión', short:'VTV', type:'live', origin:'foreign', country:'venezuela', genre:'فنزويلا', meta:'قناة مباشرة', image:'assets/live-stadium.png', badge:'مباشر', description:'قناة تلفزيونية فنزويلية. يفتح البث من مشغل Dailymotion الخارجي.', embed:'https://www.dailymotion.com/embed/video/x828i6j' },
    { id:'televen', title:'Televen', short:'TVN', type:'live', origin:'foreign', country:'venezuela', genre:'فنزويلا', meta:'قناة مباشرة', image:'assets/live-stadium.png', badge:'مباشر', description:'قناة تلفزيونية فنزويلية. مصدر البث خارجي.', stream:'https://setp-televen-ssai-mslv4-open.akamaized.net/hls/live/2107128/televen/index.m3u8' },
    { id:'globovision', title:'Globovisión', short:'GV', type:'live', origin:'foreign', country:'venezuela', genre:'فنزويلا', meta:'قناة مباشرة', image:'assets/live-stadium.png', badge:'مباشر', description:'قناة تلفزيونية فنزويلية. مصدر البث خارجي.', stream:'https://vcp5.myplaytv.com/globovision/globovision/playlist.m3u8' },
    { id:'vale-tv', title:'Vale TV', short:'VALE', type:'live', origin:'foreign', country:'venezuela', genre:'فنزويلا', meta:'قناة مباشرة', image:'assets/live-stadium.png', badge:'مباشر', description:'قناة تلفزيونية فنزويلية. مصدر البث خارجي.', stream:'https://vcp2.myplaytv.com/valetv/valetv/playlist.m3u8' },
    { id:'telesur', title:'Telesur', short:'TS', type:'live', origin:'foreign', country:'venezuela', genre:'فنزويلا', meta:'قناة مباشرة', image:'assets/live-stadium.png', badge:'مباشر', description:'قناة إخبارية دولية باللغة الإسبانية. مصدر البث خارجي.', stream:'https://raw.githubusercontent.com/BellezaEmporium/IPTV_Exception/master/channels/ve/telesur.m3u8' },
    { id:'latina-tv', title:'Latina TV', short:'LATINA', type:'live', origin:'foreign', country:'venezuela', genre:'فنزويلا', meta:'قناة مباشرة', image:'assets/live-stadium.png', badge:'مباشر', description:'قناة تلفزيونية فنزويلية. مصدر البث خارجي.', stream:'https://streamtv.latinamedios.com:3413/live/latinatvlive.m3u8' },
    { id:'inter-tv', title:'inter TV', short:'inter', type:'live', origin:'foreign', country:'venezuela', genre:'فنزويلا', meta:'قناة مباشرة', image:'assets/live-stadium.png', badge:'مباشر', description:'قناة تلفزيونية فنزويلية. مصدر البث خارجي.', stream:'https://streamtv.intervenhosting.net:3439/hybrid/play.m3u8' },
    { id:'aguacate-tv', title:'Aguacate TV', short:'AGUA', type:'live', origin:'foreign', country:'venezuela', genre:'فنزويلا', meta:'قناة مباشرة', image:'assets/live-stadium.png', badge:'مباشر', description:'قناة تلفزيونية فنزويلية. مصدر البث خارجي.', stream:'https://streamtv.intervenhosting.net:3040/hybrid/play.m3u8' },
    { id:'as3-sport-tv', title:'AS3 Sport TV', short:'AS3', type:'live', origin:'foreign', country:'venezuela', genre:'فنزويلا • رياضة', meta:'قناة مباشرة', image:'assets/live-stadium.png', badge:'مباشر', description:'قناة رياضية فنزويلية. مصدر البث خارجي.', stream:'https://streamtv.as3sport.online:3394/hybrid/play.m3u8' }
  ];

  const viewInfo = {
    home: { title:'عالم المشاهدة', heading:'أحدث الإضافات', hero:'layl-albadia' },
    movies: { title:'الأفلام', heading:'اكتشف الأفلام', hero:'zill-almadina' },
    series: { title:'المسلسلات', heading:'أحدث المسلسلات', hero:'layl-albadia' },
    live: { title:'البث المباشر', heading:'القنوات المباشرة', hero:'venevision' },
    sports: { title:'الرياضة', heading:'محتوى رياضي', hero:'laylat-almalab' }
  };
  const standardFilters = [{id:'all',label:'الكل'},{id:'arabic',label:'عربي'},{id:'foreign',label:'أجنبي'},{id:'turkish',label:'تركي'},{id:'sports',label:'رياضة'}];
  const liveFilters = [{id:'all',label:'كل القنوات'},{id:'venezuela',label:'فنزويلا'},{id:'saudi',label:'السعودية'},{id:'gulf',label:'دول الخليج'},{id:'news',label:'إخبارية'},{id:'general',label:'عامة'},{id:'mbc',label:'مجموعة MBC'}];
  const state = { view:'home', origin:'all', query:'', page:1, favoritesOnly:false, favorites:new Set(readFavorites()) };
  const $ = (selector, root=document) => root.querySelector(selector);
  const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
  const grid = $('#mediaGrid');
  const searchInput = $('#searchInput');
  const emptyState = $('#emptyState');
  const pagination = $('#pagination');
  let toastTimer;
  let hlsPlayer = null;

  function readFavorites(){ try { return JSON.parse(localStorage.getItem('almoghani-favorites') || '[]'); } catch { return []; } }
  function saveFavorites(){ try { localStorage.setItem('almoghani-favorites', JSON.stringify([...state.favorites])); } catch {} }
  function currentHero(){ return items.find(item => item.id === viewInfo[state.view].hero) || items[0]; }
  function typeLabel(item){ if(item.type === 'series') return 'مسلسل'; if(item.type === 'movie') return 'فيلم'; if(item.type === 'live') return 'قناة'; return 'رياضة'; }
  function escapeHtml(value){ return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char])); }

  function setHero(item){
    $('#heroImage').src = item.image;
    $('#heroImage').alt = item.type === 'live' ? `قناة ${item.title}` : `مشهد توضيحي من ${item.title}`;
    $('#heroTitle').textContent = item.title;
    $('#heroDescription').textContent = item.description;
    $('#heroMeta').textContent = item.type === 'live' ? `${item.country === 'venezuela' ? 'فنزويلا' : item.genre} • مصدر خارجي` : item.meta;
    $('#heroMetaQualifier').textContent = item.type === 'live' ? 'بث خارجي' : 'محتوى توضيحي';
    const labels = { series:'مسلسل عربي • تجربة ترفيهية', movie:'فيلم • مكتبة تجريبية', live:'قناة مباشرة • فنزويلا', sports:'رياضة • محتوى توضيحي' };
    $('#heroKicker').innerHTML = `<span class="kicker-mark" aria-hidden="true">✦</span> ${labels[item.type] || labels.movie}`;
    $('#heroFormatLabel').textContent = item.type === 'live' ? 'مصدر خارجي' : 'واجهة تجريبية';
    $('#heroFavorite').dataset.favoriteId = item.id;
    updateFavoriteButton($('#heroFavorite'), item.id);
  }

  function filteredItems(){
    return items.filter(item => {
      const matchesView = (state.view === 'home' && item.type !== 'live') || (state.view === 'movies' && item.type === 'movie') || (state.view === 'series' && item.type === 'series') || (state.view === 'live' && item.type === 'live') || (state.view === 'sports' && item.type === 'sports');
      const matchesOrigin = state.view === 'live'
        ? state.origin === 'all' || (state.origin === 'venezuela' ? item.country === 'venezuela' : item.groupKey === state.origin)
        : state.origin === 'all' || item.origin === state.origin;
      const matchesFavorite = !state.favoritesOnly || state.favorites.has(item.id);
      const needle = state.query.trim().toLocaleLowerCase('ar');
      const haystack = `${item.title} ${item.genre} ${item.description} ${typeLabel(item)} ${item.country || ''}`.toLocaleLowerCase('ar');
      return matchesView && matchesOrigin && matchesFavorite && (!needle || haystack.includes(needle));
    });
  }

  function updateFavoriteButton(button, id){
    const active = state.favorites.has(id);
    button.classList.toggle('is-favorite', active);
    button.setAttribute('aria-pressed', String(active));
    if(button.id === 'heroFavorite') button.innerHTML = `<span class="heart-symbol" aria-hidden="true">${active?'♥':'♡'}</span> ${active?'أضيف إلى المفضلة':'أضف للمفضلة'}`;
    else { button.classList.toggle('active',active); button.textContent = active ? '♥' : '♡'; button.setAttribute('aria-label', active ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'); }
  }

  function cardMarkup(item){
    const isLive = item.type === 'live';
    const favorite = state.favorites.has(item.id);
    const safeTitle = escapeHtml(item.title);
    const safeId = escapeHtml(item.id);
    const safeGenre = escapeHtml(item.genre);
    const safeShort = escapeHtml(item.short || item.title.slice(0,5));
    const channelRegion = item.country === 'venezuela' ? 'VENEZUELA' : 'LIVE TV';
    const art = isLive
      ? `<div class="channel-art-mark"><span class="channel-signal" aria-hidden="true">◉</span><strong>${safeShort}</strong><small>${channelRegion}</small></div>`
      : `<img src="${item.image}" alt="صورة توضيحية لعنوان ${safeTitle}" loading="lazy">`;
    return `<article class="media-card" data-id="${item.id}">
      <button class="card-art ${isLive?'channel-art':''}" data-watch="${safeId}" aria-label="${isLive?'مشاهدة قناة':'عرض معاينة'} ${safeTitle}">
        ${art}<span class="card-badge ${isLive?'live':''}">${escapeHtml(item.badge)}</span><span class="card-play" aria-hidden="true">▶</span>
      </button>
      <div class="card-body"><div class="card-title-row"><h3 class="card-title">${safeTitle}</h3><button class="card-favorite ${favorite?'active':''}" data-favorite="${safeId}" aria-label="${favorite?'إزالة من المفضلة':'إضافة إلى المفضلة'}" aria-pressed="${favorite}">${favorite?'♥':'♡'}</button></div>
      <div class="card-meta"><span class="card-type">${typeLabel(item)} • ${safeGenre}</span><span>${isLive?'خارجي':escapeHtml(item.meta)}</span></div></div>
    </article>`;
  }

  function render(){
    const info = viewInfo[state.view];
    $('#pageTitle').textContent = info.title;
    const activeFilterLabel = liveFilters.find(filter => filter.id === state.origin)?.label || 'القنوات المباشرة';
    $('#contentHeading').textContent = state.favoritesOnly ? 'مكتبتي المفضلة' : state.view === 'live' ? (state.origin === 'all' ? 'القنوات المباشرة' : activeFilterLabel) : info.heading;
    $('#contentSourceLabel').textContent = state.view === 'live' ? 'مصادر بث خارجية' : 'محتوى تجريبي';
    $$('.nav-link').forEach(button => button.classList.toggle('active', button.dataset.view === state.view));
    const availableFilters = state.view === 'live' ? liveFilters : standardFilters;
    $('#filterList').innerHTML = availableFilters.map(filter => `<button class="filter-chip ${filter.id === state.origin ? 'selected' : ''}" data-filter="${filter.id}" aria-pressed="${filter.id === state.origin}">${filter.label}</button>`).join('');
    $('#favoritesToggle').setAttribute('aria-pressed',String(state.favoritesOnly));
    $('#libraryToggle').setAttribute('aria-pressed',String(state.favoritesOnly));
    $('#favoriteCount').textContent = state.favorites.size;
    setHero(currentHero());
    const list = filteredItems();
    $('#resultsCount').textContent = state.favoritesOnly ? `${list.length} عنوان محفوظ` : state.view === 'live' ? `${list.length} قناة في القائمة` : 'العناوين المتاحة';
    const pageSize = state.view === 'live' ? 12 : 6;
    const pageCount = Math.max(1,Math.ceil(list.length/pageSize));
    state.page = Math.min(state.page,pageCount);
    const start=(state.page-1)*pageSize;
    grid.innerHTML = list.slice(start,start+pageSize).map(cardMarkup).join('');
    const hasResults = list.length > 0;
    grid.hidden = !hasResults; emptyState.hidden = hasResults;
    pagination.innerHTML = buildPagination(pageCount);
  }

  function buildPagination(pageCount){
    if(pageCount<=1) return '';
    const pages=[...new Set([1,state.page-1,state.page,state.page+1,pageCount].filter(page=>page>=1&&page<=pageCount))].sort((a,b)=>a-b);
    let previous=0;
    const numbers=pages.map(page=>{
      const gap=page-previous>1?'<span class="pagination-ellipsis" aria-hidden="true">…</span>':'';
      previous=page;
      return `${gap}<button class="page-button ${state.page===page?'active':''}" data-page="${page}" aria-current="${state.page===page?'page':'false'}">${page}</button>`;
    }).join('');
    return `<button class="page-button" data-step="-1" aria-label="الصفحة السابقة" ${state.page===1?'disabled':''}>‹</button>${numbers}<button class="page-button" data-step="1" aria-label="الصفحة التالية" ${state.page===pageCount?'disabled':''}>›</button>`;
  }

  function setView(view){
    if(!viewInfo[view]) return;
    state.view=view; state.origin='all'; state.page=1; state.favoritesOnly=false;
    searchInput.value=''; state.query=''; render();
    $('#primaryNav').classList.remove('open'); $('#menuToggle').setAttribute('aria-expanded','false');
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function clearStream(){
    if(hlsPlayer){ hlsPlayer.destroy(); hlsPlayer=null; }
    const video=$('#streamVideo');
    video.pause(); video.removeAttribute('src'); video.load(); video.hidden=true;
    const frame=$('#externalFrame'); frame.src='about:blank'; frame.hidden=true;
    $('#dialogImage').hidden=false;
    $('#playerVignette').hidden=false;
    $('#demoPlayMark').hidden=false;
    $('#demoMessage').hidden=false;
    $('#streamStatus').hidden=true;
    $('#sourceLink').hidden=true;
    $('#playerContainer').classList.remove('stream-active');
  }

  function openPlayer(item){
    clearStream();
    $('#dialogTitle').textContent = item.type === 'live' ? `البث المباشر: ${item.title}` : `معاينة: ${item.title}`;
    $('#dialogImage').src = item.image;
    $('#dialogImage').alt = `صورة توضيحية لعنوان ${item.title}`;
    $('#dialogDescription').textContent = item.type === 'live'
      ? `${item.title} • ${item.country === 'venezuela' ? 'قائمة فنزويلا' : item.genre} — البث من رابط خارجي وقد يختلف توفره حسب المصدر والمنطقة.`
      : `${typeLabel(item)} • ${item.genre} — ${item.description}`;
    const dialog=$('#playerDialog');
    if(typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open','');

    if(item.stream){
      $('#playerContainer').classList.add('stream-active');
      $('#dialogImage').hidden=true; $('#playerVignette').hidden=true; $('#demoPlayMark').hidden=true; $('#demoMessage').hidden=true;
      const video=$('#streamVideo'); video.hidden=false;
      const status=$('#streamStatus'); status.hidden=false; status.textContent='جارٍ الاتصال بمصدر البث…';
      const source=$('#sourceLink'); source.href=item.source || item.stream; source.hidden=false;
      if(video.canPlayType('application/vnd.apple.mpegurl')){
        video.src=item.stream; video.load(); status.textContent='اضغط زر التشغيل لبدء القناة.';
      } else if(window.Hls && window.Hls.isSupported()){
        hlsPlayer=new window.Hls({enableWorker:true,lowLatencyMode:true});
        hlsPlayer.loadSource(item.stream); hlsPlayer.attachMedia(video);
        hlsPlayer.on(window.Hls.Events.MANIFEST_PARSED,()=>{ if(!dialog.open) return; status.textContent='تم تحميل القناة. اضغط تشغيل لبدء البث.'; });
        hlsPlayer.on(window.Hls.Events.ERROR,(_event,data)=>{
          if(data.fatal && dialog.open){ status.textContent='تعذر تشغيل هذا المصدر الآن؛ قد يكون الرابط متوقفاً أو يمنع التضمين.'; }
        });
      } else {
        status.textContent='هذا المتصفح لا يدعم تشغيل HLS. جرّب فتح المصدر الأصلي.';
      }
    } else if(item.embed){
      $('#playerContainer').classList.add('stream-active');
      $('#dialogImage').hidden=true; $('#playerVignette').hidden=true; $('#demoPlayMark').hidden=true; $('#demoMessage').hidden=true;
      const frame=$('#externalFrame'); frame.hidden=false; frame.src=item.embed;
      const source=$('#sourceLink'); source.href=item.source || item.embed; source.hidden=false;
    } else {
      $('#demoMessage').innerHTML='<b>معاينة تصميمية</b><span>هذا العنوان للعرض التوضيحي فقط.</span>';
    }
  }

  async function loadPlaylistChannels(){
    try{
      const response=await fetch('assets/almoghani-public-channels.json',{cache:'no-store'});
      if(!response.ok) return;
      const playlist=await response.json();
      const knownUrls=new Set(items.map(item=>item.stream || item.source).filter(Boolean));
      let added=0;
      for(const entry of playlist){
        if(!entry || !/^m3u-[a-f0-9]{16}$/.test(entry.id) || typeof entry.name!=='string' || typeof entry.url!=='string') continue;
        let parsed; try{ parsed=new URL(entry.url); }catch{ continue; }
        if(parsed.protocol!=='https:' || knownUrls.has(entry.url)) continue;
        if(entry.kind==='youtube' && (!entry.embed || !entry.embed.startsWith('https://www.youtube-nocookie.com/embed/'))) continue;
        if(entry.kind!=='youtube' && entry.kind!=='hls') continue;
        const name=entry.name.replace(/[\u0000-\u001f\u007f]/g,' ').trim();
        const group=String(entry.group || 'العامة').replace(/[\u0000-\u001f\u007f]/g,' ').trim();
        if(!name) continue;
        const item={id:entry.id,title:name,short:name.slice(0,6),type:'live',origin:'foreign',groupKey:entry.groupKey,country:'other',genre:group,meta:'قناة مباشرة',image:'assets/live-stadium.png',badge:'مباشر',description:`${name} • ${group} — المصدر خارجي.`,source:entry.url};
        if(entry.kind==='youtube') item.embed=entry.embed; else item.stream=entry.url;
        items.push(item); knownUrls.add(entry.url); added++;
      }
      if(added){ state.page=1; render(); }
    }catch(error){ console.warn('تعذر تحميل قائمة القنوات الإضافية.',error); }
  }

  function showToast(message){
    const toast=$('#toast'); toast.textContent=message; toast.classList.add('show');
    clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove('show'),2300);
  }

  function toggleFavorite(id){
    const item=items.find(entry=>entry.id===id); if(!item) return;
    if(state.favorites.has(id)){state.favorites.delete(id);showToast(`أزلنا «${item.title}» من المفضلة.`);}else{state.favorites.add(id);showToast(`أضفنا «${item.title}» إلى المفضلة.`);}
    saveFavorites(); render();
  }

  $$('.nav-link').forEach(button=>button.addEventListener('click',()=>setView(button.dataset.view)));
  $$('[data-view-link]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();setView(link.dataset.viewLink)}));
  $('.filter-list').addEventListener('click',event=>{const button=event.target.closest('.filter-chip');if(!button)return;state.origin=button.dataset.filter;state.page=1;render()});
  $('#favoritesToggle').addEventListener('click',()=>{state.favoritesOnly=!state.favoritesOnly;state.page=1;render();document.querySelector('.library-section').scrollIntoView({behavior:'smooth',block:'start'})});
  $('#libraryToggle').addEventListener('click',()=>{state.favoritesOnly=!state.favoritesOnly;state.page=1;render();document.querySelector('.library-section').scrollIntoView({behavior:'smooth',block:'start'})});
  $('#searchFocus').addEventListener('click',()=>{searchInput.focus();document.querySelector('.toolbar').scrollIntoView({behavior:'smooth',block:'center'})});
  searchInput.addEventListener('input',()=>{state.query=searchInput.value;state.page=1;render()});
  $('#clearFilters').addEventListener('click',()=>{state.origin='all';state.query='';state.favoritesOnly=false;state.page=1;searchInput.value='';render()});
  $('#resetSearch').addEventListener('click',()=>{state.origin='all';state.query='';state.favoritesOnly=false;state.page=1;searchInput.value='';render()});
  $('#heroWatch').addEventListener('click',()=>openPlayer(currentHero()));
  $('#heroFavorite').addEventListener('click',event=>toggleFavorite(event.currentTarget.dataset.favoriteId));
  $('#mediaGrid').addEventListener('click',event=>{
    const favoriteButton=event.target.closest('[data-favorite]');
    if(favoriteButton){event.stopPropagation();toggleFavorite(favoriteButton.dataset.favorite);return;}
    const watchButton=event.target.closest('[data-watch]');
    if(watchButton){const item=items.find(entry=>entry.id===watchButton.dataset.watch);if(item)openPlayer(item);}
  });
  pagination.addEventListener('click',event=>{const button=event.target.closest('[data-page],[data-step]');if(!button||button.disabled)return;state.page=button.dataset.page?Number(button.dataset.page):state.page+Number(button.dataset.step);render();document.querySelector('.library-section').scrollIntoView({behavior:'smooth',block:'start'})});
  $$('.dot').forEach((dot,index)=>dot.addEventListener('click',()=>{const featured=['layl-albadia','zill-almadina','venevision'].map(id=>items.find(item=>item.id===id));setHero(featured[index]);$$('.dot').forEach((el,i)=>el.classList.toggle('active',i===index))}));
  $('#browseButton').addEventListener('click',()=>{setView('home');document.querySelector('.library-section').scrollIntoView({behavior:'smooth',block:'start'})});
  $('#closeDialog').addEventListener('click',()=>$('#playerDialog').close());
  $('#dialogOk').addEventListener('click',()=>$('#playerDialog').close());
  $('#playerDialog').addEventListener('click',event=>{if(event.target===$('#playerDialog'))$('#playerDialog').close()});
  $('#playerDialog').addEventListener('close',clearStream);
  $('#menuToggle').addEventListener('click',event=>{const open=$('#primaryNav').classList.toggle('open');event.currentTarget.setAttribute('aria-expanded',String(open))});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){$('#primaryNav').classList.remove('open');$('#menuToggle').setAttribute('aria-expanded','false')}});

  const clock=$('#clock');
  function tick(){clock.textContent=new Intl.DateTimeFormat('ar-SA',{hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date())}
  tick();setInterval(tick,30000);
  $('#year').textContent=new Date().getFullYear();
  render();
  loadPlaylistChannels();
})();
