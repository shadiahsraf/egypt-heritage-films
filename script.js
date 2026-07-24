/* =============================================================
   EGYPT HERITAGE FILMS — script.js  (Edition II)

   Pared back to only what earns its place:
   loader fade · nav + scrollspy · scroll reveals · video modal ·
   form validation. No particle canvas, no pointer-tilt parallax.
   ============================================================= */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $  = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  /* 0. I18N — English is authored in the HTML and captured at load;
        French and Arabic are swapped in from the dictionaries below.
        Arabic also flips the document to RTL. */
  const I18N = {
    fr: {
      "tagline": "La passion du patrimoine égyptien",
      "nav.films": "Films", "nav.crew": "Équipe", "nav.studio": "Studio",
      "nav.approach": "Approche", "nav.contact": "Contact",
      "hero.rail": "Le Caire — Studio documentaire",
      "hero.eyebrow": "Studio documentaire · Égypte",
      "hero.title": "L'histoire de l'Égypte, <span class=\"line2\"><em>racontée en lumière.</em></span>",
      "hero.tag": "Un collectif de cinéastes, une obsession — enregistrer l'histoire et le patrimoine du pays avant qu'ils ne s'effacent.",
      "hero.btn": "Découvrir les films", "hero.link": "Lancer un projet", "hero.scroll": "Défiler",
      "work.idx": "01 — Œuvres choisies", "work.title": "Des films du terrain",
      "work.exTitle": "Explorez nos histoires",
      "work.exP1": "Chaque documentaire présenté sur cette plateforme est mis en valeur par un aperçu soigneusement sélectionné, offrant une fenêtre sur les histoires que nous racontons et le patrimoine que nous préservons.",
      "work.exP2": "<strong>Les versions intégrales sont disponibles en arabe, en anglais et en français</strong>, afin que nos documentaires puissent toucher des publics par-delà les cultures et les frontières.",
      "work.exP3": "Que vous représentiez une chaîne de télévision, un établissement éducatif, une organisation culturelle, un festival ou un partenaire de distribution, nous accueillons volontiers vos demandes concernant les projections, les licences et les opportunités de collaboration.",
      "work.exCta": "Découvrez l'aperçu. Vivez l'histoire complète.",
      "film1.idx": "01 / Portfolio", "film1.title": "Film 01",
      "film2.idx": "02 / Portfolio", "film2.title": "Film 02",
      "film3.idx": "03 / Portfolio", "film3.title": "Film 03",
      "film4.idx": "04 / Portfolio", "film4.title": "Film 04",
      "film5.idx": "05 / Portfolio", "film5.title": "Film 05",
      "team.idx": "02 — Le collectif", "team.title": "Les gardiens de l'histoire",
      "crew.more": "Lire la bio complète",
      "p1.role": "Présentateur · Narrateur · Voix Off Professionnelle (FR / AR)",
      "p1.sum": "Présentateur et narrateur à Nile TV International, voix off professionnelle en français et en arabe, au service du patrimoine égyptien depuis plus de trois décennies.",
      "p1.full": `
        <p>Depuis plus de trois décennies, je consacre ma carrière à la transmission de la culture, de l'histoire et du patrimoine égyptiens auprès du public francophone et arabophone.</p>
        <p>Ancien guide-conférencier francophone depuis 1990, diplômé du Collège des Jésuites du Caire, j'ai construit un parcours fondé sur la maîtrise de la langue française, l'excellence de la narration et la passion de l'Égypte.</p>
        <p>Je suis aujourd'hui présentateur et narrateur à Nile TV International, où je participe à la réalisation d'émissions et de documentaires consacrés à la civilisation égyptienne, à l'archéologie, au patrimoine et au tourisme culturel. Parmi les productions auxquelles j'ai contribué figurent <strong>Description d'Égypte</strong>, <strong>Trésors d'Égypte</strong>, <strong>Le Journal de la Culture</strong> et <strong>13h d'Égypte</strong>.</p>
        <p>Au fil de mon parcours, j'ai assuré la narration et la présentation de nombreuses productions audiovisuelles, mettant en lumière les sites pharaoniques, coptes et islamiques les plus emblématiques d'Égypte. Mon travail s'adresse aussi bien aux chaînes de télévision qu'aux institutions culturelles, aux producteurs de documentaires et aux organismes internationaux.</p>
        <p>Ma voix, reconnue pour sa clarté, sa chaleur et sa précision, s'adapte à une grande diversité de projets : documentaires, films institutionnels, reportages, contenus touristiques, audioguides, musées, podcasts et campagnes de communication.</p>
        <p>Chaque projet représente pour moi une occasion de raconter une histoire avec authenticité, émotion et exigence professionnelle.</p>
        <h4 class="bio__subhead">Compétences</h4>
        <ul class="bio__skills">
          <li>Présentation télévisée</li>
          <li>Narration de documentaires</li>
          <li>Voix off professionnelle en français et en arabe</li>
          <li>Reportages culturels et touristiques</li>
          <li>Écriture et adaptation de textes</li>
          <li>Communication patrimoniale et audiovisuelle</li>
        </ul>
        <blockquote class="bio__quote">Donner une voix au patrimoine, raconter l'histoire avec passion et créer un lien durable entre les cultures.</blockquote>`,
      "p2.role": "Réalisateur · Producteur",
      "p2.sum": "Réalisateur et producteur de télévision en langue anglaise — talk-shows, clips musicaux, reportages de voyage et identités de chaînes, conçus pour un public international.",
      "p2.full": `
        <p>Tout au long de ma carrière, j'ai dirigé et réalisé une grande variété de contenus — des talk-shows en direct et de la satire politique aux clips musicaux, reportages de voyage et documentaires — dont beaucoup ont été diffusés en anglais à destination d'un public international. Mon travail sur les programmes anglophones de Nile TV, tels que <strong>Nile Café</strong> et <strong>Generation Talk</strong>, m'a doté de l'aisance culturelle et de la sensibilité éditoriale nécessaires pour toucher des publics variés.</p>
        <p>J'ai également réalisé et produit des campagnes de branding et des identités visuelles pour des chaînes de télévision nationales, en collaborant avec des équipes internationales et en intégrant des techniques de design visuel de pointe, dont l'incrustation (chroma) et le motion design. Ma maîtrise du montage (Avid, Final Cut) et de la narration visuelle me permet de livrer des productions abouties, du concept au montage final.</p>`,
      "p3.role": "Monteur Vidéo Senior &amp; Producteur",
      "p3.sum": "Monteur vidéo senior et producteur, fort de 20 ans à créer des publicités cinématographiques, des documentaires et des vidéos marketing dopées à l'IA pour des marques mondiales.",
      "p3.full": `
        <p>Fort de 20 ans d'expérience en production vidéo, je suis spécialisé dans la création de publicités cinématographiques, de documentaires, de films d'entreprise et de vidéos marketing propulsées par l'IA, qui aident les marques à communiquer, à engager et à se développer sur les marchés mondiaux.</p>`,
      "p4.role": "Coordinatrice de Projet · Consultante",
      "p4.sum": "Coordinatrice du projet Egypt Heritage Films — pédagogue, formatrice d'enseignants et experte en enseignement du français, à la croisée de l'éducation, de la culture et de la narration.",
      "p4.full": `
        <p>Je suis une <strong>coordinatrice de projet, formatrice d'enseignants et experte en enseignement du français</strong> expérimentée, profondément engagée pour l'excellence éducative et le développement professionnel. Depuis <strong>2018</strong>, je dirige et coordonne des projets éducatifs, conçois des programmes de formation à fort impact et accompagne les enseignants vers l'excellence pédagogique.</p>
        <p>En tant que <strong>Première Inspectrice de français</strong>, j'assure le pilotage pédagogique, l'assurance qualité et un accompagnement continu de l'enseignement du français. Je suis également <strong>conceptrice de programmes de formation certifiée</strong>, accréditée par l'<strong>Académie professionnelle des enseignants en Égypte</strong>, avec une solide expérience dans l'élaboration de programmes fondés sur les compétences.</p>
        <p>Je suis en outre <strong>examinatrice et correctrice DELF agréée (jusqu'au niveau B2)</strong>, garantissant une évaluation juste et de haute qualité, conforme au Cadre européen commun de référence pour les langues (CECR).</p>
        <p>Au-delà de l'éducation, je travaille comme <strong>consultante indépendante</strong>, animée par une véritable passion pour le marketing de films documentaires, la narration culturelle et la communication numérique. J'occupe actuellement le poste de <strong>coordinatrice du projet « Egypt Heritage Films »</strong>, un projet de films documentaires dédié à la préservation, à la promotion et à la valorisation du riche patrimoine culturel égyptien à travers une narration visuelle marquante.</p>
        <p>Mon expertise conjugue éducation, gestion de projet, formation, évaluation linguistique internationale et communication créative, me permettant de relier les mondes de l'apprentissage, de la culture et de l'innovation.</p>
        <blockquote class="bio__quote">Ma mission est d'autonomiser les personnes, de susciter l'apprentissage tout au long de la vie et de créer des projets porteurs de sens, à l'impact éducatif et culturel durable.</blockquote>`,
      "about.eyebrow": "03 — Le Studio",
      "about.title": "Nous documentons ce qui s'efface plus vite qu'on ne l'enregistre.",
      "about.p1": "L'histoire de l'Égypte est écrite dans la pierre, le sable et la parole — et une grande partie s'efface peu à peu. <strong>Egypt Heritage Films existe pour ralentir cette perte.</strong> Nous filmons les monuments, les artisans et les coutumes quotidiennes qui portent l'identité du pays.",
      "about.quote": "Le patrimoine montré comme quelque chose qui se vit encore — pas seulement un souvenir.",
      "about.p2": "Nous travaillons lentement, sur le terrain, avec des historiens aux côtés de la caméra, pour que ce qui atteint l'écran soit à la fois cinématographique et vrai.",
      "about.mh": "Mission", "about.mp": "Documenter l'histoire et le patrimoine de l'Égypte avec rigueur, art et respect.",
      "about.vh": "Vision", "about.vp": "Une archive vivante de films qui garde l'histoire du pays vivante pour la prochaine génération.",
      "why.idx": "04 — Pourquoi nous choisir", "why.title": "Une manière de travailler",
      "c1.t": "Un récit authentique", "c1.d": "Chaque récit est ancré dans des lieux et des voix réels, raconté avec ceux qui le vivent.",
      "c2.t": "Une qualité cinématographique", "c2.d": "Tourné et finalisé au niveau d'un long métrage — couleur, son et cadre traités avec le même soin.",
      "c3.t": "Une profondeur culturelle", "c3.d": "Des historiens dans l'équipe veillent à l'exactitude, pour que la nuance survive au montage.",
      "c4.t": "Une production professionnelle", "c4.d": "Une livraison fiable de bout en bout — du premier repérage au master étalonné, prêt à diffuser.",
      "contact.eyebrow": "05 — Contact", "contact.title": "Racontons une histoire ensemble.",
      "contact.lead": "Vous commandez un documentaire, préparez une série patrimoniale ou envisagez un partenariat ? Écrivez-nous.",
      "ct.email": "E-mail", "ct.studio": "Studio", "ct.studioV": "Le Caire, Égypte", "ct.phone": "Téléphone", "ct.wa": "WhatsApp",
      "f.name": "Nom", "f.email": "E-mail", "f.msg": "Message", "f.send": "Envoyer le message",
      "ph.name": "Votre nom complet", "ph.msg": "Parlez-nous de votre projet…",
      "e.name": "Veuillez saisir votre nom.", "e.email": "Veuillez saisir une adresse e-mail valide.", "e.msg": "Veuillez écrire quelques mots.",
      "form.check": "Veuillez vérifier les champs signalés.", "form.sending": "Envoi…", "form.ok": "Merci — votre message est en route.",
      "footer.made": "Le Caire — Réalisé avec révérence pour l'histoire de l'Égypte",
      "modal.close": "Fermer"
    },
    ar: {
      "tagline": "شغف بتراث مصر",
      "nav.films": "الأفلام", "nav.crew": "الفريق", "nav.studio": "الاستوديو",
      "nav.approach": "منهجنا", "nav.contact": "تواصل",
      "hero.rail": "القاهرة — استوديو أفلام وثائقية",
      "hero.eyebrow": "استوديو أفلام وثائقية · مصر",
      "hero.title": "حكاية مصر، <span class=\"line2\"><em>تُروى بالضوء.</em></span>",
      "hero.tag": "مجموعة من صنّاع الأفلام وهاجس واحد — توثيق تاريخ البلاد وتراثها قبل أن يتلاشى.",
      "hero.btn": "استكشف الأفلام", "hero.link": "ابدأ مشروعًا", "hero.scroll": "مرّر",
      "work.idx": "01 — أعمال مختارة", "work.title": "أفلام من قلب الميدان",
      "work.exTitle": "اكتشف حكاياتنا",
      "work.exP1": "يُعرض كل فيلم وثائقي على هذه المنصة من خلال مقتطف مختار بعناية، يفتح نافذةً على الحكايات التي نرويها والتراث الذي نحفظه.",
      "work.exP2": "<strong>النسخ الكاملة متوفرة بالعربية والإنجليزية والفرنسية</strong>، بما يضمن وصول أفلامنا الوثائقية إلى الجماهير عبر الثقافات والحدود.",
      "work.exP3": "سواء كنت تمثّل قناة تلفزيونية أو مؤسسة تعليمية أو منظمة ثقافية أو مهرجانًا أو شريك توزيع، يسعدنا تلقّي استفساراتك بشأن العروض والتراخيص وفرص التعاون.",
      "work.exCta": "اكتشف المقتطف. عِش الحكاية كاملة.",
      "film1.idx": "01 / أعمالنا", "film1.title": "فيلم 01",
      "film2.idx": "02 / أعمالنا", "film2.title": "فيلم 02",
      "film3.idx": "03 / أعمالنا", "film3.title": "فيلم 03",
      "film4.idx": "04 / أعمالنا", "film4.title": "فيلم 04",
      "film5.idx": "05 / أعمالنا", "film5.title": "فيلم 05",
      "team.idx": "02 — الفريق", "team.title": "حُرّاس الحكاية",
      "crew.more": "السيرة الكاملة",
      "p1.role": "مُقدِّم · راوٍ · تعليق صوتي احترافي (فرنسي / عربي)", "p1.name": "وائل الألفي",
      "p1.sum": "مُقدِّم وراوٍ في قناة النيل الدولية، ومؤدّي تعليق صوتي احترافي بالفرنسية والعربية، في خدمة تراث مصر منذ أكثر من ثلاثة عقود.",
      "p1.full": `
        <p>منذ أكثر من ثلاثة عقود، كرّستُ مسيرتي لنقل الثقافة والتاريخ والتراث المصري إلى الجمهور الناطق بالفرنسية والعربية.</p>
        <p>مرشد سياحي ومحاضر باللغة الفرنسية منذ عام 1990، وخريج كلية اليسوعيين بالقاهرة، بنيتُ مسيرةً تقوم على إتقان اللغة الفرنسية، والتميّز في السرد، وعشق مصر.</p>
        <p>أعمل اليوم مُقدِّمًا وراويًا في قناة النيل الدولية، حيث أشارك في إنتاج برامج وأفلام وثائقية مكرّسة للحضارة المصرية والآثار والتراث والسياحة الثقافية. ومن بين الأعمال التي شاركتُ فيها: <strong>وصف مصر</strong>، و<strong>كنوز مصر</strong>، و<strong>يوميات الثقافة</strong>، و<strong>الواحدة ظهرًا من مصر</strong>.</p>
        <p>على مدار مسيرتي، قدّمتُ التعليق الصوتي والتقديم للعديد من الأعمال السمعية البصرية، مُسلِّطًا الضوء على أبرز المواقع الفرعونية والقبطية والإسلامية في مصر. ويتوجّه عملي إلى القنوات التلفزيونية والمؤسسات الثقافية ومنتجي الأفلام الوثائقية والهيئات الدولية على حدٍّ سواء.</p>
        <p>صوتي، المعروف بوضوحه ودفئه ودقّته، يتكيّف مع تنوّع واسع من المشروعات: الأفلام الوثائقية، والأفلام المؤسسية، والتقارير، والمحتوى السياحي، والأدلة الصوتية، والمتاحف، والبودكاست، والحملات التواصلية.</p>
        <p>كل مشروع يمثّل بالنسبة لي فرصةً لأروي حكاية بأصالة وعاطفة والتزام مهني.</p>
        <h4 class="bio__subhead">المهارات</h4>
        <ul class="bio__skills">
          <li>التقديم التلفزيوني</li>
          <li>سرد الأفلام الوثائقية</li>
          <li>تعليق صوتي احترافي بالفرنسية والعربية</li>
          <li>التقارير الثقافية والسياحية</li>
          <li>كتابة النصوص وإعدادها</li>
          <li>التواصل في مجال التراث والإعلام السمعي البصري</li>
        </ul>
        <blockquote class="bio__quote">أن نمنح التراث صوتًا، وأن نروي التاريخ بشغف، وأن نبني جسرًا دائمًا بين الثقافات.</blockquote>`,
      "p2.role": "مخرج · منتج", "p2.name": "هاني سمير",
      "p2.sum": "مخرج ومنتج لبرامج تلفزيونية باللغة الإنجليزية — برامج حوارية وفيديوهات موسيقية وتقارير سياحية وهويات بصرية للقنوات، موجَّهة لجمهور دولي.",
      "p2.full": `
        <p>طوال مسيرتي، قُدتُ وأنجزتُ مجموعة متنوّعة من المحتوى — من البرامج الحوارية المباشرة والسخرية السياسية إلى الفيديوهات الموسيقية وتقارير السفر والأفلام الوثائقية — وقد بُثّ كثير منها بالإنجليزية موجَّهًا إلى جمهور دولي. وقد أكسبني عملي في برامج قناة النيل الناطقة بالإنجليزية، مثل <strong>Nile Café</strong> و<strong>Generation Talk</strong>، الطلاقة الثقافية والحسّ التحريري اللازمين للتواصل مع جماهير متنوّعة.</p>
        <p>كما أخرجتُ وأنتجتُ حملات علامات تجارية وهويات بصرية لقنوات تلفزيونية وطنية، بالتعاون مع فرق دولية ودمج أحدث تقنيات التصميم البصري، بما في ذلك الكروما والموشن جرافيك. وتتيح لي مهاراتي العملية في المونتاج (Avid وFinal Cut) والسرد البصري تقديم أعمال متقنة من الفكرة حتى النسخة النهائية.</p>`,
      "p3.role": "مونتير أول ومنتج", "p3.name": "عمرو نسيم",
      "p3.sum": "مونتير أول ومنتج، بخبرة 20 عامًا في صناعة الإعلانات السينمائية والأفلام الوثائقية وفيديوهات التسويق المدعومة بالذكاء الاصطناعي لعلامات تجارية عالمية.",
      "p3.full": `
        <p>بخبرة تمتد 20 عامًا في إنتاج الفيديو، أتخصّص في صناعة الإعلانات السينمائية والأفلام الوثائقية وأفلام الشركات وفيديوهات التسويق المدعومة بالذكاء الاصطناعي، التي تساعد العلامات التجارية على التواصل والتفاعل والنمو في الأسواق العالمية.</p>`,
      "p4.role": "منسّقة مشروع · مستشارة", "p4.name": "نيرمين عطا",
      "p4.sum": "منسّقة مشروع Egypt Heritage Films — تربوية ومدرّبة معلمين وخبيرة في تعليم الفرنسية، تجمع بين التعلّم والثقافة وفنّ الحكاية.",
      "p4.full": `
        <p>أنا <strong>منسّقة مشاريع ومدرّبة معلمين وخبيرة في تعليم اللغة الفرنسية</strong> ذات خبرة، ملتزمة التزامًا راسخًا بالتميّز التربوي والتطوير المهني. ومنذ عام <strong>2018</strong>، أقود وأنسّق مشاريع تعليمية، وأصمّم برامج تدريبية عالية الأثر، وأمكّن المعلمين من بلوغ التميّز في التعليم والتعلّم.</p>
        <p>بصفتي <strong>أول موجّهة للغة الفرنسية</strong>، أوفّر القيادة التربوية وضمان الجودة والدعم المستمر لتعليم اللغة الفرنسية. كما أنني <strong>مصمّمة برامج تدريبية معتمدة</strong> من <strong>الأكاديمية المهنية للمعلمين في مصر</strong>، بخبرة واسعة في تطوير البرامج التدريبية القائمة على الكفايات.</p>
        <p>إضافةً إلى ذلك، أنا <strong>ممتحِنة ومصحِّحة معتمدة لاختبار DELF (حتى المستوى B2)</strong>، أضمن تقييمًا عادلًا وعالي الجودة وفقًا للإطار الأوروبي المرجعي المشترك للغات (CEFR).</p>
        <p>وإلى جانب التعليم، أعمل <strong>مستشارة حرة</strong> بشغفٍ عميق بتسويق الأفلام الوثائقية والسرد الثقافي والتواصل الرقمي. وأشغل حاليًا منصب <strong>منسّقة مشروع «Egypt Heritage Films»</strong>، وهو مشروع أفلام وثائقية مكرّس للحفاظ على تراث مصر الثقافي الغني والترويج له وإبرازه من خلال سردٍ بصري مؤثّر.</p>
        <p>تجمع خبرتي بين التعليم وإدارة المشاريع والتدريب والتقييم اللغوي الدولي والتواصل الإبداعي، بما يتيح لي الربط بين عوالم التعلّم والثقافة والابتكار.</p>
        <blockquote class="bio__quote">رسالتي هي تمكين الناس، وإلهام التعلّم مدى الحياة، وإنشاء مشاريع ذات معنى تترك أثرًا تربويًا وثقافيًا دائمًا.</blockquote>`,
      "about.eyebrow": "03 — الاستوديو",
      "about.title": "نوثّق ما يتلاشى أسرع مما يُسجَّل.",
      "about.p1": "حكاية مصر مكتوبة في الحجر والرمل والكلمة المحكية — وكثير منها ينزلق بعيدًا. <strong>وُجدت «إيجيبت هيريتدج فيلمز» لإبطاء هذا الفقدان.</strong> نوثّق المعالم والصنّاع والعادات اليومية التي تحمل هوية البلاد إلى الأمام.",
      "about.quote": "التراث كما يُعاش اليوم — لا كما يُتذكَّر فقط.",
      "about.p2": "نعمل بتؤدة وفي المواقع الحقيقية، مع مؤرخين إلى جوار الكاميرا، ليصل إلى الشاشة ما هو سينمائي وصادق معًا.",
      "about.mh": "رسالتنا", "about.mp": "توثيق تاريخ مصر وتراثها بدقة وفنّ واحترام.",
      "about.vh": "رؤيتنا", "about.vp": "أرشيف سينمائي حيّ يُبقي حكاية مصر نابضة للأجيال القادمة.",
      "why.idx": "04 — لماذا نحن", "why.title": "طريقتنا في العمل",
      "c1.t": "سرد أصيل", "c1.d": "كل حكاية متجذرة في أماكن وأصوات حقيقية، تُروى مع من يعيشونها.",
      "c2.t": "جودة سينمائية", "c2.d": "تصوير وإنهاء بمعايير الأفلام الروائية — العناية نفسها باللون والصوت والكادر.",
      "c3.t": "عمق ثقافي", "c3.d": "مؤرخون ضمن الفريق يحفظون دقة التفاصيل، فتنجو الفروق الدقيقة من المونتاج.",
      "c4.t": "إنتاج احترافي", "c4.d": "تنفيذ موثوق من البداية إلى النهاية — من أول معاينة للمواقع حتى نسخة نهائية جاهزة للبث.",
      "contact.eyebrow": "05 — تواصل", "contact.title": "لنروِ حكاية معًا.",
      "contact.lead": "هل تخطط لفيلم وثائقي أو سلسلة عن التراث أو شراكة؟ يسعدنا أن نسمع منك.",
      "ct.email": "البريد", "ct.studio": "الاستوديو", "ct.studioV": "القاهرة، مصر", "ct.phone": "الهاتف", "ct.wa": "واتساب",
      "f.name": "الاسم", "f.email": "البريد الإلكتروني", "f.msg": "الرسالة", "f.send": "أرسل الرسالة",
      "ph.name": "اسمك الكامل", "ph.msg": "حدّثنا عن مشروعك…",
      "e.name": "من فضلك أدخل اسمك.", "e.email": "من فضلك أدخل بريدًا إلكترونيًا صحيحًا.", "e.msg": "من فضلك اكتب بضع كلمات.",
      "form.check": "من فضلك راجع الحقول المحددة.", "form.sending": "جارٍ الإرسال…", "form.ok": "شكرًا لك — رسالتك في طريقها إلينا.",
      "footer.made": "القاهرة — صُنع بمحبة لحكاية مصر",
      "modal.close": "إغلاق"
    }
  };
  const FORM_EN = {
    "form.check": "Please check the highlighted fields.",
    "form.sending": "Sending…",
    "form.ok": "Thank you — your message is on its way."
  };

  let lang = "en";
  const enHTML = new Map(), enPH = new Map();
  $$("[data-i18n]").forEach(el => enHTML.set(el, el.innerHTML));
  $$("[data-i18n-ph]").forEach(el => enPH.set(el, el.placeholder));

  const t = key => lang === "en" ? FORM_EN[key] : (I18N[lang][key] || FORM_EN[key]);

  function setLang(next) {
    if (next !== "en" && !I18N[next]) next = "en";
    lang = next;
    document.documentElement.lang = next;
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    enHTML.forEach((en, el) => {
      const k = el.dataset.i18n;
      el.innerHTML = next === "en" ? en : (I18N[next][k] || en);
    });
    enPH.forEach((en, el) => {
      const k = el.dataset.i18nPh;
      el.placeholder = next === "en" ? en : (I18N[next][k] || en);
    });
    $$(".lang button").forEach(b => b.classList.toggle("active", b.dataset.lang === next));
    try { localStorage.setItem("ehf-lang", next); } catch (e) { /* private mode */ }
  }
  $$(".lang button").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));
  let savedLang = "en";
  try { savedLang = localStorage.getItem("ehf-lang") || "en"; } catch (e) { /* private mode */ }
  if (savedLang !== "en") setLang(savedLang);

  /* 1. LOADER — hold on the title card, then fade to the site */
  const loader = $("#loader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader && loader.classList.add("done");
      setTimeout(() => { if (loader) loader.style.display = "none"; }, 1100);
    }, reduceMotion ? 200 : 900);
  });

  /* 2. NAV — scroll state, mobile menu, scrollspy */
  const nav = $("#nav");
  const navToggle = $("#navToggle");

  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  };
  navToggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  $$("#navLinks a").forEach(a => a.addEventListener("click", closeMenu));

  const sections = $$("main section[id]");
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        const link = $(`#navLinks a[href="#${en.target.id}"]`);
        if (link && en.isIntersecting) {
          $$("#navLinks a").forEach(l => l.classList.remove("active"));
          link.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(s => spy.observe(s));
  }

  /* 3. SCROLL REVEALS — slow fade + slight rise, staggered per group */
  const revealEls = $$("[data-reveal]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries, obs) => {
      // stagger items that enter together (e.g. film strips, crew rows)
      const shown = entries.filter(e => e.isIntersecting);
      shown.forEach((en, i) => {
        en.target.style.setProperty("--delay", (i * 0.09) + "s");
        en.target.classList.add("in");
        obs.unobserve(en.target);
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("in"));
  }

  /* 4. VIDEO MODAL */
  const modal = $("#modal");
  const modalFrame = $("#modalFrame");
  const modalTitle = $("#modalTitle");
  const modalDesc = $("#modalDesc");
  const modalClose = $("#modalClose");
  let lastFocused = null;

  function openModal(el) {
    lastFocused = document.activeElement;
    const src = el.dataset.video;
    // Read from the DOM so the caption follows the active language.
    const titleEl = el.querySelector(".film__title");
    const metaEl = el.querySelector(".film__meta");
    modalTitle.textContent = titleEl ? titleEl.textContent : (el.dataset.title || "");
    modalDesc.textContent = metaEl
      ? Array.from(metaEl.children).map(s => s.textContent).join(" · ")
      : (el.dataset.meta || "");
    if (src) modalFrame.src = src;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    modalClose.focus();
  }
  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
    // Dropping the src stops Drive playback once the fade-out finishes.
    setTimeout(() => { modalFrame.removeAttribute("src"); }, 500);
    if (lastFocused) lastFocused.focus();
  }

  $$(".film").forEach(el => {
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "button");
    el.addEventListener("click", () => openModal(el));
    el.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(el); }
    });
  });
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  window.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      if (modal.classList.contains("open")) closeModal();
      else if (bioModal.classList.contains("open")) closeBio();
      else if (document.body.classList.contains("menu-open")) closeMenu();
    }
  });

  /* 4b. BIO MODAL — full crew biographies (kept in their source language) */
  const bioModal = $("#bioModal");
  const bioName = $("#bioName");
  const bioRole = $("#bioRole");
  const bioBody = $("#bioBody");
  const bioClose = $("#bioClose");
  let bioLastFocused = null;

  function openBio(person) {
    bioLastFocused = document.activeElement;
    const nameEl = person.querySelector(".person__name");
    const roleEl = person.querySelector(".person__role");
    const full = person.querySelector(".person__full");
    bioName.textContent = nameEl ? nameEl.textContent : "";
    bioRole.textContent = roleEl ? roleEl.textContent : "";
    bioBody.innerHTML = full ? full.innerHTML : "";
    // Match the reading direction of the bio's language (Wael's is French/LTR,
    // but this keeps it correct if any bio is later set to Arabic).
    bioModal.classList.add("open");
    document.body.style.overflow = "hidden";
    bioClose.focus();
  }
  function closeBio() {
    bioModal.classList.remove("open");
    document.body.style.overflow = "";
    if (bioLastFocused) bioLastFocused.focus();
  }
  $$(".person__more").forEach(btn => {
    btn.addEventListener("click", () => openBio(btn.closest(".person")));
  });
  bioClose.addEventListener("click", closeBio);
  bioModal.addEventListener("click", e => { if (e.target === bioModal) closeBio(); });

  /* 5. CONTACT FORM — inline validation, no reload */
  const form = $("#contactForm");
  const note = $("#formNote");
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (form) {
    const map = [["#name", "#f-name"], ["#email", "#f-email"], ["#message", "#f-message"]];
    map.forEach(([inp, fld]) => $(inp).addEventListener("input", () => $(fld).classList.remove("invalid")));

    form.addEventListener("submit", e => {
      e.preventDefault();
      const set = (sel, ok) => { $(sel).classList.toggle("invalid", !ok); return ok; };
      const okName  = set("#f-name",  $("#name").value.trim().length >= 2);
      const okEmail = set("#f-email", emailRe.test($("#email").value.trim()));
      const okMsg   = set("#f-message", $("#message").value.trim().length >= 8);

      if (!(okName && okEmail && okMsg)) {
        note.textContent = t("form.check");
        note.className = "form__note error";
        const bad = form.querySelector(".invalid input, .invalid textarea");
        if (bad) bad.focus();
        return;
      }
      // Front-end only — connect this to your mail service / backend.
      note.textContent = t("form.sending");
      note.className = "form__note";
      setTimeout(() => {
        note.textContent = t("form.ok");
        note.className = "form__note success";
        form.reset();
      }, 800);
    });
  }

  /* 6. MISC — year + anchor smooth-scroll with nav offset */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  $$('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      const top = t.getBoundingClientRect().top + window.scrollY - 86;
      window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
    });
  });
})();
