// --- DİL VE SABİT METİN AYARLARI ---
let currentLang = 'tr'; 
let currentCardIndex = 0;
let score = 0;
let currentQuestions = [];
let currentChapter = 1; // Seçilen bölüm (1, 2 veya 3)
let hasAnsweredCurrentCard = false;
let selectedAnswer = null;

const uiTranslations = {
    tr: {
        startButton: "Oyuna Başla",
        nextButton: "Sonraki Kart",
        scoreLabel: "Puan",
        cardLabel: "Kart",
        correctLabel: "DOĞRU CEVAP:",
        gameOver: "Oyun bitti! Skorunuz: {score} / {total}",
        chapterTitle: "Bölüm Seç",
        backButton: "Geri",
        resumeButton: "Kaldığın Yerden Devam Et",
        noProgress: "Devam edilecek kayıtlı oyun bulunamadı.",
        scoreSaved: "Skorunuz otomatik kaydedildi.",
        enterNameToSave: "Skoru kaydetmek için adınızı yazıp Skoru Kaydet'e basın.",
        finishToSave: "Skor kaydetmek için önce bölümü bitirin."
    },
    en: {
        startButton: "Start Game",
        nextButton: "Next Card",
        scoreLabel: "Score",
        cardLabel: "Card",
        correctLabel: "CORRECT ANSWER:",
        gameOver: "Game Over! Your Score: {score} / {total}",
        chapterTitle: "Select Chapter",
        backButton: "Back",
        resumeButton: "Continue",
        noProgress: "No saved game was found to continue.",
        scoreSaved: "Your score was saved automatically.",
        enterNameToSave: "Enter your name and press Save Score to save it.",
        finishToSave: "Finish the chapter before saving a score."
    }
};

