// --- DİL VE SABİT METİN AYARLARI ---
let currentLang = 'tr'; 
let currentCardIndex = 0;
let score = 0;
let currentQuestions = [];
let currentChapter = 1; // Seçilen bölüm (1 veya 2)
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

const chapter3Tr = [
    { category: "Bilim", difficulty: "Kolay", question: "Güneş sistemindeki en büyük gezegen hangisidir?", image: "images/01.jpg", options: { A: "Mars", B: "Jüpiter", C: "Dünya", D: "Satürn" }, correctAnswer: "B", answerDetail: "Jüpiter, Güneş Sistemi'nin en büyük gezegenidir." },
    { category: "Tarih", difficulty: "Kolay", question: "Atatürk'ün doğum yılı nedir?", image: "images/02.jpg", options: { A: "1881", B: "1886", C: "1890", D: "1901" }, correctAnswer: "A", answerDetail: "Mustafa Kemal Atatürk 19 Mayıs 1881'de doğmuştur." },
    { category: "Sağlık", difficulty: "Kolay", question: "Günlük su tüketimi için en doğru öneri hangisidir?", image: "images/03.jpg", options: { A: "Sadece açken içmek", B: "İhtiyaca göre düzenli tüketmek", C: "Sadece kahve ile", D: "Yalnızca yazın içmek" }, correctAnswer: "B", answerDetail: "Su düzenli ve yeterli miktarda tüketilmelidir." },
    { category: "Dünya", difficulty: "Kolay", question: "Dünyanın en büyük okyanusu hangisidir?", image: "images/04.jpg", options: { A: "Atlantik Okyanusu", B: "Hint Okyanusu", C: "Pasifik Okyanusu", D: "Arktik Okyanusu" }, correctAnswer: "C", answerDetail: "Pasifik Okyanusu, dünyanın en büyük okyanusudur." },
    { category: "Hayvanlar", difficulty: "Kolay", question: "Penguenler en çok hangi ortamda yaşarlar?", image: "images/05.jpg", options: { A: "Çöller", B: "Sıcak tropik ormanlar", C: "Soğuk kutup bölgeleri", D: "Dağ zirveleri" }, correctAnswer: "C", answerDetail: "Penguenler çoğunlukla soğuk kutup bölgelerinde yaşar." },
    { category: "Müzik", difficulty: "Kolay", question: "Bir müzik parçasının temposunu en doğru ifade eden kavram hangisidir?", image: "images/06.jpg", options: { A: "Ritim", B: "Tempo", C: "Melodi", D: "Harmoni" }, correctAnswer: "B", answerDetail: "Tempo, müziğin hızını belirler." },
    { category: "Spor", difficulty: "Kolay", question: "Bir futbol maçında bir takıma verilen kırmızı kartın etkisi nedir?", image: "images/07.jpg", options: { A: "Oyuncu uyarılır", B: "Oyuncu sahadan atılır", C: "Maç tekrar başlar", D: "Topa el verilir" }, correctAnswer: "B", answerDetail: "Kırmızı kart, oyuncunun maçı terk etmesine neden olur." },
    { category: "Edebiyat", difficulty: "Orta", question: "Şiirde duygusal anlatımı en güçlü şekilde veren unsur hangisidir?", image: "images/08.jpg", options: { A: "Tema", B: "Duygu", C: "Metrik", D: "Kafiye" }, correctAnswer: "B", answerDetail: "Şiirde duygusal yoğunluk, duygunun net anlatımı ile artar." },
    { category: "Kültür & Sanat", difficulty: "Orta", question: "El yazması eserlerin saklandığı ve korunduğu yapıya ne denir?", image: "images/09.jpg", options: { A: "Müze", B: "Kütüphane", C: "Tiyatro", D: "Stadyum" }, correctAnswer: "B", answerDetail: "Kütüphaneler, yazılı eserlerin korunması için önemlidir." },
    { category: "Bilim", difficulty: "Orta", question: "Fotosentez en çok hangi canlılarda görülür?", image: "images/10.jpg", options: { A: "Hayvanlar", B: "Mantarlar", C: "Bitkiler", D: "Bakteriler" }, correctAnswer: "C", answerDetail: "Bitkiler klorofil sayesinde fotosentez yapar." },
    { category: "Din", difficulty: "Kolay", question: "İslam'da günde kaç vakit namaz kılınır?", image: "images/11.jpg", options: { A: "2", B: "3", C: "4", D: "5" }, correctAnswer: "D", answerDetail: "Günlük namaz beş vakit olarak kılınır." },
    { category: "Yaşam", difficulty: "Kolay", question: "Bir insanın sağlıklı büyümesi için en temel ihtiyaç hangisidir?", image: "images/12.jpg", options: { A: "Yalnızca oyun", B: "Düzenli beslenme", C: "Sürekli uyku", D: "Sadece eğlence" }, correctAnswer: "B", answerDetail: "Düzenli ve dengeli beslenme sağlığın temelidir." },
    { category: "Teknoloji", difficulty: "Kolay", question: "Bilgisayarın ana işlem birimi olarak bilinen bileşen hangisidir?", image: "images/13.jpg", options: { A: "Ekran", B: "RAM", C: "CPU", D: "Klavye" }, correctAnswer: "C", answerDetail: "CPU, bilgisayarın işlem yapma merkezidir." },
    { category: "Doğa", difficulty: "Orta", question: "Bir nehrin taşıdığı maddelerin birikmesiyle oluşan alanlara ne denir?", image: "images/14.jpg", options: { A: "Dağ", B: "Delta", C: "Vadi", D: "Plato" }, correctAnswer: "B", answerDetail: "Delta, nehrin taşıdığı alüvyonların denize ulaştığı yerde oluşur." },
    { category: "Hayvanlar", difficulty: "Orta", question: "Kaplumbağalar çoğunlukla nasıl hareket eder?", image: "images/15.jpg", options: { A: "Uçarak", B: "Yüzerken", C: "Yürüyerek", D: "Atlayarak" }, correctAnswer: "C", answerDetail: "Kaplumbağalar çoğunlukla karada yürür." },
    { category: "Tarih", difficulty: "Orta", question: "İlk yazılı iletişim araçlarından biri olan tabletler hangi medeniyete aittir?", image: "images/16.jpg", options: { A: "Roma", B: "Mısır", C: "Yunan", D: "Hun" }, correctAnswer: "B", answerDetail: "Mısır medeniyetinde kil tabletler yazı aracı olarak kullanılmıştır." },
    { category: "Spor", difficulty: "Orta", question: "Tenis maçlarında set kazanmak için gereken puan sınırı kaçtır?", image: "images/17.jpg", options: { A: "15", B: "21", C: "30", D: "40" }, correctAnswer: "D", answerDetail: "Teniste puan sistemi 15-30-40 şeklindedir." },
    { category: "Müzik", difficulty: "Orta", question: "Bir orkestrada yaylı çalgıları yöneten kişiye ne denir?", image: "images/18.jpg", options: { A: "Şarkıcı", B: "Orkestra şefi", C: "Besteci", D: "Saz sanatçısı" }, correctAnswer: "B", answerDetail: "Orkestra şefi, müzisyenleri yönetir ve eseri yönlendirir." },
    { category: "Bilim", difficulty: "Kolay", question: "Gezegenlerin Güneş etrafında dönmesini sağlayan kuvvet hangisidir?", image: "images/19.jpg", options: { A: "Mıknatıs kuvveti", B: "Yerçekimi", C: "Elektrik", D: "Sürtünme" }, correctAnswer: "B", answerDetail: "Yerçekimi, gezegenleri Güneş etrafında sürükler." },
    { category: "Sağlık", difficulty: "Orta", question: "Düzenli uyku eksikliği en çok hangi duruma yol açar?", image: "images/20.jpg", options: { A: "Uzun süreli hafıza gücü", B: "Yorgunluk ve dikkat azalması", C: "Aşırı enerji", D: "Sağlıklı kilo artışı" }, correctAnswer: "B", answerDetail: "Yetersiz uyku dikkat ve konsantrasyonu zayıflatır." },
    { category: "Kültür & Sanat", difficulty: "Kolay", question: "Ressamların boyaları kullanırken en çok tercih ettiği araç hangisidir?", image: "images/21.jpg", options: { A: "Fırça", B: "Kamera", C: "Makas", D: "Bıçak" }, correctAnswer: "A", answerDetail: "Fırça, resim sanatında boya uygulamak için kullanılır." },
    { category: "Dünya", difficulty: "Kolay", question: "En yüksek dağ hangisidir?", image: "images/22.jpg", options: { A: "K2", B: "Everest", C: "Kilimanjaro", D: "Fuji" }, correctAnswer: "B", answerDetail: "Everest, Dünya'nın en yüksek dağıdır." },
    { category: "Teknoloji", difficulty: "Orta", question: "İnternetin temel veri iletişim standartları için kullanılan kavram hangisidir?", image: "images/23.jpg", options: { A: "Protokol", B: "Tarayıcı", C: "Sunucu", D: "Kullanıcı" }, correctAnswer: "A", answerDetail: "Protokoller, cihazların haberleşme kurallarını belirler." },
    { category: "Edebiyat", difficulty: "Kolay", question: "Kısa, öz ve genellikle derin anlam taşıyan sözlere ne ad verilir?", image: "images/24.jpg", options: { A: "Masal", B: "Atasözü", C: "Roman", D: "Destan" }, correctAnswer: "B", answerDetail: "Atasözleri halkın deneyim ve öğütlerini ifade eder." },
    { category: "Bilim", difficulty: "Kolay", question: "Canlıların dışarıdan aldığı enerjinin kaynağı nedir?", image: "images/25.jpg", options: { A: "Toprak", B: "Güneş", C: "Ay", D: "Su" }, correctAnswer: "B", answerDetail: "Güneş enerjisi yaşam zincirinin temel kaynağıdır." },
    { category: "Tarih", difficulty: "Orta", question: "Osmanlı Devleti'ndeki en üst yönetim organı olarak bilinen yapı hangisidir?", image: "images/26.jpg", options: { A: "Meclis", B: "Padişah", C: "Divan-ı Hümayun", D: "Köy Beldesi" }, correctAnswer: "C", answerDetail: "Divan-ı Hümayun, Osmanlı devlet yönetiminde önemli bir karar organıydı." },
    { category: "Spor", difficulty: "Kolay", question: "Voleybolda bir takımın bir seti kazanması için kaç puan gerekir?", image: "images/27.jpg", options: { A: "15", B: "21", C: "25", D: "30" }, correctAnswer: "C", answerDetail: "Voleybolda setler genellikle 25 sayıya ulaşan takım tarafından kazanılır." },
    { category: "Hayvanlar", difficulty: "Kolay", question: "Zürafaların uzun boyunlarının temel faydası nedir?", image: "images/28.jpg", options: { A: "Hızlanma", B: "Yüksek yapraklara erişim", C: "Gizlenme", D: "Yüzme" }, correctAnswer: "B", answerDetail: "Uzun boyunları sayesinde yüksek yapraklara ulaşabilirler." },
    { category: "Din", difficulty: "Orta", question: "Ramazan Bayramı hangi inanç için özel bir bayramdır?", image: "images/29.jpg", options: { A: "Hristiyanlık", B: "İslam", C: "Hinduizm", D: "Budizm" }, correctAnswer: "B", answerDetail: "Ramazan Bayramı, İslam dininde çok önemli bir bayramdır." },
    { category: "Dünya", difficulty: "Kolay", question: "Hangi kıta en fazla ülkeye sahiptir?", image: "images/30.jpg", options: { A: "Asya", B: "Afrika", C: "Avrupa", D: "Güney Amerika" }, correctAnswer: "B", answerDetail: "Afrika, ülkeler açısından en fazla çeşitliliğe sahip kıtalardan biridir." },
    { category: "Kültür & Sanat", difficulty: "Orta", question: "Bir oyunun sahnede canlandırılması için en temel öge hangisidir?", image: "images/31.jpg", options: { A: "Senaryo", B: "Kitap", C: "Müzik", D: "Soru" }, correctAnswer: "A", answerDetail: "Senaryo, tiyatro ve sinema için temel anlatı yapısını oluşturur." },
    { category: "Müzik", difficulty: "Kolay", question: "Enstrümanın sesini çıkarmak için telleri çalan alete ne denir?", image: "images/32.jpg", options: { A: "Mizrap", B: "Mikrofon", C: "Piyano", D: "Akort" }, correctAnswer: "A", answerDetail: "Mizrap, telli çalgılarda sesi çıkarmak için kullanılır." },
    { category: "Sağlık", difficulty: "Kolay", question: "Ağız ve diş sağlığı için en önemli alışkanlık hangisidir?", image: "images/33.jpg", options: { A: "Düzenli fırçalama", B: "Sadece şeker yeme", C: "Geceleri su içmeme", D: "Sürekli sigara içmek" }, correctAnswer: "A", answerDetail: "Düzenli diş fırçalama ağız hijyenini korur." },
    { category: "Teknoloji", difficulty: "Orta", question: "Bir ağın internet üzerinden veri iletmesine izin veren sistem hangisidir?", image: "images/34.jpg", options: { A: "Kablosuz modem", B: "İnternet", C: "Router", D: "Yazıcı" }, correctAnswer: "C", answerDetail: "Router, cihazların ağa bağlanmasını sağlar." },
    { category: "Doğa", difficulty: "Kolay", question: "Bir bitkinin kökleri en çok hangi işlevi görür?", image: "images/35.jpg", options: { A: "Güneş yakalar", B: "Su ve minerali emer", C: "Çiçek açar", D: "Hava solur" }, correctAnswer: "B", answerDetail: "Kökler, topraktan su ve mineralleri emer." },
    { category: "Edebiyat", difficulty: "Orta", question: "Bir metnin ana düşüncesini belirten kısım hangisidir?", image: "images/36.jpg", options: { A: "Tema", B: "Gövde", C: "Kısa özet", D: "Kenar notu" }, correctAnswer: "A", answerDetail: "Tema, metnin mesajını ve ana fikrini ifade eder." },
    { category: "Spor", difficulty: "Orta", question: "Koşu sporunda en kısa mesafe için kullanılan birim hangisidir?", image: "images/37.jpg", options: { A: "Metre", B: "Kilometre", C: "Santimetre", D: "Saat" }, correctAnswer: "A", answerDetail: "Kısa mesafeler metre ve santimetre gibi birimlerle ölçülür." },
    { category: "Hayvanlar", difficulty: "Orta", question: "Kelebeklerin yaşam döngüsünde en belirgin evre hangisidir?", image: "images/38.jpg", options: { A: "Yavrulama", B: "Pupa", C: "Yumurtlama", D: "Sürünme" }, correctAnswer: "B", answerDetail: "Pupa, kelebeklerin gelişim sürecinin önemli bir aşamasıdır." },
    { category: "Bilim", difficulty: "Zor", question: "Hava sıcaklığının etkisiyle oluşan yağmur, kar ve dolu gibi doğal olaylara ne ad verilir?", image: "images/39.jpg", options: { A: "İklim", B: "Hava durumu", C: "Meteoroloji", D: "Jenerasyon" }, correctAnswer: "B", answerDetail: "Hava durumu, anlık atmosfer koşullarını ifade eder." },
    { category: "Tarih", difficulty: "Zor", question: "Mısır'ın ünlü antik yapılarından biri olan piramitler hangi döneme aittir?", image: "images/40.jpg", options: { A: "Modern çağ", B: "Antik çağ", C: "Orta çağ", D: "Rönesans" }, correctAnswer: "B", answerDetail: "Piramitler Antik Mısır medeniyetine aittir." },
    { category: "Yaşam", difficulty: "Kolay", question: "İnsanların birbirleriyle iletişim kurmasını sağlayan en önemli araç hangisidir?", image: "images/41.jpg", options: { A: "Dil", B: "Araç", C: "Yemek", D: "Kupa" }, correctAnswer: "A", answerDetail: "Dil, insan iletişiminin temel aracıdır." },
    { category: "Teknoloji", difficulty: "Kolay", question: "Kullanıcıların internet sitelerini görüntülemesini sağlayan programlara ne denir?", image: "images/42.jpg", options: { A: "Yazıcı", B: "Tarayıcı", C: "Klima", D: "Sensör" }, correctAnswer: "B", answerDetail: "Tarayıcılar internet sayfalarını gösterir." },
    { category: "Kültür & Sanat", difficulty: "Orta", question: "Mimari eserlerde estetik ve işlevi birleştiren kişiler kimlerdir?", image: "images/43.jpg", options: { A: "Mimarlar", B: "Doktorlar", C: "Şairler", D: "Avukatlar" }, correctAnswer: "A", answerDetail: "Mimarlar, yapının biçim ve işlev dengesini planlar." },
    { category: "Bilim", difficulty: "Kolay", question: "Bitki kökleri neyi kendilerine çeker?", image: "images/44.jpg", options: { A: "Güneşi", B: "Su ve mineralleri", C: "Kumu", D: "Yaprakları" }, correctAnswer: "B", answerDetail: "Bitkiler kökleriyle su ve mineralleri emer." },
    { category: "Dünya", difficulty: "Kolay", question: "En büyük canlı tür çeşitliliğine sahip orman türü hangisidir?", image: "images/45.jpg", options: { A: "Çöl", B: "Tropikal orman", C: "Bozkır", D: "Tundra" }, correctAnswer: "B", answerDetail: "Tropikal ormanlar en zengin biyolojik çeşitliliğe sahiptir." },
    { category: "Spor", difficulty: "Zor", question: "Bir basketbol maçında serbest atış için süre sınırlaması kaç saniyedir?", image: "images/46.jpg", options: { A: "5", B: "8", C: "10", D: "12" }, correctAnswer: "C", answerDetail: "Basketbolda serbest atış için süre 10 saniyedir." },
    { category: "Müzik", difficulty: "Orta", question: "Bir şarkının söz kısmına ne ad verilir?", image: "images/47.jpg", options: { A: "Melodi", B: "Şarkı sözü", C: "Refrain", D: "Ton" }, correctAnswer: "B", answerDetail: "Şarkı sözü, müziğe eşlik eden anlatım kısmıdır." }
];

