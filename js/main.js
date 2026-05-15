/* ERA Print Pack – Main JS */

/* ── Language System ─────────────────────────────────────────── */
const TRANSLATIONS = {
  al: {
    /* Navbar */
    'nav.home':     'Kryefaqja',
    'nav.products': 'Produktet',
    'nav.about':    'Rreth Nesh',
    'nav.contact':  'Kontakti',
    'nav.order':    'Porosit',
    'nav.cta':      'Kërko Ofertë',

    /* Hero */
    'hero.badge':   'Prodhim Vendor · Kosovë',
    'hero.title':   'Ambalazhë Letre me <span class="text-green">Dizajn të Personalizuar</span>',
    'hero.sub':     'Printim profesional për kafene, restorante dhe fast food në Kosovë — logoja juaj, stili juaj. Dorëzim brenda 7–14 ditëve.',
    'hero.cta1':    'Kërko Ofertë Falas',
    'hero.cta2':    'Shiko Produktet',
    'hero.cta3':    'Porosit Tani',
    'hero.stat1.n': '15+',    'hero.stat1.l': 'Vite Eksperiencë',
    'hero.stat2.n': '397',    'hero.stat2.l': 'Klientë Aktiv',
    'hero.stat3.n': '13',     'hero.stat3.l': 'Makina Prodhimi',
    'hero.stat4.n': '3.9M+',  'hero.stat4.l': 'Paketa / 2025',
    'hero.scroll':  'Zbulo Më Shumë',

    /* Services */
    'services.badge':  'Çfarë Ofrojmë',
    'services.title':  'Zgjidhje të Plota për Ambalazhimin',
    'services.sub':    'Nga fast food-i te farmaceutika, ofrojmë ambalazh cilësor për çdo sektor biznesi.',
    'srv1.title': 'Paketime Fast Food',
    'srv1.desc':  'Kuti, qese dhe kontejnerë për restorante, fast food dhe kafene. Rezistent ndaj nxehtësisë dhe vajit.',
    'srv2.title': 'Gota Letre',
    'srv2.desc':  'Gota letre për kafe, çaj dhe pije të ftohta. Prodhohen në madhësi 3.5oz, 7oz dhe 12oz me dizajn të personalizuar.',
    'srv3.title': 'Branding i Personalizuar',
    'srv3.desc':  'Logo, ngjyra dhe dizajn unik mbi ambalazhë. Bëni biznesin tuaj të dallohet nga konkurrenca.',
    'srv4.title': 'Printim Offset & Digital',
    'srv4.desc':  'Printim me cilësi të lartë dhe ngjyra të qëndrueshme. Teknologji moderne për rezultate perfekte.',
    'tops.badge': 'Më të Shitura · 2025',
    'tops.title': 'Produktet Kryesore',
    'tops.sub': 'Nga volumet e larta te porositë e përditshme, këto janë produktet që lëvizin më shumë për ERA.',
    'tops.card.badge': 'Top Seller',
    'tops.card.kicker1': 'Më i shituri në volum',
    'tops.card.title1': 'Gota Letre',
    'tops.card.desc1': 'Zgjidhje praktike për kafe, çaj dhe pije të ftohta me printim të personalizuar.',
    'tops.card.stat.label': 'copë të shitura · 2025',
    'tops.card.kicker2': 'Zgjedhje e fortë për fast food',
    'tops.card.title2': 'Kupa Pasta & Supe',
    'tops.card.desc2': 'Kupa rezistente për pasta, supe dhe vakte delivery që kërkojnë paraqitje të pastër.',
    'tops.card.cta': 'Shiko Detajet →',
    'tops.more': 'Shiko të gjitha produktet',

    /* How it works */
    'hiw.badge':  'Si Funksionon',
    'hiw.title':  'Nga Ideja te Produkti Final',
    'hiw.sub':    'Procesi ynë i qartë me 4 hapa siguron rezultatin e duhur në çdo projekt.',
    'step1.t': 'Konsultimi', 'step1.d': 'Takohemi me ju për të kuptuar nevojat dhe kërkesat e biznesit tuaj.',
    'step2.t': 'Dizajnimi',  'step2.d': 'Ekipi ynë krijon dizajne unike që reflektojnë identitetin e markës tuaj.',
    'step3.t': 'Printimi',   'step3.d': 'Prodhim me teknologji të avancuar dhe materiale cilësore të zgjedhura me kujdes.',
    'step4.t': 'Dorëzimi',   'step4.d': 'Dorëzim i shpejtë dhe i sigurt direkt te biznesi juaj.',

    /* Portfolio */
    'port.badge': 'Portofoli Ynë',
    'port.title': 'Punët Tona Flasin Vetë',
    'port.sub':   'Shfletoni disa prej projekteve tona më të fundit për klientë nga sektorë të ndryshëm.',
    'port.label1': 'Paketime Fast Food',
    'port.label2': 'Paketime Farmaceutike',
    'port.label3': 'Kupa & Enë',
    'port.label4': 'Branding i Personalizuar',
    'port.label5': 'Paketime Premium',
    'index.bit.desc': 'Wok & Seafood · 11 lloje ambalazhi',

    /* Why */
    'why.badge':  'Pse ERA',
    'why.title':  'Cilësi dhe Besueshmëri',
    'why.sub':    'Zgjidhni partnerin e duhur për ambalazhimin e biznesit tuaj.',
    'why1.t': 'Cilësi e Garantuar',       'why1.d': 'Materiale premium dhe procese të certifikuara garantojnë produkte të qëndrueshme dhe tërheqëse.',
    'why2.t': 'Shërbim i Shpejtë',        'why2.d': 'Prodhim dhe dorëzim brenda afateve të shkurtra. Koha juaj është e vlefshme.',
    'why3.t': 'Çmime Konkurruese',        'why3.d': 'Ofrojmë çmime të arsyeshme pa kompromis në cilësi. Kurse para pa sakrifikuar standardin.',
    'why4.t': 'Dizajn Profesional',       'why4.d': 'Ekip i talentuar dizajnerësh krijon ambalazhë që tërheq vëmendjen dhe shton vlerën e markës.',
    'why5.t': 'Mbështetje 24/7',          'why5.d': 'Jemi gjithmonë të disponueshëm për pyetjet dhe kërkesat tuaja. Partneritet i vërtetë.',
    'why6.t': 'Miqësor me Mjedisin',      'why6.d': 'Materiale të riciklueshme dhe procese të qëndrueshme për një të ardhme më të gjelbër.',

    /* Testimonials */
    'test.badge': 'Çfarë Thonë Klientët',
    'test.title': 'Ata Na Besuan, Ne E Realizuam',
    't1.text': '"ERA Print Pack ka transformuar mënyrën si paraqitemi para klientëve tanë. Paketimet janë profesionale, rezistente dhe tërheqëse. I rekomandoj shumë!"',
    't1.name': 'Ardian Krasniqi', 't1.role': 'Pronar, Restoranti Shqiponja',
    't2.text': '"Bashkëpunimi me ERA ka qenë i shkëlqyer. Dorëzim në kohë, cilësi e lartë dhe çmime shumë të arsyeshme. Partneri ynë i besueshëm!"',
    't2.name': 'Teuta Berisha', 't2.role': 'Menaxhere, Farmacia Plus',
    't3.text': '"Dizajni i ri i ambalazit ka rritur ndjeshëm shitjet tona. Klientët tanë e vërejnë cilësinë menjëherë. Faleminderit ERA!"',
    't3.name': 'Besnik Gashi', 't3.role': 'Drejtor Marketing, FoodCo',
    't4.text': '"Cilësia e ambalazhisthit të ERA është e pakrahasueshme. Klientët tanë mbesin të mahnitur me paraqitjen e kafesë sonë."',
    't4.name': 'Vjosa Ahmeti', 't4.role': 'Pronare, Kafeja Orizont',
    't5.text': '"Kemi punuar me shumë furnizues, por ERA është dallim i madh. Saktësi, profesionalizëm dhe çmime që i përshtaten biznesit tonë."',
    't5.name': 'Liridon Mustafa', 't5.role': 'Drejtor, Fast Food Liri',
    't6.text': '"Kupat tona të akullores me logon tonë janë bërë markë e njohur në qytet. Faleminderit ERA për cilësinë e jashtëzakonshme!"',
    't6.name': 'Drita Hoxha', 't6.role': 'Pronare, Gelateria Drita',
    't7.text': '"ERA na ka ndihmuar të ndërtojmë imazhin e kompanisë sonë. Çdo ambalazh reflekton vlerat tona dhe kujdesin ndaj klientit."',
    't7.name': 'Kujtim Bajrami', 't7.role': 'CEO, Catering Bajrami',
    't8.text': '"Prej kur kaluam te ERA, kthimi i klientëve tanë është rritur. Paketimet tregojnë seriozitetin e biznesit tonë."',
    't8.name': 'Shpresa Osmani', 't8.role': 'Menaxhere, Furra Osmani',
    't9.text': '"Partneritet i shkëlqyer. ERA kupton nevojat e restorantit dhe dorëzon gjithmonë sipas pritshmërive tona."',
    't9.name': 'Erion Halili', 't9.role': 'F&B Menaxher, Hotel Grand',

    /* About intro (homepage SEO section) */
    'about.seo.title': 'Producent kosovar me 15 vite eksperiencë',
    'about.seo.text':  'ERA Print Pack është producent i specializuar i ambalazheve të letrës — gota, kupa, kuti ushqimore dhe paketime të personalizuara me printim offset. Me 13 makina prodhimi dhe mbi 397 klientë aktiv, shërbejmë kafene, restorante, fast food dhe biznese të industrisë ushqimore në Kosovë dhe rajon.',

    /* Partners */
    'partners.label': 'Besuar nga bizneset kryesore',

    /* CTA */
    'cta.title': 'Gati të Transformoni Biznesin Tuaj?',
    'cta.sub':   'Kontaktoni ekipin tonë sot dhe merrni një ofertë falas pa asnjë detyrim.',
    'cta.btn1':  'Kërko Ofertë Falas',
    'cta.btn2':  'Na Kontaktoni',

    /* Footer */
    'footer.desc':   'Lider në printim dhe ambalazhim cilësor në Kosovë. E ndihmojmë markën tuaj të dallohet me paketime profesionale.',
    'footer.links':  'Lidhje të Shpejta',
    'footer.info':   'Informacion',
    'footer.contact':'Na Kontaktoni',
    'footer.rights': '© 2025 ERA Print Pack. Të drejtat e rezervuara.',
    'footer.privacy_link':'Politika e Privatësisë',
    'footer.terms_link':  'Kushtet e Përdorimit',
    'footer.made': 'Krijuar me kujdes në Kosovë',

    /* Products page */
    'prod.badge':   'Produktet Tona',
    'prod.title':   'Gama e Plotë e <span style="color:var(--green)">Produkteve</span>',
    'prod.sub':     'Zbuloni koleksionin tonë të plotë të ambalazhëve dhe zgjidhjeve të printimit.',
    'filter.all':    'Të Gjitha',
    'filter.kupa':   'Gota & Kupa',
    'filter.kuti':   'Kuti & Ambalazhe',
    'filter.leter':  'Letër & Mbajtëse',
    'filter.etiketa':'Etiketa & Kartona',
    'custom.title': 'Çdo Produkt, Me Logon Tuaj',
    'custom.desc':  'Ofrojmë personalizim të plotë — logo, ngjyra dhe dizajn unik mbi çdo ambalazh. Kontaktoni për ofertë falas.',

    /* About page */
    'about.badge':  'Historia Jonë',
    'about.title':  '<span style="color:var(--green)">15+</span> Vite Eksperiencë në Industri',
    'about.sub':    'Nga një kompani e vogël te një nga emrat më të njohur në tregun vendor — kjo është historia jonë.',
    'about.p1':     'ERA Print Pack është një nga prodhuesit kryesorë të ambalazhi letre në Kosovë. Me 13 makina prodhimi dhe mbi 276 variante produktesh, prodhojmë çdo gjë — nga gota letre për kafe deri tek ambalazhet premium me foli të artë — gjithçka me dizajn të personalizuar për biznesin tuaj.',
    'about.p2':     'Çdo produkt që largon fabrikën tonë bart me vete angazhimin tonë ndaj cilësisë, inovacionit dhe kënaqësisë së klientit. Investojmë vazhdimisht në teknologji të reja dhe trajnim të ekipit për të qëndruar në ballë të industrisë.',
    'prod.sec.badge': 'Prodhimi Ynë',
    'prod.sec.title': 'Teknologji Moderne, Rezultate Perfekte',
    'prod.sec.sub':   'Linja jonë e prodhimit është e pajisur me makineritë më moderne të industrisë.',
    'val1': 'Cilësi Premium',  'val2': 'Inovacion i Vazhdueshëm',
    'val3': 'Klient në Qendër','val4': 'Miqësor me Mjedisin',
    'val5': 'Dorëzim në Kohë', 'val6': 'Çmime Transparente',
    'mission.badge': 'Misioni Ynë',
    'mission.title': 'Transformojmë Idetë në Realitet',
    'mission.text':  'Misioni ynë është të bëhemi partneri i parë i zgjedhur për çdo biznes që dëshiron ambalazhë cilësore, profesionale dhe të personalizuar. Besojmë se paketimi i mirë nuk është luksi — është investim.',
    'team.badge':    'Ekipi Ynë',
    'team.title':    'Njerëzit Pas Suksesit',
    'team.sub':      'Ekipi ynë i talentuar punon çdo ditë për të sjellë produktet më cilësore te klientët tanë.',

    /* Contact page */
    'contact.badge':  'Na Kontaktoni',
    'contact.title':  'Jemi Këtu për <span style="color:var(--green)">Ju</span>',
    'contact.sub':    'Keni pyetje ose dëshironi një ofertë? Na shkruani ose na kontaktoni drejtpërdrejt.',
    'ci.phone':       'Telefon', 'ci.email': 'Email', 'ci.address': 'Adresa', 'ci.hours': 'Orari',
    'ci.phone.v':     '+383 44 113 533',
    'ci.email.v':     'info@eraprintpack.com',
    'ci.address.v':   'Rr. Jakup Musa nr. 36, magjistralja Ferizaj-Prishtinë',
    'ci.hours.v':     'E Hënë – E Premte: 08:00 – 17:00',
    'form.title':     'Dërgo Mesazh',
    'form.name':      'Emri & Mbiemri', 'form.biz': 'Emri i Biznesit',
    'form.email':     'Email Adresa',   'form.phone': 'Numri i Telefonit',
    'form.service':   'Lloji i Shërbimit', 'form.service.default': 'Zgjidhni shërbimin...',
    'form.msg':       'Mesazhi Juaj',
    'form.submit':    'Dërgo Kërkesën',
    'form.s.food':    'Paketime Fast Food',
    'form.s.pharma':  'Paketime Farmaceutike',
    'form.s.brand':   'Branding i Personalizuar',
    'form.s.print':   'Printim Offset/Digital',
    'form.s.other':   'Tjetër',
    'map.label':      '📍 ERA Print Pack – Kosovo',
    'whatsapp.tip':   'Na shkruaj në WhatsApp',

    /* Machines page */
    'nav.machines':  'Makinat',
    'mach.badge':    'Kapacitetet Tona',
    'mach.title':    '<span style="color:var(--green)">13</span> Makina Prodhimi',
    'mach.sub':      'Linja jonë e prodhimit përdor teknologji të avancuar, nga shtypja offset Heidelberg deri te formuesit automatikë të gotave letre.',
    'mach.s1': 'Makina Prodhimi', 'mach.s2': 'Kategori Prodhimi',
    'mach.s3': 'Paketa / 2025',  'mach.s4': 'Makina Më e Vjetër',
    'mach.photo': 'Foto vjen së shpejti',

    /* Process */
    'proc.badge':  'Procesi i Prodhimit',
    'proc.title':  'Nga Letra në Produkt Final',
    'proc.sub':    'Çdo porosi kalon nëpër 5 faza të kontrolluara — nga dizajni i aprovuar deri tek dorëzimi te klienti.',
    'proc.s1.t': 'Dizajni & Aprovimi',  'proc.s1.d': 'Ju dërgoni logon dhe brief-in. Ne përgatisim dizajnin e paketës dhe fillojmë prodhimin vetëm pas aprovimit tuaj.',
    'proc.s2.t': 'Pre-press & Pllakat', 'proc.s2.d': 'Ndajmë ngjyrat (CMYK), bëjmë provë kampioni dhe përgatisim pllakat metalike për makinën offset.',
    'proc.s3.t': 'Printimi Offset',     'proc.s3.d': 'Printim me 4 ngjyra në makinën Heidelberg. Kampioni aprovohet para se të fillojë prodhimi i plotë.',
    'proc.s4.t': 'Shtancimi & Formimi', 'proc.s4.d': 'Fletat e printuara priten në formën finale të paketës, pastaj formohen — gota, kupa, kuti, apo mbajtese.',
    'proc.s5.t': 'Kontroll & Dorëzim',  'proc.s5.d': 'Çdo porosi kontrollohet, paketohet me emrin dhe sasinë tuaj, dhe dërgohet direkt te ju.',

    /* Machine categories */
    'mcat.print':   'Printimi',
    'mcat.print.d': 'Shtypja offset 4-ngjyrëshe me teknologji Heidelberg — standardi i artë i printimit komercial.',
    'mcat.die':     'Prerja & Stampimi',
    'mcat.die.d':   'Dy makina prerëse me kapacitet total 12,500 copë/orë.',
    'mcat.box':     'Formimi i Kutive',
    'mcat.box.d':   'Palosja dhe ngjitja automatike e kutive të gatshme nga blanket e stampuara.',
    'mcat.food':    'Paketime Ushqimore',
    'mcat.food.d':  'Gjashtë makina dedikuar prodhimit të gotave, enëve dhe mbajtëseve letre.',

    /* Machine descriptions */
    'm.heidelberg.d': 'Standardi i artë i printimit offset komercial. I mundëson ERA të prodhojë ngjyra të mprehta dhe të qëndrueshme me saktësi të lartë në çdo material paketimi.',
    'm.lukes.d':      'Makina kryesore e prerjes — trajton të gjithë procesin automatik nga ushqimi i letrës deri tek dorëzimi i blanketit të prerë dhe stampuar me saktësi.',
    'm.tmz.d':        'Makinë e ndërtuar në Spanjë, dëshmi e qëndrueshmërisë industriale. Vazhdon të ofrojë performancë të besueshme si linja jonë dytësore e prerjes.',
    'm.gs.d':         'Palos dhe ngjit automatikisht blanket në kuti të gatshme me shpejtësi të lartë. Prodhon kuti drejt, crash-lock, 4-cep dhe 6-cep — pothuajse të gjitha formatet standarde.',
    'm.zhejiang.d':   'Folder gluer kompakt, plotësisht automatik për volum të lartë prodhimi të kutive standarde. Blanket brenda — kuti të ngjitura jashtë, pa ndërhyrje manuale.',
    'm.cups.d':       'Tri makina, secila e konfiguruar për një madhësi të ndryshme: 3.5oz, 7oz dhe 12oz. Formojnë, saldojnë dhe kthejnë automatikisht gota letre nga blanket të stampuara.',
    'm.bowls.d':      'Dy makina të reja prodhojnë kupa letre me format të madh për akullore dhe pasta. Makina e dytë është e pajtueshme me kapak PET të veçantë.',
    'm.cutlery.badge':  'Adaptim Origjinal ERA',
    'm.cutlery.name':   'Mbajtëse Takëmesh — Adaptim ERA',
    'm.cutlery.d':      'Kjo makinë u adaptua me kreativitet nga themeluesi i ERA për të prodhuar mbajtëse letre për takëme. Fillimisht projektuar për aplikim tjetër — u modifikua sipas nevojave specifike të ERA, duke treguar zgjuarsinë teknike dhe ekspertizën praktike të familjes.',
    'm.cutlery.type':   'Adaptim në vend',
    'm.cutlery.origin': 'ERA — Kosovo',

    /* Machine spec labels */
    'ms.format': 'Formati', 'ms.colors': 'Ngjyrat',   'ms.type': 'Lloji',
    'ms.origin': 'Origjina','ms.maxsize': 'Max Madhësia','ms.speed': 'Shpejtësia',
    'ms.pressure':'Presioni','ms.stock':  'Materiali',  'ms.year': 'Viti',
    'ms.maxwidth':'Max Gjerësia','ms.boxtypes':'Llojet Kutive','ms.power':'Fuqia',
    'ms.sizes':  'Madhësitë','ms.machines':'Nr. Makinave','ms.operation':'Operimi',
    'ms.straightline': 'Vijë e drejtë automatike',
    'ms.fullauto':     'Plotësisht automatik',
  },

  en: {
    /* Navbar */
    'nav.home':     'Home',
    'nav.products': 'Products',
    'nav.about':    'About Us',
    'nav.contact':  'Contact',
    'nav.order':    'Order',
    'nav.cta':      'Get a Quote',

    /* Hero */
    'hero.badge':   'Industry Leader',
    'hero.title':   'Packaging That Shows the <span class="text-green">Quality</span> of Your Business',
    'hero.sub':     'Professional packaging and printing solutions for businesses in Kosovo and the region. Distinctive design, premium materials, and fast delivery.',
    'hero.cta1':    'Get a Free Quote',
    'hero.cta2':    'View Products',
    'hero.cta3':    'Order Now',
    'hero.stat1.n': '15+',    'hero.stat1.l': 'Years of Experience',
    'hero.stat2.n': '397',    'hero.stat2.l': 'Active Clients',
    'hero.stat3.n': '13',     'hero.stat3.l': 'Production Machines',
    'hero.stat4.n': '3.9M+',  'hero.stat4.l': 'Packages / 2025',
    'hero.scroll':  'Discover More',

    /* Services */
    'services.badge':  'What We Offer',
    'services.title':  'Complete Packaging Solutions',
    'services.sub':    'From fast food to pharmaceuticals, we offer quality packaging for every business sector.',
    'srv1.title': 'Fast Food Packaging',
    'srv1.desc':  'Boxes, bags and containers for restaurants, fast food outlets and cafes. Heat and grease resistant.',
    'srv2.title': 'Paper Cups',
    'srv2.desc':  'Paper cups for coffee, tea and cold drinks. Available in 3.5oz, 7oz and 12oz sizes with full custom printing.',
    'srv3.title': 'Custom Branding',
    'srv3.desc':  'Your logo, colors and unique design on packaging. Make your business stand out from competitors.',
    'srv4.title': 'Offset & Digital Printing',
    'srv4.desc':  'High-quality printing with stable colors. Modern technology for perfect results every time.',
    'tops.badge': 'Top Sellers',
    'tops.title': 'The Two Products Clients Order Most',
    'tops.sub': 'From daily-volume essentials to fast-moving food packaging, these are the strongest performers in the ERA range.',
    'tops.card.badge': 'Top Seller',
    'tops.card.kicker1': 'Highest-volume product',
    'tops.card.title1': 'Paper Cups',
    'tops.card.desc1': 'A practical choice for coffee, tea, and cold drinks with fully custom printing.',
    'tops.card.stat1': '2.3M units in 2025',
    'tops.card.kicker2': 'Strong fast-food performer',
    'tops.card.title2': 'Pasta & Soup Bowls',
    'tops.card.desc2': 'Durable bowls for pasta, soups, and delivery meals that need a clean presentation.',
    'tops.card.stat2': '980K units in 2025',
    'tops.card.cta': 'View Details ->',
    'tops.more': 'View other products',

    /* How it works */
    'hiw.badge':  'How It Works',
    'hiw.title':  'From Idea to Final Product',
    'hiw.sub':    'Our simple 4-step process ensures the right result every time.',
    'step1.t': 'Consultation', 'step1.d': 'We meet with you to understand the needs and requirements of your business.',
    'step2.t': 'Design',       'step2.d': 'Our team creates unique designs that reflect your brand identity.',
    'step3.t': 'Production',   'step3.d': 'Manufacturing with advanced technology and carefully selected quality materials.',
    'step4.t': 'Delivery',     'step4.d': 'Fast and secure delivery directly to your business door.',

    /* Portfolio */
    'port.badge': 'Our Portfolio',
    'port.title': 'Our Work Speaks for Itself',
    'port.sub':   'Browse some of our latest projects for clients from various sectors.',
    'port.label1': 'Fast Food Packaging',
    'port.label2': 'Pharmaceutical Packaging',
    'port.label3': 'Cups & Containers',
    'port.label4': 'Custom Branding',
    'port.label5': 'Premium Packaging',
    'index.bit.desc': 'Wok & Seafood · 11 packaging types',

    /* Why */
    'why.badge':  'Why ERA',
    'why.title':  'Quality and Reliability',
    'why.sub':    'Choose the right partner for your business packaging needs.',
    'why1.t': 'Guaranteed Quality',    'why1.d': 'Premium materials and certified processes guarantee durable and attractive products.',
    'why2.t': 'Fast Service',          'why2.d': 'Production and delivery within short deadlines. Your time is valuable.',
    'why3.t': 'Competitive Prices',    'why3.d': 'We offer fair prices without compromising on quality. Save money without sacrificing standards.',
    'why4.t': 'Professional Design',   'why4.d': 'A talented team of designers creates packaging that catches attention and adds brand value.',
    'why5.t': '24/7 Support',          'why5.d': 'We are always available for your questions and requests. A true partnership.',
    'why6.t': 'Eco-Friendly',          'why6.d': 'Recyclable materials and sustainable processes for a greener future.',

    /* Testimonials */
    'test.badge': 'What Clients Say',
    'test.title': 'They Trusted Us, We Delivered',
    't1.text': '"ERA Print Pack has transformed how we present ourselves to our customers. The packaging is professional, durable and attractive. Highly recommended!"',
    't1.name': 'Ardian Krasniqi', 't1.role': 'Owner, Restaurant Shqiponja',
    't2.text': '"Our collaboration with ERA has been excellent. On-time delivery, high quality and very reasonable prices. Our trusted partner!"',
    't2.name': 'Teuta Berisha', 't2.role': 'Manager, Farmacia Plus',
    't3.text': '"The new packaging design has significantly increased our sales. Our customers notice the quality immediately. Thank you ERA!"',
    't3.name': 'Besnik Gashi', 't3.role': 'Marketing Director, FoodCo',
    't4.text': '"The quality of ERA\'s packaging is unmatched. Our customers are amazed by the presentation of our café."',
    't4.name': 'Vjosa Ahmeti', 't4.role': 'Owner, Kafeja Orizont',
    't5.text': '"We\'ve worked with many suppliers, but ERA is a big difference. Precision, professionalism and prices that fit our business."',
    't5.name': 'Liridon Mustafa', 't5.role': 'Director, Fast Food Liri',
    't6.text': '"Our ice cream cups with our logo have become a well-known brand in the city. Thank you ERA for the exceptional quality!"',
    't6.name': 'Drita Hoxha', 't6.role': 'Owner, Gelateria Drita',
    't7.text': '"ERA has helped us build our company image. Every package reflects our values and care for customers."',
    't7.name': 'Kujtim Bajrami', 't7.role': 'CEO, Catering Bajrami',
    't8.text': '"Since switching to ERA, our customer return rate has increased. The packaging shows the seriousness of our business."',
    't8.name': 'Shpresa Osmani', 't8.role': 'Manager, Furra Osmani',
    't9.text': '"Excellent partnership. ERA understands the restaurant\'s needs and always delivers according to our expectations."',
    't9.name': 'Erion Halili', 't9.role': 'F&B Manager, Hotel Grand',

    /* About intro (homepage SEO section) */
    'about.seo.title': 'Kosovo-based manufacturer with 15 years of experience',
    'about.seo.text':  'ERA Print Pack is a specialized manufacturer of paper packaging — cups, bowls, food boxes and custom printed packaging using offset printing. With 13 production machines and over 397 active clients, we serve cafes, restaurants, fast food businesses and the food industry across Kosovo and the region.',

    /* Partners */
    'partners.label': 'Trusted by leading businesses',

    /* CTA */
    'cta.title': 'Ready to Transform Your Business?',
    'cta.sub':   'Contact our team today and get a free quote with no obligation.',
    'cta.btn1':  'Get a Free Quote',
    'cta.btn2':  'Contact Us',

    /* Footer */
    'footer.desc':   'A leader in quality printing and packaging in Kosovo. We help your brand stand out through professional packaging.',
    'footer.links':  'Quick Links',
    'footer.info':   'Information',
    'footer.contact':'Contact Us',
    'footer.rights': '© 2025 ERA Print Pack. All rights reserved.',
    'footer.privacy_link':'Privacy Policy',
    'footer.terms_link':  'Terms of Use',
    'footer.made': 'Made with care in Kosovo',

    /* Products page */
    'prod.badge':   'Our Products',
    'prod.title':   'Our Full <span style="color:var(--green)">Product Range</span>',
    'prod.sub':     'Discover our complete collection of packaging and printing solutions.',
    'filter.all':    'All',
    'filter.kupa':   'Cups & Bowls',
    'filter.kuti':   'Boxes & Packaging',
    'filter.leter':  'Paper & Holders',
    'filter.etiketa':'Labels & Cardboard',
    'custom.title': 'Every Product, With Your Logo',
    'custom.desc':  'We offer full customization — logo, colors and unique design on any packaging. Contact us for a free quote.',

    /* About page */
    'about.badge':  'Our Story',
    'about.title':  '<span style="color:var(--green)">15+</span> Years of Industry Experience',
    'about.sub':    'From a small company to the regional market leader — this is our story.',
    'about.p1':     'ERA is one of Kosovo\'s leading paper packaging manufacturers. With 13 production machines and over 276 product variants, we produce everything from custom printed coffee cups to premium gold foil gift boxes — all with your brand, your design, your identity.',
    'about.p2':     'Every product that leaves our factory carries our commitment to quality, innovation and customer satisfaction. We continually invest in new technologies and team training to stay at the forefront of the industry.',
    'prod.sec.badge': 'Our Production',
    'prod.sec.title': 'Modern Technology, Perfect Results',
    'prod.sec.sub':   'Our production line is equipped with the most modern machinery in the industry.',
    'val1': 'Premium Quality',    'val2': 'Continuous Innovation',
    'val3': 'Client-Centric',     'val4': 'Eco-Friendly',
    'val5': 'On-Time Delivery',   'val6': 'Transparent Pricing',
    'mission.badge': 'Our Mission',
    'mission.title': 'We Turn Ideas Into Reality',
    'mission.text':  'Our mission is to become the first-choice partner for every business that wants quality, professional and customized packaging. We believe good packaging is not a luxury — it is an investment.',
    'team.badge':    'Our Team',
    'team.title':    'The People Behind the Success',
    'team.sub':      'Our talented team works every day to bring the highest quality products to our clients.',

    /* Contact page */
    'contact.badge':  'Contact Us',
    'contact.title':  'We Are Here for <span style="color:var(--green)">You</span>',
    'contact.sub':    'Have a question or want a quote? Send us a message or get in touch directly.',
    'ci.phone':       'Phone', 'ci.email': 'Email', 'ci.address': 'Address', 'ci.hours': 'Hours',
    'ci.phone.v':     '+383 44 113 533',
    'ci.email.v':     'info@eraprintpack.com',
    'ci.address.v':   'Jakup Musa St. No. 36, Ferizaj-Prishtina Highway',
    'ci.hours.v':     'Monday – Friday: 08:00 – 17:00',
    'form.title':     'Send a Message',
    'form.name':      'Full Name', 'form.biz': 'Business Name',
    'form.email':     'Email Address', 'form.phone': 'Phone Number',
    'form.service':   'Service Type', 'form.service.default': 'Select a service...',
    'form.msg':       'Your Message',
    'form.submit':    'Send Request',
    'form.s.food':    'Fast Food Packaging',
    'form.s.pharma':  'Pharmaceutical Packaging',
    'form.s.brand':   'Custom Branding',
    'form.s.print':   'Offset/Digital Printing',
    'form.s.other':   'Other',
    'nav.machines':  'Machines',
    'mach.badge':    'Our Capabilities',
    'mach.title':    '13 Production Machines',
    'mach.sub':      'Our production line uses advanced industrial technology, from Heidelberg offset printing to automatic paper cup forming machines.',
    'mach.s1': 'Production Machines', 'mach.s2': 'Production Categories',
    'mach.s3': 'Packages / 2025',     'mach.s4': 'Oldest Machine',
    'mach.photo': 'Photo coming soon',
    'proc.badge':  'Production Process',
    'proc.title':  'From Paper to Final Product',
    'proc.sub':    'Every order goes through 5 controlled stages — from approved design to delivery at your door.',
    'proc.s1.t': 'Design & Approval',   'proc.s1.d': 'You send your logo and brief. We prepare the packaging design and only start production after your approval.',
    'proc.s2.t': 'Pre-press & Plates',  'proc.s2.d': 'We separate colors (CMYK), produce a test proof, and prepare the metal plates for the offset press.',
    'proc.s3.t': 'Offset Printing',     'proc.s3.d': 'Full 4-color printing on our Heidelberg press. A sample is approved before the full production run begins.',
    'proc.s4.t': 'Die Cutting & Forming','proc.s4.d': 'Printed sheets are cut into the final packaging shape, then formed — cups, bowls, boxes, or holders.',
    'proc.s5.t': 'Quality & Delivery',  'proc.s5.d': 'Every order is quality-checked, packed with your name and quantity, and shipped directly to you.',
    'mcat.print':   'Printing',
    'mcat.print.d': '4-color offset printing with Heidelberg technology — the gold standard of commercial printing.',
    'mcat.die':     'Die Cutting',
    'mcat.die.d':   'Two die cutting machines with a combined capacity of 12,500 sheets/hour.',
    'mcat.box':     'Box Making',
    'mcat.box.d':   'Automatic folding and gluing of finished boxes from die-cut blanks.',
    'mcat.food':    'Food Packaging',
    'mcat.food.d':  'Six machines dedicated to producing paper cups, bowls and cutlery holders.',
    'm.heidelberg.d': 'The gold standard of commercial offset printing. Enables ERA to produce sharp, vibrant, full-color prints on packaging materials with exceptional consistency and speed.',
    'm.lukes.d':      'ERA\'s primary die cutting machine — handles the full automated process from paper feeding through die cutting and creasing to delivery of ready blanks.',
    'm.tmz.d':        'Built in Spain, this machine is a testament to industrial durability. Still delivering reliable die cutting performance as our secondary production line.',
    'm.gs.d':         'Automatically folds and glues die-cut blanks into finished boxes at high speed. Produces straight-line, crash lock, 4-corner and 6-corner box styles.',
    'm.zhejiang.d':   'Compact, fully automatic straight-line folder gluer for high-volume production of standard boxes. Blanks go in, glued boxes come out — no manual intervention.',
    'm.cups.d':       'Three machines, each configured for a different cup size: 3.5oz, 7oz and 12oz. Automatically form, seal and curl food-grade paper cups from pre-printed blanks.',
    'm.bowls.d':      'Two new machines producing large-format paper bowls for ice cream and pasta. The second machine is compatible with separate PET lids.',
    'm.cutlery.badge':  'ERA Original Adaptation',
    'm.cutlery.name':   'Cutlery Holder Machine — ERA Adaptation',
    'm.cutlery.d':      'This machine was creatively adapted in-house by ERA\'s founder to produce paper cutlery pockets. Originally designed for a different application — modified to meet ERA\'s specific needs, reflecting the hands-on ingenuity of this family business.',
    'm.cutlery.type':   'In-house adaptation',
    'm.cutlery.origin': 'ERA — Kosovo',
    'ms.format': 'Format', 'ms.colors': 'Colors',    'ms.type': 'Type',
    'ms.origin': 'Origin','ms.maxsize':'Max Size','ms.speed': 'Speed',
    'ms.pressure':'Pressure','ms.stock':  'Stock',    'ms.year': 'Year',
    'ms.maxwidth':'Max Width','ms.boxtypes':'Box Types','ms.power': 'Power',
    'ms.sizes':  'Sizes',   'ms.machines':'No. Machines','ms.operation':'Operation',
    'ms.straightline': 'Straight-line automatic',
    'ms.fullauto':     'Fully automatic',
    'map.label':      '📍 ERA Print Pack – Kosovo',
    'whatsapp.tip':   'Chat with us on WhatsApp',
  }
};