const chapter1Tr = [
    { category: "Genel Kültür", difficulty: "Kolay", question: "Dünyanın en büyük okyanusu hangisidir?", image: "images/01.jpg", options: { A: "Atlantik", B: "Hint", C: "Pasifik", D: "Arktik" }, correctAnswer: "C", answerDetail: "Pasifik Okyanusu, dünyanın en büyük okyanusudur." },
    { category: "Tarih", difficulty: "Kolay", question: "Atatürk'ün doğum yılı nedir?", image: "images/02.jpg", options: { A: "1881", B: "1886", C: "1890", D: "1901" }, correctAnswer: "A", answerDetail: "Mustafa Kemal Atatürk 19 Mayıs 1881'de doğmuştur." },
    { category: "Bilim", difficulty: "Kolay", question: "Güneş sistemindeki en büyük gezegen hangisidir?", image: "images/03.jpg", options: { A: "Mars", B: "Jüpiter", C: "Dünya", D: "Satürn" }, correctAnswer: "B", answerDetail: "Jüpiter, Güneş Sistemi'nin en büyük gezegenidir." },
    { category: "Sağlık", difficulty: "Kolay", question: "Günlük su tüketimi için en doğru öneri hangisidir?", image: "images/04.jpg", options: { A: "Sadece açken", B: "Düzenli ve yeterli", C: "Sadece kahve ile", D: "Yalnızca yazın" }, correctAnswer: "B", answerDetail: "Su düzenli ve yeterli miktarda tüketilmelidir." },
    { category: "Hayvanlar", difficulty: "Kolay", question: "Penguenler en çok hangi ortamda yaşarlar?", image: "images/05.jpg", options: { A: "Çöller", B: "Tropik ormanlar", C: "Soğuk kutup bölgeleri", D: "Dağ zirveleri" }, correctAnswer: "C", answerDetail: "Penguenler çoğunlukla soğuk kutup bölgelerinde yaşar." },
    { category: "Müzik", difficulty: "Kolay", question: "Bir müzik parçasının hızını belirten kavram hangisidir?", image: "images/06.jpg", options: { A: "Ritim", B: "Tempo", C: "Melodi", D: "Harmoni" }, correctAnswer: "B", answerDetail: "Tempo, müziğin hızını ve akışını belirler." },
    { category: "Spor", difficulty: "Kolay", question: "Futbolda kırmızı kart görünce ne olur?", image: "images/07.jpg", options: { A: "Uyarı verilir", B: "Oyuncu sahadan atılır", C: "Maç durur", D: "Serbest vuruş verilir" }, correctAnswer: "B", answerDetail: "Kırmızı kart, oyuncunun maçtan atılmasına neden olur." },
    { category: "Edebiyat", difficulty: "Orta", question: "Şiirde duyguyu en güçlü şekilde ifade eden unsur hangisidir?", image: "images/08.jpg", options: { A: "Tema", B: "Duygu", C: "Metrik", D: "Kafiye" }, correctAnswer: "B", answerDetail: "Şiirde duygusal anlatım okuyucunun duygusal tepkisini artırır." },
    { category: "Kültür & Sanat", difficulty: "Orta", question: "El yazması eserlerin saklandığı ve korunduğu yapıya ne denir?", image: "images/09.jpg", options: { A: "Müze", B: "Kütüphane", C: "Tiyatro", D: "Müzayede" }, correctAnswer: "B", answerDetail: "Kütüphaneler, yazılı eserlerin korunması ve erişimi için önemlidir." },
    { category: "Bilim", difficulty: "Orta", question: "Fotosentez en çok hangi canlılarda görülür?", image: "images/10.jpg", options: { A: "Hayvanlar", B: "Mantarlar", C: "Bitkiler", D: "Bakteriler" }, correctAnswer: "C", answerDetail: "Bitkiler klorofil sayesinde fotosentez yapar." },
    { category: "Din", difficulty: "Kolay", question: "İslam'da günde kaç vakit namaz kılınır?", image: "images/11.jpg", options: { A: "2", B: "3", C: "4", D: "5" }, correctAnswer: "D", answerDetail: "Günlük namaz beş vakit olarak kılınır." },
    { category: "Yaşam", difficulty: "Kolay", question: "Sağlıklı büyüme için en temel ihtiyaç hangisidir?", image: "images/12.jpg", options: { A: "Yalnızca oyun", B: "Düzenli beslenme", C: "Sürekli uyku", D: "Sadece eğlence" }, correctAnswer: "B", answerDetail: "Dengeli beslenme, sağlığın temel taşlarından biridir." },
    { category: "Teknoloji", difficulty: "Kolay", question: "Bilgisayarın ana işlem birimi hangisidir?", image: "images/13.jpg", options: { A: "Ekran", B: "RAM", C: "CPU", D: "Klavye" }, correctAnswer: "C", answerDetail: "CPU, bilgisayarın işlem yapma merkezidir." },
    { category: "Doğa", difficulty: "Orta", question: "Bir nehrin taşıdığı maddelerin birikmesiyle oluşan alanlara ne denir?", image: "images/14.jpg", options: { A: "Dağ", B: "Delta", C: "Vadi", D: "Plato" }, correctAnswer: "B", answerDetail: "Delta, nehir taşıyan alüvyonların denize ulaştığı yerde oluşur." },
    { category: "Hayvanlar", difficulty: "Orta", question: "Kaplumbağalar çoğunlukla nasıl hareket eder?", image: "images/15.jpg", options: { A: "Uçarak", B: "Yüzerken", C: "Yürüyerek", D: "Atlayarak" }, correctAnswer: "C", answerDetail: "Kaplumbağalar çoğunlukla karada yürür." },
    { category: "Tarih", difficulty: "Orta", question: "İlk yazılı iletişim araçlarından biri olan tabletler hangi medeniyete aittir?", image: "images/16.jpg", options: { A: "Roma", B: "Mısır", C: "Yunan", D: "Hun" }, correctAnswer: "B", answerDetail: "Mısır medeniyetinde kil tabletler yazı aracı olarak kullanılmıştır." },
    { category: "Spor", difficulty: "Orta", question: "Tenis maçlarında set kazanmak için gereken puan sınırı kaçtır?", image: "images/17.jpg", options: { A: "15", B: "21", C: "30", D: "40" }, correctAnswer: "D", answerDetail: "Teniste puan sistemi 15-30-40 şeklindedir." },
    { category: "Müzik", difficulty: "Orta", question: "Bir orkestrada yaylı çalgıları yöneten kişiye ne denir?", image: "images/18.jpg", options: { A: "Şarkıcı", B: "Orkestra şefi", C: "Besteci", D: "Saz sanatçısı" }, correctAnswer: "B", answerDetail: "Orkestra şefi, müzisyeni yönetir ve eseri yönlendirir." },
    { category: "Bilim", difficulty: "Kolay", question: "Gezegenlerin Güneş etrafında dönmesini sağlayan kuvvet hangisidir?", image: "images/19.jpg", options: { A: "Mıknatıs kuvveti", B: "Yerçekimi", C: "Elektrik", D: "Sürtünme" }, correctAnswer: "B", answerDetail: "Yerçekimi gezegenleri Güneş etrafında tutar." },
    { category: "Sağlık", difficulty: "Orta", question: "Düzenli uyku eksikliği en çok hangi duruma yol açar?", image: "images/20.jpg", options: { A: "Uzun süreli hafıza", B: "Yorgunluk ve dikkat azalması", C: "Aşırı enerji", D: "Sağlıklı kilo artışı" }, correctAnswer: "B", answerDetail: "Yetersiz uyku dikkat ve konsantrasyonu olumsuz etkiler." },
    { category: "Kültür & Sanat", difficulty: "Kolay", question: "Ressamların boyaları uygularken en çok kullandığı araç hangisidir?", image: "images/21.jpg", options: { A: "Fırça", B: "Kamera", C: "Makas", D: "Bıçak" }, correctAnswer: "A", answerDetail: "Fırça, resim sanatında boya uygulamak için kullanılır." },
    { category: "Dünya", difficulty: "Kolay", question: "En yüksek dağ hangisidir?", image: "images/22.jpg", options: { A: "K2", B: "Everest", C: "Kilimanjaro", D: "Fuji" }, correctAnswer: "B", answerDetail: "Everest, Dünya'nın en yüksek dağıdır." },
    { category: "Teknoloji", difficulty: "Orta", question: "İnternetin temel veri iletişim standartları için kullanılan kavram hangisidir?", image: "images/23.jpg", options: { A: "Protokol", B: "Tarayıcı", C: "Sunucu", D: "Ana kart" }, correctAnswer: "A", answerDetail: "Protokoller, cihazların haberleşme kurallarını belirler." },
    { category: "Edebiyat", difficulty: "Kolay", question: "Kısa ve öz, genellikle derin anlam taşıyan sözlere ne denir?", image: "images/24.jpg", options: { A: "Masal", B: "Atasözü", C: "Roman", D: "Destan" }, correctAnswer: "B", answerDetail: "Atasözleri halkın deneyimlerini ve öğütlerini anlatır." },
    { category: "Bilim", difficulty: "Kolay", question: "Canlıların dışarıdan aldığı enerjinin kaynağı nedir?", image: "images/25.jpg", options: { A: "Toprak", B: "Güneş", C: "Ay", D: "Su" }, correctAnswer: "B", answerDetail: "Güneş enerjisi yaşam zincirinin temel kaynağıdır." },
    { category: "Tarih", difficulty: "Orta", question: "Osmanlı Devleti'ndeki en üst yönetim organı hangisidir?", image: "images/26.jpg", options: { A: "Meclis", B: "Padişah", C: "Divan-ı Hümayun", D: "Beylerbeyi" }, correctAnswer: "C", answerDetail: "Divan-ı Hümayun, Osmanlı devlet yönetiminde önemli bir karar organıydı." },
    { category: "Spor", difficulty: "Kolay", question: "Voleybolda bir takımın seti kazanması için kaç puan gerekir?", image: "images/27.jpg", options: { A: "15", B: "21", C: "25", D: "30" }, correctAnswer: "C", answerDetail: "Voleybolda setler genellikle 25 sayıya ulaşan takım tarafından kazanılır." },
    { category: "Hayvanlar", difficulty: "Kolay", question: "Zürafaların uzun boyunun temel faydası nedir?", image: "images/28.jpg", options: { A: "Hızlanma", B: "Yüksek yapraklara erişim", C: "Gizlenme", D: "Yüzme" }, correctAnswer: "B", answerDetail: "Uzun boyunları sayesinde zürafalar yüksek yapraklara ulaşabilir." },
    { category: "Din", difficulty: "Orta", question: "Ramazan Bayramı hangi inanç için özel bir bayramdır?", image: "images/29.jpg", options: { A: "Hristiyanlık", B: "İslam", C: "Hinduizm", D: "Budizm" }, correctAnswer: "B", answerDetail: "Ramazan Bayramı, İslam'da büyük bir bayramdır." },
    { category: "Dünya", difficulty: "Kolay", question: "Hangi kıta en fazla ülkeye sahiptir?", image: "images/30.jpg", options: { A: "Asya", B: "Afrika", C: "Avrupa", D: "Güney Amerika" }, correctAnswer: "B", answerDetail: "Afrika, ülkeler açısından en fazla çeşitliliğe sahip kıtalardan biridir." },
    { category: "Kültür & Sanat", difficulty: "Orta", question: "Bir oyunun sahnede canlandırılması için en temel öge hangisidir?", image: "images/31.jpg", options: { A: "Senaryo", B: "Kitap", C: "Müzik", D: "Soru" }, correctAnswer: "A", answerDetail: "Senaryo, tiyatro ve sinema için temel anlatı yapısını oluşturur." },
    { category: "Müzik", difficulty: "Kolay", question: "Enstrümanın sesini çıkarmak için telleri çalan alete ne denir?", image: "images/32.jpg", options: { A: "Mizrap", B: "Mikrofon", C: "Piyano", D: "Akort" }, correctAnswer: "A", answerDetail: "Mizrap, telli çalgılarda sesi çıkarmak için kullanılır." },
    { category: "Sağlık", difficulty: "Kolay", question: "Ağız ve diş sağlığı için en önemli alışkanlık hangisidir?", image: "images/33.jpg", options: { A: "Düzenli fırçalama", B: "Sadece şeker yeme", C: "Geceleri su içmeme", D: "Sürekli sigara içmek" }, correctAnswer: "A", answerDetail: "Düzenli diş fırçalama ağız hijyenini korur." },
    { category: "Teknoloji", difficulty: "Orta", question: "Bir ağın internet üzerinden veri iletmesine izin veren sistem hangisidir?", image: "images/34.jpg", options: { A: "Kablosuz modem", B: "İnternet", C: "Router", D: "Yazıcı" }, correctAnswer: "C", answerDetail: "Router, cihazların ağa bağlanmasını sağlar." }
];

