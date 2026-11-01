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

// --- SORU VERİ HAVUZU (25 Soru x 2 Bölüm + 13 Ekstra) ---
const quizData = {
    tr: {
        chapter1: [
            { category: "Doğa & Hayvanlar", difficulty: "Kolay", question: "Salyangozlar genellikle yağmurdan sonra neden dışarı çıkarlar?", image: "images/01.jpg", options: { A: "Nemli hava", B: "Yemek bulmak", C: "Sosyal toplanma", D: "Ev yapmak" }, correctAnswer: "B", answerDetail: "Yağmur toprağı yumuşatır ve yemek bulunması kolaylaşır." },
            { category: "Genel Kültür", difficulty: "Orta", question: "Kamp ateşini güvenli yakmak için ilk ne yapılmalıdır?", image: "images/02.jpg", options: { A: "Büyük odunlar", B: "Güvenli alan hazırlama", C: "Hemen yakma", D: "Su hazırlama" }, correctAnswer: "B", answerDetail: "Ateş yakacak alanın güvenli olması önemlidir." },
            { category: "Kültür Ve Sanat", difficulty: "Orta", question: "Modern moda hangi yüzyılda ortaya çıkmıştır?", image: "images/03.jpg", options: { A: "17.", B: "18.", C: "19.", D: "20." }, correctAnswer: "C", answerDetail: "Modern moda 19. yüzyılda endüstriyel üretimle başlamıştır." },
            { category: "Tarih", difficulty: "Zor", question: "Mitolojide aslan genellikle neyi temsil eder?", image: "images/04.jpg", options: { A: "Bilgelik", B: "Sadakat", C: "Hırs", D: "Güç" }, correctAnswer: "D", answerDetail: "Aslan gücü, cesareti ve liderliği temsil eder." },
            { category: "Fantastik", difficulty: "Kolay", question: "Ejderhaların yaşadığına dair kanıt var mıdır?", image: "images/05.jpg", options: { A: "Kalıntı var", B: "Sadece efsane", C: "Hala yaşıyor", D: "Soyu tükenmiş" }, correctAnswer: "B", answerDetail: "Ejderhalar mitoloji ve efsanelerde yer alır." },
            { category: "Dünya", difficulty: "Orta", question: "Yılan oynatıcıları en çok hangi ülkede bilinir?", image: "images/06.jpg", options: { A: "Hindistan", B: "Brezilya", C: "Türkiye", D: "Mısır" }, correctAnswer: "A", answerDetail: "Hindistan'da yılan oynatıcılığı geleneksel bir sanat formudur." },
            { category: "Dünya", difficulty: "Orta", question: "Afro saç modeli köken olarak nereye dayanır?", image: "images/07.jpg", options: { A: "Afrika", B: "İskandinav", C: "Çin", D: "Meksika" }, correctAnswer: "A", answerDetail: "Afro saç, Afrika kökenli insanların doğal saç yapısıdır." },
            { category: "Edebiyat", difficulty: "Zor", question: "Dostoyevski hangi eseriyle tanınır?", image: "images/08.jpg", options: { A: "Sefiller", B: "Suç ve Ceza", C: "M. Cristo", D: "Kara Şal" }, correctAnswer: "B", answerDetail: "Suç ve Ceza Dostoyevski'nin en ünlü eseridir." },
            { category: "Moda", difficulty: "Zor", question: "Eski dönem zarif giyim tarzına ne ad verilir?", image: "images/09.jpg", options: { A: "Vintage", B: "Futuristik", C: "Sokak", D: "Üniforman" }, correctAnswer: "A", answerDetail: "Vintage geçmiş dönemlerin stil ve moda öğelerini ifade eder." },
            { category: "Sağlık", difficulty: "Orta", question: "Gençlerde dışlanma korkusu neye yol açar?", image: "images/10.jpg", options: { A: "Sosyal kaygı", B: "Özgüven", C: "Umursamazlık", D: "Hiperaktivite" }, correctAnswer: "A", answerDetail: "Dışlanma korkusu sosyal kaygı bozukluğuna neden olabilir." },
            { category: "Kültür ve Sanat", difficulty: "Kolay", question: "Hollywood ödül heykelciğinin adı nedir?", image: "images/11.jpg", options: { A: "Grammy", B: "Oscar", C: "Emmy", D: "Golden Globe" }, correctAnswer: "B", answerDetail: "Oscar (Academy Award) sinema endüstrisinin en prestijli ödülüdür." },
            { category: "Doğa", difficulty: "Orta", question: "Çiftçi için tırpanın temel amacı nedir?", image: "images/12.jpg", options: { A: "Biçmek", B: "Karıştırmak", C: "Yönlendirmek", D: "Eğmek" }, correctAnswer: "A", answerDetail: "Tırpan tarım aletlerinde hasat için kullanılır." },
            { category: "Sağlık", difficulty: "Kolay", question: "Çocuklar neden brokoliyi sevmez?", image: "images/13.jpg", options: { A: "Yeşil renk", B: "Çiğ olması", C: "Acı tadı", D: "Yapısı" }, correctAnswer: "C", answerDetail: "Brokoli sülfür bileşikleri nedeniyle hafif acı tada sahiptir." },
            { category: "Yaşam", difficulty: "Orta", question: "Stres en çok hangi organı etkiler?", image: "images/14.jpg", options: { A: "Kalp", B: "Mide", C: "Akciğer", D: "Karaciğer" }, correctAnswer: "B", answerDetail: "Stres mide sağlığını olumsuz yönde etkiler." },
            { category: "Dünya", difficulty: "Kolay", question: "Filistin'deki çocukların zorluk çekme nedeni?", image: "images/15.jpg", options: { A: "Nüfus", B: "Eğitim", C: "İklim", D: "Çatışma" }, correctAnswer: "D", answerDetail: "Filistin'deki çocuklar coğrafi çatışmalardan etkilenir." },
            { category: "Tarih", difficulty: "Orta", question: "Savaşçı kadın kabilelerine ne denir?", image: "images/16.jpg", options: { A: "Amazonlar", B: "Vikingler", C: "Hunlar", D: "Aztekler" }, correctAnswer: "A", answerDetail: "Amazonlar mitolojide sadece kadın savaşçılardan oluşan bir kabiledir." },
            { category: "Kültür ve Sanat", difficulty: "Orta", question: "Yeşilçam'ın 4 yapraklı yoncasından biri?", image: "images/17.jpg", options: { A: "Türkan Şoray", B: "Nejat Saydam", C: "Kerem Çalışkan", D: "Ş. Gül" }, correctAnswer: "A", answerDetail: "Türkan Şoray Yeşilçam'ın en önemli oyuncularından biridir." },
            { category: "Dünya", difficulty: "Kolay", question: "Anime kültürü hangi ülkede doğmuştur?", image: "images/18.jpg", options: { A: "G. Kore", B: "Çin", C: "Japonya", D: "Tayland" }, correctAnswer: "C", answerDetail: "Anime Japonya'da kaynaklanmış bir sanat formudur." },
            { category: "Tarih", difficulty: "Zor", question: "Tarihin ilk kadın savaşçı hükümdarlarından?", image: "images/19.jpg", options: { A: "Kleopatra", B: "Tomris Hatun", C: "Jeanne d'Arc", D: "Büyük Katerina" }, correctAnswer: "B", answerDetail: "Tomris Hatun Saka kraliçesi ve ünlü savaşçıdır." },
            { category: "Tarih", difficulty: "Orta", question: "Saray palyaçolarının temel görevi neydi?", image: "images/20.jpg", options: { A: "Taktik", B: "Eğlendirmek", C: "Yasa", D: "Savunma" }, correctAnswer: "B", answerDetail: "Saray palyaçoları imparatorları eğlendirmek için vardı." },
            { category: "Hayvanlar", difficulty: "Kolay", question: "Foklar neden soğuk suda üşümez?", image: "images/21.jpg", options: { A: "Kuyruk", B: "Şarkı", C: "Pul", D: "Vücut yağı" }, correctAnswer: "D", answerDetail: "Fokalarda kalın yağ tabakası ısı yalıtımı sağlar." },
            { category: "Hayvanlar", difficulty: "Orta", question: "Leylekler yönlerini neyle bulur?", image: "images/22.jpg", options: { A: "Manyetik alan", B: "Akıntı", C: "Takip", D: "Koku" }, correctAnswer: "A", answerDetail: "Leylekler göç ederken Dünya'nın manyetik alanını kullanırlar." },
            { category: "Hayvanlar", difficulty: "Kolay", question: "Orangutanları ayıran en büyük özellik?", image: "images/23.jpg", options: { A: "Boyun", B: "Uzun kollar", C: "Uçma", D: "Kuyruk" }, correctAnswer: "B", answerDetail: "Orangutanların vücutlarından daha uzun kolları vardır." },
            { category: "Hayvanlar", difficulty: "Zor", question: "Sphynx kedileri neden bu ismi almıştır?", image: "images/24.jpg", options: { A: "Mısır'da doğuş", B: "Günübirlik", C: "Sphinx benzerliği", D: "Tarihçi adı" }, correctAnswer: "C", answerDetail: "Sphynx kedileri Mısır'ın büyük heykeline benzetilerek adlandırılmıştır." },
            { category: "Hayvanlar", difficulty: "Kolay", question: "Sincaplar yiyecekleri nereye saklar?", image: "images/25.jpg", options: { A: "Ağaç kovuğu", B: "Su kuyusu", C: "Güneş altında", D: "Toprak" }, correctAnswer: "A", answerDetail: "Sincaplar kışa hazırlanmak için ağaç kovuklarında yiyecek saklar." }
        ],
        chapter2: [
            { category: "Canlılar", difficulty: "Kolay", question: "Köpeklerin \"sadık hayvanlar\" olarak anılmasının en önemli nedeni nedir?", image: "images/26.jpg", options: { A: "Tek başına yaşaması", B: "Sahibine bağlılığı", C: "Hızlı koşması", D: "Akıllı olması" }, correctAnswer: "B", answerDetail: "Köpekler sahiplerine karşı gösterdikleri bağlılık ile tanınırlar." },
            { category: "Fantastik", difficulty: "Orta", question: "Bir süper kahramanın \"gizli kimlik\" kullanmasının temel nedeni nedir?", image: "images/27.jpg", options: { A: "Kostüm maliyeti", B: "Aileyi koruma", C: "Modaya uyma", D: "Gizem yaratma" }, correctAnswer: "B", answerDetail: "Gizli kimlik süper kahraman ve ailelerinin güvenliğini korur." },
            { category: "Sağlık", difficulty: "Orta", question: "Gençlerde uzun süreli mutsuzluğun en yaygın nedeni hangisidir?", image: "images/28.jpg", options: { A: "Özgüven problemleri", B: "Yalnızlık hissi", C: "Sosyal medya", D: "Ekonomik sorunlar" }, correctAnswer: "A", answerDetail: "Düşük özgüven gençlerde depresyona neden olabilir." },
            { category: "Canlılar", difficulty: "Kolay", question: "Evcil kuşların en çok dikkat edilmesi gereken ihtiyacı nedir?", image: "images/29.jpg", options: { A: "Günlük su banyosu", B: "Taze su ve beslenme", C: "Kostüm giydirilmesi", D: "Müzik dinletme" }, correctAnswer: "B", answerDetail: "Kuşlar taze su ve dengeli beslenme gerekir." },
            { category: "Yaşam", difficulty: "Orta", question: "\"Ansiklopedinin\" temel amacı nedir?", image: "images/30.jpg", options: { A: "Genel bilgileri sistemli şekilde sunmak", B: "Sadece tarih anlatmak", C: "Hikaye yazıştırmak", D: "Denklem çözmek" }, correctAnswer: "A", answerDetail: "Ansiklopedi genel bilgileri düzenli ve kapsamlı şekilde sunar." },
            { category: "Sağlık", difficulty: "Zor", question: "Vücudun ısı kaybetme hızının artması ve çekirdek sıcaklığının düşmesiyle karakterize edilen tıbbi durumun adı nedir?", image: "images/31.jpg", options: { A: "Hipertermia", B: "Hipotermia", C: "Ateş", D: "Şok" }, correctAnswer: "B", answerDetail: "Hipotermia düşük vücut ısısıyla ilgili tehlikeli bir durumdur." },
            { category: "Bilim", difficulty: "Orta", question: "Ders çalışırken \"not almak\" ne işe yarar?", image: "images/32.jpg", options: { A: "Sadece defteri süslemek için", B: "Dersi anlamayı ve hatırlamayı güçlendirmek", C: "Zamanı doldurmak", D: "Öğretmeni etkilemek" }, correctAnswer: "B", answerDetail: "Not almak öğrenmeyi pekiştirir ve hatırlamayı artırır." },
            { category: "Kültür & Sanat", difficulty: "Zor", question: "Afrika'da hikâyeleri sözlü olarak aktaran geleneksel anlatıcılara ne ad verilir?", image: "images/33.jpg", options: { A: "Şarkıcı", B: "Griot", C: "Müzisyen", D: "Oyuncu" }, correctAnswer: "B", answerDetail: "Griot Afrika'nın geleneksel sözlü hikaye anlatıcısıdır." },
            { category: "Tarih", difficulty: "Orta", question: "Fransa tarihinde, Yüz Yıl Savaşı sırasında orduyu motive etmesiyle tanınan ünlü kadın savaşçı kimdir?", image: "images/34.jpg", options: { A: "Boudicca", B: "Tomris", C: "Jeanne d'Arc", D: "Artemisia" }, correctAnswer: "C", answerDetail: "Jeanne d'Arc, Fransız halkının ilham kaynağı olmuş bir savaşçıdır." },
            { category: "Kültür & Sanat", difficulty: "Zor", question: "Pençeli süper kahramanların en belirgin özelliği genellikle nedir?", image: "images/35.jpg", options: { A: "Zıplama kabiliyetleri", B: "Görünmez olmaları", C: "Zamanı durdurmaları", D: "Hızlı iyileşme güçleri" }, correctAnswer: "D", answerDetail: "Pençe temalı kahramanlar, hücre yenilenmesi sayesinde hızla iyileşir." },
            { category: "Fantastik", difficulty: "Zor", question: "Ejderhaların efsanelerde çoğu zaman koruduğuna inanılan ve volkanik hareketlerle oluşan, silisli minerallerin katmanlanmasıyla meydana gelen değerli taş aşağıdakilerden hangisidir?", image: "images/36.jpg", options: { A: "Safir", B: "Ametist", C: "Zümrüt", D: "Opal" }, correctAnswer: "B", answerDetail: "Ametist, kuvars ailesinden, mor tonlarıyla bilinen değerli bir taştır." },
            { category: "Tarih", difficulty: "Orta", question: "Antik Roma'da gladyatör dövüşleri en çok hangi amaçla düzenlenirdi?", image: "images/37.jpg", options: { A: "Asker yetiştirmek", B: "Dini tören yapmak", C: "Halkı eğlendirmek", D: "Suçluları cezalandırmak" }, correctAnswer: "C", answerDetail: "Gladyatör dövüşleri Roma'da büyük arenalarda halk eğlencesi olarak yapılırdı." },
            { category: "Fantastik", difficulty: "Zor", question: "Kedi temalı kadın karakter Catwoman hangi film evreninde yer alır?", image: "images/38.jpg", options: { A: "DC Comics", B: "Star Wars", C: "Marvel", D: "Matrix" }, correctAnswer: "A", answerDetail: "Catwoman, Batman evreninin en ikonik karakterlerinden biridir." },
            { category: "Fantastik", difficulty: "Orta", question: "Masal ve fantastik hikâyelerde dilek gerçekleştiren karakterler genellikle hangisi olarak tasvir edilir?", image: "images/39.jpg", options: { A: "Şövalye", B: "Ejderha", C: "Dev", D: "Peri" }, correctAnswer: "D", answerDetail: "Periler, özellikle Avrupa masallarında dilek ve büyüyle ilişkilendirilir." },
            { category: "Tarih", difficulty: "Kolay", question: "Telefon ve internetten önce insanlar en çok hangi yöntemle uzak mesafeden haberleşirdi?", image: "images/40.jpg", options: { A: "Telgraf", B: "Mektup", C: "Radyo", D: "Güvercin" }, correctAnswer: "B", answerDetail: "Mektuplar yüzyıllar boyunca en yaygın haberleşme yöntemi olmuştur." },
            { category: "Müzik", difficulty: "Orta", question: "Punk rock müzik akımı ilk olarak hangi ülkede ortaya çıkmıştır?", image: "images/41.jpg", options: { A: "Amerika", B: "Almanya", C: "İngiltere", D: "Fransa" }, correctAnswer: "C", answerDetail: "1970'lerde İngiltere'de ortaya çıkan punk, sisteme karşı bir duruş sergiler." },
            { category: "Fantastik", difficulty: "Orta", question: "Orclar en çok hangi fantastik dünyaya ait varlıklar olarak bilinir?", image: "images/42.jpg", options: { A: "Orta Dünya", B: "Narnia", C: "Westeros", D: "Pandora" }, correctAnswer: "A", answerDetail: "Orclar, J.R.R. Tolkien'in Orta Dünya evreninin karanlık yaratıklarıdır." },
            { category: "Bilim", difficulty: "Kolay", question: "Siber ajanlar veya hackerlar en çok hangi alanda faaliyet gösterir?", image: "images/43.jpg", options: { A: "Fiziksel güvenlik", B: "Siber güvenlik ve veri sistemleri", C: "İnşaat sektörü", D: "Tarım teknolojileri" }, correctAnswer: "B", answerDetail: "Siber ajanlar, dijital sistemleri koruma veya analiz etme amacıyla çalışır." },
            { category: "Fantastik", difficulty: "Orta", question: "Metali manyetik güçlerle kontrol edebilen çizgi roman karakteri hangisidir?", image: "images/44.jpg", options: { A: "Iron Man", B: "Thor", C: "Hulk", D: "Magneto" }, correctAnswer: "D", answerDetail: "Magneto, manyetizma temelli güçleriyle tanınan bir X-Men karakteridir." },
            { category: "Din", difficulty: "Orta", question: "Hz. Musa'nın mucizevi şekilde ikiye yardığına inanılan yer neresidir?", image: "images/45.jpg", options: { A: "Kızıldeniz", B: "Lut Gölü", C: "Nil Nehri", D: "Ürdün Nehri" }, correctAnswer: "A", answerDetail: "Bu olay, Tevrat ve Kur'an'da anlatılan önemli mucizelerden biridir." },
            { category: "Tarih", difficulty: "Orta", question: "Orta Çağ'da insanlar hastalıkları iyileştirmek için en çok ne kullanırdı?", image: "images/46.jpg", options: { A: "Antibiyotik", B: "Kimyasal ilaçlar", C: "Aşılar", D: "Bitkisel karışımlar" }, correctAnswer: "D", answerDetail: "Şifalı bitkiler ve doğal karışımlar, Orta Çağ tıbbının temelini oluştururdu." },
            { category: "Bilim", difficulty: "Orta", question: "ABD'de uzaylılar ve UFO araştırmalarıyla ilişkilendirilen gizli askeri bölgenin adı nedir?", image: "images/47.jpg", options: { A: "Area 49", B: "Area 50", C: "Area 52", D: "Area 51" }, correctAnswer: "D", answerDetail: "Area 51, özellikle UFO komplo teorileriyle ünlenmiştir." },
            { category: "Spor", difficulty: "Kolay", question: "Sörf sporu en çok hangi doğal koşullarda yapılır?", image: "images/48.jpg", options: { A: "Durgun göllerde", B: "Karlı bölgelerde", C: "Yüksek ve güçlü dalgalarda", D: "Nehirlerde" }, correctAnswer: "C", answerDetail: "Sörf, okyanus dalgalarının güçlü olduğu kıyılarda yapılır." },
            { category: "Spor", difficulty: "Zor", question: "NBA tarihinde tek bir maçta en fazla sayı atan basketbolcu kimdir?", image: "images/49.jpg", options: { A: "Michael Jordan", B: "Wilt Chamberlain", C: "Kobe Bryant", D: "Julius Erving" }, correctAnswer: "B", answerDetail: "Wilt Chamberlain, 1962'de bir maçta 100 sayı atmıştır." },
            { category: "Tarih", difficulty: "Kolay", question: "\"Düşünüyorum, öyleyse varım\" sözü hangi filozofa aittir?", image: "images/50.jpg", options: { A: "Descartes", B: "Platon", C: "Sokrates", D: "Nietzsche" }, correctAnswer: "A", answerDetail: "Bu ifade modern felsefenin temel taşlarından biridir." },
            { category: "Tarih", difficulty: "Kolay", question: "Yılbaşı veya özel kutlamalarda hindi tüketilmesinin temel nedeni nedir?", image: "images/51.jpg", options: { A: "Bereket ve paylaşımı simgelemesi", B: "Hızlı pişmesi", C: "Ucuz olması", D: "Dinsel zorunluluk" }, correctAnswer: "A", answerDetail: "Hindi, Batı kültüründe bolluk ve kutlama sembolüdür." },
            { category: "Hayvanlar", difficulty: "Kolay", question: "Dünyada evcil hayvan olarak en çok tercih edilen hayvan hangisidir?", image: "images/52.jpg", options: { A: "Köpek", B: "Kuş", C: "Balık", D: "Kedi" }, correctAnswer: "D", answerDetail: "Kediler, bağımsız yapıları ve bakımlarının kolay olmasıyla tercih edilir." },
            { category: "Spor", difficulty: "Zor", question: "Olimpiyat Oyunları tarihinde jimnastikte ilk kez 10.00 tam puan alan sporcu kimdir?", image: "images/53.jpg", options: { A: "Olga Korbut", B: "Larisa Latynina", C: "Nadia Comăneci", D: "Simone Biles" }, correctAnswer: "C", answerDetail: "1976 Montreal Olimpiyatları'nda Nadia Comăneci'nin aldığı 10.00 puan, skor tabelalarında gösterilememiştir." }
        ]
    },
    en: {
        chapter1: [
            { category: "Animals", difficulty: "Easy", question: "Why do snails come out after rain?", image: "images/01.jpg", options: { A: "Moist air", B: "Finding food", C: "Social meeting", D: "Making home" }, correctAnswer: "B", answerDetail: "Rain softens soil making it easier for snails to find food." },
            { category: "Culture", difficulty: "Medium", question: "What should be done first to light a campfire safely?", image: "images/02.jpg", options: { A: "Large woods", B: "Prepare safe area", C: "Start immediately", D: "Prepare water" }, correctAnswer: "B", answerDetail: "A safe area is important before lighting a fire." },
            { category: "Culture", difficulty: "Medium", question: "In which century did modern fashion emerge?", image: "images/03.jpg", options: { A: "17.", B: "18.", C: "19.", D: "20." }, correctAnswer: "C", answerDetail: "Modern fashion began in the 19th century with industrial production." },
            { category: "History", difficulty: "Hard", question: "What does the lion usually represent in mythology?", image: "images/04.jpg", options: { A: "Wisdom", B: "Loyalty", C: "Ambition", D: "Power" }, correctAnswer: "D", answerDetail: "Lions represent strength, courage, and leadership in mythology." },
            { category: "Fantastic", difficulty: "Easy", question: "Is there evidence that dragons live?", image: "images/05.jpg", options: { A: "There are remains", B: "Just legends", C: "Still alive", D: "Extinct" }, correctAnswer: "B", answerDetail: "Dragons exist in mythology and folklore." },
            { category: "World", difficulty: "Medium", question: "In which country are snake charmers best known?", image: "images/06.jpg", options: { A: "India", B: "Brazil", C: "Turkey", D: "Egypt" }, correctAnswer: "A", answerDetail: "Snake charming is a traditional art form in India." },
            { category: "World", difficulty: "Medium", question: "Where is the Afro hairstyle based on the origin?", image: "images/07.jpg", options: { A: "Africa", B: "Scandinavian", C: "China", D: "Mexico" }, correctAnswer: "A", answerDetail: "Afro hair is based on the natural hair structure of people from Africa." },
            { category: "Literature", difficulty: "Hard", question: "Which work is Dostoevsky known for?", image: "images/08.jpg", options: { A: "Miserables", B: "Crime and Punishment", C: "M. Cristo", D: "Black Shawl" }, correctAnswer: "B", answerDetail: "Crime and Punishment is Dostoevsky's most famous work." },
            { category: "Fashion", difficulty: "Hard", question: "What is the name given to the old period elegant clothing style?", image: "images/09.jpg", options: { A: "Vintage", B: "Futuristic", C: "Street", D: "Uniform" }, correctAnswer: "A", answerDetail: "Vintage refers to style and fashion elements from past periods." },
            { category: "Health", difficulty: "Medium", question: "What leads to the fear of exclusion in young people?", image: "images/10.jpg", options: { A: "Social anxiety", B: "Self-confidence", C: "Indifference", D: "Hyperactivity" }, correctAnswer: "A", answerDetail: "Fear of exclusion can lead to social anxiety disorder." },
            { category: "Culture", difficulty: "Easy", question: "What is the name of the Hollywood award statuette?", image: "images/11.jpg", options: { A: "Grammy", B: "Oscar", C: "Emmy", D: "Golden Globe" }, correctAnswer: "B", answerDetail: "Oscar (Academy Award) is cinema's most prestigious award." },
            { category: "World", difficulty: "Medium", question: "What is the main purpose of the scythe for the farmer?", image: "images/12.jpg", options: { A: "To mow", B: "To mix", C: "To direct", D: "To bend" }, correctAnswer: "A", answerDetail: "The scythe is used for harvesting in agriculture." },
            { category: "Health", difficulty: "Easy", question: "Why don't children like broccoli?", image: "images/13.jpg", options: { A: "Green color", B: "Being raw", C: "Bitter taste", D: "Texture" }, correctAnswer: "C", answerDetail: "Broccoli has a slightly bitter taste due to sulfur compounds." },
            { category: "World", difficulty: "Medium", question: "Which organ does stress affect the most?", image: "images/14.jpg", options: { A: "Heart", B: "Stomach", C: "Lung", D: "Liver" }, correctAnswer: "B", answerDetail: "Stress negatively affects stomach health." },
            { category: "World", difficulty: "Easy", question: "The reason for the difficulties of children in Palestine?", image: "images/15.jpg", options: { A: "Population", B: "Education", C: "Climate", D: "Conflict" }, correctAnswer: "D", answerDetail: "Children in Palestine are affected by geographical conflicts." },
            { category: "History", difficulty: "Medium", question: "What are warrior women tribes called?", image: "images/16.jpg", options: { A: "Amazons", B: "Vikings", C: "Huns", D: "Aztecs" }, correctAnswer: "A", answerDetail: "Amazons are a tribe of female warriors in mythology." },
            { category: "Culture", difficulty: "Medium", question: "One of Yeşilçam's 4-leaf clover?", image: "images/17.jpg", options: { A: "Türkan Şoray", B: "Nejat Saydam", C: "Kerem Çalışkan", D: "Ş. Gül" }, correctAnswer: "A", answerDetail: "Türkan Şoray is one of Yeşilçam's most important actors." },
            { category: "World", difficulty: "Easy", question: "In which country was anime culture born?", image: "images/18.jpg", options: { A: "S. Korea", B: "China", C: "Japan", D: "Thailand" }, correctAnswer: "C", answerDetail: "Anime is an art form that originated in Japan." },
            { category: "History", difficulty: "Hard", question: "One of the first female warrior rulers in history?", image: "images/19.jpg", options: { A: "Cleopatra", B: "Tomris Hatun", C: "Jeanne d'Arc", D: "Catherine the Great" }, correctAnswer: "B", answerDetail: "Tomris Hatun was a Saka queen and famous warrior." },
            { category: "History", difficulty: "Medium", question: "What was the main task of the palace clowns?", image: "images/20.jpg", options: { A: "Tactics", B: "To Entertain", C: "Law", D: "Defense" }, correctAnswer: "B", answerDetail: "Palace clowns existed to entertain rulers." },
            { category: "Animals", difficulty: "Easy", question: "Why don't seals get cold in cold water?", image: "images/21.jpg", options: { A: "Tail", B: "Song", C: "Seal", D: "Body fat" }, correctAnswer: "D", answerDetail: "Seals have a thick layer of fat that provides heat insulation." },
            { category: "Animals", difficulty: "Medium", question: "How do storks find their way?", image: "images/22.jpg", options: { A: "Magnetic field", B: "Flow", C: "Following", D: "Smell" }, correctAnswer: "A", answerDetail: "Storks use Earth's magnetic field when migrating." },
            { category: "Animals", difficulty: "Easy", question: "The biggest feature that distinguishes orangutans?", image: "images/23.jpg", options: { A: "Neck", B: "Long arms", C: "Flying", D: "Tail" }, correctAnswer: "B", answerDetail: "Orangutans have arms longer than their body." },
            { category: "Animals", difficulty: "Hard", question: "Why did Sphynx cats get this name?", image: "images/24.jpg", options: { A: "Birth in Egypt", B: "Daytime", C: "Sphinx similarity", D: "Historian name" }, correctAnswer: "C", answerDetail: "Sphynx cats were named after the Great Sphinx of Egypt." },
            { category: "Animals", difficulty: "Easy", question: "Where do squirrels hide food?", image: "images/25.jpg", options: { A: "Tree hollow", B: "Water well", C: "Sunlight", D: "Underground" }, correctAnswer: "A", answerDetail: "Squirrels store food in tree hollows to prepare for winter." }
        ],
        chapter2: [
            { category: "Animals", difficulty: "Easy", question: "What is the most important reason why dogs are called \"loyal animals\"?", image: "images/26.jpg", options: { A: "Living alone", B: "Loyalty to owner", C: "Fast running", D: "Intelligence" }, correctAnswer: "B", answerDetail: "Dogs are known for their loyalty to their owners." },
            { category: "Fantastic", difficulty: "Medium", question: "What is the basic reason for a superhero using a \"secret identity\"?", image: "images/27.jpg", options: { A: "Costume cost", B: "Protecting family", C: "Following fashion", D: "Creating mystery" }, correctAnswer: "B", answerDetail: "Secret identity protects superheroes and their families." },
            { category: "Health", difficulty: "Medium", question: "What is the most common cause of prolonged unhappiness in young people?", image: "images/28.jpg", options: { A: "Self-confidence issues", B: "Loneliness", C: "Social media", D: "Economic problems" }, correctAnswer: "A", answerDetail: "Low self-esteem can lead to depression in young people." },
            { category: "Animals", difficulty: "Easy", question: "What is the most important need to pay attention to for pet birds?", image: "images/29.jpg", options: { A: "Daily water bath", B: "Fresh water and nutrition", C: "Wearing costume", D: "Playing music" }, correctAnswer: "B", answerDetail: "Birds need fresh water and balanced nutrition." },
            { category: "Life", difficulty: "Medium", question: "What is the main purpose of an \"encyclopedia\"?", image: "images/30.jpg", options: { A: "Present general information systematically", B: "Only tell history", C: "Write stories", D: "Solve equations" }, correctAnswer: "A", answerDetail: "Encyclopedia presents general information in an organized and comprehensive way." },
            { category: "Health", difficulty: "Hard", question: "What is the medical condition characterized by increased heat loss and drop in core body temperature?", image: "images/31.jpg", options: { A: "Hyperthermia", B: "Hypothermia", C: "Fever", D: "Shock" }, correctAnswer: "B", answerDetail: "Hypothermia is a dangerous condition related to low body temperature." },
            { category: "Science", difficulty: "Medium", question: "What is the purpose of \"taking notes\" while studying?", image: "images/32.jpg", options: { A: "Only to decorate notebook", B: "Strengthen understanding and memory", C: "Fill time", D: "Impress teacher" }, correctAnswer: "B", answerDetail: "Note-taking reinforces learning and improves retention." },
            { category: "Culture & Art", difficulty: "Hard", question: "What is the name given to traditional storytellers in Africa who pass down stories orally?", image: "images/33.jpg", options: { A: "Singer", B: "Griot", C: "Musician", D: "Actor" }, correctAnswer: "B", answerDetail: "Griot is Africa's traditional oral storyteller." },
            { category: "History", difficulty: "Medium", question: "Who is the famous female warrior known for motivating the army during the Hundred Years' War in French history?", image: "images/34.jpg", options: { A: "Boudicca", B: "Tomris", C: "Jeanne d'Arc", D: "Artemisia" }, correctAnswer: "C", answerDetail: "Jeanne d'Arc was a source of inspiration for the French people." },
            { category: "Culture & Art", difficulty: "Hard", question: "What is the most distinctive feature of clawed superheroes?", image: "images/35.jpg", options: { A: "Jumping ability", B: "Invisibility", C: "Time stopping", D: "Fast healing power" }, correctAnswer: "D", answerDetail: "Clawed heroes have the ability to heal rapidly through cell regeneration." },
            { category: "Fantastic", difficulty: "Hard", question: "What is the precious stone that dragons are believed to guard in legends, formed by volcanic activity and the layering of silica minerals?", image: "images/36.jpg", options: { A: "Sapphire", B: "Amethyst", C: "Emerald", D: "Opal" }, correctAnswer: "B", answerDetail: "Amethyst is a precious stone from the quartz family, known for its purple tones." },
            { category: "History", difficulty: "Medium", question: "What was the main purpose of gladiator fights in ancient Rome?", image: "images/37.jpg", options: { A: "To train soldiers", B: "To perform religious ceremony", C: "To entertain people", D: "To punish criminals" }, correctAnswer: "C", answerDetail: "Gladiator fights were held in large arenas as entertainment for the people of Rome." },
            { category: "Fantastic", difficulty: "Hard", question: "In which film universe does the cat-themed female character Catwoman appear?", image: "images/38.jpg", options: { A: "DC Comics", B: "Star Wars", C: "Marvel", D: "Matrix" }, correctAnswer: "A", answerDetail: "Catwoman is one of the most iconic characters in the Batman universe." },
            { category: "Fantastic", difficulty: "Medium", question: "In fairy tales and fantasy stories, which character is usually depicted as granting wishes?", image: "images/39.jpg", options: { A: "Knight", B: "Dragon", C: "Giant", D: "Fairy" }, correctAnswer: "D", answerDetail: "Fairies are especially associated with wishes and magic in European fairy tales." },
            { category: "History", difficulty: "Easy", question: "Before the telephone and internet, what was the most common method for people to communicate over long distances?", image: "images/40.jpg", options: { A: "Telegraph", B: "Letter", C: "Radio", D: "Pigeon" }, correctAnswer: "B", answerDetail: "Letters were the most common method of communication for centuries." },
            { category: "Music", difficulty: "Medium", question: "In which country did the punk rock movement first emerge?", image: "images/41.jpg", options: { A: "America", B: "Germany", C: "England", D: "France" }, correctAnswer: "C", answerDetail: "Emerging in the 1970s in England, punk was a stance against the system." },
            { category: "Fantastic", difficulty: "Medium", question: "Orcs are most commonly known as creatures belonging to which fantasy world?", image: "images/42.jpg", options: { A: "Middle Earth", B: "Narnia", C: "Westeros", D: "Pandora" }, correctAnswer: "A", answerDetail: "Orcs are dark creatures in J.R.R. Tolkien's Middle Earth universe." },
            { category: "Science", difficulty: "Easy", question: "Cyber agents or hackers primarily operate in which field?", image: "images/43.jpg", options: { A: "Physical security", B: "Cybersecurity and data systems", C: "Construction industry", D: "Agricultural technology" }, correctAnswer: "B", answerDetail: "Cyber agents work to protect or analyze digital systems." },
            { category: "Fantastic", difficulty: "Medium", question: "Which comic book character can control metal with magnetic powers?", image: "images/44.jpg", options: { A: "Iron Man", B: "Thor", C: "Hulk", D: "Magneto" }, correctAnswer: "D", answerDetail: "Magneto is an X-Men character known for his magnetic powers." },
            { category: "Religion", difficulty: "Medium", question: "Where is the place that Moses is believed to have miraculously parted?", image: "images/45.jpg", options: { A: "Red Sea", B: "Dead Sea", C: "Nile River", D: "Jordan River" }, correctAnswer: "A", answerDetail: "This event is mentioned in the Torah and Quran as an important miracle." },
            { category: "History", difficulty: "Medium", question: "What did people most commonly use to treat illnesses in the Middle Ages?", image: "images/46.jpg", options: { A: "Antibiotics", B: "Chemical drugs", C: "Vaccines", D: "Herbal mixtures" }, correctAnswer: "D", answerDetail: "Medicinal herbs and natural mixtures formed the basis of Medieval medicine." },
            { category: "Science", difficulty: "Medium", question: "What is the name of the secret military base in the US associated with alien and UFO research?", image: "images/47.jpg", options: { A: "Area 49", B: "Area 50", C: "Area 52", D: "Area 51" }, correctAnswer: "D", answerDetail: "Area 51 is particularly famous for UFO conspiracy theories." },
            { category: "Sports", difficulty: "Easy", question: "In which natural conditions is surfing most commonly practiced?", image: "images/48.jpg", options: { A: "Calm lakes", B: "Snowy areas", C: "High and powerful waves", D: "Rivers" }, correctAnswer: "C", answerDetail: "Surfing is practiced on coastal areas with powerful ocean waves." },
            { category: "Sports", difficulty: "Hard", question: "Who is the basketball player that scored the most points in a single NBA game?", image: "images/49.jpg", options: { A: "Michael Jordan", B: "Wilt Chamberlain", C: "Kobe Bryant", D: "Julius Erving" }, correctAnswer: "B", answerDetail: "Wilt Chamberlain scored 100 points in a single game in 1962." },
            { category: "History", difficulty: "Easy", question: "Who is credited with the famous quote \"I think, therefore I am\"?", image: "images/50.jpg", options: { A: "Descartes", B: "Plato", C: "Socrates", D: "Nietzsche" }, correctAnswer: "A", answerDetail: "This statement is one of the cornerstones of modern philosophy." },
            { category: "History", difficulty: "Easy", question: "What is the primary reason for consuming turkey at holidays and special celebrations?", image: "images/51.jpg", options: { A: "Symbolizing abundance and sharing", B: "Quick cooking time", C: "Inexpensive", D: "Religious obligation" }, correctAnswer: "A", answerDetail: "Turkey symbolizes abundance and celebration in Western culture." },
            { category: "Animals", difficulty: "Easy", question: "Which animal is the most commonly chosen as a pet worldwide?", image: "images/52.jpg", options: { A: "Dog", B: "Bird", C: "Fish", D: "Cat" }, correctAnswer: "D", answerDetail: "Cats are preferred for their independence and easy care requirements." },
            { category: "Sports", difficulty: "Hard", question: "Who was the first athlete to score a perfect 10.00 in gymnastics at the Olympics?", image: "images/53.jpg", options: { A: "Olga Korbut", B: "Larisa Latynina", C: "Nadia Comăneci", D: "Simone Biles" }, correctAnswer: "C", answerDetail: "At the 1976 Montreal Olympics, Nadia Comăneci's perfect 10.00 score could not be displayed on the scoreboard." }
        ]
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
        ? { 1: "Genel Kültür 1", 2: "Genel Kültür 2" }
        : { 1: "General Culture 1", 2: "General Culture 2" };
    
    document.getElementById('chapter-1-name').textContent = chapterNames[1];
    document.getElementById('chapter-2-name').textContent = chapterNames[2];
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
        ? { 1: "Genel Kültür 1", 2: "Genel Kültür 2" }
        : { 1: "General Culture 1", 2: "General Culture 2" };

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
        
        // YENİ EKLENEN KISIM: Kayıtlı oyun bile olsa soruları her zaman ana dosyadan taze olarak çekiyoruz
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
    // YENİ EKLENEN KISIM: currentQuestions dizisini LocalStorage'a kaydetmeyi bıraktık
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
        
        // YENİ EKLENEN KISIM: Soru sayısı kontrolünü güncel quizData üzerinden yapıyoruz
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