let currentLang = localStorage.getItem('era-lang') || 'al';

function t(key) {
  return TRANSLATIONS[currentLang][key] || TRANSLATIONS['al'][key] || key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else if (el.tagName === 'OPTION') {
      el.textContent = val;
    } else {
      el.innerHTML = val;
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
  document.documentElement.lang = currentLang === 'al' ? 'sq' : 'en';
  if (typeof window.applyPageTranslations === 'function') {
    window.applyPageTranslations(currentLang);
  }
  if (typeof window.applyPageMeta === 'function') {
    window.applyPageMeta(currentLang);
  }
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('era-lang', lang);
  applyTranslations();
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  // Refresh product count if on products page
  const countEl = document.getElementById('productCount');
  if (countEl) {
    const total = document.querySelectorAll('.product-card').length;
    countEl.textContent = lang === 'en'
      ? `Showing ${total} products`
      : `Duke treguar ${total} produkte`;
  }
}

/* ── Navbar scroll behavior ─────────────────────────────────── */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  if (!document.querySelector('.hero, .page-hero, #scroll-hero-spacer')) {
    navbar.classList.add('scrolled');
    return;
  }
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Mobile menu ────────────────────────────────────────────── */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;

  function openMenu() {
    mobileNav.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-label', 'Mbyll menunë');
  }
  function closeMenu() {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-label', 'Menu');
  }

  hamburger.addEventListener('click', () => {
    mobileNav.classList.contains('open') ? closeMenu() : openMenu();
  });
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      closeMenu();
    }
  });
}