const chapter2Tr = [
    { category: "Doğa", difficulty: "Kolay", question: "Bir bitkinin kökleri en çok hangi işlevi görür?", image: "images/35.jpg", options: { A: "Güneş yakalar", B: "Su ve minerali emer", C: "Çiçek açar", D: "Hava solur" }, correctAnswer: "B", answerDetail: "Kökler, topraktan su ve mineralleri emer." },
    { category: "Edebiyat", difficulty: "Orta", question: "Bir metnin ana düşüncesini belirten kısım hangisidir?", image: "images/36.jpg", options: { A: "Tema", B: "Gövde", C: "Kısa özet", D: "Kenar notu" }, correctAnswer: "A", answerDetail: "Tema, metnin ana fikrini ve mesajını anlatır." },
    { category: "Spor", difficulty: "Orta", question: "Koşu sporunda en kısa mesafe için kullanılan birim hangisidir?", image: "images/37.jpg", options: { A: "Metre", B: "Kilometre", C: "Santimetre", D: "Saat" }, correctAnswer: "A", answerDetail: "Kısa mesafeler metre ve santimetre gibi birimlerle ölçülür." },
    { category: "Hayvanlar", difficulty: "Orta", question: "Kelebeklerin yaşam döngüsünde en belirgin evre hangisidir?", image: "images/38.jpg", options: { A: "Yavrulama", B: "Pupa", C: "Yumurtlama", D: "Sürünme" }, correctAnswer: "B", answerDetail: "Pupa, gelişim sürecinin önemli bir aşamasıdır." },
    { category: "Bilim", difficulty: "Zor", question: "Hava sıcaklığının etkisiyle oluşan yağmur, kar ve dolu gibi doğal olaylara ne ad verilir?", image: "images/39.jpg", options: { A: "İklim", B: "Hava durumu", C: "Meteoroloji", D: "Jenerasyon" }, correctAnswer: "B", answerDetail: "Hava durumu, anlık atmosfer koşullarını ifade eder." },
    { category: "Tarih", difficulty: "Zor", question: "Mısır'ın ünlü antik yapılarından biri olan piramitler hangi döneme aittir?", image: "images/40.jpg", options: { A: "Modern çağ", B: "Antik çağ", C: "Orta çağ", D: "Rönesans" }, correctAnswer: "B", answerDetail: "Piramitler Antik Mısır medeniyetine aittir." },
    { category: "Yaşam", difficulty: "Kolay", question: "İnsanların birbirleriyle iletişim kurmasını sağlayan en önemli araç hangisidir?", image: "images/41.jpg", options: { A: "Dil", B: "Araç", C: "Yemek", D: "Kupa" }, correctAnswer: "A", answerDetail: "Dil, insan iletişiminin temel aracıdır." },
    { category: "Teknoloji", difficulty: "Kolay", question: "Kullanıcıların internet sitelerini görüntülemesini sağlayan programlara ne denir?", image: "images/42.jpg", options: { A: "Yazıcı", B: "Tarayıcı", C: "Klima", D: "Sensör" }, correctAnswer: "B", answerDetail: "Tarayıcı, web sayfalarını kullanıcıya sunar." },
    { category: "Kültür & Sanat", difficulty: "Orta", question: "Mimari eserlerde estetik ve işlevi birleştiren kişiler kimlerdir?", image: "images/43.jpg", options: { A: "Mimarlar", B: "Doktorlar", C: "Şairler", D: "Avukatlar" }, correctAnswer: "A", answerDetail: "Mimarlar, yapının biçim ve işlev dengesini planlar." },
    { category: "Bilim", difficulty: "Kolay", question: "Bitki kökleri neyi kendilerine çeker?", image: "images/44.jpg", options: { A: "Güneşi", B: "Su ve mineralleri", C: "Kumu", D: "Yaprakları" }, correctAnswer: "B", answerDetail: "Bitkiler kökleriyle su ve mineralleri emer." },
    { category: "Dünya", difficulty: "Kolay", question: "En büyük canlı tür çeşitliliğine sahip orman türü hangisidir?", image: "images/45.jpg", options: { A: "Çöl", B: "Tropikal orman", C: "Bozkır", D: "Tundra" }, correctAnswer: "B", answerDetail: "Tropikal ormanlar en zengin biyolojik çeşitliliğe sahiptir." },
    { category: "Spor", difficulty: "Zor", question: "Bir basketbol maçında serbest atış için süre sınırlaması kaç saniyedir?", image: "images/46.jpg", options: { A: "5", B: "8", C: "10", D: "12" }, correctAnswer: "C", answerDetail: "Basketbolda serbest atış için süre 10 saniyedir." },
    { category: "Müzik", difficulty: "Orta", question: "Bir şarkının söz kısmına ne ad verilir?", image: "images/47.jpg", options: { A: "Melodi", B: "Şarkı sözü", C: "Refrain", D: "Ton" }, correctAnswer: "B", answerDetail: "Şarkı sözü, müziğe eşlik eden anlatım kısmıdır." },
    { category: "Bilim", difficulty: "Orta", question: "Ay'ın Dünya etrafında dönmesini sağlayan kuvvet hangisidir?", image: "images/48.jpg", options: { A: "Kütleçekim", B: "Güneş rüzgarı", C: "Manyetik alan", D: "Su basıncı" }, correctAnswer: "A", answerDetail: "Dünya'nın kütleçekimi Ay'ın yörüngede kalmasını sağlar." },
    { category: "Tarih", difficulty: "Orta", question: "İnsanlık tarihinde ilk yazı sistemlerinden biri hangi uygarlığa aittir?", image: "images/49.jpg", options: { A: "Roma", B: "Mısır", C: "İskit", D: "Hun" }, correctAnswer: "B", answerDetail: "Mısır uygarlığı ilk yazı sistemlerinden birini geliştirmiştir." },
    { category: "Sağlık", difficulty: "Orta", question: "Düzenli egzersiz yapmanın en önemli faydası nedir?", image: "images/50.jpg", options: { A: "Uyku ihtiyacını azaltır", B: "Kardiyovasküler sağlığı korur", C: "Sadece kasları büyütür", D: "Açlık hissini artırır" }, correctAnswer: "B", answerDetail: "Düzenli egzersiz kalp ve damar sağlığını destekler." },
    { category: "Kültür", difficulty: "Kolay", question: "Yeryüzünde en çok konuşulan dillerden biri hangisidir?", image: "images/51.jpg", options: { A: "Almanca", B: "İngilizce", C: "Fransızca", D: "Arapça" }, correctAnswer: "B", answerDetail: "İngilizce dünya genelinde en yaygın konuşulan dillerden biridir." },
    { category: "Dünya", difficulty: "Kolay", question: "Hangi gezegenin halkaları en belirgin şekilde görülür?", image: "images/52.jpg", options: { A: "Mars", B: "Venüs", C: "Satürn", D: "Jüpiter" }, correctAnswer: "C", answerDetail: "Satürn'ün halkaları, en belirgin ve ünlü olanlardandır." },
    { category: "Doğa", difficulty: "Orta", question: "Büyük bir nehir denize döküldüğünde taşıdığı malzemelerin birikmesiyle oluşan alan nedir?", image: "images/53.jpg", options: { A: "Vadi", B: "Delta", C: "Yamaç", D: "Tepe" }, correctAnswer: "B", answerDetail: "Delta, nehir taşıyan alüvyonların denize ulaştığı yerde oluşur." },
    { category: "Tarih", difficulty: "Orta", question: "İlk uygarlıklardan biri olan Sümerler nerede yaşamıştır?", image: "images/01.jpg", options: { A: "Mısır", B: "Mezopotamya", C: "İspanya", D: "Çin" }, correctAnswer: "B", answerDetail: "Sümerler, Mezopotamya'da yaşamıştır." },
    { category: "Bilim", difficulty: "Orta", question: "Her canlı hücrede bulunan ve genetik bilgiyi taşıyan yapı hangisidir?", image: "images/02.jpg", options: { A: "Mitokondri", B: "DNA", C: "Klorofil", D: "Ribozom" }, correctAnswer: "B", answerDetail: "DNA, canlıların genetik bilgilerini taşıyan moleküldür." },
    { category: "Sağlık", difficulty: "Kolay", question: "Düzenli el yıkamanın en önemli faydası nedir?", image: "images/03.jpg", options: { A: "Ağrı kesmek", B: "Enfeksiyon riskini azaltmak", C: "Kilo vermek", D: "Kas yapmak" }, correctAnswer: "B", answerDetail: "El yıkama, bakterilerin yayılmasını önler." },
    { category: "Edebiyat", difficulty: "Kolay", question: "Roman, hikâye ve şiir gibi yazı türlerine ortak olan ana unsur nedir?", image: "images/04.jpg", options: { A: "Müzik", B: "Anlatı", C: "Resim", D: "Aritmetik" }, correctAnswer: "B", answerDetail: "Edebiyat eserlerinin temelinde anlatı ve ifade gücü vardır." },
    { category: "Kültür", difficulty: "Orta", question: "Bir toplumun değerlerini, adetlerini ve davranışlarını taşıyan en önemli unsur nedir?", image: "images/05.jpg", options: { A: "Para", B: "Kültür", C: "Güneş", D: "Teknoloji" }, correctAnswer: "B", answerDetail: "Kültür, toplumun yaşam biçimini ve değerlerini yansıtır." },
    { category: "Spor", difficulty: "Orta", question: "Yüzmede en çok kullanılan temel teknik hangisidir?", image: "images/06.jpg", options: { A: "Koşu", B: "Serbest stil", C: "Atlama", D: "Kısa pas" }, correctAnswer: "B", answerDetail: "Serbest stil, yüzmede en yaygın kullanılan tekniktir." },
    { category: "Dünya", difficulty: "Kolay", question: "Dünyanın en kalabalık nüfusa sahip ülkesi hangisidir?", image: "images/07.jpg", options: { A: "ABD", B: "Hindistan", C: "Çin", D: "Endonezya" }, correctAnswer: "C", answerDetail: "Çin, dünyanın en kalabalık nüfusuna sahip ülkesidir." },
    { category: "Yaşam", difficulty: "Kolay", question: "Bir öğrencinin ders çalışırken en çok ihtiyacı olan şey nedir?", image: "images/08.jpg", options: { A: "Ders çalışma düzeni", B: "Oyuncak", C: "Sürekli eğlence", D: "Dışarı çıkmak" }, correctAnswer: "A", answerDetail: "Düzenli çalışma, öğrenmeyi kolaylaştırır." },
    { category: "Bilim", difficulty: "Kolay", question: "Canlıların hücrelerde enerji ürettiği yapı hangisidir?", image: "images/09.jpg", options: { A: "Mitokondri", B: "Yaprak", C: "Kök", D: "Diş" }, correctAnswer: "A", answerDetail: "Mitokondri hücrelerde enerji üretiminden sorumludur." }
];

