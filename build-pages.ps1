# Build root pages from Stitch code.html: local images, wired nav, favicon, promo video
$ErrorActionPreference = 'Stop'
$root = 'C:\Users\lenovo\Downloads\AI Generated pics Moon\Bin Suleman Official Website'
$map = (Get-Content "$root\assets\image-map.json" -Raw | ConvertFrom-Json)
$urls = Get-Content "$root\urls.txt"
$posterUrl = $urls[8]          # 9th unique image (gate photo) as video poster
$poster = $map.$posterUrl
$pages = [ordered]@{
  'home_bin_suleman_real_estate\code.html'              = 'index.html'
  'about_us_bin_suleman_real_estate\code.html'          = 'about.html'
  'services_bin_suleman_real_estate\code.html'          = 'services.html'
  'blog_market_insights_bin_suleman_real_estate\code.html' = 'blog.html'
  'contact_us_bin_suleman_real_estate\code.html'        = 'contact.html'
}
$navMap = [ordered]@{
  'Home'        = 'index.html'
  'About Us'    = 'about.html'
  'Services'    = 'services.html'
  'Blog'        = 'blog.html'
  'Contact Us'  = 'contact.html'
}
$titles = @{
  'index.html'    = 'Bin Suleman Real Estate &amp; Builders | DHA Phase 9 Prism Lahore'
  'about.html'    = 'About Us | Bin Suleman Real Estate &amp; Builders'
  'services.html' = 'Services | Bin Suleman Real Estate &amp; Builders'
  'blog.html'     = 'DHA Phase 9 Prism Market Intelligence &amp; News | Bin Suleman Real Estate'
  'contact.html'  = 'Contact Us - Bin Suleman Real Estate &amp; Builders'
}
$desc = @{
  'index.html'    = 'Official sales partner for DHA Phase 9 Prism Lahore. Verified residential and commercial plots, file transfers and turnkey construction with institutional diligence.'
  'about.html'    = 'Bin Suleman Real Estate &amp; Builders — fiduciary DHA Lahore advisory built on transparency, on-ground verification and document diligence.'
  'services.html' = 'Residential plot advisory, commercial file trading, DHA document verification and turnkey architectural construction in DHA Phase 9 Prism.'
  'blog.html'     = 'DHA Phase 9 Prism market intelligence: possession roadmaps, sector progress, plot rates and overseas investor guides.'
  'contact.html'  = 'Book a private advisory session with Bin Suleman Real Estate &amp; Builders at DHA Phase 9 Prism, Lahore.'
}
  # 2b. normalize header pill -> in-flow (scrolls away with content)
  # 2b. normalize header pill -> in-flow (scrolls away with content)
  $outer = '<header class="relative z-40 w-full pt-3 sm:pt-4">'
$logoBar = @'
<!-- STATIONARY TOP LOGO BAR (fixed; stays on scroll) -->
<div id="bsr-topbar" class="fixed top-0 inset-x-0 z-50 w-full bg-[#080d1a]/95 backdrop-blur-md border-b border-[#fed65b]/25">
  <div class="max-w-7xl mx-auto flex items-center justify-between gap-3 px-3 sm:px-6 py-2">
    <a href="index.html" class="flex items-center gap-2 sm:gap-3 min-w-0" aria-label="Bin Suleman Real Estate &amp; Builders - Home">
      <img alt="BSR Golden Emblem" class="h-5 sm:h-6 w-auto object-contain shrink-0 filter drop-shadow" src="__LOGO__">
      <span class="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#fed65b] whitespace-nowrap">Bin Suleman <span class="text-slate-200 font-medium">Real Estate &amp; Builders</span></span>
    </a>
    <a class="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#fed65b] hover:text-white transition-colors shrink-0" href="tel:+9242111277999">
      <span class="material-symbols-outlined text-sm sm:text-base">call</span>
      <span class="hidden sm:inline">+92 42 111 277 999</span>
      <span class="sm:hidden">Call</span>
    </a>
  </div>
</div>
<!-- spacer compensating the fixed bar -->
<div class="h-10 w-full" aria-hidden="true"></div>
'@
$logoBar = $logoBar.Replace('__LOGO__', 'assets/images/img-1-ab6axuaiqxcc.png')
# pulsing WhatsApp floating button (bottom-right) injected before </body> on every page
$waFloat = @'
<!-- ===== BSR WhatsApp Floating Button (pulsing, bottom-right, all pages) ===== -->
<div id="bsr-whatsapp-float" class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] flex flex-col items-end gap-2">
  <span id="bsr-wa-hint" class="hidden sm:inline-block opacity-0 translate-x-2 transition-all duration-300 pointer-events-none bg-[#080d1a]/95 border border-[#fed65b]/40 text-[#fed65b] text-[11px] font-semibold rounded-full px-3 py-1.5 shadow-xl whitespace-nowrap">Chat on WhatsApp</span>
  <a id="bsr-wa-btn" href="https://wa.me/923000000000?text=Hello%20Bin%20Suleman%20Real%20Estate%20%26%20Builders%2C%20I%20would%20like%20to%20inquire%20about%20DHA%20Phase%209%20Prism." target="_blank" rel="noopener noreferrer" aria-label="Chat with Bin Suleman Real Estate &amp; Builders on WhatsApp" class="bsr-wa-btn group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full shrink-0">
    <span class="bsr-wa-ring" aria-hidden="true"></span>
    <span class="bsr-wa-ring bsr-wa-ring-delay" aria-hidden="true"></span>
    <svg class="relative z-10 w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path></svg>
  </a>
