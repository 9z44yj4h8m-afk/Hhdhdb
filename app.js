(() => {
  const items = [
    { id:'layl-albadia', title:'ليل البادية', type:'series', origin:'arabic', genre:'دراما تاريخية', meta:'موسم واحد', image:'assets/hero-desert-series.png', badge:'اختيار اليوم', description:'حكاية عن الشجاعة والوفاء، في رحلة عبر الرمال وأسرار الماضي.' },
    { id:'bayt-alaaila', title:'بيت العائلة', type:'series', origin:'arabic', genre:'دراما اجتماعية', meta:'موسم واحد', image:'assets/poster-family-drama.png', badge:'مسلسل', description:'تفاصيل يومية تجمع عائلة كبيرة حول حكاياتها وذكرياتها.' },
    { id:'khalf-alofok', title:'خلف الأفق', type:'movie', origin:'foreign', genre:'خيال علمي', meta:'فيلم', image:'assets/poster-space-odyssey.png', badge:'فيلم', description:'رحلة خيالية إلى عوالم بعيدة، ضمن عنوان تجريبي للواجهة.' },
    { id:'zill-almadina', title:'ظل المدينة', type:'movie', origin:'arabic', genre:'أكشن', meta:'فيلم', image:'assets/poster-city-thriller.png', badge:'فيلم', description:'قصة خيالية تدور بين أضواء المدينة وأسرارها.' },
    { id:'almalab', title:'الملعب المفتوح', type:'live', origin:'sports', genre:'رياضة', meta:'قناة تجريبية', image:'assets/live-stadium.png', badge:'مباشر تجريبي', description:'واجهة عرض رياضي تجريبية. لا يوجد بث حي متصل.' },
    { id:'layali-alasima', title:'ليالي العاصمة', type:'movie', origin:'foreign', genre:'دراما', meta:'فيلم', image:'assets/night-city-unsplash.jpg', badge:'فيلم', description:'مشهد مدينة ليلي ضمن مكتبة العناوين التوضيحية.' },
    { id:'hikayat-zaman', title:'حكاية زمن', type:'series', origin:'turkish', genre:'دراما', meta:'موسم واحد', image:'assets/poster-family-drama.png', badge:'مسلسل', description:'عنوان خيالي إضافي لتجربة التصفح والتصفية.' },
    { id:'rihlat-alrimal', title:'رحلة الرمال', type:'movie', origin:'arabic', genre:'مغامرة', meta:'فيلم', image:'assets/hero-desert-series.png', badge:'فيلم', description:'مغامرة سينمائية خيالية في أفق الصحراء.' },
    { id:'laylat-almalab', title:'ليلة الملعب', type:'sports', origin:'sports', genre:'رياضة', meta:'رياضة', image:'assets/live-stadium.png', badge:'رياضة', description:'بطاقة رياضية توضيحية بمحتوى غير مرتبط بمباراة فعلية.' }
  ];

  const viewInfo = {
    home: { title:'عالم المشاهدة', heading:'أحدث الإضافات', hero:'layl-albadia' },
    movies: { title:'الأفلام', heading:'اكتشف الأفلام', hero:'zill-almadina' },
    series: { title:'المسلسلات', heading:'أحدث المسلسلات', hero:'layl-albadia' },
    live: { title:'البث المباشر', heading:'قنوات البث التجريبية', hero:'almalab' },
    sports: { title:'الرياضة', heading:'محتوى رياضي', hero:'laylat-almalab' }
  };
  const filterLabels = { all:'الكل', arabic:'عربي', foreign:'أجنبي', turkish:'تركي', sports:'رياضة' };
  const state = { view:'home', origin:'all', query:'', page:1, favoritesOnly:false, favorites:new Set(readFavorites()) };
  const $ = (selector, root=document) => root.querySelector(selector);
  const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
  const grid = $('#mediaGrid');
  const searchInput = $('#searchInput');
  const emptyState = $('#emptyState');
  const pagination = $('#pagination');
  let toastTimer;

  function readFavorites(){ try { return JSON.parse(localStorage.getItem('almoghani-favorites') || '[]'); } catch { return []; } }
  function saveFavorites(){ try { localStorage.setItem('almoghani-favorites', JSON.stringify([...state.favorites])); } catch {} }
  function currentHero(){ return items.find(item => item.id === viewInfo[state.view].hero) || items[0]; }
  function typeLabel(item){ if(item.type === 'series') return 'مسلسل'; if(item.type === 'movie') return 'فيلم'; if(item.type === 'live') return 'قناة'; return 'رياضة'; }
  function heroMeta(item){ return item.meta; }
  function setHero(item){
    $('#heroImage').src = item.image;
    $('#heroImage').alt = `مشهد توضيحي من ${item.title}`;
    $('#heroTitle').textContent = item.title;
    $('#heroDescription').textContent = item.description;
    $('#heroMeta').textContent = heroMeta(item);
    const labels = { series:'مسلسل عربي • تجربة ترفيهية', movie:'فيلم • مكتبة تجريبية', live:'قناة تجريبية • بث غير متصل', sports:'رياضة • محتوى توضيحي' };
    $('#heroKicker').innerHTML = `<span class="kicker-mark" aria-hidden="true">✦</span> ${labels[item.type] || labels.movie}`;
    $('#heroFavorite').dataset.favoriteId = item.id;
    updateFavoriteButton($('#heroFavorite'), item.id);
  }
  function filteredItems(){
    let list = items.filter(item => {
      const matchesView = state.view === 'home' || (state.view === 'movies' && item.type === 'movie') || (state.view === 'series' && item.type === 'series') || (state.view === 'live' && item.type === 'live') || (state.view === 'sports' && (item.type === 'sports' || item.type === 'live'));
      const matchesOrigin = state.origin === 'all' || item.origin === state.origin;
      const matchesFavorite = !state.favoritesOnly || state.favorites.has(item.id);
      const needle = state.query.trim().toLocaleLowerCase('ar');
      const matchesQuery = !needle || `${item.title} ${item.genre} ${item.description} ${typeLabel(item)}`.toLocaleLowerCase('ar').includes(needle);
      return matchesView && matchesOrigin && matchesFavorite && matchesQuery;
    });
    return list;
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
    const badgeClass = isLive ? 'card-badge live' : 'card-badge';
    const favorite = state.favorites.has(item.id);
    return `<article class="media-card" data-id="${item.id}">
      <button class="card-art" data-watch="${item.id}" aria-label="عرض معاينة ${item.title}">
        <img src="${item.image}" alt="صورة توضيحية لعنوان ${item.title}" loading="lazy">
        <span class="${badgeClass}">${item.badge}</span>
        <span class="card-play" aria-hidden="true">▶</span>
      </button>
      <div class="card-body"><div class="card-title-row"><h3 class="card-title">${item.title}</h3><button class="card-favorite ${favorite?'active':''}" data-favorite="${item.id}" aria-label="${favorite?'إزالة من المفضلة':'إضافة إلى المفضلة'}" aria-pressed="${favorite}">${favorite?'♥':'♡'}</button></div>
      <div class="card-meta"><span class="card-type">${typeLabel(item)} • ${item.genre}</span><span>${item.meta}</span></div></div>
    </article>`;
  }
  function render(){
    const info = viewInfo[state.view];
    $('#pageTitle').textContent = info.title;
    $('#contentHeading').textContent = state.favoritesOnly ? 'مكتبتي المفضلة' : info.heading;
    $('#resultsCount').textContent = state.favoritesOnly ? 'عناوينك المحفوظة' : 'العناوين المتاحة';
    $$('.nav-link').forEach(button => button.classList.toggle('active', button.dataset.view === state.view));
    $$('.filter-chip').forEach(button => button.classList.toggle('selected', button.dataset.filter === state.origin));
    $('#favoritesToggle').setAttribute('aria-pressed',String(state.favoritesOnly));
    $('#libraryToggle').setAttribute('aria-pressed',String(state.favoritesOnly));
    $('#favoriteCount').textContent = state.favorites.size;
    const hero = currentHero(); setHero(hero);
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
  function openPlayer(item){
    $('#dialogTitle').textContent = `معاينة: ${item.title}`;
    $('#dialogImage').src = item.image;
    $('#dialogImage').alt = `صورة توضيحية لعنوان ${item.title}`;
    $('#dialogDescription').textContent = `${typeLabel(item)} • ${item.genre} — ${item.description}`;
    const dialog=$('#playerDialog');
    if(typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open','');
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
  $$('.filter-chip').forEach(button=>button.addEventListener('click',()=>{state.origin=button.dataset.filter;state.page=1;render()}));
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
  $$('.dot').forEach((dot,index)=>dot.addEventListener('click',()=>{const featured=[items[0],items[3],items[4]][index];setHero(featured);$$('.dot').forEach((el,i)=>el.classList.toggle('active',i===index))}));
  $('#browseButton').addEventListener('click',()=>{setView('home');document.querySelector('.library-section').scrollIntoView({behavior:'smooth',block:'start'})});
  $('#closeDialog').addEventListener('click',()=>$('#playerDialog').close());
  $('#dialogOk').addEventListener('click',()=>$('#playerDialog').close());
  $('#playerDialog').addEventListener('click',event=>{if(event.target===$('#playerDialog'))$('#playerDialog').close()});
  $('#menuToggle').addEventListener('click',event=>{const open=$('#primaryNav').classList.toggle('open');event.currentTarget.setAttribute('aria-expanded',String(open))});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){$('#primaryNav').classList.remove('open');$('#menuToggle').setAttribute('aria-expanded','false')}});

  const clock=$('#clock');
  function tick(){clock.textContent=new Intl.DateTimeFormat('ar-SA',{hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date())}
  tick();setInterval(tick,30000);
  $('#year').textContent=new Date().getFullYear();
  render();
})();