const chapter3Tr = [
    { category: "Tarih", difficulty: "Kolay", question: "İlk kez insanın aya ayak bastığı tarih hangisidir?", image: "images/10.jpg", options: { A: "1969", B: "1975", C: "1981", D: "1959" }, correctAnswer: "A", answerDetail: "Apollo 11 göreviyle 1969'da Ay'a ilk adım atıldı." },
    { category: "Bilim", difficulty: "Kolay", question: "Dünyanın etrafında dolanan doğal uydunun adı nedir?", image: "images/11.jpg", options: { A: "Titan", B: "Ay", C: "Phobos", D: "Europa" }, correctAnswer: "B", answerDetail: "Ay, Dünya'nın tek doğal uydusudur." },
    { category: "Sağlık", difficulty: "Kolay", question: "En yaygın temel besin gruplarından biri hangisidir?", image: "images/12.jpg", options: { A: "Protein", B: "Kömür", C: "Bakır", D: "Demir" }, correctAnswer: "A", answerDetail: "Protein, vücudun yapı taşıdır." },
    { category: "Müzik", difficulty: "Kolay", question: "Bir şarkıda tekrar eden ana melodiye ne denir?", image: "images/13.jpg", options: { A: "Nakarat", B: "Tını", C: "Tempo", D: "Vuruş" }, correctAnswer: "A", answerDetail: "Nakarat, şarkının en sık tekrarlanan bölümüdür." },
    { category: "Spor", difficulty: "Kolay", question: "Maça başlamak için atılan ilk vuruşa ne denir?", image: "images/14.jpg", options: { A: "Başlama vuruşu", B: "Korner", C: "Serbest vuruş", D: "Köşe" }, correctAnswer: "A", answerDetail: "Başlama vuruşu, oyunun başlatıldığı ilk vuruştur." },
    { category: "Dünya", difficulty: "Kolay", question: "Kızıldeniz hangi kıtada yer alır?", image: "images/15.jpg", options: { A: "Asya", B: "Afrika", C: "Avrupa", D: "Okyanusya" }, correctAnswer: "A", answerDetail: "Kızıldeniz, Asya ve Afrika arasında yer alır." },
    { category: "Edebiyat", difficulty: "Orta", question: "Bir eserin konusunu en kısa şekilde anlatan öge nedir?", image: "images/16.jpg", options: { A: "Tema", B: "Sahne", C: "Diyalog", D: "Kurgusal zaman" }, correctAnswer: "A", answerDetail: "Tema, eserin temel fikrini ve mesajını ifade eder." },
    { category: "Teknoloji", difficulty: "Orta", question: "Bir dosyayı bilgisayarda saklamak için kullanılan birim hangisidir?", image: "images/17.jpg", options: { A: "MB", B: "Dag", C: "Klasör", D: "SSID" }, correctAnswer: "C", answerDetail: "Klasörler, dosyaların ve verilerin düzenli şekilde saklandığı yerdir." },
    { category: "Hayvanlar", difficulty: "Orta", question: "Yunusların iletişim kurma şekli en çok nedir?", image: "images/18.jpg", options: { A: "Elektrik sinyali", B: "Sesi ve ıslık", C: "Koku", D: "Dans" }, correctAnswer: "B", answerDetail: "Yunuslar, ıslık ve seslerle iletişim kurar." },
    { category: "Bilim", difficulty: "Kolay", question: "Yeryüzünde en çok bulunan element hangisidir?", image: "images/19.jpg", options: { A: "Helyum", B: "Oksijen", C: "Demir", D: "Hidrojen" }, correctAnswer: "D", answerDetail: "Evrenin büyük bölümünde hidrojen en bol elementtir." },
    { category: "Tarih", difficulty: "Orta", question: "İnsanlığın ilk şehirlerinden biri olan Ur hangi medeniyete aittir?", image: "images/20.jpg", options: { A: "Sümer", B: "İskit", C: "Yunan", D: "Roma" }, correctAnswer: "A", answerDetail: "Ur, Sümer medeniyetinin önemli şehirlerindendir." },
    { category: "Sağlık", difficulty: "Kolay", question: "Düzenli uyku için en uygun süre kaç saattir?", image: "images/21.jpg", options: { A: "3-4 saat", B: "5-6 saat", C: "7-9 saat", D: "10-12 saat" }, correctAnswer: "C", answerDetail: "Çoğu yetişkin için 7-9 saat uyku önerilir." },
    { category: "Müzik", difficulty: "Orta", question: "Bir müziğin eşlik eden enine düzeni için kullanılan kavram nedir?", image: "images/22.jpg", options: { A: "Ritim", B: "Harmoni", C: "Tempo", D: "Ton" }, correctAnswer: "B", answerDetail: "Harmoni, farklı notaların birlikte seslendirilmesidir." },
    { category: "Dünya", difficulty: "Kolay", question: "En büyük çöl hangi kıtada bulunur?", image: "images/23.jpg", options: { A: "Afrika", B: "Asya", C: "Avrupa", D: "Güney Amerika" }, correctAnswer: "A", answerDetail: "Sahra Çölü, Afrika'dadır ve en büyük sıcak çöldür." },
    { category: "Kültür & Sanat", difficulty: "Orta", question: "Ülkenin sembolik değer taşıyan en eski ve önemli sanatsal eserleri genelde nerede sergilenir?", image: "images/24.jpg", options: { A: "Müze", B: "Market", C: "Kütüphane", D: "Hastane" }, correctAnswer: "A", answerDetail: "Müzeler, sanat ve tarih eserlerinin sergilendiği önemli mekânlardır." },
    { category: "Spor", difficulty: "Orta", question: "Basketbolda topu potaya sokan oyuncunun yaptığı hareket adını ne alır?", image: "images/25.jpg", options: { A: "Şut", B: "Topaç", C: "Blok", D: "Kale" }, correctAnswer: "A", answerDetail: "Şut, basketbolda topu potaya atma hareketidir." },
    { category: "Bilim", difficulty: "Orta", question: "Bitkilerin güneşten enerji elde etmesini sağlayan pigment hangisidir?", image: "images/26.jpg", options: { A: "Klorofil", B: "Hemoglobin", C: "Melanin", D: "Karoten" }, correctAnswer: "A", answerDetail: "Klorofil, bitkilerin fotosentez yapmasını sağlar." },
    { category: "Tarih", difficulty: "Orta", question: "İlk kez kütüphane kuran uygarlık hangisidir?", image: "images/27.jpg", options: { A: "Sümerler", B: "Mısırlılar", C: "Romalılar", D: "Hunlar" }, correctAnswer: "A", answerDetail: "Sümerler, yazı ve bilgi depolama için önemli adımlar attı." },
    { category: "Sağlık", difficulty: "Kolay", question: "Kan dolaşımını düzenleyen en önemli organ hangisidir?", image: "images/28.jpg", options: { A: "Beyin", B: "Kalp", C: "Karaciğer", D: "Böbrek" }, correctAnswer: "B", answerDetail: "Kalp, vücudun kan dolaşımını sağlar." },
    { category: "Kültür", difficulty: "Kolay", question: "Bir toplumun ortak dili ve yazısı neyi gösterir?", image: "images/29.jpg", options: { A: "Ekonomi", B: "Kültürel kimlik", C: "İklim", D: "Harita" }, correctAnswer: "B", answerDetail: "Dil ve yazı, bir toplumun kültürel kimliğini taşıyan unsurlardır." },
    { category: "Dünya", difficulty: "Orta", question: "Dünyanın en derin deniz çukuru hangisidir?", image: "images/30.jpg", options: { A: "Mariana Çukuru", B: "Bengal Çukuru", C: "Java Çukuru", D: "Atlantik Çukuru" }, correctAnswer: "A", answerDetail: "Mariana Çukuru, dünyanın en derin noktasıdır." },
    { category: "Edebiyat", difficulty: "Kolay", question: "Bir edebi metindeki olayların sıralanışı hangisidir?", image: "images/31.jpg", options: { A: "Kronoloji", B: "Metrik", C: "Kafiye", D: "Diyalog" }, correctAnswer: "A", answerDetail: "Kronoloji, olayların zaman sırasını belirler." },
    { category: "Bilim", difficulty: "Orta", question: "Elektriğin akışını sağlayan maddeye ne denir?", image: "images/32.jpg", options: { A: "Yalıtkan", B: "İletken", C: "Mıknatıs", D: "Kalıp" }, correctAnswer: "B", answerDetail: "İletken maddeler elektriği iyi iletir." },
    { category: "Müzik", difficulty: "Kolay", question: "Düzenli tekrar eden ses ve sessizlik örüntüsüne ne denir?", image: "images/33.jpg", options: { A: "Ritim", B: "Tempo", C: "Melodi", D: "Ton" }, correctAnswer: "A", answerDetail: "Ritim, seslerin düzenli olarak tekrarlanmasıdır." },
    { category: "Spor", difficulty: "Orta", question: "Bir futbol maçında penaltı atışı nasıl başlatılır?", image: "images/34.jpg", options: { A: "Serbest vuruş", B: "Köşe vuruşu", C: "Penaltı", D: "Taç atışı" }, correctAnswer: "C", answerDetail: "Penaltı, ceza sahası içinde verilen özel atıştır." },
    { category: "Teknoloji", difficulty: "Kolay", question: "İnternet sayfalarını görüntüleyen uygulamalara ne denir?", image: "images/35.jpg", options: { A: "Tarayıcı", B: "Yazıcı", C: "Sunucu", D: "Modem" }, correctAnswer: "A", answerDetail: "Tarayıcılar, web sayfalarını kullanıcıya gösterir." },
    { category: "Tarih", difficulty: "Orta", question: "Büyük İskender hangi ülkeyi fethetmeye başlamıştır?", image: "images/36.jpg", options: { A: "İran", B: "Yunanistan", C: "Mısır", D: "Türkiye" }, correctAnswer: "B", answerDetail: "Büyük İskender, Yunanistan'da doğmuş ve geniş fetihler yapmıştır." },
    { category: "Dünya", difficulty: "Kolay", question: "Dünyaya en yakın gezegen hangisidir?", image: "images/37.jpg", options: { A: "Mars", B: "Venüs", C: "Jüpiter", D: "Merkür" }, correctAnswer: "B", answerDetail: "Venüs, Dünya'ya en yakın gezegendir." },
    { category: "Sağlık", difficulty: "Orta", question: "Hücrelerde su dengesini koruyan en önemli yapı hangisidir?", image: "images/38.jpg", options: { A: "Beyin", B: "Hücre zarı", C: "Kemik", D: "Tendon" }, correctAnswer: "B", answerDetail: "Hücre zarı, hücrenin iç ve dış ortamını ayırır." },
    { category: "Bilim", difficulty: "Kolay", question: "Güneş ışığı doğrudan bir kaynaktan alınırsa buna ne denir?", image: "images/39.jpg", options: { A: "Alternatif enerji", B: "Güneş enerjisi", C: "Yeryüzü enerjisi", D: "Nükleer enerji" }, correctAnswer: "B", answerDetail: "Güneş enerjisi, doğrudan güneş ışığından elde edilen enerjidir." },
    { category: "Kültür", difficulty: "Kolay", question: "Bir topluluğun ortak yemek, giysi ve adetleri hangi kavramla ifade edilir?", image: "images/40.jpg", options: { A: "Ekonomi", B: "Kültür", C: "Coğrafya", D: "Meteoroloji" }, correctAnswer: "B", answerDetail: "Kültür, bir topluluğun yaşam biçimini ve geleneklerini anlatır." },
    { category: "Edebiyat", difficulty: "Orta", question: "Bir eserin baş karakteri ve olayların merkezindeki kişiye ne denir?", image: "images/41.jpg", options: { A: "Yazar", B: "Ana karakter", C: "Editör", D: "Tema" }, correctAnswer: "B", answerDetail: "Ana karakter, hikâyenin merkezindeki kişidir." },
    { category: "Doğa", difficulty: "Kolay", question: "Bir bitkinin yaprakları en çok ne ile beslenir?", image: "images/42.jpg", options: { A: "Su ve güneş ışığı", B: "Taş ve toprak", C: "Kaya ve maden", D: "Elektrik" }, correctAnswer: "A", answerDetail: "Yapraklar güneş ışığı ve su yardımıyla beslenir." },
    { category: "Spor", difficulty: "Orta", question: "Futbolda topu rakibin kalesine sokma hareketi ne ad alır?", image: "images/43.jpg", options: { A: "Gol", B: "Faul", C: "Taç", D: "Ofsayt" }, correctAnswer: "A", answerDetail: "Gol, maça puan kazandıran atıştır." },
    { category: "Teknoloji", difficulty: "Kolay", question: "Verileri depolayan küçük elektronik parça hangisidir?", image: "images/44.jpg", options: { A: "USB", B: "Disket", C: "SSD", D: "Klavye" }, correctAnswer: "C", answerDetail: "SSD, verileri uzun süre depolayan hafıza birimidir." },
    { category: "Bilim", difficulty: "Kolay", question: "Hava içindeki su buharı en çok hangi olaya yol açar?", image: "images/45.jpg", options: { A: "Yağmur", B: "Deprem", C: "Volkan", D: "Güneş tutulması" }, correctAnswer: "A", answerDetail: "Su buharının yoğunlaşması yağmur oluşumuna neden olur." },
    { category: "Müzik", difficulty: "Kolay", question: "Bir şarkıda seslerin yüksekliğini belirleyen kavram nedir?", image: "images/46.jpg", options: { A: "Ton", B: "Ritim", C: "Yavaşlık", D: "Hız" }, correctAnswer: "A", answerDetail: "Ton, sesin yüksekliğini ifade eder." }
];

