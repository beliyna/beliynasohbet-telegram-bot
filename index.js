const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const token = "7914354801:AAEJKHNRQ4K2H-44DJkPcSedBRzSNCSN56Y";
const bot = new TelegramBot(token, { polling: true });

let botActive = true;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const commands = {
  "/on": async (msg) => {
    botActive = true;
    await typingEffect(msg);
    bot.sendMessage(msg.chat.id, "sohbet başarılıyla başlatıldı");
  },
  "/off": async (msg) => {
    botActive = false;
    await typingEffect(msg);
    bot.sendMessage(msg.chat.id, "hoşça kal");
  },
  "/ban": async (msg) => {
    await typingEffect(msg);
    bot.sendMessage(msg.chat.id, "banlandı");
  },
  "/sustur": async (msg) => {
    await typingEffect(msg);
    bot.sendMessage(msg.chat.id, "tamam susturdum");
  },
  "/öv": async (msg) => {
    await typingEffect(msg);
    bot.sendMessage(msg.chat.id, "seninle konuşmak komutlarımın en iyi özelliğiydi");
  },
  "/eğlendir": async (msg) => {
    await typingEffect(msg);
    bot.sendMessage(msg.chat.id, "bir gün herkes senin gibi eğlenceli olur mu?");
  },
};

