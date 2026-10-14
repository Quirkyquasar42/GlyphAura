/*!
 * Glyph Aura background — fixed, scroll-reactive animated page background.
 * Themes: ancient | verdant | runic | cuneiform | hieroglyph
 *
 * <script src=".../glyphaura.js" data-theme="runic" data-base=".../assets/"></script>
 * Options (attributes on the script tag, all optional):
 *   data-theme      theme name (default ancient)
 *   data-base       URL of the assets folder (default: "assets/" next to this script)
 *   data-logo       "on" | "off"   hologram logo (default on)
 *   data-text       0..1 strength of the glyph text (default 0.75)
 *   data-flicker    "original" (the source's exact band-mask flicker, default) | "soft" (fades only, never fully dark)
 *   data-squarespace "on" makes Squarespace section backgrounds transparent so this shows through
 */
(function () {
  'use strict';
  if (window.__glyphAura) return;
  window.__glyphAura = true;

  var LOGO_PATH = "M322 65L358 64L359 65L369 65L370 66L390 68L391 69L395 69L396 70L400 70L401 71L416 74L452 87L476 99L491 109L494 110L513 124L527 136L545 155L560 173L580 203L589 220L589 222L594 231L594 233L600 246L610 280L612 295L613 296L613 301L614 302L615 319L616 320L615 321L616 322L616 359L615 360L616 361L615 362L615 372L614 373L613 386L612 387L610 401L609 402L607 413L605 417L605 420L599 438L591 455L591 457L574 488L554 516L663 597L664 600L664 605L663 607L660 609L655 609L545 526L524 547L500 566L478 580L448 595L420 605L417 605L413 607L410 607L401 610L387 612L386 613L380 613L379 614L373 614L372 615L362 615L361 616L360 615L359 616L322 616L321 615L320 616L319 615L310 615L309 614L302 614L301 613L290 612L289 611L280 610L279 609L268 607L264 605L261 605L231 594L203 580L177 563L154 544L136 527L115 501L98 474L82 440L74 416L74 413L70 400L69 391L68 390L67 378L66 377L65 359L64 358L65 356L64 355L64 326L65 325L64 323L65 322L65 313L66 312L66 304L67 303L67 297L68 296L68 291L71 281L71 277L81 244L88 229L88 227L98 207L107 192L125 167L151 139L176 118L207 98L234 85L262 75L265 75L269 73L281 71L286 69L290 69L291 68L322 65ZM327 92L326 93L314 93L313 94L306 94L305 95L294 96L293 97L289 97L288 98L273 101L269 103L266 103L247 110L244 112L242 112L218 124L199 136L176 154L148 183L138 196L136 199L136 201L329 345L333 349L333 286L332 284L329 284L317 279L304 268L300 262L296 252L296 248L295 247L295 235L296 234L297 226L302 216L304 213L316 202L326 197L334 196L335 195L347 195L353 197L360 199L368 204L379 217L382 223L385 233L385 248L384 249L383 256L379 264L373 272L364 279L356 283L349 284L347 286L348 349L545 200L528 178L503 152L475 131L448 116L446 116L432 109L427 108L424 106L412 102L409 102L392 97L383 96L382 95L368 94L367 93L355 93L354 92L327 92ZM336 209L323 214L314 223L309 236L309 246L314 258L317 262L323 266L334 271L345 271L357 267L360 265L367 257L371 247L371 234L366 223L363 219L358 214L346 209L336 209ZM128 212L118 231L116 233L116 235L112 242L112 244L110 247L103 266L103 269L101 273L101 276L97 289L97 293L96 294L94 312L93 313L93 323L92 324L93 325L92 327L92 354L93 356L92 357L93 358L93 368L94 369L95 382L96 383L97 392L98 393L102 412L106 424L108 427L109 432L116 446L116 448L128 470L138 485L152 503L178 528L197 543L223 559L244 569L272 579L300 585L311 586L312 587L320 587L321 588L322 587L323 588L333 588L333 367L172 245L168 241L132 214L128 212ZM552 212L544 219L532 227L528 231L438 298L426 308L422 310L418 314L381 341L352 364L451 438L531 498L534 496L551 472L567 442L567 440L570 435L577 416L577 413L582 398L584 384L585 383L586 370L587 369L587 361L588 360L587 359L588 358L588 323L587 322L588 321L587 320L586 304L585 303L585 298L584 297L583 288L581 283L581 279L573 254L571 251L567 239L559 223L557 221L554 214L552 212ZM348 378L347 588L358 588L359 587L360 588L361 587L377 586L378 585L383 585L384 584L398 582L413 577L416 577L435 570L438 568L440 568L462 557L479 546L502 529L511 521L522 509L352 380L348 378Z";
  var FLICKER = {"fps":12,"city":[{"a":1.0,"m":false},{"a":0.957,"m":false},{"a":0.914,"m":false},{"a":0.871,"m":false},{"a":0.828,"m":false},{"a":0.785,"m":false},{"a":0.742,"m":false},{"a":0.699,"m":false},{"a":0.656,"m":false},{"a":0.613,"m":false},{"a":0.57,"m":false},{"a":0.527,"m":false},{"a":0.484,"m":false},{"a":0.441,"m":false},{"a":0.398,"m":true},{"a":0.43,"m":true},{"a":0.457,"m":true},{"a":0.488,"m":true},{"a":0.52,"m":true},{"a":0.551,"m":true},{"a":0.578,"m":true},{"a":0.609,"m":true},{"a":0.641,"m":true},{"a":0.668,"m":true},{"a":0.699,"m":true},{"a":0.73,"m":true},{"a":0.758,"m":true},{"a":0.789,"m":true},{"a":0.82,"m":true},{"a":0.852,"m":true},{"a":0.879,"m":true},{"a":0.91,"m":true},{"a":0.941,"m":true},{"a":0.969,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":0.398,"m":true},{"a":0.473,"m":true},{"a":0.551,"m":true},{"a":0.625,"m":true},{"a":0.699,"m":true},{"a":0.773,"m":true},{"a":0.852,"m":true},{"a":0.926,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":0.398,"m":true},{"a":0.5,"m":true},{"a":0.598,"m":true},{"a":0.699,"m":true},{"a":0.801,"m":true},{"a":0.898,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":1.0,"m":true},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false},{"a":0,"m":false}],"mask":[[[-0.0919,-0.0005,1.1081,0.9995]],[[-0.0919,0.0126,1.1081,0.9666]],[[-0.0919,0.0258,1.1081,0.9336]],[[-0.0919,0.039,1.1081,0.9008]],[[-0.0919,0.0521,1.1081,0.8679]],[[-0.0919,0.0653,1.1081,0.835]],[[-0.0919,0.0784,1.1081,0.8021]],[[-0.0919,0.0915,1.1081,0.7691]],[[-0.0919,0.1047,1.1081,0.7363]],[[-0.0919,0.1179,1.1081,0.7034]],[[-0.0919,0.1311,1.1081,0.6706]],[[-0.0919,0.1442,1.1081,0.6377]],[[-0.0919,0.1575,1.1081,0.6049]],[[-0.0919,0.1706,1.1081,0.5719]],[[-0.0919,0.1837,1.1081,0.539]],[[-0.0919,0.1969,1.1081,0.5061]],[[-0.0919,0.21,1.1081,0.4732]],[[-0.0919,0.2233,1.1081,0.4404]],[[-0.0919,0.2364,1.1081,0.4074]],[[-0.0919,0.2495,1.1081,0.3745]],[],[[0.2081,0.4995,1.1081,0.5745],[-0.0901,0.3745,1.1099,0.4245],[0.1041,0.0345,0.9041,0.1095]],[[0.2081,0.4995,1.1081,0.5745],[-0.0901,0.3745,1.1099,0.4245],[0.1041,0.0345,0.9041,0.1095]],[[0.2081,0.4995,1.1081,0.5745],[-0.0901,0.3745,1.1099,0.4245],[0.1041,0.0345,0.9041,0.1095]],[[0.2081,0.4995,1.1081,0.5745],[-0.0901,0.3745,1.1099,0.4245],[0.1041,0.0345,0.9041,0.1095]],[[0.2081,0.5188,1.1081,0.5938],[-0.0902,0.3745,1.1098,0.4245],[0.1041,0.053,0.9041,0.128]],[[0.2081,0.538,1.1081,0.613],[-0.0904,0.3745,1.1096,0.4245],[0.1041,0.0714,0.9041,0.1464]],[[0.2081,0.5573,1.1081,0.6323],[-0.0905,0.3745,1.1095,0.4245],[0.1041,0.0899,0.9041,0.1649]],[[0.2081,0.5764,1.1081,0.6514],[-0.0907,0.3745,1.1093,0.4245],[0.1041,0.1084,0.9041,0.1834]],[[0.2081,0.5956,1.1081,0.6706],[-0.0908,0.3745,1.1092,0.4245],[0.1041,0.1268,0.9041,0.2018]],[[0.2081,0.6149,1.1081,0.6899],[-0.0909,0.3745,1.1091,0.4245],[0.1041,0.1452,0.9041,0.2203]],[[0.2081,0.6341,1.1081,0.7091],[-0.0911,0.3745,1.1089,0.4245],[0.1041,0.1638,0.9041,0.2388]],[[0.2081,0.6534,1.1081,0.7284],[-0.0912,0.3745,1.1088,0.4245],[0.1041,0.1822,0.9041,0.2573]],[[0.2081,0.6726,1.1081,0.7476],[-0.0913,0.3745,1.1087,0.4245],[0.1041,0.2006,0.9041,0.2756]],[[0.2081,0.6917,1.1081,0.7668],[-0.0915,0.3745,1.1085,0.4245],[0.1041,0.2191,0.9041,0.2941]],[[0.2081,0.711,1.1081,0.786],[-0.0916,0.3745,1.1084,0.4245],[0.1041,0.2376,0.9041,0.3126]],[[0.2081,0.7303,1.1081,0.8053],[-0.0918,0.3745,1.1082,0.4245],[0.1041,0.256,0.9041,0.331]],[[0.2081,0.7495,1.1081,0.8245],[-0.0919,0.3745,1.1081,0.4245],[0.1041,0.2745,0.9041,0.3495]],[[-0.0919,0.3745,1.1081,0.4245]],[[-0.0919,0.312,1.1081,0.5203]],[[-0.0919,0.2496,1.1081,0.6163]],[[-0.0919,0.1871,1.1081,0.7121]],[[-0.0919,0.1245,1.1081,0.8078]],[[-0.0919,0.0623,1.1081,0.9039]],[[-0.0919,-0.0005,1.1081,0.9995]],[[-0.0919,0.0072,1.1081,0.9916]],[[-0.0919,0.0308,1.1081,0.9684]],[[-0.0919,0.0698,1.1081,0.9294]],[[-0.0919,0.1246,1.1081,0.8752]],[[-0.0919,0.1949,1.1081,0.8052]],[[-0.0919,0.2807,1.1081,0.7196]],[[-0.0919,0.3824,1.1081,0.6187]],[[0.0601,0.522,0.9601,0.622],[-0.0919,0.4995,1.1081,0.502],[0.1801,0.3495,0.7801,0.3995]],[[0.0601,0.5301,0.9601,0.6301],[0.1801,0.3645,0.7801,0.4145]],[[0.0601,0.5383,0.9601,0.6383],[0.1801,0.3795,0.7801,0.4295]],[[0.0601,0.5464,0.9601,0.6464],[0.1801,0.3945,0.7801,0.4445]],[[0.0601,0.5545,0.9601,0.6545],[0.1801,0.4095,0.7801,0.4595]],[[0.0601,0.5626,0.9601,0.6626],[0.1801,0.4245,0.7801,0.4745]],[[0.0601,0.5707,0.9601,0.6708],[0.1801,0.4395,0.7801,0.4895]],[[0.0601,0.5789,0.9601,0.6789],[0.1801,0.4545,0.7801,0.5045]],[[0.0601,0.587,0.9601,0.687],[0.1801,0.4695,0.7801,0.5195]],[[0.0601,0.5951,0.9601,0.6951],[0.1801,0.4845,0.7801,0.5345]],[[0.0601,0.6033,0.9601,0.7033],[0.1801,0.4995,0.7801,0.5495]],[[0.0601,0.6114,0.9601,0.7114],[0.1801,0.5145,0.7801,0.5645]],[[0.0601,0.6195,0.9601,0.7195],[0.1801,0.5295,0.7801,0.5795]],[[0.0601,0.6276,0.9601,0.7276],[0.1801,0.5445,0.7801,0.5945]],[[0.0601,0.6358,0.9601,0.7358],[0.1801,0.5595,0.7801,0.6095]],[[0.0601,0.6439,0.9601,0.7439],[0.1801,0.5745,0.7801,0.6245]],[[0.0601,0.652,0.9601,0.752],[0.1801,0.5649,0.7801,0.6149]],[[0.0601,0.6601,0.9601,0.7601],[0.1801,0.5553,0.7801,0.6053]],[[0.0601,0.6683,0.9601,0.7683],[0.1801,0.5456,0.7801,0.5956]],[[0.0601,0.6764,0.9601,0.7764],[0.1801,0.536,0.7801,0.586]],[[0.0601,0.6845,0.9601,0.7845],[0.1801,0.5264,0.7801,0.5764]],[[0.0601,0.6926,0.9601,0.7926],[0.1801,0.5168,0.7801,0.5668]],[[0.0601,0.7007,0.9601,0.8008],[0.1801,0.5072,0.7801,0.5573]],[[0.0601,0.7089,0.9601,0.8089],[0.1801,0.4976,0.7801,0.5476]],[[0.0601,0.717,0.9601,0.817],[0.1801,0.488,0.7801,0.538]],[[0.0601,0.7251,0.9601,0.8251],[0.1801,0.4784,0.7801,0.5284]],[[0.0601,0.7333,0.9601,0.8333],[0.1801,0.4688,0.7801,0.5188]],[[0.0601,0.7414,0.9601,0.8414],[0.1801,0.4591,0.7801,0.5091]],[[0.0601,0.7495,0.9601,0.8495],[0.1801,0.4495,0.7801,0.4995]]],"maskStart":14};
  var CHARSETS = {"cuneiform": "𒀆𒀙𒀛𒀞𒀠𒀬𒀮𒀹𒁃𒁇𒁉𒁐𒁑𒁙𒁞𒁟𒁣𒁧𒁨𒁲𒁿𒂎𒂒𒂟𒂣𒂦𒂧𒂯𒃄𒃋𒃖𒃘𒃙𒃜𒃟𒃠𒃡𒃤𒃩𒃪𒃮𒃺𒃼𒄎𒄏𒄑𒄒𒄔𒄙𒄜𒄨𒄬𒅂𒅃𒅌𒅘𒅜𒅠𒅫𒅯𒅲𒅵𒅻𒆃𒆄𒆅𒆕𒆚𒆭𒆰𒇋𒇐𒇕𒇖𒇙𒇿𒈅𒈢𒈥𒈧𒈮𒈵𒈺𒈾𒉄𒉏𒉛𒉜𒉨𒉪𒉯𒉹𒊃𒊊𒊎𒊏𒊒𒊗𒊙𒊟𒊥𒊮𒊴𒊻𒊽𒋀𒋊𒋎𒋑𒋝𒋟𒋪𒋫𒋲𒋶𒋷𒋺𒌉𒌍𒌒𒌗𒌚𒌹𒌺𒌼𒍂𒍑𒍣𒍦𒍭𒍶𒍼𒎀𒎄𒎈𒎉𒎌𒎏𒎑𒎓", "hieroglyph": "𓀁𓀄𓀆𓀎𓀗𓀞𓀧𓀫𓁀𓁑𓁠𓁦𓁧𓁮𓁴𓁵𓁶𓁷𓁸𓁼𓂂𓂃𓂊𓂋𓂌𓂍𓂑𓂚𓂡𓂤𓂧𓂯𓂺𓂿𓃁𓃆𓃈𓃉𓃙𓃟𓃠𓃤𓃥𓃪𓃵𓃷𓄁𓄆𓄎𓄛𓄟𓄹𓄽𓅂𓅃𓅇𓅊𓅑𓅒𓅔𓅭𓅷𓅼𓆄𓆅𓆈𓆗𓆛𓆢𓆱𓆵𓆶𓆽𓇁𓇃𓇌𓇔𓇗𓇡𓇤𓇧𓇨𓇪𓇭𓇱𓇸𓇻𓇽𓇿𓈂𓈖𓈚𓈛𓈞𓈟𓈢𓈺𓉈𓉙𓉟𓉣𓉵𓉾𓊂𓊃𓊇𓊗𓊤𓊴𓊶𓊸𓋕𓋥𓋧𓋼𓋽𓌈𓌍𓌔𓌟𓌱𓌵𓌸𓌺𓍀𓍁𓍉𓍚𓍠𓍢𓍣𓍭𓍲𓍺𓎁𓎋𓎖𓎜𓎡𓎣𓎳𓎼𓎾𓏈𓏍𓏐𓏙𓏢𓏣𓏤𓏨𓏲𓐁𓐅𓐏𓐐𓐓𓐜𓐣𓐮", "runic": "ᚠᚡᚢᚣᚤᚥᚦᚧᚨᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟᛠᛡᛢᛣᛤᛥᛦᛧᛨᛩᛪ", "ancient": "abcdefghijklmnopqrstuvwxyz0123456789"};

  var script = document.currentScript || (function () {
    var s = document.querySelectorAll('script[src*="glyphaura"]'); return s[s.length - 1];
  })();
  var attr = function (k, d) { var v = script && script.getAttribute(k); return v == null || v === '' ? d : v; };
  var themeName = (attr('data-theme', document.body && document.body.getAttribute('data-glyphaura')) || 'ancient').toLowerCase();
  var base = attr('data-base', script && script.src ? script.src.replace(/[^\/]*$/, '') + 'assets/' : 'assets/');
  if (base.slice(-1) !== '/') base += '/';
  var logoOn = attr('data-logo', 'on') !== 'off';
  var textLevel = parseFloat(attr('data-text', '0.75'));
  var flickerMode = attr('data-flicker', 'original');
  var assetURL = function (name) { return (window.GLYPHAURA_ASSETS && window.GLYPHAURA_ASSETS[name]) || base + name; };

  var THEMES = {
    ancient: { font: 'ancient', size: 22, sp: 8, word: [1, 9], bg: '#000206', grid: '#0E3550', dust: '#9FE8FF', text: '#44D1E4', glow: '#1E9FD0',
      aura: [[0, '#000000'], [0.32, '#032a44'], [0.62, '#0f84c0'], [0.85, '#4ad6ff'], [1, '#dcfbff']], gain: 1.0,
      logo: { edge: '#8fe6ff', core: '#eafcff', glow: '#1e9fd0', fill: '#0c4f8c' } },
    verdant: { font: 'ancient', size: 22, sp: 8, word: [1, 9], bg: '#000300', grid: '#0C2A12', dust: '#C9FF9E', text: '#86D63E', glow: '#3FAA1E',
      aura: [[0, '#000400'], [0.30, '#06300a'], [0.62, '#2f9a22'], [0.85, '#8fe05a'], [1, '#e6ffc8']], gain: 1.05,
      logo: { edge: '#b4f27a', core: '#f2ffe4', glow: '#3faa1e', fill: '#1a4c12' } },
    runic: { font: 'runic', size: 26, sp: 6, word: [2, 7], bg: '#00030a', grid: '#0A2433', dust: '#E6F4FF', text: '#D6ECFF', glow: '#5FC8FF',
      aura: [[0, '#00040a'], [0.28, '#032a36'], [0.55, '#12a07e'], [0.78, '#6fe3b8'], [0.92, '#b9a8ff'], [1, '#f2e8ff']], gain: 1.1,
      logo: { edge: '#a6f3d6', core: '#f4fffb', glow: '#5fc8ff', fill: '#0f4a46' } },
    cuneiform: { font: 'cuneiform', size: 28, sp: 8, word: [1, 5], bg: '#050200', grid: '#2A1206', dust: '#FFE2AE', text: '#F4CC7E', glow: '#D9771F',
      aura: [[0, '#050100'], [0.30, '#341203'], [0.62, '#b8601a'], [0.86, '#f2b25a'], [1, '#fff0cf']], gain: 1.05,
      logo: { edge: '#ffd286', core: '#fff6e2', glow: '#d9771f', fill: '#5a2a08' } },
    hieroglyph: { font: 'hieroglyph', size: 30, sp: 6, word: [1, 5], bg: '#01020a', grid: '#0B1840', dust: '#FFE7A8', text: '#EAC55C', glow: '#C08A22',
      aura: [[0, '#01020a'], [0.30, '#081448'], [0.62, '#2a52d6'], [0.86, '#7fa8ff'], [1, '#e6eeff']], gain: 1.05,
      logo: { edge: '#f4d272', core: '#fff8de', glow: '#c08a22', fill: '#16307e' } }
  };
  var T = THEMES[themeName] || THEMES.ancient;
  var chars = CHARSETS[T.font] || 'abcdefghij';
  var charList = Array.from ? Array.from(chars) : chars.split('');

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hex = function (h) { h = h.replace('#', ''); return [parseInt(h.substr(0, 2), 16) / 255, parseInt(h.substr(2, 2), 16) / 255, parseInt(h.substr(4, 2), 16) / 255]; };
  var rgba = function (h, a) { var c = hex(h); return 'rgba(' + Math.round(c[0] * 255) + ',' + Math.round(c[1] * 255) + ',' + Math.round(c[2] * 255) + ',' + a + ')'; };
  var rand = Math.random;

  // ------------------------------------------------------------------ DOM
  function mount() {
    var css = document.createElement('style');
    css.textContent =
      'html{background:' + T.bg + '}' +
      'body{background:transparent!important}' +
      '.ga-layer{position:fixed;left:0;top:0;width:100vw;height:100vh;pointer-events:none;display:block}' +
      '#ga-bg{z-index:-2}#ga-fg{z-index:-1}' +
      (attr('data-squarespace', 'off') === 'on'
        ? '.page-section .section-background,.section-background{display:none!important}' +
          '.page-section,#siteWrapper,.site-wrapper,#page,main,article,.sections,.content-wrapper{background:transparent!important}'
        : '');
    document.head.appendChild(css);
    var bg = document.createElement('canvas'); bg.id = 'ga-bg'; bg.className = 'ga-layer'; bg.setAttribute('aria-hidden', 'true');
    var fg = document.createElement('canvas'); fg.id = 'ga-fg'; fg.className = 'ga-layer'; fg.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(fg, document.body.firstChild);
    document.body.insertBefore(bg, document.body.firstChild);
    return { bg: bg, fg: fg };
  }

  // ------------------------------------------------------------------ WebGL background
  function makeGL(canvas, imgs) {
    var gl = canvas.getContext('webgl', { alpha: false, antialias: false, premultipliedAlpha: false, powerPreference: 'low-power' });
    if (!gl) return null;
    var vs = 'attribute vec2 p;varying vec2 v;void main(){v=vec2(p.x*0.5+0.5,0.5-p.y*0.5);gl_Position=vec4(p,0.,1.);}';
    var fs = [
      'precision mediump float;',
      'uniform sampler2D uA0,uA1,uS,uL;uniform vec2 uR;uniform float uScroll,uF0,uF1,uMix,uGain;',
      'uniform vec3 uBg,uGrid,uDust;varying vec2 v;',
      'float atl(float f,vec2 a){float k=mod(f,72.);float c=mod(k,9.);float r=floor(k/9.);',
      ' vec2 t=vec2((c+clamp(a.x,.003,.997))/9.,(r+clamp(a.y,.003,.997))/8.);',
      ' return f<71.5?texture2D(uA0,t).r:texture2D(uA1,t).r;}',
      'void main(){vec2 px=v*uR;',
      ' float s=max(uR.y*1.02/455.,uR.x/606.);',
      ' vec2 a=vec2((px.x-uR.x*.5)/(606.*s)+.5,(px.y-uR.y*.5+uScroll*.04)/(455.*s)+.52);',
      ' float inside=step(0.,a.x)*step(a.x,1.)*step(0.,a.y)*step(a.y,1.);',
      ' float l=mix(atl(uF0,a),atl(uF1,a),uMix)*inside;l=clamp(pow(l,1.25)*uGain,0.,1.);',
      ' vec3 au=texture2D(uL,vec2(l*.996+.002,.5)).rgb;',
      ' vec2 sp=px+vec2(0.,uScroll*.12);float st=texture2D(uS,fract(sp/vec2(2000.,1000.))).r;',
      ' vec2 gp=px+vec2(0.,uScroll*.35);',
      ' float g=max(step(mod(gp.x,44.),1.),step(mod(gp.y,44.),1.))+max(step(mod(gp.x,176.),1.),step(mod(gp.y,176.),1.));',
      ' vec2 q=(px-uR*vec2(.5,.52))/(uR*.62);float vg=clamp(1.15-.55*pow(length(q),1.6),.25,1.);',
      ' vec3 c=(uBg+uGrid*g*.32+uDust*st*.5+au)*vg;',
      ' gl_FragColor=vec4(c,1.);}'
    ].join('\n');
    function sh(type, src) { var o = gl.createShader(type); gl.shaderSource(o, src); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o)); return o; }
    var pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(pr); gl.useProgram(pr);
    var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    function tex(unit, src, fmt, w, h, data) {
      var t = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t);
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
      if (src) gl.texImage2D(gl.TEXTURE_2D, 0, fmt, fmt, gl.UNSIGNED_BYTE, src);
      else gl.texImage2D(gl.TEXTURE_2D, 0, fmt, w, h, 0, fmt, gl.UNSIGNED_BYTE, data);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return t;
    }
    tex(0, imgs.a0, gl.LUMINANCE); tex(1, imgs.a1, gl.LUMINANCE); tex(2, imgs.st, gl.LUMINANCE);
    var lut = new Uint8Array(256 * 3), stops = T.aura;
    for (var i = 0; i < 256; i++) {
      var x = i / 255;
      for (var j = 0; j < stops.length - 1; j++) {
        if (x >= stops[j][0] && x <= stops[j + 1][0]) {
          var w = (x - stops[j][0]) / (stops[j + 1][0] - stops[j][0] + 1e-9), c0 = hex(stops[j][1]), c1 = hex(stops[j + 1][1]);
          for (var k = 0; k < 3; k++) lut[i * 3 + k] = Math.round((c0[k] * (1 - w) + c1[k] * w) * 255);
          break;
        }
      }
    }
    tex(3, null, gl.RGB, 256, 1, lut);
    var U = function (n) { return gl.getUniformLocation(pr, n); };
    gl.uniform1i(U('uA0'), 0); gl.uniform1i(U('uA1'), 1); gl.uniform1i(U('uS'), 2); gl.uniform1i(U('uL'), 3);
    gl.uniform3fv(U('uBg'), hex(T.bg)); gl.uniform3fv(U('uGrid'), hex(T.grid)); gl.uniform3fv(U('uDust'), hex(T.dust));
    gl.uniform1f(U('uGain'), T.gain);
    var u = { r: U('uR'), sc: U('uScroll'), f0: U('uF0'), f1: U('uF1'), m: U('uMix') };
    return {
      draw: function (t, scroll, W, H, dpr) {
        if (canvas.width !== Math.round(W * dpr) || canvas.height !== Math.round(H * dpr)) {
          canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
        }
        gl.viewport(0, 0, canvas.width, canvas.height);
        var f = (t / 15 * 144) % 144, f0 = Math.floor(f);
        gl.uniform2f(u.r, W, H); gl.uniform1f(u.sc, scroll);
        gl.uniform1f(u.f0, f0); gl.uniform1f(u.f1, (f0 + 1) % 144); gl.uniform1f(u.m, f - f0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
    };
  }

  // ------------------------------------------------------------------ glyph text
  var FONT = 'GA-' + T.font;
  function word() { var n = T.word[0] + Math.floor(rand() * (T.word[1] - T.word[0] + 1)), s = ''; for (var i = 0; i < n; i++) s += charList[Math.floor(rand() * charList.length)]; return s; }
  function measure(ctx, s, size) { var w = 0, a = Array.from(s); for (var i = 0; i < a.length; i++) w += a[i] === ' ' ? size * 0.9 : ctx.measureText(a[i]).width + T.sp; return w; }
  function glyphCanvas(w, h) { var c = document.createElement('canvas'); c.width = Math.max(1, Math.ceil(w)); c.height = Math.max(1, Math.ceil(h)); return c; }
  function paintRun(ctx, s, x, y, size, vertical) {
    var a = Array.from(s);
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== ' ') ctx.fillText(a[i], vertical ? x - ctx.measureText(a[i]).width / 2 : x, y);
      if (vertical) y += size * 1.3; else x += a[i] === ' ' ? size * 0.9 : ctx.measureText(a[i]).width + T.sp;
    }
  }
  function styleCtx(ctx, size) {
    ctx.font = size + 'px "' + FONT + '"'; ctx.textBaseline = 'top';
    ctx.fillStyle = T.text; ctx.shadowColor = T.glow; ctx.shadowBlur = size * 0.45;
  }
  function ribbon(width, size) {
    var probe = glyphCanvas(1, 1).getContext('2d'); styleCtx(probe, size);
    var s = '', w = 0; while (w < width) { s += word() + ' '; w = measure(probe, s, size); }
    var c = glyphCanvas(w, size * 1.8), x = c.getContext('2d'); styleCtx(x, size); paintRun(x, s, 0, size * 0.35, size, false);
    return c;
  }
  function column(height, size) {
    var s = ''; while (s.length * size * 1.3 < height) s += word() + ' ';
    var c = glyphCanvas(size * 2.2, Array.from(s).length * size * 1.3), x = c.getContext('2d'); styleCtx(x, size);
    paintRun(x, s, size * 1.1, 0, size, true); return c;
  }
  function block(maxW, size) {
    var lines = [], n = 3 + Math.floor(rand() * 4), probe = glyphCanvas(1, 1).getContext('2d'); styleCtx(probe, size);
    for (var i = 0; i < n; i++) { var l = word(); if (rand() < 0.6) l += ' ' + word(); if (rand() < 0.3) l += ' ' + word(); lines.push(l); }
    var widths = lines.map(function (l) { return Math.min(maxW, measure(probe, l, size)); });
    var lh = size * 1.6, c = glyphCanvas(Math.max.apply(null, widths) + size, lh * n + size), x = c.getContext('2d'); styleCtx(x, size);
    lines.forEach(function (l, i) { paintRun(x, l, size * 0.5, size * 0.5 + i * lh, size, false); });
    return { c: c, widths: widths, lh: lh, pad: size * 0.5 };
  }

  // ------------------------------------------------------------------ hologram logo (styled after the city in the original)
  function logoSprite(L) {
    var lc = T.logo, pad = L * 0.18, S = Math.ceil(L + pad * 2), dpr = 1;
    var c = glyphCanvas(S, S), g = c.getContext('2d'), path = new Path2D(LOGO_PATH), k = L / 600;
    var place = function () { g.setTransform(k, 0, 0, k, S / 2 - 364 * k, S / 2 - 340 * k); };
    // outer glow
    place(); g.filter = 'blur(' + Math.max(4, L * 0.022) + 'px)';
    g.strokeStyle = rgba(lc.glow, 0.9); g.lineWidth = 16; g.stroke(path);
    g.fillStyle = rgba(lc.glow, 0.35); g.fill(path, 'evenodd'); g.filter = 'none';
    // translucent panel fill with circuitry, clipped to the logo
    g.save(); place(); g.clip(path, 'evenodd');
    g.setTransform(1, 0, 0, 1, 0, 0);
    var grd = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    grd.addColorStop(0, rgba(lc.fill, 0.85)); grd.addColorStop(1, rgba(lc.fill, 0.5));
    g.fillStyle = grd; g.fillRect(0, 0, S, S);
    var seed = 7; var r = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    g.strokeStyle = rgba(lc.edge, 0.55); g.lineWidth = Math.max(0.6, L / 700);
    for (var i = 0; i < 520; i++) {
      var x = r() * S, y = r() * S, len = (4 + r() * 22) * L / 500;
      g.beginPath(); g.moveTo(x, y);
      if (r() < 0.5) { g.lineTo(x + len, y); g.lineTo(x + len, y + len * 0.4 * (r() < 0.5 ? -1 : 1)); }
      else { g.lineTo(x, y + len); g.lineTo(x + len * 0.4, y + len); }
      g.stroke();
      if (r() < 0.25) { g.strokeRect(x - 2, y - 2, 4 * L / 500 + 2, 3 * L / 500 + 2); }
    }
    g.fillStyle = rgba(lc.core, 0.18);
    for (var yy = 0; yy < S; yy += 3) g.fillRect(0, yy, S, 1);
    place(); g.strokeStyle = rgba(lc.edge, 0.45); g.lineWidth = 7; g.stroke(path);
    g.restore();
    // crisp edges
    place(); g.strokeStyle = lc.edge; g.lineWidth = 2.6; g.stroke(path);
    g.strokeStyle = lc.core; g.lineWidth = 1.1; g.stroke(path);
    // pads like the city's round landing pads
    [[340, 240, 9], [340, 357, 7], [660, 603, 5]].forEach(function (p) {
      g.beginPath(); g.arc(p[0], p[1], p[2], 0, Math.PI * 2); g.strokeStyle = lc.core; g.lineWidth = 1.6; g.stroke();
      g.beginPath(); g.arc(p[0], p[1], p[2] * 0.4, 0, Math.PI * 2); g.fillStyle = lc.core; g.fill();
    });
    return { c: c, S: S, L: L };
  }

  // ------------------------------------------------------------------ main
  function loadImg(name) {
    return new Promise(function (res, rej) { var i = new Image(); i.crossOrigin = 'anonymous'; i.onload = function () { res(i); }; i.onerror = rej; i.src = assetURL(name); });
  }

  function start() {
    var el = mount();
    var font = new FontFace(FONT, 'url("' + assetURL(T.font + '.woff') + '")');
    Promise.all([loadImg('aura0.jpg'), loadImg('aura1.jpg'), loadImg('stars.jpg'), font.load().then(function (f) { document.fonts.add(f); })])
      .then(function (r) { run(el, { a0: r[0], a1: r[1], st: r[2] }); })
      .catch(function (e) { console.warn('[glyphaura] asset load failed', e); el.bg.style.background = T.bg; });
  }

  function run(el, imgs) {
    var bg = makeGL(el.bg, imgs);
    var fx = el.fg.getContext('2d');
    var W = 0, H = 0, dpr = 1, layers = null, sprite = null, blocks = [], dust = [];
    var t0 = performance.now(), lastSpawn = -10;

    function build() {
      W = window.innerWidth; H = window.innerHeight; dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      el.fg.width = Math.round(W * dpr); el.fg.height = Math.round(H * dpr);
      var small = W < 700, sz = T.size * (small ? 0.8 : 1);
      layers = {
        ribbons: [
          { c: ribbon(W * 2, sz), y: 10, v: -26, a: 0.85 },
          { c: ribbon(W * 2, sz * 0.75), y: 10 + sz * 1.5, v: 18, a: 0.5 },
          { c: ribbon(W * 2, sz * 0.75), y: H - sz * 3.4, v: -18, a: 0.5 },
          { c: ribbon(W * 2, sz), y: H - sz * 1.9, v: 26, a: 0.85 }
        ],
        columns: (small ? [0.06, 0.94] : [0.04, 0.16, 0.84, 0.96]).map(function (fx, i) {
          return { c: column(H * 2, sz * 0.8), x: W * fx, v: (i % 2 ? -1 : 1) * (14 + i * 3), p: (i % 2 ? -0.45 : 0.45), a: 0.35 };
        })
      };
      sprite = logoOn && LOGO_PATH ? logoSprite(Math.max(200, Math.min(640, Math.min(W, H) * 0.42))) : null;
      dust = [];
      for (var i = 0, n = Math.round(W * H / 12000); i < n; i++)
        dust.push({ x: rand() * W, y: rand() * H, vx: (rand() - 0.5) * 10, vy: -6 - rand() * 20, life: 3 + rand() * 5, ph: rand(), s: 0.8 + rand() * 1.6, b: 0.3 + rand() * 0.7 });
      blocks = [];
    }
    build();
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(build, 150); });

    // logo motion: wander (55 s) -> glide home (5 s) -> hold at centre (15 s) -> glide out (5 s)
    var WANDER = 55, RET = 5, HOLD = 15, DEP = 5, CYCLE = WANDER + RET + HOLD + DEP;
    var smooth = function (x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); };
    function wanderPoint(w) {
      var ax = Math.max(0, W / 2 - sprite.L * 0.35), ay = Math.max(0, H / 2 - sprite.L * 0.35);
      return [W / 2 + ax * (0.62 * Math.sin(0.071 * w + 1.3) + 0.38 * Math.sin(0.113 * w + 0.2)),
              H / 2 + ay * (0.62 * Math.sin(0.059 * w + 0.5) + 0.38 * Math.sin(0.127 * w + 2.1))];
    }
    function logoState(t) {
      // start the cycle at the centre hold, so the logo opens centred
      var tt = t + WANDER + RET, c = tt % CYCLE, n = Math.floor(tt / CYCLE), base = n * (WANDER + DEP), wclock, blend;
      if (c < WANDER) { wclock = base + c; blend = 1; }
      else if (c < WANDER + RET) { wclock = base + WANDER; blend = 1 - smooth((c - WANDER) / RET); }
      else if (c < WANDER + RET + HOLD) { wclock = base + WANDER; blend = 0; }
      else { var d = c - WANDER - RET - HOLD; wclock = base + WANDER + d; blend = smooth(d / DEP); }
      var p = wanderPoint(wclock);
      return { x: W / 2 + (p[0] - W / 2) * blend, y: H / 2 + (p[1] - H / 2) * blend, rot: t * (Math.PI * 2 / 140) };
    }

    function drawLogo(t) {
      if (!sprite || !FLICKER) return;
      var fi = Math.floor(t * FLICKER.fps) % FLICKER.city.length, fr = FLICKER.city[fi];
      if (flickerMode === 'soft') fr = { a: Math.max(0.4, fr && fr.a > 0 ? fr.a : 0.4), m: false };
      if (!fr || fr.a <= 0) return;
      var st = reduce ? { x: W / 2, y: H / 2, rot: 0 } : logoState(t);
      fx.save();
      fx.translate(st.x, st.y); fx.rotate(st.rot);
      if (fr.m) {                                                        // the original's band mask
        var mf = FLICKER.mask[fi - FLICKER.maskStart] || [];
        fx.beginPath();
        var L = sprite.L;
        for (var i = 0; i < mf.length; i++) {
          var r = mf[i]; fx.rect(-L / 2 + r[0] * L, -L / 2 + r[1] * L, (r[2] - r[0]) * L, (r[3] - r[1]) * L);
        }
        fx.clip();
      }
      fx.globalAlpha = fr.a; fx.globalCompositeOperation = 'lighter';
      fx.drawImage(sprite.c, -sprite.S / 2, -sprite.S / 2);
      fx.restore();
    }

    function frame(now) {
      var t = reduce ? 6 : (now - t0) / 1000, sc = window.scrollY || window.pageYOffset || 0;
      if (bg) bg.draw(t, sc, W, H, dpr);
      fx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fx.clearRect(0, 0, W, H);
      fx.globalCompositeOperation = 'lighter';
      // dust
      for (var i = 0; i < dust.length; i++) {
        var d = dust[i], ph = ((t / d.life) + d.ph) % 1, age = ph * d.life;
        var x = ((d.x + d.vx * age) % W + W) % W, y = ((d.y + d.vy * age - sc * 0.2) % H + H) % H;
        fx.globalAlpha = Math.sin(Math.PI * ph) * d.b * 0.7; fx.fillStyle = T.dust; fx.fillRect(x, y, d.s, d.s);
      }
      // columns (move with scroll)
      layers.columns.forEach(function (c) {
        var h = c.c.height, off = ((t * c.v + sc * c.p) % h + h) % h;
        fx.globalAlpha = c.a * textLevel;
        fx.drawImage(c.c, c.x - c.c.width / 2, off - h); fx.drawImage(c.c, c.x - c.c.width / 2, off);
      });
      // ribbons
      layers.ribbons.forEach(function (r) {
        var w = r.c.width, off = ((t * r.v) % w + w) % w;
        fx.globalAlpha = r.a * textLevel;
        fx.drawImage(r.c, off - w, r.y); fx.drawImage(r.c, off, r.y);
      });
      // typing blocks
      if (!reduce && t - lastSpawn > 3.2 && blocks.length < (W < 700 ? 2 : 4)) {
        lastSpawn = t;
        var b = block(Math.min(420, W * 0.36), T.size * (W < 700 ? 0.7 : 0.85));
        var left = rand() < 0.5;
        blocks.push({ b: b, x: left ? W * (0.05 + rand() * 0.15) : W * (0.95 - rand() * 0.15) - b.c.width, y: H * (0.15 + rand() * 0.6), sc0: sc, t0: t, type: 1.6 + rand(), hold: 4 + rand() * 2, fade: 1.5 });
      }
      if (reduce && !blocks.length) {
        var bb = block(Math.min(420, W * 0.36), T.size * 0.85);
        blocks.push({ b: bb, x: W * 0.06, y: H * 0.3, sc0: sc, t0: -100, type: 1, hold: 1e9, fade: 1 });
      }
      blocks = blocks.filter(function (k) { return t - k.t0 < k.type + k.hold + k.fade; });
      blocks.forEach(function (k) {
        var age = t - k.t0, b = k.b, y = k.y - (sc - k.sc0) * 0.25;
        var a = age > k.type + k.hold ? 1 - (age - k.type - k.hold) / k.fade : 1;
        fx.globalAlpha = Math.max(0, a) * 0.9 * textLevel;
        var total = b.widths.reduce(function (s, w) { return s + w; }, 0), shown = Math.min(1, age / k.type) * total;
        for (var i = 0; i < b.widths.length; i++) {
          var w = Math.min(b.widths[i], shown); if (w <= 0) break;
          var sy = b.pad + i * b.lh - b.pad * 0.5;
          fx.drawImage(b.c, 0, sy, w + b.pad, b.lh, k.x, y + sy, w + b.pad, b.lh);
          if (w < b.widths[i]) { fx.fillStyle = T.text; fx.fillRect(k.x + b.pad + w, y + sy + b.lh * 0.15, 3, b.lh * 0.6); }
          shown -= b.widths[i];
        }
      });
      fx.globalAlpha = 1;
      if (logoOn) drawLogo(t);
      if (!reduce) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
