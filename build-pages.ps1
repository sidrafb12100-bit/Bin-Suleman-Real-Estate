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
  $html = Get-Content "$root\$src" -Raw
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
  # 2b. normalize responsive header pill (fits 360px phones; scrolls if ever needed)
  $outer = if ($out -eq 'index.html') { '<header class="fixed inset-x-0 z-40 w-full top-10 sm:top-12 pointer-events-none pt-3 sm:pt-4">' }
           elseif ($out -eq 'blog.html') { '<header class="fixed inset-x-0 z-40 top-10 mt-3 sm:mt-4">' }
           else { '<header class="z-50 relative w-full pt-space-sm pb-space-sm">' }
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
  # 3. favicon after viewport meta
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
