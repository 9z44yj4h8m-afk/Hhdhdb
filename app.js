(() => {
  const items = [
    // قنوات ALMOGHANI LIVE العربية المباشرة
    { id:'saudi-news', title:'الإخبارية السعودية', short:'KSA', type:'live', origin:'arabic', country:'saudi', genre:'إخبارية', meta:'بث مباشر', image:'https://i.imgur.com/WcRlHQm.png', badge:'مباشر', description:'قناة الإخبارية السعودية الرسمية.', stream:'https://shd-gcp-live.edgenextcdn.net/live/bitmovin-al-ekhbaria/297b3ef1cd0633ad9cfba7473a686a06/index.m3u8' },
    { id:'al-hadath', title:'قناة الحدث', short:'HDT', type:'live', origin:'arabic', country:'saudi', genre:'إخبارية', meta:'بث مباشر', image:'https://i.imgur.com/De4SEWE.png', badge:'مباشر', description:'قناة الحدث الإخبارية.', stream:'https://shd-gcp-live.edgenextcdn.net/live/bitmovin-hadath/2ff87ec4c2f3ede35295a20637d9f8fd/index.m3u8' },
    { id:'al-ghad', title:'قناة الغد', short:'GHD', type:'live', origin:'arabic', country:'arab', genre:'إخبارية', meta:'بث مباشر', image:'https://i.imgur.com/ga6NXb9.png', badge:'مباشر', description:'بث مباشر لقناة الغد.', stream:'https://eazyvwqssi.erbvr.com/alghadtv/alghadtv.m3u8' },
    { id:'syria-tv', title:'تلفزيون سوريا', short:'SYR', type:'live', origin:'arabic', country:'syria', genre:'إخبارية', meta:'بث مباشر', image:'https://i.imgur.com/FjuVuXF.jpeg', badge:'مباشر', description:'تلفزيون سوريا مباشر.', stream:'https://live.kwikmotion.com/syriatvlive/syriatv.smil/playlist_dvr.m3u8' },
    { id:'oman-tv', title:'تلفزيون عُمان', short:'OMN', type:'live', origin:'arabic', country:'oman', genre:'عامة', meta:'بث مباشر', image:'https://i.imgur.com/rBftT9x.png', badge:'مباشر', description:'تلفزيون سلطنة عُمان الرسمي.', stream:'https://partneta.cdn.mgmlcdn.com/omantv/smil:omantv.stream.smil/chunklist.m3u8' },
    { id:'qatar-tv', title:'تلفزيون قطر', short:'QTR', type:'live', origin:'arabic', country:'qatar', genre:'عامة', meta:'بث مباشر', image:'https://i.imgur.com/N5RB4sp.png', badge:'مباشر', description:'تلفزيون قطر الفضائي.', stream:'https://live.kwikmotion.com/qtv1live/qtv1.smil/playlist.m3u8' },
    { id:'alwesam-tv', title:'الوسام الفضائية', short:'WSM', type:'live', origin:'arabic', country:'saudi', genre:'التراث والجنوب', meta:'بث مباشر', image:'https://i.imgur.com/rtqVAxf.png', badge:'مباشر', description:'الوسام الفضائية — نبض الجنوب.', stream:'https://stream.addresses-sat.com/Alwesam/index.m3u8' },
    { id:'tunisia-2', title:'الوطنية التونسية 2', short:'TUN', type:'live', origin:'arabic', country:'tunisia', genre:'عامة', meta:'بث مباشر', image:'https://i.imgur.com/kgkrD3V.png', badge:'مباشر', description:'القناة الوطنية التونسية الثانية.', stream:'https://sw1.tanitweb.net/TunisiaTV/_definst_/watania2/playlist.m3u8?DVR' },
    { id:'morocco-2m', title:'2M Monde المغربية', short:'2M', type:'live', origin:'arabic', country:'morocco', genre:'عامة', meta:'بث مباشر', image:'https://i.imgur.com/MvpntzA.png', badge:'مباشر', description:'القناة الثانية المغربية 2M.', stream:'https://d2qh3gh0k5vp3v.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-n6pess5lwbghr/2M_ES.m3u8' },
    { id:'medi1-arabic', title:'MEDI1TV Arabic', short:'M1', type:'live', origin:'arabic', country:'morocco', genre:'إخبارية', meta:'بث مباشر', image:'https://i.imgur.com/3YsZPY6.jpeg', badge:'مباشر', description:'ميدي 1 تي في عربية.', stream:'https://cdn.live.easybroadcast.io/abr_corp/83_medi1tv-arabic_g90v4ec/playlist.m3u8' },
    { id:'aghani-tv', title:'أغاني أغاني', short:'AGN', type:'live', origin:'arabic', country:'lebanon', genre:'منوعات', meta:'بث مباشر', image:'https://i.imgur.com/o6HSfNg.png', badge:'مباشر', description:'قناة أغاني أغاني الفنية.', stream:'https://cdn.streamlane.tv/hls/aghanitv/index.m3u8' }


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
    live: { title:'البث المباشر', heading:'قنوات فنزويلا', hero:'venevision' },
    sports: { title:'الرياضة', heading:'محتوى رياضي', hero:'laylat-almalab' }
  };
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

  function setHero(item){
    $('#heroImage').src = item.image;
    $('#heroImage').alt = item.type === 'live' ? `قناة ${item.title}` : `مشهد توضيحي من ${item.title}`;
    $('#heroTitle').textContent = item.title;
    $('#heroDescription').textContent = item.description;
    $('#heroMeta').textContent = item.type === 'live' ? 'فنزويلا • مصدر خارجي' : item.meta;
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
      const matchesOrigin = state.origin === 'all' || (state.origin === 'venezuela' ? item.country === 'venezuela' : item.origin === state.origin);
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
    const art = isLive
      ? `<div class="channel-art-mark"><span class="channel-signal" aria-hidden="true">◉</span><strong>${item.short}</strong><small>VENEZUELA</small></div>`
      : `<img src="${item.image}" alt="صورة توضيحية لعنوان ${item.title}" loading="lazy">`;
    return `<article class="media-card" data-id="${item.id}">
      <button class="card-art ${isLive?'channel-art':''}" data-watch="${item.id}" aria-label="${isLive?'مشاهدة قناة':'عرض معاينة'} ${item.title}">
        ${art}<span class="card-badge ${isLive?'live':''}">${item.badge}</span><span class="card-play" aria-hidden="true">▶</span>
      </button>
      <div class="card-body"><div class="card-title-row"><h3 class="card-title">${item.title}</h3><button class="card-favorite ${favorite?'active':''}" data-favorite="${item.id}" aria-label="${favorite?'إزالة من المفضلة':'إضافة إلى المفضلة'}" aria-pressed="${favorite}">${favorite?'♥':'♡'}</button></div>
      <div class="card-meta"><span class="card-type">${typeLabel(item)} • ${item.genre}</span><span>${isLive?'خارجي':item.meta}</span></div></div>
    </article>`;
  }

  function render(){
    const info = viewInfo[state.view];
    $('#pageTitle').textContent = info.title;
    $('#contentHeading').textContent = state.favoritesOnly ? 'مكتبتي المفضلة' : info.heading;
    $('#resultsCount').textContent = state.favoritesOnly ? 'عناوينك المحفوظة' : state.view === 'live' ? 'قنوات خارجية متاحة في القائمة' : 'العناوين المتاحة';
    $('#contentSourceLabel').textContent = state.view === 'live' ? 'مصادر بث خارجية' : 'محتوى تجريبي';
    $$('.nav-link').forEach(button => button.classList.toggle('active', button.dataset.view === state.view));
    $$('.filter-chip').forEach(button => {
      const countryChip = button.dataset.filter === 'venezuela';
      button.hidden = countryChip ? state.view !== 'live' : state.view === 'live' && button.dataset.filter !== 'all';
      button.classList.toggle('selected', button.dataset.filter === state.origin);
      if(button.dataset.filter === 'all') button.textContent = state.view === 'live' ? 'كل القنوات' : 'الكل';
    });
    $('#favoritesToggle').setAttribute('aria-pressed',String(state.favoritesOnly));
    $('#libraryToggle').setAttribute('aria-pressed',String(state.favoritesOnly));
    $('#favoriteCount').textContent = state.favorites.size;
    setHero(currentHero());
    const list = filteredItems();
    const pageSize = 6;
    const pageCount = Math.max(1,Math.ceil(list.length/pageSize));
    state.page = Math.min(state.page,pageCount);
    const start=(state.page-1)*pageSize;
    grid.innerHTML = list.slice(start,start+pageSize).map(cardMarkup).join('');
    const hasResults = list.length > 0;
    grid.hidden = !hasResults; emptyState.hidden = hasResults;
    pagination.innerHTML = pageCount > 1 ? `<button class="page-button" data-page="${state.page-1}" aria-label="الصفحة السابقة" ${state.page===1?'disabled':''}>‹</button>${Array.from({length:pageCount},(_,i)=>`<button class="page-button ${state.page===i+1?'active':''}" data-page="${i+1}" aria-current="${state.page===i+1?'page':'false'}">${i+1}</button>`).join('')}<button class="page-button" data-page="${state.page+1}" aria-label="الصفحة التالية" ${state.page===pageCount?'disabled':''}>›</button>` : '';
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
      ? `${item.title} • قائمة فنزويلا — البث من رابط خارجي وقد يختلف توفره حسب المصدر والمنطقة.`
      : `${typeLabel(item)} • ${item.genre} — ${item.description}`;
    const dialog=$('#playerDialog');
    if(typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open','');

    if(item.stream){
      $('#playerContainer').classList.add('stream-active');
      $('#dialogImage').hidden=true; $('#playerVignette').hidden=true; $('#demoPlayMark').hidden=true; $('#demoMessage').hidden=true;
      const video=$('#streamVideo'); video.hidden=false;
      const status=$('#streamStatus'); status.hidden=false; status.textContent='جارٍ الاتصال بمصدر البث…';
      const source=$('#sourceLink'); source.href=item.stream; source.hidden=false;
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
      const source=$('#sourceLink'); source.href=item.embed; source.hidden=false;
    } else {
      $('#demoMessage').innerHTML='<b>معاينة تصميمية</b><span>هذا العنوان للعرض التوضيحي فقط.</span>';
    }
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
  pagination.addEventListener('click',event=>{const button=event.target.closest('[data-page]');if(!button||button.disabled)return;state.page=Number(button.dataset.page);render();document.querySelector('.library-section').scrollIntoView({behavior:'smooth',block:'start'})});
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
})();