const chapter1En = chapter1Tr.map((item) => ({ ...item }));
const chapter2En = chapter2Tr.map((item) => ({ ...item }));
const chapter3En = chapter3Tr.map((item) => ({ ...item }));

// --- SORU VERİ HAVUZU ---
const quizData = {
    tr: {
        chapter1: chapter1Tr,
        chapter2: chapter2Tr,
        chapter3: chapter3Tr
    },
    en: {
        chapter1: chapter1En,
        chapter2: chapter2En,
        chapter3: chapter3En
    }
};

// --- TEMEL FONKSİYONLAR ---

function setLanguage(lang) {
    currentLang = lang;
    
    const buttons = document.querySelectorAll('.lang-btn');
    if(buttons.length >= 2) {
        buttons[0].classList.toggle('active', lang === 'tr');
        buttons[1].classList.toggle('active', lang === 'en');
    }
    
    const chapterNames = lang === 'tr'
        ? { 1: "Genel Kültür 1", 2: "Genel Kültür 2", 3: "Genel Kültür 3" }
        : { 1: "General Culture 1", 2: "General Culture 2", 3: "General Culture 3" };
    
    document.getElementById('chapter-1-name').textContent = chapterNames[1];
    document.getElementById('chapter-2-name').textContent = chapterNames[2];
    document.getElementById('chapter-3-name').textContent = chapterNames[3];
    document.getElementById('chapter-title').textContent = uiTranslations[lang].chapterTitle;
    document.getElementById('back-button').textContent = uiTranslations[lang].backButton;
    document.getElementById('start-button').textContent = uiTranslations[lang].startButton;
    document.getElementById('resume-button').textContent = uiTranslations[lang].resumeButton;
    updateResumeButton();
}