/* ── Fade-in on scroll ──────────────────────────────────────── */
function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  // Reveal helper: checks if element is in the viewport using getBoundingClientRect.
  // If layout isn't ready yet (rect.height === 0), reveals the element immediately
  // so content is never stuck invisible (headless browsers / DOMContentLoaded timing).
  const vh = window.innerHeight || document.documentElement.clientHeight || 900;
  els.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.height === 0 || (rect.top < vh && rect.bottom > 0)) {
      el.classList.add('visible');
    }
  });

  // Use IntersectionObserver to reveal below-fold elements as they scroll into view
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => obs.observe(el));
}

/* ── Counter animation ──────────────────────────────────────── */
function animateCounters() {
  // easeOutExpo: rockets to ~95% instantly, then crawls dramatically to land
  function easeOutExpo(t) { return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t); }

  document.querySelectorAll('.hero-stat-number[data-target]').forEach((el, i) => {
    const target   = parseFloat(el.dataset.target);
    const suffix   = el.dataset.suffix   || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const duration = 1900 + i * 220;
    const delay    = i * 160;

    const startAt = performance.now() + delay;

    function fmt(v) {
      return (decimals > 0 ? v.toFixed(decimals) : Math.floor(v)) + suffix;
    }

    el.textContent = fmt(0);
    el.classList.add('counting');

    function tick(now) {
      if (now < startAt) { requestAnimationFrame(tick); return; }
      const progress = Math.min((now - startAt) / duration, 1);
      el.textContent = fmt(easeOutExpo(progress) * target);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = fmt(target);
        el.classList.remove('counting');
      }
    }

    requestAnimationFrame(tick);
  });
}

