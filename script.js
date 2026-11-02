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
        finishToSave: "Skor kaydetmek için önce bölümü bitirin.",

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
        ],
        chapter3: [
            {
                "category": "Bilim",
                "difficulty": "Kolay",
                "question": "Güneş Sistemi'ndeki en büyük gezegen hangisidir?",
                "image": "images/54.jpg",
                "options": {
                    "A": "Mars",
                    "B": "Jüpiter",
                    "C": "Dünya",
                    "D": "Satürn"
                },
                "correctAnswer": "B",
                "answerDetail": "Jüpiter, Güneş Sistemi'ndeki en büyük gezegendir."
            },
            {
                "category": "Tarih",
                "difficulty": "Orta",
                "question": "Osmanlı Devleti'nin 34. padişahı ve son döneminin en uzun süre tahtta kalan hükümdarı kimdir?",
                "image": "images/55.jpg",
                "options": {
                    "A": "V. Murad",
                    "B": "II. Abdülhamid",
                    "C": "II. Mahmud",
                    "D": "V. Mehmed Reşad"
                },
                "correctAnswer": "B",
                "answerDetail": "II. Abdülhamid, Osmanlı Devleti'nin 34. padişahıdır ve 1876–1909 yılları arasında hüküm sürmüştür."
            },
            {
                "category": "Sağlık",
                "difficulty": "Kolay",
                "question": "İnsan vücudu sıcak havalarda terleyerek nasıl serinler?",
                "image": "images/56.jpg",
                "options": {
                    "A": "Terin buharlaşmasıyla vücuttan ısı uzaklaşır",
                    "B": "Ter, vücut sıcaklığını doğrudan yükseltir",
                    "C": "Terleme kan dolaşımını durdurur",
                    "D": "Ter, vücuttaki oksijen miktarını artırır"
                },
                "correctAnswer": "A",
                "answerDetail": "Ter cilt yüzeyinden buharlaşırken ısı enerjisi alır ve vücudun soğumasına yardımcı olur."
            },
            {
                "category": "Dünya",
                "difficulty": "Kolay",
                "question": "Yüzölçümü bakımından dünyanın en büyük okyanusu hangisidir?",
                "image": "images/57.jpg",
                "options": {
                    "A": "Atlas Okyanusu",
                    "B": "Hint Okyanusu",
                    "C": "Büyük Okyanus (Pasifik)",
                    "D": "Arktik Okyanusu"
                },
                "correctAnswer": "C",
                "answerDetail": "Büyük Okyanus (Pasifik), yüzölçümü bakımından dünyanın en büyük okyanusudur."
            },
            {
                "category": "Hayvanlar",
                "difficulty": "Kolay",
                "question": "Penguenler doğal olarak en çok hangi yarım kürede yaşar?",
                "image": "images/58.jpg",
                "options": {
                    "A": "Kuzey Yarım Küre",
                    "B": "Güney Yarım Küre",
                    "C": "Her iki yarım kürede eşit olarak",
                    "D": "Yalnızca Ekvator çevresinde"
                },
                "correctAnswer": "B",
                "answerDetail": "Penguen türlerinin doğal yaşam alanları ağırlıklı olarak Güney Yarım Küre'dedir."
            },
            {
                "category": "Müzik",
                "difficulty": "Kolay",
                "question": "Bir müzik eserinin hızlı veya yavaş çalınmasını belirleyen kavram hangisidir?",
                "image": "images/59.jpg",
                "options": {
                    "A": "Melodi",
                    "B": "Tempo",
                    "C": "Harmoni",
                    "D": "Tını"
                },
                "correctAnswer": "B",
                "answerDetail": "Tempo, müziğin icra edilme hızını ifade eder."
            },
            {
                "category": "Spor",
                "difficulty": "Kolay",
                "question": "Futbolda bir oyuncu kırmızı kart gördüğünde ne olur?",
                "image": "images/60.jpg",
                "options": {
                    "A": "Oyuncu yalnızca uyarılır",
                    "B": "Oyuncu oyundan çıkarılır",
                    "C": "Takım penaltı kullanır",
                    "D": "Maç yeniden başlatılır"
                },
                "correctAnswer": "B",
                "answerDetail": "Kırmızı kart gören oyuncu oyun alanını terk eder ve yerine başka oyuncu alınamaz."
            },
            {
                "category": "Edebiyat",
                "difficulty": "Orta",
                "question": "Şiirde dizelerin sonunda benzer seslerin tekrarlanmasına ne denir?",
                "image": "images/61.jpg",
                "options": {
                    "A": "Ölçü",
                    "B": "Kafiye",
                    "C": "Tema",
                    "D": "Anlatıcı"
                },
                "correctAnswer": "B",
                "answerDetail": "Kafiye, şiir dizelerinin sonunda tekrarlanan ses benzerliğidir."
            },
            {
                "category": "Kültür & Sanat",
                "difficulty": "Orta",
                "question": "Tarihî el yazmalarını, tabloları ve eski sanat eserlerini bozulmadan korumak ve onarmakla uğraşan uzmanlık alanı hangisidir?",
                "image": "images/62.jpg",
                "options": {
                    "A": "Arkeoloji",
                    "B": "Etnografya",
                    "C": "Restorasyon ve konservasyon",
                    "D": "Grafik tasarım"
                },
                "correctAnswer": "C",
                "answerDetail": "Restorasyon ve konservasyon, kültür varlıklarının korunması ve gerektiğinde onarılmasıyla ilgilenir."
            },
            {
                "category": "Bilim",
                "difficulty": "Orta",
                "question": "Bitkilere yeşil rengini veren ve fotosentezde görev alan pigment hangisidir?",
                "image": "images/63.jpg",
                "options": {
                    "A": "Melanin",
                    "B": "Hemoglobin",
                    "C": "Klorofil",
                    "D": "Keratin"
                },
                "correctAnswer": "C",
                "answerDetail": "Klorofil, bitkilerin ışık enerjisini soğurmasında görev alan yeşil pigmenttir."
            },
            {
                "category": "Din",
                "difficulty": "Kolay",
                "question": "İslam dininde farz olan günlük namaz kaç vakittir?",
                "image": "images/64.jpg",
                "options": {
                    "A": "2",
                    "B": "3",
                    "C": "4",
                    "D": "5"
                },
                "correctAnswer": "D",
                "answerDetail": "İslam'da günlük farz namazlar beş vakittir."
            },
            {
                "category": "Sağlık",
                "difficulty": "Orta",
                "question": "Hafıza ve sinir sisteminin normal işleyişinde önemli rol oynayan B12 vitamini hangi besin grubunda doğal olarak bulunur?",
                "image": "images/65.jpg",
                "options": {
                    "A": "Turunçgiller",
                    "B": "Tahıllar",
                    "C": "Bitkisel yağlar",
                    "D": "Balık ve diğer hayvansal besinler"
                },
                "correctAnswer": "D",
                "answerDetail": "B12 vitamini doğal olarak balık, et, yumurta ve süt ürünleri gibi hayvansal besinlerde bulunur."
            },
            {
                "category": "Teknoloji",
                "difficulty": "Kolay",
                "question": "Bilgisayarda işlemci tarafından hızlı erişim için kullanılan geçici bellek bileşeni hangisidir?",
                "image": "images/66.jpg",
                "options": {
                    "A": "SSD",
                    "B": "RAM",
                    "C": "Ekran kartı",
                    "D": "Anakart"
                },
                "correctAnswer": "B",
                "answerDetail": "RAM, bilgisayar çalışırken işlemcinin ihtiyaç duyduğu verilere hızlı erişim sağlayan geçici bellektir."
            },
            {
                "category": "Doğa",
                "difficulty": "Orta",
                "question": "Bir nehrin taşıdığı alüvyonları denize veya göle döküldüğü yerde biriktirmesiyle oluşan yer şekli hangisidir?",
                "image": "images/67.jpg",
                "options": {
                    "A": "Plato",
                    "B": "Delta ovası",
                    "C": "Kanyon",
                    "D": "Falez"
                },
                "correctAnswer": "B",
                "answerDetail": "Nehirlerin ağız kısmında biriktirdiği alüvyonlar delta ovalarını oluşturabilir."
            },
            {
                "category": "Hayvanlar",
                "difficulty": "Orta",
                "question": "Kaplumbağaların vücutlarının ayrılmaz bir parçası olan ve omurgalarıyla kaburgalarına bağlı bulunan yapı hangisidir?",
                "image": "images/68.jpg",
                "options": {
                    "A": "Kuyrukları",
                    "B": "Derileri",
                    "C": "Kabukları",
                    "D": "Pençeleri"
                },
                "correctAnswer": "C",
                "answerDetail": "Kaplumbağa kabuğu iskeletinin bir parçasıdır; omurga ve kaburgalarla bağlantılıdır."
            },
            {
                "category": "Tarih",
                "difficulty": "Orta",
                "question": "Çivi yazısını ilk geliştiren uygarlık hangisidir?",
                "image": "images/69.jpg",
                "options": {
                    "A": "Antik Yunanlar",
                    "B": "Romalılar",
                    "C": "Antik Mısırlılar",
                    "D": "Sümerler"
                },
                "correctAnswer": "D",
                "answerDetail": "Çivi yazısı, Mezopotamya'da Sümerler tarafından geliştirilmiştir."
            },
            {
                "category": "Spor",
                "difficulty": "Orta",
                "question": "Wimbledon Tenis Turnuvası hangi tür kortta oynanır?",
                "image": "images/70.jpg",
                "options": {
                    "A": "Çim kort",
                    "B": "Toprak kort",
                    "C": "Sert kort",
                    "D": "Sentetik halı kort"
                },
                "correctAnswer": "A",
                "answerDetail": "Wimbledon, profesyonel tenis takvimindeki en tanınmış çim kort turnuvasıdır."
            },
            {
                "category": "Müzik",
                "difficulty": "Orta",
                "question": "Bir orkestrada müzisyenleri yöneten ve eserin icrasını yönlendiren kişiye ne denir?",
                "image": "images/71.jpg",
                "options": {
                    "A": "Besteci",
                    "B": "Solist",
                    "C": "Orkestra şefi",
                    "D": "Söz yazarı"
                },
                "correctAnswer": "C",
                "answerDetail": "Orkestra şefi, müzisyenlerin birlikte ve uyumlu çalmasını yönetir."
            },
            {
                "category": "Bilim",
                "difficulty": "Kolay",
                "question": "Dünya'nın çevresindeki cisimleri kendine doğru çeken kuvvet hangisidir?",
                "image": "images/72.jpg",
                "options": {
                    "A": "Manyetik kuvvet",
                    "B": "Sürtünme kuvveti",
                    "C": "Elektriksel kuvvet",
                    "D": "Kütle çekim kuvveti"
                },
                "correctAnswer": "D",
                "answerDetail": "Kütle çekim kuvveti, kütlesi olan cisimlerin birbirini çekmesini sağlar."
            },
            {
                "category": "Sağlık",
                "difficulty": "Orta",
                "question": "Uzun süre yetersiz uyumak aşağıdakilerden hangisini olumsuz etkileyebilir?",
                "image": "images/73.jpg",
                "options": {
                    "A": "Dikkat ve konsantrasyonu",
                    "B": "Göz rengini",
                    "C": "Parmak izlerini",
                    "D": "Kan grubunu"
                },
                "correctAnswer": "A",
                "answerDetail": "Yetersiz uyku dikkat, konsantrasyon ve öğrenme süreçlerini olumsuz etkileyebilir."
            },
            {
                "category": "Kültür & Sanat",
                "difficulty": "Kolay",
                "question": "Resim yaparken boyayı yüzeye uygulamak için en yaygın kullanılan araç hangisidir?",
                "image": "images/74.jpg",
                "options": {
                    "A": "Pergel",
                    "B": "Keski",
                    "C": "Fırça",
                    "D": "Cetvel"
                },
                "correctAnswer": "C",
                "answerDetail": "Fırça, boyayı resim yüzeyine uygulamak için kullanılan temel araçlardan biridir."
            },
            {
                "category": "Dünya",
                "difficulty": "Kolay",
                "question": "Deniz seviyesinden yüksekliği bakımından dünyanın en yüksek dağı hangisidir?",
                "image": "images/75.jpg",
                "options": {
                    "A": "K2",
                    "B": "Everest",
                    "C": "Kilimanjaro",
                    "D": "Mont Blanc"
                },
                "correctAnswer": "B",
                "answerDetail": "Everest'in zirvesi deniz seviyesinden yaklaşık 8.849 metre yüksektedir."
            },
            {
                "category": "Teknoloji",
                "difficulty": "Orta",
                "question": "Bilgisayarların ve diğer cihazların bir ağ üzerinden nasıl iletişim kuracağını belirleyen kurallar bütününe ne denir?",
                "image": "images/76.jpg",
                "options": {
                    "A": "Donanım",
                    "B": "İşletim sistemi",
                    "C": "Arayüz",
                    "D": "Ağ protokolü"
                },
                "correctAnswer": "D",
                "answerDetail": "Ağ protokolleri, cihazların veri alışverişini hangi kurallarla yapacağını tanımlar."
            },
            {
                "category": "Edebiyat",
                "difficulty": "Kolay",
                "question": "Toplumun uzun yıllar boyunca edindiği deneyimleri ve öğütleri kısa, kalıplaşmış sözlerle anlatan ifadeler hangileridir?",
                "image": "images/77.jpg",
                "options": {
                    "A": "Atasözleri",
                    "B": "Romanlar",
                    "C": "Masallar",
                    "D": "Tekerlemeler"
                },
                "correctAnswer": "A",
                "answerDetail": "Atasözleri, toplumların deneyim ve öğütlerini kısa, kalıplaşmış ifadelerle aktarır."
            },
            {
                "category": "Bilim",
                "difficulty": "Kolay",
                "question": "Dünya'daki çoğu ekosistemin temel enerji kaynağı hangisidir?",
                "image": "images/78.jpg",
                "options": {
                    "A": "Ay",
                    "B": "Rüzgâr",
                    "C": "Güneş",
                    "D": "Dünya'nın manyetik alanı"
                },
                "correctAnswer": "C",
                "answerDetail": "Güneş ışığı, fotosentez yoluyla çoğu ekosistemin enerji akışını başlatır."
            },
            {
                "category": "Tarih",
                "difficulty": "Orta",
                "question": "Osmanlı Devleti'nde sadrazamın başkanlığında devlet işlerinin görüşüldüğü yönetim organı hangisidir?",
                "image": "images/79.jpg",
                "options": {
                    "A": "Enderun",
                    "B": "Divan-ı Hümayun",
                    "C": "Yeniçeri Ocağı",
                    "D": "Lonca Teşkilatı"
                },
                "correctAnswer": "B",
                "answerDetail": "Divan-ı Hümayun, Osmanlı Devleti'nde önemli yönetim ve danışma işlerinin görüşüldüğü kuruldu."
            },
            {
                "category": "Spor",
                "difficulty": "Orta",
                "question": "Salon voleybolunda, karar seti dışındaki setleri kazanmak için bir takımın en az kaç sayıya ulaşması gerekir?",
                "image": "images/80.jpg",
                "options": {
                    "A": "15",
                    "B": "20",
                    "C": "21",
                    "D": "25"
                },
                "correctAnswer": "D",
                "answerDetail": "Salon voleybolunda ilk dört set 25 sayıya oynanır; seti kazanmak için en az iki sayı fark gerekir."
            },
            {
                "category": "Hayvanlar",
                "difficulty": "Kolay",
                "question": "Zürafaların uzun boyunları sayesinde ulaşabildiği besinler genellikle nerede bulunur?",
                "image": "images/81.jpg",
                "options": {
                    "A": "Ağaçların yüksek dallarında",
                    "B": "Yer altındaki yuvalarda",
                    "C": "Nehirlerin derinliklerinde",
                    "D": "Kayaların altında"
                },
                "correctAnswer": "A",
                "answerDetail": "Zürafalar uzun boyunlarıyla ağaçların yüksek dallarındaki yapraklara ulaşabilir."
            },
            {
                "category": "Din",
                "difficulty": "Kolay",
                "question": "Ramazan Bayramı, İslam dünyasında hangi ibadet döneminin sona ermesinin ardından kutlanır?",
                "image": "images/82.jpg",
                "options": {
                    "A": "Hac ibadetinin",
                    "B": "Kurban kesiminin",
                    "C": "Ramazan orucunun",
                    "D": "Zekât döneminin"
                },
                "correctAnswer": "C",
                "answerDetail": "Ramazan Bayramı, Ramazan ayındaki oruç ibadetinin tamamlanmasının ardından kutlanır."
            },
            {
                "category": "Dünya",
                "difficulty": "Orta",
                "question": "Birleşmiş Milletler'e üye Afrika ülkelerinin sayısı kaçtır?",
                "image": "images/83.jpg",
                "options": {
                    "A": "42",
                    "B": "54",
                    "C": "48",
                    "D": "60"
                },
                "correctAnswer": "B",
                "answerDetail": "Birleşmiş Milletler'in 54 üyesi Afrika kıtasındadır."
            },
            {
                "category": "Kültür & Sanat",
                "difficulty": "Orta",
                "question": "Oyuncu sahnede repliğini unuttuğunda, kendisine hatırlatmak için verilen kısa ipucuna ne denir?",
                "image": "images/84.jpg",
                "options": {
                    "A": "Sinopsis",
                    "B": "Sufle",
                    "C": "Monolog",
                    "D": "Prolog"
                },
                "correctAnswer": "B",
                "answerDetail": "Sufle, oyuncuya unuttuğu repliği hatırlatmak için sahne kenarından verilen sözdür. Sinopsis ise bir eserin kısa özetidir."
            },
            {
                "category": "Müzik",
                "difficulty": "Kolay",
                "question": "Bağlama, gitar veya ud gibi telli çalgılarda tellere vurmak ya da telleri çekmek için kullanılan araca ne denir?",
                "image": "images/85.jpg",
                "options": {
                    "A": "Mızrap",
                    "B": "Yay",
                    "C": "Baget",
                    "D": "Akort cihazı"
                },
                "correctAnswer": "A",
                "answerDetail": "Mızrap, bazı telli çalgıların tellerini titreştirmek için kullanılan küçük araçtır."
            },
            {
                "category": "Sağlık",
                "difficulty": "Kolay",
                "question": "Dişleri çürümeye karşı korumak için diş hekimlerinin önerdiği temel alışkanlıklardan biri hangisidir?",
                "image": "images/86.jpg",
                "options": {
                    "A": "Dişleri yalnızca suyla çalkalamak",
                    "B": "Sert yiyecekleri sık tüketmek",
                    "C": "Dişleri günde iki kez florürlü diş macunuyla fırçalamak",
                    "D": "Diş fırçalamadan önce şekerli içecek tüketmek"
                },
                "correctAnswer": "C",
                "answerDetail": "Florürlü diş macunuyla günde iki kez fırçalamak diş minesini güçlendirmeye ve çürük riskini azaltmaya yardımcı olur."
            },
            {
                "category": "Teknoloji",
                "difficulty": "Kolay",
                "question": "Ev veya ofis ağında internet bağlantısını birden fazla cihaza kablosuz olarak dağıtan cihaz hangisidir?",
                "image": "images/87.jpg",
                "options": {
                    "A": "Harici disk",
                    "B": "Ağ kartı",
                    "C": "Modem kablosu",
                    "D": "Kablosuz yönlendirici (router)"
                },
                "correctAnswer": "D",
                "answerDetail": "Kablosuz yönlendirici, ağ bağlantısını Wi-Fi üzerinden birden fazla cihaza dağıtabilir."
            },
            {
                "category": "Bilim",
                "difficulty": "Kolay",
                "question": "Bitki köklerinin temel görevlerinden biri hangisidir?",
                "image": "images/88.jpg",
                "options": {
                    "A": "Güneş ışığını doğrudan besine dönüştürmek",
                    "B": "Çiçeklerin rengini belirlemek",
                    "C": "Topraktan su ve mineral almak",
                    "D": "Polen üretmek"
                },
                "correctAnswer": "C",
                "answerDetail": "Bitki kökleri bitkiyi toprağa bağlar ve topraktan su ile mineral maddeleri alır."
            },
            {
                "category": "Edebiyat",
                "difficulty": "Kolay",
                "question": "Bir metinde yazarın okuyucuya asıl olarak anlatmak veya düşündürmek istediği temel mesaja ne denir?",
                "image": "images/89.jpg",
                "options": {
                    "A": "Ana düşünce",
                    "B": "Yardımcı karakter",
                    "C": "Betimleme",
                    "D": "Diyalog"
                },
                "correctAnswer": "A",
                "answerDetail": "Ana düşünce, metnin okuyucuya aktarmayı amaçladığı temel mesajdır."
            },
            {
                "category": "Spor",
                "difficulty": "Kolay",
                "question": "Atletizmde standart bir açık hava pistinde bir turun uzunluğu kaç metredir?",
                "image": "images/90.jpg",
                "options": {
                    "A": "200",
                    "B": "300",
                    "C": "400",
                    "D": "800"
                },
                "correctAnswer": "C",
                "answerDetail": "Standart açık hava atletizm pistinin bir kulvarındaki turun uzunluğu 400 metredir."
            },
            {
                "category": "Hayvanlar",
                "difficulty": "Kolay",
                "question": "Bir kelebeğin tırtıl evresinden sonra yetişkin kelebeğe dönüşmeden önce bulunduğu evre hangisidir?",
                "image": "images/91.jpg",
                "options": {
                    "A": "Yumurta",
                    "B": "Larva",
                    "C": "Ergin",
                    "D": "Pupa"
                },
                "correctAnswer": "D",
                "answerDetail": "Kelebek yaşam döngüsünde tırtıl (larva) evresinden sonra pupa evresine geçer."
            },
            {
                "category": "Dünya",
                "difficulty": "Kolay",
                "question": "Bir bölgedeki sıcaklık, yağış, rüzgâr ve nem gibi atmosfer koşullarının kısa süreli durumuna ne denir?",
                "image": "images/92.jpg",
                "options": {
                    "A": "Hava durumu",
                    "B": "İklim",
                    "C": "Erozyon",
                    "D": "Mevsim döngüsü"
                },
                "correctAnswer": "A",
                "answerDetail": "Hava durumu, atmosferin belirli bir yerde kısa süre içindeki koşullarını ifade eder."
            },
            {
                "category": "Tarih",
                "difficulty": "Kolay",
                "question": "Antik Mısır'daki piramitler öncelikle hangi amaçla inşa edilmiştir?",
                "image": "images/93.jpg",
                "options": {
                    "A": "Halkın yaşadığı konutlar olarak",
                    "B": "Ticaret merkezleri olarak",
                    "C": "Kralların mezarı olarak",
                    "D": "Askerî savunma kaleleri olarak"
                },
                "correctAnswer": "C",
                "answerDetail": "Mısır piramitlerinin en bilinenleri firavunlar için anıt mezar olarak inşa edilmiştir."
            },
            {
                "category": "Dünya",
                "difficulty": "Orta",
                "question": "Dünyada ana dili olarak en fazla insan tarafından konuşulan dil hangisidir?",
                "image": "images/94.jpg",
                "options": {
                    "A": "İngilizce",
                    "B": "İspanyolca",
                    "C": "Hintçe",
                    "D": "Mandarin Çincesi"
                },
                "correctAnswer": "D",
                "answerDetail": "Ana dili konuşuru sayısı bakımından Mandarin Çincesi dünyanın en büyük dilidir."
            },
            {
                "category": "Teknoloji",
                "difficulty": "Kolay",
                "question": "İnternet sitelerini görüntülemek ve web sayfaları arasında gezinmek için kullanılan yazılıma ne denir?",
                "image": "images/95.jpg",
                "options": {
                    "A": "Web tarayıcısı",
                    "B": "İşletim sistemi",
                    "C": "Veritabanı",
                    "D": "Dosya sıkıştırma programı"
                },
                "correctAnswer": "A",
                "answerDetail": "Web tarayıcısı, internet sitelerini açmak ve web sayfalarında gezinmek için kullanılır."
            },
            {
                "category": "Kültür & Sanat",
                "difficulty": "Orta",
                "question": "Binaların tasarımını, işlevsel düzenini ve yapısal özelliklerini planlayan meslek hangisidir?",
                "image": "images/96.jpg",
                "options": {
                    "A": "İç mimarlık",
                    "B": "Peyzaj mimarlığı",
                    "C": "Şehir plancılığı",
                    "D": "Mimarlık"
                },
                "correctAnswer": "D",
                "answerDetail": "Mimarlar binaların tasarımını, işlevini ve mekânsal düzenini planlar."
            },
            {
                "category": "Bilim",
                "difficulty": "Orta",
                "question": "Fotosentez yapan bitkiler, atmosferdeki hangi gazı kullanır?",
                "image": "images/97.jpg",
                "options": {
                    "A": "Oksijen",
                    "B": "Azot",
                    "C": "Karbondioksit",
                    "D": "Hidrojen"
                },
                "correctAnswer": "C",
                "answerDetail": "Bitkiler fotosentez sırasında karbondioksit ve su kullanarak organik madde üretir."
            },
            {
                "category": "Doğa",
                "difficulty": "Orta",
                "question": "Tropikal yağmur ormanlarının yıl boyunca yüksek sıcaklık ve bol yağış almasının temel nedeni hangisidir?",
                "image": "images/98.jpg",
                "options": {
                    "A": "Ekvator çevresindeki güneşlenme ve nemli hava koşulları",
                    "B": "Kutuplardan gelen soğuk hava akımları",
                    "C": "Yüksek rakımlı dağların sürekli kar üretmesi",
                    "D": "Denizlerden tamamen uzak olmaları"
                },
                "correctAnswer": "A",
                "answerDetail": "Ekvator çevresinde güneş ışınları yıl boyunca güçlüdür; yükselen nemli hava sık yağış oluşturur."
            },
            {
                "category": "Spor",
                "difficulty": "Orta",
                "question": "FIBA basketbol kurallarına göre bir oyuncu serbest atış kullanırken topu kaç saniye içinde elinden çıkarmalıdır?",
                "image": "images/99.jpg",
                "options": {
                    "A": "3 saniye",
                    "B": "8 saniye",
                    "C": "10 saniye",
                    "D": "5 saniye"
                },
                "correctAnswer": "D",
                "answerDetail": "FIBA kurallarına göre serbest atışı kullanacak oyuncu, top kendisine verildikten sonra beş saniye içinde atışı yapmalıdır."
            },
            {
                "category": "Müzik",
                "difficulty": "Orta",
                "question": "Bir şarkıda kıtalar arasında tekrarlanan ve genellikle eserin en akılda kalıcı bölümünü oluşturan kısma ne denir?",
                "image": "images/100.jpg",
                "options": {
                    "A": "Köprü",
                    "B": "Giriş",
                    "C": "Nakarat",
                    "D": "Solo"
                },
                "correctAnswer": "C",
                "answerDetail": "Nakarat, şarkının tekrarlanan ve çoğunlukla ana melodik fikri taşıyan bölümüdür."
            }
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
        ],
        chapter3: [
            {
                "category": "Science",
                "difficulty": "Easy",
                "question": "Which is the largest planet in the Solar System?",
                "image": "images/54.jpg",
                "options": {
                    "A": "Mars",
                    "B": "Jupiter",
                    "C": "Earth",
                    "D": "Saturn"
                },
                "correctAnswer": "B",
                "answerDetail": "Jupiter is the largest planet in the Solar System."
            },
            {
                "category": "History",
                "difficulty": "Medium",
                "question": "Who was the 34th sultan of the Ottoman Empire and the longest-reigning ruler of its late period?",
                "image": "images/55.jpg",
                "options": {
                    "A": "Murad V",
                    "B": "Abdulhamid II",
                    "C": "Mahmud II",
                    "D": "Mehmed V Reşad"
                },
                "correctAnswer": "B",
                "answerDetail": "Abdulhamid II was the 34th Ottoman sultan and reigned from 1876 to 1909."
            },
            {
                "category": "Health",
                "difficulty": "Easy",
                "question": "How does the human body cool itself by sweating in hot weather?",
                "image": "images/56.jpg",
                "options": {
                    "A": "Evaporation of sweat removes heat from the body",
                    "B": "Sweat directly raises body temperature",
                    "C": "Sweating stops blood circulation",
                    "D": "Sweat increases the amount of oxygen in the body"
                },
                "correctAnswer": "A",
                "answerDetail": "As sweat evaporates from the skin, it absorbs heat and helps cool the body."
            },
            {
                "category": "World",
                "difficulty": "Easy",
                "question": "Which is the largest ocean in the world by surface area?",
                "image": "images/57.jpg",
                "options": {
                    "A": "Atlantic Ocean",
                    "B": "Indian Ocean",
                    "C": "Pacific Ocean",
                    "D": "Arctic Ocean"
                },
                "correctAnswer": "C",
                "answerDetail": "The Pacific Ocean is the largest ocean by surface area."
            },
            {
                "category": "Animals",
                "difficulty": "Easy",
                "question": "In which hemisphere do penguins naturally live most widely?",
                "image": "images/58.jpg",
                "options": {
                    "A": "Northern Hemisphere",
                    "B": "Southern Hemisphere",
                    "C": "Equally in both hemispheres",
                    "D": "Only around the Equator"
                },
                "correctAnswer": "B",
                "answerDetail": "The natural ranges of penguin species are concentrated in the Southern Hemisphere."
            },
            {
                "category": "Music",
                "difficulty": "Easy",
                "question": "Which term describes how fast or slowly a piece of music is performed?",
                "image": "images/59.jpg",
                "options": {
                    "A": "Melody",
                    "B": "Tempo",
                    "C": "Harmony",
                    "D": "Timbre"
                },
                "correctAnswer": "B",
                "answerDetail": "Tempo refers to the speed at which music is performed."
            },
            {
                "category": "Sports",
                "difficulty": "Easy",
                "question": "What happens when a football player receives a red card?",
                "image": "images/60.jpg",
                "options": {
                    "A": "The player only receives a warning",
                    "B": "The player is sent off",
                    "C": "The team takes a penalty",
                    "D": "The match is restarted"
                },
                "correctAnswer": "B",
                "answerDetail": "A player shown a red card must leave the field and cannot be replaced."
            },
            {
                "category": "Literature",
                "difficulty": "Medium",
                "question": "What is the repetition of similar sounds at the ends of poetic lines called?",
                "image": "images/61.jpg",
                "options": {
                    "A": "Meter",
                    "B": "Rhyme",
                    "C": "Theme",
                    "D": "Narrator"
                },
                "correctAnswer": "B",
                "answerDetail": "Rhyme is the repetition of similar sounds, often at the ends of poetic lines."
            },
            {
                "category": "Culture & Art",
                "difficulty": "Medium",
                "question": "Which field focuses on preserving and repairing historical manuscripts, paintings, and other works of art?",
                "image": "images/62.jpg",
                "options": {
                    "A": "Archaeology",
                    "B": "Ethnography",
                    "C": "Restoration and conservation",
                    "D": "Graphic design"
                },
                "correctAnswer": "C",
                "answerDetail": "Restoration and conservation focus on protecting cultural objects and repairing them when necessary."
            },
            {
                "category": "Science",
                "difficulty": "Medium",
                "question": "Which pigment gives plants their green color and plays a role in photosynthesis?",
                "image": "images/63.jpg",
                "options": {
                    "A": "Melanin",
                    "B": "Hemoglobin",
                    "C": "Chlorophyll",
                    "D": "Keratin"
                },
                "correctAnswer": "C",
                "answerDetail": "Chlorophyll is the green pigment that absorbs light energy for photosynthesis."
            },
            {
                "category": "Religion",
                "difficulty": "Easy",
                "question": "How many obligatory daily prayers are there in Islam?",
                "image": "images/64.jpg",
                "options": {
                    "A": "2",
                    "B": "3",
                    "C": "4",
                    "D": "5"
                },
                "correctAnswer": "D",
                "answerDetail": "There are five obligatory daily prayers in Islam."
            },
            {
                "category": "Health",
                "difficulty": "Medium",
                "question": "Vitamin B12, which plays an important role in normal memory and nervous system function, is naturally found in which food group?",
                "image": "images/65.jpg",
                "options": {
                    "A": "Citrus fruits",
                    "B": "Grains",
                    "C": "Plant oils",
                    "D": "Fish and other animal-based foods"
                },
                "correctAnswer": "D",
                "answerDetail": "Vitamin B12 occurs naturally in animal-based foods such as fish, meat, eggs, and dairy products."
            },
            {
                "category": "Technology",
                "difficulty": "Easy",
                "question": "Which computer component provides temporary memory for fast access by the processor?",
                "image": "images/66.jpg",
                "options": {
                    "A": "SSD",
                    "B": "RAM",
                    "C": "Graphics card",
                    "D": "Motherboard"
                },
                "correctAnswer": "B",
                "answerDetail": "RAM is temporary memory that gives the processor fast access to data while the computer is running."
            },
            {
                "category": "Nature",
                "difficulty": "Medium",
                "question": "Which landform can form when a river deposits sediment where it flows into a sea or lake?",
                "image": "images/67.jpg",
                "options": {
                    "A": "Plateau",
                    "B": "Delta",
                    "C": "Canyon",
                    "D": "Cliff"
                },
                "correctAnswer": "B",
                "answerDetail": "Sediment deposited near a river mouth can build a delta."
            },
            {
                "category": "Animals",
                "difficulty": "Medium",
                "question": "Which structure is an inseparable part of a turtle's body and is connected to its spine and ribs?",
                "image": "images/68.jpg",
                "options": {
                    "A": "Tail",
                    "B": "Skin",
                    "C": "Shell",
                    "D": "Claws"
                },
                "correctAnswer": "C",
                "answerDetail": "A turtle's shell is part of its skeleton and is connected to its spine and ribs."
            },
            {
                "category": "History",
                "difficulty": "Medium",
                "question": "Which civilization first developed cuneiform writing?",
                "image": "images/69.jpg",
                "options": {
                    "A": "Ancient Greeks",
                    "B": "Romans",
                    "C": "Ancient Egyptians",
                    "D": "Sumerians"
                },
                "correctAnswer": "D",
                "answerDetail": "Cuneiform writing was developed by the Sumerians in Mesopotamia."
            },
            {
                "category": "Sports",
                "difficulty": "Medium",
                "question": "What type of court is used for the Wimbledon Tennis Championships?",
                "image": "images/70.jpg",
                "options": {
                    "A": "Grass court",
                    "B": "Clay court",
                    "C": "Hard court",
                    "D": "Synthetic carpet court"
                },
                "correctAnswer": "A",
                "answerDetail": "Wimbledon is the best-known grass-court tournament in professional tennis."
            },
            {
                "category": "Music",
                "difficulty": "Medium",
                "question": "What is the person who leads an orchestra and guides its performance called?",
                "image": "images/71.jpg",
                "options": {
                    "A": "Composer",
                    "B": "Soloist",
                    "C": "Conductor",
                    "D": "Lyricist"
                },
                "correctAnswer": "C",
                "answerDetail": "The conductor coordinates the musicians and guides the orchestra's performance."
            },
            {
                "category": "Science",
                "difficulty": "Easy",
                "question": "Which force pulls objects toward the Earth?",
                "image": "images/72.jpg",
                "options": {
                    "A": "Magnetic force",
                    "B": "Friction",
                    "C": "Electric force",
                    "D": "Gravity"
                },
                "correctAnswer": "D",
                "answerDetail": "Gravity is the force that attracts objects with mass toward one another."
            },
            {
                "category": "Health",
                "difficulty": "Medium",
                "question": "Which of the following can be negatively affected by long-term insufficient sleep?",
                "image": "images/73.jpg",
                "options": {
                    "A": "Attention and concentration",
                    "B": "Eye color",
                    "C": "Fingerprints",
                    "D": "Blood type"
                },
                "correctAnswer": "A",
                "answerDetail": "Insufficient sleep can impair attention, concentration, and learning."
            },
            {
                "category": "Culture & Art",
                "difficulty": "Easy",
                "question": "Which tool is most commonly used to apply paint to a surface?",
                "image": "images/74.jpg",
                "options": {
                    "A": "Compass",
                    "B": "Chisel",
                    "C": "Paintbrush",
                    "D": "Ruler"
                },
                "correctAnswer": "C",
                "answerDetail": "A paintbrush is one of the basic tools used to apply paint to an art surface."
            },
            {
                "category": "World",
                "difficulty": "Easy",
                "question": "What is the highest mountain in the world measured from sea level?",
                "image": "images/75.jpg",
                "options": {
                    "A": "K2",
                    "B": "Mount Everest",
                    "C": "Kilimanjaro",
                    "D": "Mont Blanc"
                },
                "correctAnswer": "B",
                "answerDetail": "The summit of Mount Everest is about 8,849 meters above sea level."
            },
            {
                "category": "Technology",
                "difficulty": "Medium",
                "question": "What is the name for the set of rules that determines how computers and other devices communicate over a network?",
                "image": "images/76.jpg",
                "options": {
                    "A": "Hardware",
                    "B": "Operating system",
                    "C": "Interface",
                    "D": "Network protocol"
                },
                "correctAnswer": "D",
                "answerDetail": "Network protocols define the rules devices follow when exchanging data."
            },
            {
                "category": "Literature",
                "difficulty": "Easy",
                "question": "What are short, established expressions that pass down a society's experience and advice?",
                "image": "images/77.jpg",
                "options": {
                    "A": "Proverbs",
                    "B": "Novels",
                    "C": "Fairy tales",
                    "D": "Tongue twisters"
                },
                "correctAnswer": "A",
                "answerDetail": "Proverbs convey shared experience and advice in short, established expressions."
            },
            {
                "category": "Science",
                "difficulty": "Easy",
                "question": "What is the primary energy source for most ecosystems on Earth?",
                "image": "images/78.jpg",
                "options": {
                    "A": "The Moon",
                    "B": "Wind",
                    "C": "The Sun",
                    "D": "Earth's magnetic field"
                },
                "correctAnswer": "C",
                "answerDetail": "Sunlight drives energy flow in most ecosystems through photosynthesis."
            },
            {
                "category": "History",
                "difficulty": "Medium",
                "question": "In the Ottoman Empire, which governing council discussed state affairs under the grand vizier's leadership?",
                "image": "images/79.jpg",
                "options": {
                    "A": "Enderun",
                    "B": "Imperial Council (Divan-ı Hümayun)",
                    "C": "Janissary Corps",
                    "D": "Guild organization"
                },
                "correctAnswer": "B",
                "answerDetail": "The Imperial Council was an important Ottoman body for discussing government and administrative affairs."
            },
            {
                "category": "Sports",
                "difficulty": "Medium",
                "question": "In indoor volleyball, how many points must a team reach to win a set other than the deciding set?",
                "image": "images/80.jpg",
                "options": {
                    "A": "15",
                    "B": "20",
                    "C": "21",
                    "D": "25"
                },
                "correctAnswer": "D",
                "answerDetail": "The first four sets are played to 25 points, and a team must win by at least two points."
            },
            {
                "category": "Animals",
                "difficulty": "Easy",
                "question": "Where is the food that giraffes can reach with their long necks usually found?",
                "image": "images/81.jpg",
                "options": {
                    "A": "On high tree branches",
                    "B": "In underground nests",
                    "C": "Deep in rivers",
                    "D": "Under rocks"
                },
                "correctAnswer": "A",
                "answerDetail": "Giraffes use their long necks to reach leaves on high tree branches."
            },
            {
                "category": "Religion",
                "difficulty": "Easy",
                "question": "Which period of worship ends just before Eid al-Fitr is celebrated?",
                "image": "images/82.jpg",
                "options": {
                    "A": "The Hajj pilgrimage",
                    "B": "The animal sacrifice",
                    "C": "The Ramadan fast",
                    "D": "The zakat period"
                },
                "correctAnswer": "C",
                "answerDetail": "Eid al-Fitr is celebrated after the month of fasting during Ramadan."
            },
            {
                "category": "World",
                "difficulty": "Medium",
                "question": "How many African countries are members of the United Nations?",
                "image": "images/83.jpg",
                "options": {
                    "A": "42",
                    "B": "54",
                    "C": "48",
                    "D": "60"
                },
                "correctAnswer": "B",
                "answerDetail": "There are 54 African member states in the United Nations."
            },
            {
                "category": "Culture & Art",
                "difficulty": "Medium",
                "question": "What is the short prompt given to an actor to remind them of a forgotten line on stage called?",
                "image": "images/84.jpg",
                "options": {
                    "A": "Synopsis",
                    "B": "Cue (prompt)",
                    "C": "Monologue",
                    "D": "Prologue"
                },
                "correctAnswer": "B",
                "answerDetail": "A cue or prompt is a word or line given to help an actor remember forgotten dialogue. A synopsis is a brief summary of a work."
            },
            {
                "category": "Music",
                "difficulty": "Easy",
                "question": "What is the small tool used to strike or pluck the strings of instruments such as the bağlama, guitar, or oud called?",
                "image": "images/85.jpg",
                "options": {
                    "A": "Plectrum",
                    "B": "Bow",
                    "C": "Drumstick",
                    "D": "Tuner"
                },
                "correctAnswer": "A",
                "answerDetail": "A plectrum is a small tool used to pluck or strike the strings of certain instruments."
            },
            {
                "category": "Health",
                "difficulty": "Easy",
                "question": "Which basic habit do dentists recommend to help protect teeth against decay?",
                "image": "images/86.jpg",
                "options": {
                    "A": "Rinsing with water only",
                    "B": "Frequently eating hard foods",
                    "C": "Brushing twice a day with fluoride toothpaste",
                    "D": "Drinking sugary beverages before brushing"
                },
                "correctAnswer": "C",
                "answerDetail": "Brushing twice daily with fluoride toothpaste helps strengthen enamel and reduce the risk of tooth decay."
            },
            {
                "category": "Technology",
                "difficulty": "Easy",
                "question": "Which device can distribute an internet connection wirelessly to multiple devices in a home or office network?",
                "image": "images/87.jpg",
                "options": {
                    "A": "External drive",
                    "B": "Network card",
                    "C": "Modem cable",
                    "D": "Wireless router"
                },
                "correctAnswer": "D",
                "answerDetail": "A wireless router can distribute a network connection to multiple devices over Wi-Fi."
            },
            {
                "category": "Science",
                "difficulty": "Easy",
                "question": "Which is one of the main functions of plant roots?",
                "image": "images/88.jpg",
                "options": {
                    "A": "Turning sunlight directly into food",
                    "B": "Determining flower color",
                    "C": "Absorbing water and minerals from soil",
                    "D": "Producing pollen"
                },
                "correctAnswer": "C",
                "answerDetail": "Plant roots anchor the plant and absorb water and mineral nutrients from the soil."
            },
            {
                "category": "Literature",
                "difficulty": "Easy",
                "question": "What is the central message that an author wants readers to understand or consider in a text called?",
                "image": "images/89.jpg",
                "options": {
                    "A": "Main idea",
                    "B": "Supporting character",
                    "C": "Description",
                    "D": "Dialogue"
                },
                "correctAnswer": "A",
                "answerDetail": "The main idea is the central message a text aims to communicate."
            },
            {
                "category": "Sports",
                "difficulty": "Easy",
                "question": "How long is one lap of a standard outdoor athletics track?",
                "image": "images/90.jpg",
                "options": {
                    "A": "200 meters",
                    "B": "300 meters",
                    "C": "400 meters",
                    "D": "800 meters"
                },
                "correctAnswer": "C",
                "answerDetail": "One lap in the standard outdoor athletics track's innermost lane is 400 meters."
            },
            {
                "category": "Animals",
                "difficulty": "Easy",
                "question": "What is the stage after the caterpillar and before an adult butterfly?",
                "image": "images/91.jpg",
                "options": {
                    "A": "Egg",
                    "B": "Larva",
                    "C": "Adult",
                    "D": "Pupa"
                },
                "correctAnswer": "D",
                "answerDetail": "In a butterfly's life cycle, the caterpillar (larva) develops into the pupa stage."
            },
            {
                "category": "World",
                "difficulty": "Easy",
                "question": "What term describes short-term atmospheric conditions such as temperature, rainfall, wind, and humidity in a region?",
                "image": "images/92.jpg",
                "options": {
                    "A": "Weather",
                    "B": "Climate",
                    "C": "Erosion",
                    "D": "Seasonal cycle"
                },
                "correctAnswer": "A",
                "answerDetail": "Weather describes atmospheric conditions at a particular place over a short period."
            },
            {
                "category": "History",
                "difficulty": "Easy",
                "question": "What was the primary purpose of the pyramids in ancient Egypt?",
                "image": "images/93.jpg",
                "options": {
                    "A": "Homes for the general population",
                    "B": "Trade centers",
                    "C": "Tombs for kings",
                    "D": "Military fortresses"
                },
                "correctAnswer": "C",
                "answerDetail": "The best-known Egyptian pyramids were built as monumental tombs for pharaohs."
            },
            {
                "category": "World",
                "difficulty": "Medium",
                "question": "Which language has the largest number of native speakers in the world?",
                "image": "images/94.jpg",
                "options": {
                    "A": "English",
                    "B": "Spanish",
                    "C": "Hindi",
                    "D": "Mandarin Chinese"
                },
                "correctAnswer": "D",
                "answerDetail": "Mandarin Chinese has the largest number of native speakers worldwide."
            },
            {
                "category": "Technology",
                "difficulty": "Easy",
                "question": "What is the software used to view websites and navigate web pages called?",
                "image": "images/95.jpg",
                "options": {
                    "A": "Web browser",
                    "B": "Operating system",
                    "C": "Database",
                    "D": "File compression program"
                },
                "correctAnswer": "A",
                "answerDetail": "A web browser is used to open websites and navigate web pages."
            },
            {
                "category": "Culture & Art",
                "difficulty": "Medium",
                "question": "Which profession plans the design, functional layout, and structural features of buildings?",
                "image": "images/96.jpg",
                "options": {
                    "A": "Interior design",
                    "B": "Landscape architecture",
                    "C": "Urban planning",
                    "D": "Architecture"
                },
                "correctAnswer": "D",
                "answerDetail": "Architects plan the design, function, and spatial organization of buildings."
            },
            {
                "category": "Science",
                "difficulty": "Medium",
                "question": "Which gas do plants use during photosynthesis?",
                "image": "images/97.jpg",
                "options": {
                    "A": "Oxygen",
                    "B": "Nitrogen",
                    "C": "Carbon dioxide",
                    "D": "Hydrogen"
                },
                "correctAnswer": "C",
                "answerDetail": "Plants use carbon dioxide and water to produce organic matter during photosynthesis."
            },
            {
                "category": "Nature",
                "difficulty": "Medium",
                "question": "Why do tropical rainforests generally have high temperatures and abundant rainfall throughout the year?",
                "image": "images/98.jpg",
                "options": {
                    "A": "Strong year-round sunlight and moist air around the Equator",
                    "B": "Cold air currents from the poles",
                    "C": "Constant snowfall on high mountains",
                    "D": "Their great distance from the sea"
                },
                "correctAnswer": "A",
                "answerDetail": "Near the Equator, sunlight is strong throughout the year and rising moist air produces frequent rainfall."
            },
            {
                "category": "Sports",
                "difficulty": "Medium",
                "question": "According to FIBA basketball rules, how many seconds does a player have to release a free throw?",
                "image": "images/99.jpg",
                "options": {
                    "A": "3 seconds",
                    "B": "8 seconds",
                    "C": "10 seconds",
                    "D": "5 seconds"
                },
                "correctAnswer": "D",
                "answerDetail": "Under FIBA rules, a player must release a free throw within five seconds after the ball is placed at their disposal."
            },
            {
                "category": "Music",
                "difficulty": "Medium",
                "question": "What is the section of a song that repeats between verses and is often its most memorable part called?",
                "image": "images/100.jpg",
                "options": {
                    "A": "Bridge",
                    "B": "Intro",
                    "C": "Chorus",
                    "D": "Solo"
                },
                "correctAnswer": "C",
                "answerDetail": "The chorus is the recurring section of a song and often carries its main melodic idea."
            }
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