function showChapterSelection() {
    document.getElementById('start-actions').style.display = 'none';
    document.getElementById('chapter-selection').style.display = 'block';
}

function backToLanguage() {
    document.getElementById('chapter-selection').style.display = 'none';
    document.getElementById('start-actions').style.display = 'flex';
}

function getChapterName(chapter = currentChapter) {
    const chapterNames = currentLang === 'tr'
        ? { 1: "Genel Kültür 1", 2: "Genel Kültür 2", 3: "Genel Kültür 3" }
        : { 1: "General Culture 1", 2: "General Culture 2", 3: "General Culture 3" };

    return chapterNames[chapter] || `${currentLang === 'tr' ? 'Bölüm' : 'Chapter'} ${chapter}`;
}

function startGame(resume = false, chapter = null) {
    setScoreSaveAvailability(false);

    if (chapter) {
        currentChapter = chapter;
    }
    
    const progress = resume ? getProgress() : null;
    if (resume && !progress) {
        alert(uiTranslations[currentLang].noProgress);
        updateResumeButton();
        return;
    }

    if (progress) {
        currentLang = progress.currentLang;
        currentCardIndex = progress.currentCardIndex;
        score = progress.score;
        currentChapter = progress.currentChapter;
        hasAnsweredCurrentCard = Boolean(progress.hasAnsweredCurrentCard);
        selectedAnswer = progress.selectedAnswer || null;
        
        const chapterData = currentLang === 'tr'
            ? quizData.tr[`chapter${currentChapter}`]
            : quizData.en[`chapter${currentChapter}`];
        currentQuestions = [...chapterData];
    } else {
        const chapterData = currentLang === 'tr'
            ? quizData.tr[`chapter${currentChapter}`]
            : quizData.en[`chapter${currentChapter}`];
        currentQuestions = [...chapterData];
        score = 0;
        currentCardIndex = 0;
        hasAnsweredCurrentCard = false;
        selectedAnswer = null;
        saveProgress();
    }

    document.getElementById('initial-screen').style.display = 'none';
    document.getElementById('game-area').style.display = 'block';
    updateUITexts();
    setLanguage(currentLang);
    
    document.getElementById('quiz-card').classList.toggle('flipped', hasAnsweredCurrentCard);
    loadCardData(currentCardIndex);
}