/* ── Product filter ─────────────────────────────────────────── */
function initFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.product-card');
  const countEl = document.getElementById('productCount');
  if (!btns.length) return;

  function updateCount(cat) {
    if (!countEl) return;
    const visible = cat === 'all'
      ? cards.length
      : [...cards].filter(c => c.dataset.cat === cat).length;
    countEl.textContent = currentLang === 'en'
      ? `Showing ${visible} product${visible !== 1 ? 's' : ''}`
      : `Duke treguar ${visible} produkte`;
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      cards.forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
      });
      updateCount(cat);
    });
  });
}

/* ── Contact form ───────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    const orig = btn.innerHTML;
    btn.innerHTML = currentLang === 'al' ? '✓ Kërkesa u dërgua!' : '✓ Request Sent!';
    btn.disabled = true;
    btn.style.background = '#3a8005';
    setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; btn.style.background = ''; }, 3500);
  });
}

/* ── Active nav link ────────────────────────────────────────── */
function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === page);
  });
}

/* ── Shared Navbar ──────────────────────────────────────────── */
function initSharedNav() {
  const el = document.getElementById('site-nav');
  if (!el) return;
  el.innerHTML = `
<nav class="navbar">
  <div class="container">
    <div class="navbar-inner">
      <a href="index.html" class="logo">
        <img src="assets/era-logo.svg" alt="ERA Print Pack Logo" />
      </a>
      <ul class="nav-links">
        <li><a href="index.html"    class="nav-link" data-i18n="nav.home"></a></li>
        <li><a href="products.html" class="nav-link" data-i18n="nav.products"></a></li>
        <li><a href="machines.html" class="nav-link" data-i18n="nav.machines"></a></li>
        <li><a href="about.html"    class="nav-link" data-i18n="nav.about"></a></li>
        <li><a href="contact.html"  class="nav-link" data-i18n="nav.contact"></a></li>
        <li><a href="order.html"    class="nav-link nav-link-order" data-i18n="nav.order"></a></li>
      </ul>
      <div class="nav-right">
        <div class="lang-toggle">
          <button class="lang-btn active" data-lang="al">AL</button>
          <button class="lang-btn" data-lang="en">EN</button>
        </div>
        <a href="contact.html" class="btn btn-primary btn-sm" data-i18n="nav.cta" aria-label="Kërko Ofertë">Kërko Ofertë</a>
      </div>
      <button class="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>
<div class="mobile-nav">
  <a href="index.html"    class="nav-link" data-i18n="nav.home"></a>
  <a href="products.html" class="nav-link" data-i18n="nav.products"></a>
  <a href="machines.html" class="nav-link" data-i18n="nav.machines"></a>
  <a href="about.html"    class="nav-link" data-i18n="nav.about"></a>
  <a href="contact.html"  class="nav-link" data-i18n="nav.contact"></a>
  <a href="order.html"    class="nav-link" data-i18n="nav.order"></a>
  <a href="contact.html"  class="btn btn-primary btn-sm" style="margin-top:12px;justify-content:center;" data-i18n="nav.cta"></a>
</div>`;
}