const chapter3En = [
    { category: "Science", difficulty: "Easy", question: "Which planet is the largest in the solar system?", image: "images/01.jpg", options: { A: "Mars", B: "Jupiter", C: "Earth", D: "Saturn" }, correctAnswer: "B", answerDetail: "Jupiter is the largest planet in the solar system." },
    { category: "History", difficulty: "Easy", question: "What year was Atatürk born?", image: "images/02.jpg", options: { A: "1881", B: "1886", C: "1890", D: "1901" }, correctAnswer: "A", answerDetail: "Mustafa Kemal Atatürk was born on 19 May 1881." },
    { category: "Health", difficulty: "Easy", question: "What is the best daily recommendation for water intake?", image: "images/03.jpg", options: { A: "Only when thirsty", B: "Regular and adequate intake", C: "Only with coffee", D: "Only in summer" }, correctAnswer: "B", answerDetail: "Water should be consumed regularly in sufficient amounts." },
    { category: "World", difficulty: "Easy", question: "What is the largest ocean on Earth?", image: "images/04.jpg", options: { A: "Atlantic Ocean", B: "Indian Ocean", C: "Pacific Ocean", D: "Arctic Ocean" }, correctAnswer: "C", answerDetail: "The Pacific Ocean is the largest ocean on Earth." },
    { category: "Animals", difficulty: "Easy", question: "Where do penguins mostly live?", image: "images/05.jpg", options: { A: "Deserts", B: "Tropical forests", C: "Cold polar regions", D: "Mountain peaks" }, correctAnswer: "C", answerDetail: "Penguins mainly live in cold polar regions." },
    { category: "Music", difficulty: "Easy", question: "Which concept best expresses the tempo of a piece of music?", image: "images/06.jpg", options: { A: "Rhythm", B: "Tempo", C: "Melody", D: "Harmony" }, correctAnswer: "B", answerDetail: "Tempo determines the speed of music." },
    { category: "Sports", difficulty: "Easy", question: "What happens when a football player receives a red card?", image: "images/07.jpg", options: { A: "They are warned", B: "They are sent off", C: "The match restarts", D: "The ball is given away" }, correctAnswer: "B", answerDetail: "A red card means the player leaves the field." },
    { category: "Literature", difficulty: "Medium", question: "Which element most strongly conveys emotion in poetry?", image: "images/08.jpg", options: { A: "Theme", B: "Emotion", C: "Meter", D: "Rhyme" }, correctAnswer: "B", answerDetail: "Poetry becomes emotionally powerful when feeling is clearly expressed." },
    { category: "Culture & Art", difficulty: "Medium", question: "What is the place where manuscripts are kept and preserved called?", image: "images/09.jpg", options: { A: "Museum", B: "Library", C: "Theatre", D: "Stadium" }, correctAnswer: "B", answerDetail: "Libraries are important for preserving and storing written works." },
    { category: "Science", difficulty: "Medium", question: "Photosynthesis is most common in which living things?", image: "images/10.jpg", options: { A: "Animals", B: "Fungi", C: "Plants", D: "Bacteria" }, correctAnswer: "C", answerDetail: "Plants perform photosynthesis using chlorophyll." },
    { category: "Religion", difficulty: "Easy", question: "How many daily prayers are performed in Islam?", image: "images/11.jpg", options: { A: "2", B: "3", C: "4", D: "5" }, correctAnswer: "D", answerDetail: "Muslims pray five times a day." },
    { category: "Life", difficulty: "Easy", question: "What is the most basic need for a healthy human growth?", image: "images/12.jpg", options: { A: "Only playing", B: "Balanced nutrition", C: "Constant sleeping", D: "Only entertainment" }, correctAnswer: "B", answerDetail: "Balanced nutrition is essential for health." },
    { category: "Technology", difficulty: "Easy", question: "Which component is known as the computer's main processor?", image: "images/13.jpg", options: { A: "Monitor", B: "RAM", C: "CPU", D: "Keyboard" }, correctAnswer: "C", answerDetail: "The CPU is the main processing unit of a computer." },
    { category: "Nature", difficulty: "Medium", question: "What is the area called where sediments carried by a river accumulate?", image: "images/14.jpg", options: { A: "Mountain", B: "Delta", C: "Valley", D: "Plateau" }, correctAnswer: "B", answerDetail: "A delta forms where river sediments accumulate near the sea." },
    { category: "Animals", difficulty: "Medium", question: "How do tortoises mostly move?", image: "images/15.jpg", options: { A: "Flying", B: "Swimming", C: "Walking", D: "Jumping" }, correctAnswer: "C", answerDetail: "Tortoises usually move on land by walking." },
    { category: "History", difficulty: "Medium", question: "Which civilization used clay tablets as an early writing tool?", image: "images/16.jpg", options: { A: "Rome", B: "Egypt", C: "Greece", D: "Huns" }, correctAnswer: "B", answerDetail: "Ancient Egypt used clay tablets for writing." },
    { category: "Sports", difficulty: "Medium", question: "What point threshold is required to win a set in tennis?", image: "images/17.jpg", options: { A: "15", B: "21", C: "30", D: "40" }, correctAnswer: "D", answerDetail: "Tennis uses the 15-30-40 scoring system." },
    { category: "Music", difficulty: "Medium", question: "Who directs the string instruments in an orchestra?", image: "images/18.jpg", options: { A: "Singer", B: "Conductor", C: "Composer", D: "Instrumentalist" }, correctAnswer: "B", answerDetail: "The conductor directs musicians and controls the tempo." },
    { category: "Science", difficulty: "Easy", question: "Which force keeps planets moving around the sun?", image: "images/19.jpg", options: { A: "Magnetism", B: "Gravity", C: "Electricity", D: "Friction" }, correctAnswer: "B", answerDetail: "Gravity keeps planets in orbit around the sun." },
    { category: "Health", difficulty: "Medium", question: "What does a lack of regular sleep most often cause?", image: "images/20.jpg", options: { A: "Long-term memory", B: "Fatigue and reduced attention", C: "Excessive energy", D: "Healthy weight gain" }, correctAnswer: "B", answerDetail: "Insufficient sleep reduces concentration and energy." },
    { category: "Culture & Art", difficulty: "Easy", question: "Which tool do painters most often use to apply paint?", image: "images/21.jpg", options: { A: "Brush", B: "Camera", C: "Scissors", D: "Knife" }, correctAnswer: "A", answerDetail: "A brush is used to apply paint in painting." },
    { category: "World", difficulty: "Easy", question: "Which is the highest mountain on Earth?", image: "images/22.jpg", options: { A: "K2", B: "Everest", C: "Kilimanjaro", D: "Fuji" }, correctAnswer: "B", answerDetail: "Everest is the highest mountain in the world." },
    { category: "Technology", difficulty: "Medium", question: "Which concept is used for internet data communication standards?", image: "images/23.jpg", options: { A: "Protocol", B: "Browser", C: "Server", D: "User" }, correctAnswer: "A", answerDetail: "Protocols define communication rules between devices." },
    { category: "Literature", difficulty: "Easy", question: "What are short, concise statements that often carry deep meaning called?", image: "images/24.jpg", options: { A: "Story", B: "Proverb", C: "Novel", D: "Epic" }, correctAnswer: "B", answerDetail: "Proverbs are short sayings that pass wisdom and experience." },
    { category: "Science", difficulty: "Easy", question: "What is the main source of energy living things receive from outside?", image: "images/25.jpg", options: { A: "Soil", B: "Sun", C: "Moon", D: "Water" }, correctAnswer: "B", answerDetail: "Solar energy is the basis of the life chain." },
    { category: "History", difficulty: "Medium", question: "Which structure is considered the highest governing body in the Ottoman Empire?", image: "images/26.jpg", options: { A: "Parliament", B: "Sultan", C: "Divan-ı Hümayun", D: "Village Council" }, correctAnswer: "C", answerDetail: "The Divan-ı Hümayun was a key governing body in the Ottoman state." },
    { category: "Sports", difficulty: "Easy", question: "How many points does a team need to win a set in volleyball?", image: "images/27.jpg", options: { A: "15", B: "21", C: "25", D: "30" }, correctAnswer: "C", answerDetail: "Volleyball sets are usually won by the team reaching 25 points." },
    { category: "Animals", difficulty: "Easy", question: "What is the main benefit of giraffes' long necks?", image: "images/28.jpg", options: { A: "Speed", B: "Access to high leaves", C: "Camouflage", D: "Swimming" }, correctAnswer: "B", answerDetail: "Their long necks let them reach leaves high in trees." },
    { category: "Religion", difficulty: "Medium", question: "Which faith celebrates Ramadan Bayram?", image: "images/29.jpg", options: { A: "Christianity", B: "Islam", C: "Hinduism", D: "Buddhism" }, correctAnswer: "B", answerDetail: "Ramadan Bayram is an important celebration in Islam." },
    { category: "World", difficulty: "Easy", question: "Which continent has the most countries?", image: "images/30.jpg", options: { A: "Asia", B: "Africa", C: "Europe", D: "South America" }, correctAnswer: "B", answerDetail: "Africa has the greatest number of countries." },
    { category: "Culture & Art", difficulty: "Medium", question: "What is the most basic element needed to perform a play on stage?", image: "images/31.jpg", options: { A: "Script", B: "Book", C: "Music", D: "Question" }, correctAnswer: "A", answerDetail: "The script forms the basis of theater and cinema storytelling." },
    { category: "Music", difficulty: "Easy", question: "What is the tool called that vibrates strings to make sound?", image: "images/32.jpg", options: { A: "Plectrum", B: "Microphone", C: "Piano", D: "Tuning" }, correctAnswer: "A", answerDetail: "A plectrum is used to produce sound from string instruments." },
    { category: "Health", difficulty: "Easy", question: "What is the most important habit for oral and dental health?", image: "images/33.jpg", options: { A: "Regular brushing", B: "Eating only sweets", C: "Not drinking water at night", D: "Smoking constantly" }, correctAnswer: "A", answerDetail: "Regular brushing protects oral hygiene." },
    { category: "Technology", difficulty: "Medium", question: "Which system allows a network to transfer data over the internet?", image: "images/34.jpg", options: { A: "Wireless modem", B: "Internet", C: "Router", D: "Printer" }, correctAnswer: "C", answerDetail: "A router connects devices to a network." },
    { category: "Nature", difficulty: "Easy", question: "What key function do plant roots perform?", image: "images/35.jpg", options: { A: "Catching sunlight", B: "Absorbing water and minerals", C: "Blooming", D: "Breathing" }, correctAnswer: "B", answerDetail: "Roots absorb water and minerals from the soil." },
    { category: "Literature", difficulty: "Medium", question: "Which part defines the main idea of a text?", image: "images/36.jpg", options: { A: "Theme", B: "Body", C: "Summary", D: "Margin note" }, correctAnswer: "A", answerDetail: "The theme expresses the central message of a text." },
    { category: "Sports", difficulty: "Medium", question: "Which unit is used for the shortest distances in running?", image: "images/37.jpg", options: { A: "Meter", B: "Kilometer", C: "Centimeter", D: "Hour" }, correctAnswer: "A", answerDetail: "Short distances are often measured in meters or centimeters." },
    { category: "Animals", difficulty: "Medium", question: "Which stage is the most distinctive in the life cycle of butterflies?", image: "images/38.jpg", options: { A: "Birth", B: "Pupa", C: "Egg-laying", D: "Crawling" }, correctAnswer: "B", answerDetail: "The pupa stage is a key part of butterfly development." },
    { category: "Science", difficulty: "Hard", question: "What is the name of weather events like rain, snow, and hail caused by temperature?", image: "images/39.jpg", options: { A: "Climate", B: "Weather", C: "Meteorology", D: "Generation" }, correctAnswer: "B", answerDetail: "Weather refers to the current atmospheric conditions." },
    { category: "History", difficulty: "Hard", question: "Which period do the pyramids of Egypt belong to?", image: "images/40.jpg", options: { A: "Modern era", B: "Ancient era", C: "Middle Ages", D: "Renaissance" }, correctAnswer: "B", answerDetail: "The pyramids belong to ancient Egyptian civilization." },
    { category: "Life", difficulty: "Easy", question: "What is the most important tool humans use to communicate with each other?", image: "images/41.jpg", options: { A: "Language", B: "Vehicle", C: "Food", D: "Cup" }, correctAnswer: "A", answerDetail: "Language is the basic tool of human communication." },
    { category: "Technology", difficulty: "Easy", question: "What do we call programs that display web pages to users?", image: "images/42.jpg", options: { A: "Printer", B: "Browser", C: "Air conditioner", D: "Sensor" }, correctAnswer: "B", answerDetail: "Browsers display web pages to users." },
    { category: "Culture & Art", difficulty: "Medium", question: "Who designs buildings and balances beauty with function?", image: "images/43.jpg", options: { A: "Architects", B: "Doctors", C: "Poets", D: "Lawyers" }, correctAnswer: "A", answerDetail: "Architects design structures that are both functional and aesthetic." },
    { category: "Science", difficulty: "Easy", question: "What do plant roots absorb from the soil?", image: "images/44.jpg", options: { A: "Sunlight", B: "Water and minerals", C: "Sand", D: "Leaves" }, correctAnswer: "B", answerDetail: "Plants absorb water and minerals through their roots." },
    { category: "World", difficulty: "Easy", question: "Which forest type has the greatest biodiversity?", image: "images/45.jpg", options: { A: "Desert", B: "Tropical forest", C: "Grassland", D: "Tundra" }, correctAnswer: "B", answerDetail: "Tropical forests have the richest biodiversity." },
    { category: "Sports", difficulty: "Hard", question: "How many seconds are allowed for a basketball free throw?", image: "images/46.jpg", options: { A: "5", B: "8", C: "10", D: "12" }, correctAnswer: "C", answerDetail: "A free throw must be taken within 10 seconds." },
    { category: "Music", difficulty: "Medium", question: "What is the spoken text of a song called?", image: "images/47.jpg", options: { A: "Melody", B: "Lyrics", C: "Refrain", D: "Tone" }, correctAnswer: "B", answerDetail: "The lyrics are the words that accompany the music." }
];

// --- SORU VERİ HAVUZU (25 Soru x 2 Bölüm + 13 Ekstra) ---
const quizData = {
    tr: {
        chapter1: [
            /* mevcut liste */
        ],
        chapter2: [
            /* mevcut liste */
        ],
        chapter3: chapter3Tr
    },
    en: {
        chapter1: [
            /* mevcut liste */
        ],
        chapter2: [
            /* mevcut liste */
        ],
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