function updateUITexts() {
    const t = uiTranslations[currentLang];
    document.getElementById('score-label').textContent = t.scoreLabel;
    document.getElementById('card-label').textContent = t.cardLabel;
    document.querySelector('.next-card-btn').textContent = t.nextButton;
    document.querySelector('.answer-label').textContent = t.correctLabel;
    document.getElementById('total-cards').textContent = currentQuestions.length;
    document.getElementById('chapter-index').textContent = getChapterName();
}

function loadCardData(index) {
    if (index >= currentQuestions.length) {
        showEndScreen();
        return;
    }

    const cardData = currentQuestions[index];

    document.getElementById('category-text').textContent = cardData.category || "";
    document.getElementById('difficulty-text').textContent = cardData.difficulty || "";

    document.getElementById('question-text').textContent = cardData.question;
    document.getElementById('character-image').src = cardData.image;
    document.getElementById('correct-answer-text').textContent = `${cardData.correctAnswer}) ${cardData.options[cardData.correctAnswer]} - ${cardData.answerDetail}`;
    
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach(btn => {
        const opt = btn.getAttribute('data-option');
        btn.textContent = `${opt}) ${cardData.options[opt]}`;
        btn.disabled = hasAnsweredCurrentCard;
        btn.classList.remove('correct-btn', 'wrong-btn');
        if (hasAnsweredCurrentCard) {
            if (opt === cardData.correctAnswer) btn.classList.add('correct-btn');
            else if (opt === selectedAnswer) btn.classList.add('wrong-btn');
        }
        btn.onclick = () => handleAnswer(opt);
    });

    document.querySelector('.next-card-btn').disabled = false;
    document.getElementById('quiz-card').classList.toggle('flipped', hasAnsweredCurrentCard);

    document.getElementById('card-index').textContent = index + 1;
    document.getElementById('score').textContent = score;
}

