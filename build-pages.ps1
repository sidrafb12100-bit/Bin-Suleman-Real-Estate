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
  # 2f. canonical business TikTok link everywhere
  $tiktok = 'https://www.tiktok.com/@binsulemanrealestate?is_from_webapp=1&sender_device=pc'
  $html = [regex]::Replace($html, 'https?://(www\.)?tiktok\.com[^"''>\s]*', $tiktok)
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