/* ── Shared WhatsApp Float ───────────────────────────────────── */
function initWhatsApp() {
  const el = document.getElementById('site-whatsapp');
  if (!el) return;
  el.innerHTML = `
<div class="whatsapp-float">
  <span class="whatsapp-tooltip" data-i18n="whatsapp.tip"></span>
  <a href="https://wa.me/38344113533" target="_blank" class="whatsapp-btn" aria-label="WhatsApp">
    <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>
</div>`;
}

/* ── Shared Footer ──────────────────────────────────────────── */
function initFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;
  el.innerHTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="assets/era-logo.svg" alt="ERA Print Pack" />
        <p data-i18n="footer.desc"></p>
        <div class="footer-social">
          <a href="https://facebook.com/shtypshkronjaera" target="_blank" class="social-btn" aria-label="Facebook">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
          </a>
          <a href="https://instagram.com/shtypshkronjaera" target="_blank" class="social-btn" aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="https://wa.me/38344113533" target="_blank" class="social-btn" aria-label="WhatsApp">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
        </div>
      </div>
      <div>
        <h4 data-i18n="footer.links"></h4>
        <ul class="footer-links">
          <li><a href="index.html"    data-i18n="nav.home"></a></li>
          <li><a href="products.html" data-i18n="nav.products"></a></li>
          <li><a href="machines.html" data-i18n="nav.machines"></a></li>
          <li><a href="about.html"    data-i18n="nav.about"></a></li>
          <li><a href="contact.html"  data-i18n="nav.contact"></a></li>
        </ul>
      </div>
      <div>
        <h4 data-i18n="footer.info"></h4>
        <ul class="footer-links">
          <li><a href="#" data-i18n="footer.privacy_link"></a></li>
          <li><a href="#" data-i18n="footer.terms_link"></a></li>
        </ul>
      </div>
      <div>
        <h4 data-i18n="footer.contact"></h4>
        <ul class="footer-contact">
          <li>
            <span class="footer-contact-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.98-.98a2 2 0 0 1 2.1-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
            <span>+383 44 113 533</span>
          </li>
          <li>
            <span class="footer-contact-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
            <span>info@eraprintpack.com</span>
          </li>
          <li>
            <span class="footer-contact-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
            <span data-i18n="ci.address.v"></span>
          </li>
          <li>
            <span class="footer-contact-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
            <span data-i18n="ci.hours.v"></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span data-i18n="footer.rights"></span>
      <span data-i18n="footer.made"></span>
    </div>
  </div>