function handleAnswer(selected) {
    if (hasAnsweredCurrentCard) return;

    const cardData = currentQuestions[currentCardIndex];
    const isCorrect = selected === cardData.correctAnswer;
    selectedAnswer = selected;
    hasAnsweredCurrentCard = true;
    
    if(isCorrect) {
        score++;
        document.getElementById('score').textContent = score;
    }

    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
        const opt = btn.getAttribute('data-option');
        if(opt === cardData.correctAnswer) btn.classList.add('correct-btn');
        else if(opt === selected) btn.classList.add('wrong-btn');
    });

    saveProgress();
    
    setTimeout(() => {
        document.getElementById('quiz-card').classList.add('flipped');
    }, 600);
}

function nextCard() {
    const quizCard = document.getElementById('quiz-card');
    quizCard.classList.remove('flipped');
    
    document.querySelector('.next-card-btn').disabled = true;

    setTimeout(() => {
        currentCardIndex++;
        hasAnsweredCurrentCard = false;
        selectedAnswer = null;
        saveProgress();
        loadCardData(currentCardIndex);
        
        document.querySelector('.next-card-btn').disabled = false;
    }, 350);
}

function showEndScreen() {
    const t = uiTranslations[currentLang];
    const hasPlayerName = document.getElementById('player-name').value.trim().length > 0;
    const scoreMessage = t.gameOver.replace("{score}", score).replace("{total}", currentQuestions.length);

    localStorage.removeItem(STORAGE_KEY);
    updateResumeButton();

    if (hasPlayerName) {
        saveCompletedScore();
        alert(`${scoreMessage}\n${t.scoreSaved}`);
    } else {
        setScoreSaveAvailability(true);
        alert(`${scoreMessage}\n${t.enterNameToSave}`);
    }

    document.getElementById('quiz-card').classList.remove('flipped');
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('initial-screen').style.display = 'flex';
    document.getElementById('chapter-selection').style.display = 'none';
    document.getElementById('start-actions').style.display = 'flex';
}

window.onload = () => {
    setLanguage('tr');
    updateUITexts();
    renderLeaderboard();
    updateResumeButton();
    setScoreSaveAvailability(false);
};

const STORAGE_KEY = 'bilgi-karti-save-v3';
const BOARD_KEY = 'bilgi-karti-leaderboard-v1';

let canSaveScore = false;

function saveProgress() {
    const progress = { 
        currentLang, 
        currentCardIndex, 
        score, 
        currentChapter, 
        hasAnsweredCurrentCard, 
        selectedAnswer 
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    updateResumeButton();
}

function getProgress() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    try {
        const progress = JSON.parse(raw);
        const chapterData = progress.currentLang === 'tr'
            ? quizData.tr[`chapter${progress.currentChapter}`]
            : quizData.en[`chapter${progress.currentChapter}`];

        const hasValidIndex = Number.isInteger(progress.currentCardIndex)
            && progress.currentCardIndex >= 0
            && chapterData
            && progress.currentCardIndex < chapterData.length;

        if (!hasValidIndex) {
            localStorage.removeItem(STORAGE_KEY);
            return null;
        }

        return progress;
    } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
    }
}

function updateResumeButton() {
    const resumeButton = document.getElementById('resume-button');
    if (!resumeButton) return;

    const hasProgress = Boolean(getProgress());
    resumeButton.disabled = !hasProgress;
    resumeButton.title = hasProgress ? '' : uiTranslations[currentLang].noProgress;
}

function renderLeaderboard() {
    const scores = JSON.parse(localStorage.getItem(BOARD_KEY) || '[]');
    document.getElementById('leaderboard-list').innerHTML = scores.map(s => {
        const chapterText = s.chapterName ? ` - ${s.chapterName}` : '';
        return `<li>${s.name} - ${s.score}p${chapterText} (${s.date})</li>`;
    }).join('') || (currentLang === 'tr' ? '<li>Henüz skor yok.</li>' : '<li>No scores yet.</li>');
}

function setScoreSaveAvailability(canSave) {
    canSaveScore = canSave;

    const saveScoreButton = document.getElementById('save-score-btn');
    if (saveScoreButton) {
        saveScoreButton.disabled = !canSave;
        saveScoreButton.title = canSave ? '' : uiTranslations[currentLang].finishToSave;
    }
}

function saveCompletedScore() {
    const nameInput = document.getElementById('player-name');
    const name = nameInput.value.trim() || (currentLang === 'tr' ? 'Anonim' : 'Anonymous');
    const scores = JSON.parse(localStorage.getItem(BOARD_KEY) || '[]');
    scores.push({ name, score, chapter: currentChapter, chapterName: getChapterName(), date: new Date().toLocaleDateString() });
    scores.sort((a, b) => b.score - a.score);
    localStorage.setItem(BOARD_KEY, JSON.stringify(scores.slice(0, 10)));
    setScoreSaveAvailability(false);
    nameInput.value = '';
    renderLeaderboard();
}

function saveScore() {
    if (!canSaveScore) return;
    saveCompletedScore();
}

function exitToHome() {
    saveProgress();
    hasAnsweredCurrentCard = false;
    selectedAnswer = null;
    document.getElementById('quiz-card').classList.remove('flipped');
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('initial-screen').style.display = 'flex';
    document.getElementById('chapter-selection').style.display = 'none';
    document.getElementById('start-actions').style.display = 'flex';
    updateUITexts();
    updateResumeButton();
}