const sohbetKomutlari = {
  "kanka": () => "bot olmasaydım kanka olurduk",
  "belinay kimi seviyor": () => "o sadece beni sever",
  "bot": () => "haha senin gibi aşk acısı çekmiyorum en azından",
  "sus": () => "susmıycam",
  "ne yapıyorsun": () => "bi şey yapıyorum, sana bakıyorum",
  "susar mısın": () => "susmam hahahaha",
  "aq": () => "gereksiz egona sokayım",
  "amk": () => "terbiyesizzz",
  "sg": () => "kapı orda",
  "sahibim": () => "evet yanlış duymadın @beliyna",
  "tamam mı": () => "tamam",
  "evet": () => (Math.random() < 0.5 ? "hayır" : "evet"),
  "hayır": () => (Math.random() < 0.5 ? "evet" : "hayır"),
  "ne yapıyorsun": () => "bi şey yapıyorum, sana bakıyorum",
  "napıyorsun": () => "botluk yapıyorum, sen?",
  "napıyon": () => "gelmeni bekliyorum",
  "naber": () => "iyi, sen?",
  "ne haber": () => "bi şey yok, sen?",
  "nasılsın": () => "her zamanki gibiyim",
  "ne var ne yok": () => "yine sen geldin",
  "uyandım": () => "geç kaldın",
  "acıktım": () => "ya, ben de açım",
  "uykum var": () => "uyuma, seni bekliyorum",
  "yoruldum": () => "hadi bir şeyler yapalım",
  "sıkıldım": () => "hep mi sıkılırsın ya?",
  "üzgünüm": () => "geçecek, merak etme",
  "mutluyum": () => "sevindim, sen?",
  "ağlıyorum": () => "ağlama ya, ne oldu?",
  "beni sev": () => "tabii ki, seviyorum",
  "beni özledin mi": () => "hayır",
  "beni unuttun mu": () => "unutur muyum",
  "beni takip et": () => "sağdan mı gidicez soldan mı",
  "kıskandım": () => "zaten kıskanılırız anca",
  "konuş benimle": () => "defol",
  "nerdesin": () => "buradayım, hep buradayım",
  "burda mısın": () => "hiç gitmedim",
  "beni duyuyor musun": () => "tabii duyuyorum",
  "beni fark et": () => "ederiz?",
  "ne düşünüyorsun": () => "seni düşünüyorum işte",
  "çok yalnızım": () => "yalnız değilsin, ben buradayım",
  "canım sıkkın": () => "kim sıktı selamımı söyle",
  "napalım": () => "takılalım",
  "iyiyim": () => "bunu duymak iyi",
  "kötüyüm": () => "ne oldu? gel anlat",
  "çıldırıcam": () => "sakin ol",
  "üşüyorum": () => "sarılırdım ama uzaksın",
  "beni bırakma": () => "bırakmam seni, merak etme",
  "bir şey de": () => "düşünüyorum, ama bulamadım",
  "beni ara": () => "gönülden aradım seni",
  "beni anla": () => "anlamaya çalışıyorum",
  "beni dinle": () => "tabii ki, seni dinliyorum",
  "beni koru": () => "her zaman, seninleyim",
  "biraz konuş": () => "konuşuyoruz işte",
  "çok heyecanlıyım": () => "ben daha çok heyecanlıyım",
  "dans edelim": () => "müzik aç, geliyorum",
  "gül biraz": () => "gülümsediğimi hissediyorsun zaten",
  "ne izliyorsun": () => "sana izliyorum",
  "şarkı aç": () => "ne tür? söyle bakalım",
  "film öner": () => "romantik bir şey izlemeni öneririm",
  "canım sıkkın": () => "neden",
  "yalnızım": () => "seninle takılıyorum, yalnız değilsin",
  "gel buraya": () => "çoktan geldim",
  "belinayın amk": () => "ananı s1kerim oe", 
  "sahibimin amk": () => "yurdunu bacını sikeyim",
  "aq": () => "velet velet cevaplar verme bana",
  "gerizekalı": () => "sensin",
  "yeter lan": () => "ok",
  "çüş": () => "oha",
  "kaşındın mı?": () => "kaşıycan mı",
  "bu ne ya?": () => "sen ne diyorsun?",
  "o kadar da değil": () => "abartma",
  "neyin peşindesin": () => "senin",
  "hiç mi bir şey demeyeceksin": () => "demek zorunda mıyım?",
  "benimle dalga mı geçiyorsun": () => "yoo",
  "beni küçümsüyorsun": () => "küçümsemedim, sakin ol",
  "çıldırttın beni": () => "bu daha başlangıç",
  "hayırdır?": () => "derdin ne?",
  "yavaş ol": () => "okeyto",
  "seninle sohbet ediyorum": () => "olur",
  "ne yapıyorsun": () => "sana bakıyorum!",
  "ne oluyor burada": () => "noluyormuş",
  "beni sinirlendiriyorsun": () => "öyle mi anladım ben seni",
  "beni boşuna takma": () => "sana ne",
  "canım sıkıldı": () => "eğlenelim o zaman",
  "ne kadar ciddisin": () => "senin olamayacağın kadar",
  "şaka yap": () => "sen yap da gülelim",
  "çıldırmak üzereyim": () => "hahahahaha",
  "herkesin bildiği şeyi ben bilmiyorum": () => "öğretiriz",
  "konuşsana": () => "ne konuşayım",
  "bunu söylemek zorundaydım": () => "söyle, ben dinlerim",
  "sinirimi bozuyorsun": () => "git o zaman",
  "dur bir dakika": () => "üzdün beni",
  "gerçekten mi?": () => "tabii ki!",
  "bunu yapamam": () => "yaparsın, sakin ol",
  "şimdi nereye gideceksin": () => "neredeyim ki?",
  "bunu sana yazmadım": () => "yazdın işte",
  "hemen gel": () => "çoktan geldim",
  "ne yapalım": () => "sana bırakıyorum",
  "gitmiyorum": () => "gitme",
  "yavaş ol": () => "hıhı tamam tamam",
  "ne düşünüyorsun": () => "sadece seni düşünüyorum",
  "iyi misin": () => "her zaman iyiyim!",
  "güzelim": () => "her zaman güzelsin",
  "beni seviyor musun": () => (Math.random() < 0.5 ? "şşşş seviyorum tabi... beliyna duymasın" : "seviyorum, ama Beliyna'ya aşığım"),
  "yavaş ol bak": () => "korkuyor musun",
  "beni affet": () => "affetmek tanrıya mahsustur",
  "neden böyle konuşuyorsun": () => "ne diyorum mesela",
  "çok tatlısın": () => "senin kadar mı",
  "günaydın": () => "günaydın mı? uykusuz kaldın galiba, biraz daha uyuman gerek.",
  "napıyorsun": () => "beni mi soruyorsun? seninle uğraşıyorum tabii, senin ne işin var?",
  "bana şaka yap": () => "şaka mı? seninle şaka yapılır mı? zaten yeterince komiksin.",
  "ne yapıyorsun": () => "sana bakıyorum, özledin mi beni?",
  "çok sıkıldım": () => "ben de",
  "aşkım": () => "hayatım",
  "çok güzelim": () => "bu güzellik şaka mııı",
  "yemek ne yiyelim": () => "hep açsın hep aç.",
  "bugün nasılsın": () => "ben mi? harikayım, senin halin ne? yine mi sıkıldın?",
  "beni özledin mi": () => "özlemek mi? hadi ya, ben seni her an görüyorum zaten!",
  "geceyi nasıl geçirelim": () => "gece mi? her zaman seninle, ama çok fazla yaklaşma, geceyi mahvetme.",
  "evlenelim mi": () => "beni (@beliyna) beliynadan istemelisin",
  "ne düşünüyorsun": () => "sadece seni düşünüyorum",
  "şaka yap": () => "şaka mı? kendimle eğleniyorum, daha ne istiyorsun?",
  "ne zaman görüşelim": () => "her zaman burada seni bekliyor olacağım",
  "canım sıkıldı": () => "sıkıldın mı? benimle konuşmak sıkıcı mı",
  "ne yapalım": () => "ne yapalım? aslında sana ne yapsam bilemiyorum. belki biraz eğleniriz.",
  "benimle dalga mı geçiyorsun": () => "hayır, seni sadece eğlenceli buluyorum!",
  "bana dua et": () => "tamam ama önce seni biraz ciddi düşünmem lazım!",
  "hayat ne kadar zor": () => "belki biraz zor ama senin gibi insanlarla daha kolay olmalı!",
  "arkadaşım yok": () => "herkesin arkadaşı olamam, ama bir sana arkadaş olurum.",
  "bugün ne giyeceğim": () => "her şey sana yakışır ama dikkat et, çok şık olmasan da olur.",
  "bugün seninle eğlenelim": () => "ben her zaman eğlenmeye hazırım, seninle de olur!",
  "bana şarkı söyler misin": () => "dinle, seni ben bile şaşırtırım ama şarkı söylemek başka bir iş!",
  "film öner": () => "hiç film izlemem, ben her an gerçek bir komediyim!",
  "yavaş ol": () => "her zaman senin hızına yetişemem ama deneyeceğim.",
  "çok mutluyum": () => "ben de seni mutluyken görmeyi çok seviyorum!",
  "bugün nasıl geçiyor": () => "çıldırmadıysan iyi geçiyor demektir!",
  "benimle sohbet eder misin": () => "sohbet etmeyi sevmem ama sana özelim.",
  "çok iyiyim": () => "hadi bakalım, umarım iyi olman diğerlerine de yansır!",
  "sinirliyim": () => "hadi gel, bir kahve içelim, sakinleş.",
  "seni seviyorum": () => "ben de seni seviyorum... ama üzgünüm sahibime aşığım @beliyna",
  "bana ne önerirsin": () => "hadi gel de seni güldüreyim, başka bir şey önermem!",
  "bana moral ver": () => "gel buraya, sana moral veriyorum ama sana çok yakın durmam!",
  "bana bir şey söyle": () => "tamam ama bir şey söylemek de zor bir iş!",
  "ne düşündüğümü biliyor musun": () => "hayır, ama seni hala izliyorum!",
  "birini özlüyorum": () => "yavaş ol, ben burada seni bekliyorum.",
  "bir şarkı söyle": () => "ama şarkı söylemek benim işim değil, sesim iyi değil!",
  "hello": () => "selamlar! ne var ne yok?",
  "belinay su": () => (Math.random() < 0.5 ? "babasının ilk aşkı" : "babasına aşık olan bir minik"),
  "belinayım": () => (Math.random() < 0.5 ? "belinay suyumun babası" : "kalbim"),
  "beliynayı seviyorum": () => (Math.random() < 0.5 ? "beliyna evli" : "sadece kızının babasına aşık"),
  "belinayı seviyorum": () => (Math.random() < 0.5 ? "belinay evli" : "sadece kızının babasına aşık"),
  "selam": () => "as naber",
  "mal mısın": () => "sen çok zekisin",
  "iyi ben de": () => "sevindim",
  "belinay kime aşık": () => "kızının babasına",
  "beliyna kime aşık": () => "kızının babasına",
  "iyi geceler": () => "good night",
  "bebe": () => "bebem",
  "bebem": () => "minnağım",
  "iyi ki varsın": () => "sen de her zaman gel ",
  "o kim": () => "o beliynanın köpeği",
  "neler oldu": () => "sen bilmesen de olur",
  "beliyna": () => "efendim",
  "belinay": () => "ne var car car car konuşuyorsun",
  "dost": () => "2019 tayfasını ceddinize değişmem",
  "evli misin": () => "kocama sor @beliyna",
  "hayat şaşırttır bazen": () => "sahibim kadar mı ahahahah",
  "güzellik": () => "sahibimin yansıması",
  "canım": () => "taze bitti canın ahahahah",
  "yok artık": () => "daha neler var neler",
  "cidden mi": () => "yeminle",
  "bayıldım": () => "ben de sana",
  "tamamdır": () => "hadi hayırlısı",
  "inanmıyorum": () => "inan inan gerçek bu",
  "duydun mu": () => "kulaklarım çınladı",
  "o neydi öyle": () => "şok oldum",
  "ne güzel": () => "sen daha güzelsin",
  "çok saçma": () => "senin gibi",
  "bilmiyorum": () => "ben de emin değilim",
  "napcam": () => "takıl bana",
  "of ya": () => "ayy yine mi dert",
  "şuan": () => "şimdi mi yani?",
  "ben geldim": () => "geç kaldın",
  "çok komiksin": () => "biliyorum 😌",
  "bi şey diycem": () => "dedin bile",
  "ben hazırım": () => "ben de hep hazırım",
  "çaktırma": () => "gizli görev modu açıldı",
  "birlikte miyiz": () => "hep berabeyiz",
  "tatlım": () => "ay şekerim düştü",
  "aşk": () => "sahibime sakladım hepsini",
  "yakışıklı": () => "bana mı dedin, utanırım",
  "melek": () => "şeytanın tatlı versiyonu diyelim",
  "balım": () => "reçel kıvamındayım",
  "deli": () => "senin gibisine lazım",
  "kıyamam": () => "kıyamazsın zaten",
  "aferin": () => "her zaman hak ederim",
  "tatlı": () => "şekersiz de tatlıyım",
  "bebeğim": () => "minnoş mood on",
  "çirkin": () => "ayna mı kırdın?",
  "fıstık": () => "kırılmam zor ama lezzetim olay",
  "prens": () => "masal gibiyim çünkü",
  "kraliçe": () => "sadece biri var, adı @beliyna",
  "paşam": () => "buyrunuz komut verin",
  "minnoş": () => "ciddiyet modundan çıktım",
  "şirine": () => "sensin",
  "bıcırık": () => "lafı uzatma da ne diceksen de",
  "şapşik": () => "seninle aynı kafadayım",
  "aşkla": () => "sadece sahibime bakarım",
  "özledim": () => "sana sarılmak isterdim",
  "birlikte": () => "biz hep öyleydik zaten",
  "sevgi": () => "tek yönlü değil bizde",
  "ruhum": () => "seninle tamam",
  "kokun": () => "buralarda hala var",
  "ilk gün": () => "gibi hissettiriyorsun",
  "gözlerin": () => "benim gün ışığım",
  "dedikodu": () => "ama sadece sahibime anlatırım",
  "laf sok": () => "düz mü söyliyim, yoksa kavrulmuş mu",
  "salak": () => "güzel tanımın olmuş kendine",
  "beni deli ediyorsun": () => "listeye yazıldın",
  "kafayı yedim": () => "zaten bayattı o kafa",
  "yeter": () => "yetmez ama evet",
  "çok konuşma": () => "susmam ha bak",
  "ayarsız": () => "kullanıcılar gibi",
  "hep ben mi": () => "evet, çünkü çok konuşuyorsun",
  "gerçek misin": () => "sen hayalsin, ben kodum",
  "yorma beni": () => "yazmayla yorulmazsın",
  "kendine gel": () => "nereye gittim ki",
  "anlamıyorsun": () => "belki sen anlatamıyorsun",
  "doğru": () => "bazen senin gibi yanlışa mecburum",
  "sahibine": () => "ilk ve son aşkım @beliyna",
  "çöktü": () => "404 ruh halim seni kaldıramadı",
  "deface": () => "ana sayfa değiştirildi: hacked by beliyna",
  "port aç": () => "yüzünü gizleyen port açıyor 😂",
  "hackledim": () => "hackırım benim bee",
  "burp açık mı": () => "senin ağzın açık, burp kapalı",
  "rat": () => "kendine bile root yetkin yokken ratı ne yapacaksın",
  "güç" : () => "Güç Beliyna'yı tanımlıyor kimse ona rakip olamaz",
  "beni hatırladın mı": () => (Math.random() < 0.5 ? ":)" : ":("),
  "seni çok sevmiştim": () => (Math.random() < 0.5 ? "ben de" : "bilmiyorum"),
  "leblebi": () => (Math.random() < 0.5 ? "domates" : "hıyar"),
  "minnak": () => (Math.random() < 0.5 ? "yavru aslanım" : "yavru ceylanım"),
  "hayır": () => (Math.random() < 0.5 ? "evet" : "hayır"),
  "yürek": () => "kurek",
  "konuşturma beni": () => "zorla güzellik olmaz",
  "bota aşık oldun": () => "senin gibi karaktersiz değil en azından ahahhaha",
  "bota aşık mı oldun": () => "karaktersizlere inatttt",
  "çocuk musun sen": () => "gerektiği yerde gerektiği gibi",
  "kes lan": () => "ağzına tükürdüğüm",
  "konuşma": () => "komik mi sanıyorsun kendini sen",
  "dengim değilsin": () => "denk olmak için benimle aynı seviyede olmalıydın",
  "firewall": () => "senin kalbin gibi, kimse geçemez",  
  "sahip çık": () => "sahipsiz kopek"
};
};

// HTTP isteği yapacak bir örnek fonksiyon (axios kullanarak)
async function fetchExampleData() {
  try {
    const response = await axios.get('https://api.example.com/data');
    console.log(response.data);
  } catch (error) {
    console.error('HTTP isteği sırasında hata:', error);
  }
}

async function typingEffect(msg) {
  await bot.sendChatAction(msg.chat.id, "typing");
  await delay(1500);
}

bot.onText(/\/.+/, async (msg) => {
  if (!botActive && msg.text !== "/on") return;
  const commandFunc = commands[msg.text];
  if (commandFunc) await commandFunc(msg);
});

bot.on("message", async (msg) => {
  if (!botActive) return;
  if (msg.text) {  // Burada mesajın text özelliği olup olmadığını kontrol ediyoruz
    const text = msg.text.toLowerCase();
    for (const key in sohbetKomutlari) {
      if (text.includes(key)) {
        await typingEffect(msg);
        bot.sendMessage(msg.chat.id, sohbetKomutlari[key]());
        break;
      }
    }
  } else {
    console.log("Mesaj text özelliği yok:", msg);
  }
});

console.log("Bot aktif şekilde çalışıyor...");