</footer>`;
  // Re-apply translations to the newly injected footer
  applyTranslations();
}

/* ── Init ───────────────────────────────────────────────────── */
function initStepAnimations() {
  const steps = document.querySelector('.steps');
  if (steps) steps.classList.add('steps-anim');
}

function mainInit() {
  // Mark HTML so fade-in CSS activates (elements visible by default without this class)
  document.documentElement.classList.add('js-enhanced');

  // Inject shared components first so their DOM elements exist
  initSharedNav();
  initFooter();
  initWhatsApp();

  // Language buttons (nav must be injected first so .lang-btn exists)
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
  setLang(currentLang);

  initNavbar();
  initMobileMenu();
  initFadeIn();
  initFilter();
  initContactForm();
  setActiveNav();
  initStepAnimations();

  // Counter trigger on hero visibility
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    // Pre-zero immediately so i18n values never flash before counting starts
    document.querySelectorAll('.hero-stat-number[data-target]').forEach(el => {
      el.textContent = '0' + (el.dataset.suffix || '');
    });

    const pageLoadedAt = performance.now();

    function startCounters() {
      const remaining = Math.max(0, 1200 - (performance.now() - pageLoadedAt));
      if (remaining > 0) {
        // Desktop: stats visible on load — wait for hero entry animations to finish
        setTimeout(animateCounters, remaining);
      } else {
        // Mobile: user scrolled here — wait for finger to lift before animating
        let t;
        const onScroll = () => { clearTimeout(t); t = setTimeout(done, 180); };
        const done = () => { window.removeEventListener('scroll', onScroll); animateCounters(); };
        window.addEventListener('scroll', onScroll, { passive: true });
        t = setTimeout(done, 180);
      }
    }

    // If stats are already in the viewport (desktop), start straight away
    if (heroStats.getBoundingClientRect().top < window.innerHeight * 0.95) {
      startCounters();
    } else {
      // Mobile: stats are below the fold — fire as soon as they scroll into view
      const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) { startCounters(); obs.disconnect(); }
      }, { threshold: 0.1 });
      obs.observe(heroStats);
    }
  }
}

// Run immediately if DOM is ready (script at bottom of body),
// otherwise wait for DOMContentLoaded (handles edge cases with large module scripts)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mainInit);
} else {
  mainInit();
}