</div>
<style>
  #bsr-whatsapp-float { -webkit-tap-highlight-color: transparent; }
  .bsr-wa-btn { background: linear-gradient(135deg,#25D366 0%,#1EBE5A 100%); color: #ffffff; box-shadow: 0 10px 25px -5px rgba(37,211,102,.55), 0 0 0 1px rgba(254,214,91,.35) inset; transition: transform .25s ease, box-shadow .25s ease; animation: bsrWaBreathe 2.4s ease-in-out infinite; }
  .bsr-wa-btn:hover { transform: scale(1.08); box-shadow: 0 14px 34px -6px rgba(37,211,102,.75), 0 0 0 1px rgba(254,214,91,.65) inset; }
  .bsr-wa-ring { position: absolute; inset: 0; border-radius: 9999px; background: #25D366; opacity: .5; animation: bsrWaPulse 2.2s cubic-bezier(.24,.1,.36,1) infinite; }
  .bsr-wa-ring-delay { animation-delay: 1.1s; }
  #bsr-whatsapp-float:hover #bsr-wa-hint { opacity: 1; transform: translateX(0); }
  @keyframes bsrWaPulse { 0% { transform: scale(1); opacity: .5; } 70% { transform: scale(1.85); opacity: 0; } 100% { transform: scale(1.85); opacity: 0; } }
  @keyframes bsrWaBreathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }
  @media (prefers-reduced-motion: reduce) { .bsr-wa-ring { animation: none; opacity: 0; } .bsr-wa-btn { animation: none; } }
</style>
'@
  $outer = '<header class="relative z-40 w-full pt-3 sm:pt-4">'
$videoBlock = @'
<!-- 7.5 OFFICIAL PROMO SHOWREEL -->
<section class="w-full py-12 sm:py-16 bg-white border-b border-slate-200/70">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
      <div>
        <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/20 text-[#745c00] text-xs uppercase font-bold tracking-wider mb-3">Official Showreel</span>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight">Experience DHA Phase 9 Prism.</h2>
      </div>
      <p class="text-xs sm:text-sm text-on-surface-variant max-w-md">A guided visual tour of Lahore's most ambitious master-planned community — presented by Bin Suleman Real Estate &amp; Builders.</p>
    </div>
    <div class="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-[#0b1329] border border-slate-200">
      <video class="w-full h-auto max-h-[80vh] bg-black" controls preload="metadata" poster="__POSTER__">
        <source src="assets/video/promo.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</section>
'@

foreach ($src in $pages.Keys) {
  $out = $pages[$src]
  $html = Get-Content "$root\$src" -Raw -Encoding UTF8
  # 1. localise images
  foreach ($u in $urls) {
    if ($map.PSObject.Properties[$u]) { $html = $html.Replace($u, $map.$u) }
  }
  # 2. wire nav links by label
  foreach ($label in $navMap.Keys) {
    $target = $navMap[$label]
    $pattern = '<a([^>]*href=")[^"]*("[^>]*>' + [regex]::Escape($label) + '</a>)'
    $html = [regex]::Replace($html, $pattern, ('<a$1' + $target + '$2'))
  }
  # 2b. normalize responsive header pill -> in-flow so it scrolls away with the page
  $outer = '<header class="relative z-40 w-full pt-3 sm:pt-4">'
  $links = ''
  foreach ($label in $navMap.Keys) {
    $target = $navMap[$label]
    $active = ($target -eq $out)
    $cls = if ($active) { 'px-2 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#e6ca65] text-[#0b1329] text-[10px] sm:text-sm font-semibold shadow-md shrink-0' }
           else { 'px-2 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all shrink-0' }
    $aria = if ($active) { ' aria-current="page"' } else { '' }
    $links += ('<a href="' + $target + '"' + $aria + ' class="' + $cls + '">' + $label + '</a>')
  }
  $newHeader = $outer + '<div class="max-w-7xl mx-auto px-gutter-mobile sm:px-gutter flex items-center justify-center"><div class="bg-[#151c2e]/90 backdrop-blur-md border border-white/10 rounded-full px-1.5 sm:px-3 py-1.5 max-w-full overflow-x-auto scrollbar-none pointer-events-auto flex items-center justify-center gap-0.5 sm:gap-2 shadow-2xl"><nav class="flex items-center justify-center gap-0.5 sm:gap-2 whitespace-nowrap shrink-0">' + $links + '</nav></div></div></header>'
  $html = [regex]::Replace($html, '<header\b.*?</header>', $newHeader, 'Singleline')
  # 2c. remove legacy announcement/logo bars (index fixed aside, blog in-flow div)
  $html = [regex]::Replace($html, '<aside aria-label="Official Partnership Notice".*?</aside>\s*', '', 'Singleline')
  $html = [regex]::Replace($html, '<!-- 1\. TOP ANNOUNCEMENT BAR -->\s*', '')
  $html = [regex]::Replace($html, '<!-- 1\. Top Announcement Bar -->\s*<div class="w-full bg-\[#0b1329\][^>]*>.*?</div></div></div>\s*', '', 'Singleline')
  # 2d. inject stationary top logo bar (fixed) + spacer right after <body>
  $html = [regex]::Replace($html, '(<body[^>]*>)', ('$1' + $logoBar), 'Singleline')
  # 2e. drop any stray pre-header bars/comments between the spacer and <header>
  $html = [regex]::Replace($html, '(<!-- spacer compensating the fixed bar -->\s*<div class="h-10 w-full" aria-hidden="true"></div>).*?(?=<header)', '$1', 'Singleline')
  # 2g. inject pulsing WhatsApp floating button before </body> (idempotent)
  if ($html -notmatch 'id="bsr-whatsapp-float"') {
    $html = $html.Replace('</body>', ($waFloat + "`r`n" + '</body>'))
  }
  # 2f. canonical business social links everywhere
  $tiktok = 'https://www.tiktok.com/@binsulemanrealestate?is_from_webapp=1&sender_device=pc'
  $youtube = 'https://www.youtube.com/@BinSulemanRealEstate'
  $instagram = 'https://www.instagram.com/binsulemanrealestate/'
  $facebook = 'https://www.facebook.com/BinSulemanRealEstateOfficial'
  # placeholder URLs pointing at bare domains
  $html = [regex]::Replace($html, 'https?://(www\.)?tiktok\.com[^"''>\s]*', $tiktok)
  $html = [regex]::Replace($html, 'https?://(www\.)?youtube\.com[^"''>\s]*', $youtube)
  # footer social icons with dead href="#" placeholders
  $html = [regex]::Replace($html, '(<a[^>]*aria-label="TikTok"[^>]*?)href="#"', ('$1href="' + $tiktok + '" target="_blank" rel="noopener"'))
  $html = [regex]::Replace($html, '(<a[^>]*aria-label="YouTube"[^>]*?)href="#"', ('$1href="' + $youtube + '" target="_blank" rel="noopener"'))
  $html = [regex]::Replace($html, '(<a[^>]*aria-label="Instagram"[^>]*?)href="#"', ('$1href="' + $instagram + '" target="_blank" rel="noopener"'))
  $html = [regex]::Replace($html, 'https?://(www\.)?facebook\.com[^"''>\s]*', $facebook)
  $html = [regex]::Replace($html, '(<a[^>]*aria-label="Facebook"[^>]*?)href="#"', ('$1href="' + $facebook + '" target="_blank" rel="noopener"'))
  # 3. favicon after viewport meta
  $favicon = '<link rel="icon" type="image/x-icon" href="assets/images/favicon.ico"><link rel="shortcut icon" href="favicon.ico"><link rel="apple-touch-icon" href="assets/images/bsr-logo.png">'
  if ($html -notmatch 'rel="icon"') {
    $html = [regex]::Replace($html, '(<meta content="width=device-width[^>]*>)', ('$1' + $favicon))
  }
  # 4. title + description
  if ($html -notmatch '<title>') {
    $html = [regex]::Replace($html, '(<meta content="width=device-width[^>]*>)', ('$1<title>' + $titles[$out] + '</title>'))
  }
  if ($html -notmatch 'name="description"') {
    $html = [regex]::Replace($html, '(</title>)', ('$1<meta name="description" content="' + $desc[$out] + '">'))
  }
  # 5. promo video block on home page
  if ($out -eq 'index.html' -and $html -notmatch 'promo.mp4') {
    $block = $videoBlock.Replace('__POSTER__', $poster)
    $html = $html.Replace('<!-- 8. OFFICE VISIT & CALL CONSULTATION CTA SECTION -->', ($block + "`r`n" + '<!-- 8. OFFICE VISIT & CALL CONSULTATION CTA SECTION -->'))
  }
  Set-Content -Path "$root\$out" -Value $html -Encoding UTF8 -NoNewline
  Write-Host "BUILT $out"
}
Write-Host 'PAGES DONE'
