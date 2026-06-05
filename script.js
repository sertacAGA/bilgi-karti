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

// --- SORU VERİ HAVUZU (25 Soru x 2 Bölüm) ---
const quizData = {
    tr: {
        chapter1: [
            { category: "Doğa & Hayvanlar", difficulty: "Kolay", question: "Salyangozlar genellikle yağmurdan sonra neden dışarı çıkarlar?", image: "images/01.jpg", options: { A: "Nemli hava", B: "Yiyecek bulma", C: "Sosyal toplantı", D: "Kopyama" }, correctAnswer: "A", answerDetail: "Nemli ortam salyangozların deri kurumasını önler." },
            { category: "Genel Kültür", difficulty: "Orta", question: "Kamp ateşini güvenli yakmak için ilk ne yapılmalıdır?", image: "images/02.jpg", options: { A: "Büyük odunlar", B: "Güvenli alan hazırlamak", C: "İçeride yakmak", D: "Rüzgarlı yerde yakmak" }, correctAnswer: "B", answerDetail: "Kamp ateşi başlatmadan önce etrafı temizlemek gerekir." },
            { category: "Kültür Ve Sanat", difficulty: "Orta", question: "Modern moda hangi yüzyılda ortaya çıkmıştır?", image: "images/03.jpg", options: { A: "17.", B: "18.", C: "19.", D: "20." }, correctAnswer: "C", answerDetail: "19. yüzyıl sanayi devriminin sonrasında modern moda gelişti." },
            { category: "Tarih", difficulty: "Zor", question: "Mitolojide aslan genellikle neyi temsil eder?", image: "images/04.jpg", options: { A: "Bilgelik", B: "Sadakat", C: "Hırs", D: "Güç" }, correctAnswer: "D", answerDetail: "Aslan tarih boyunca gücün ve saldırganlığın simgesi olmuştur." },
            { category: "Fantastik", difficulty: "Kolay", question: "Ejderhaların yaşadığına dair kanıt var mıdır?", image: "images/05.jpg", options: { A: "Kalıntı var", B: "Sadece efsane", C: "Hala yaşıyorlar", D: "Fosil bulunmuştur" }, correctAnswer: "B", answerDetail: "Ejderhaların bilimsel kanıtı yoktur; sadece mitoloji ve hikâyelerde yer alır." },
            { category: "Dünya", difficulty: "Orta", question: "Yılan oynatıcıları en çok hangi ülkede bilinir?", image: "images/06.jpg", options: { A: "Hindistan", B: "Brezilya", C: "Türkiye", D: "Mısır" }, correctAnswer: "A", answerDetail: "Yılan oynatıcılar, özellikle Hindistan'da çok bilinir ve caddeler de görülür." },
            { category: "Dünya", difficulty: "Orta", question: "Afro saç modeli köken olarak nereye dayanır?", image: "images/07.jpg", options: { A: "Afrika", B: "İskandinav", C: "Çin", D: "Kuzeydoğu" }, correctAnswer: "A", answerDetail: "Afro saç modeli Afrika kökenli halkların doğal saç dokusu ile bağlantılıdır." },
            { category: "Edebiyat", difficulty: "Zor", question: "Dostoyevski hangi eseriyle tanınır?", image: "images/08.jpg", options: { A: "Sefiller", B: "Suç ve Ceza", C: "M. Cristo", D: "Karenina" }, correctAnswer: "B", answerDetail: "Suç ve Ceza, Dostoyevski'nin en ünlü ve etkili yapıtıdır." },
            { category: "Moda", difficulty: "Zor", question: "Eski dönem zarif giyim tarzına ne ad verilir?", image: "images/09.jpg", options: { A: "Vintage", B: "Futuristik", C: "Sokak", D: "Underground" }, correctAnswer: "A", answerDetail: "Vintage, geçmiş dönemlerin retro ve klasik stil giyimini tanımlar." },
            { category: "Sağlık", difficulty: "Orta", question: "Gençlerde dışlanma korkusu neye yol açar?", image: "images/10.jpg", options: { A: "Sosyal kaygı", B: "Özgüven", C: "Umursamazlık", D: "Başarı" }, correctAnswer: "A", answerDetail: "Akranların dışlanması korkusu gençlerde sosyal anksiyeteye yol açar." },
            { category: "Kültür ve Sanat", difficulty: "Kolay", question: "Hollywood ödül heykelciğinin adı nedir?", image: "images/11.jpg", options: { A: "Grammy", B: "Oscar", C: "Emmy", D: "Golden Globe" }, correctAnswer: "B", answerDetail: "Oscar, film endüstrisinin en prestijli ödülüdür." },
            { category: "Doğa", difficulty: "Orta", question: "Çiftçi için tırpanın temel amacı nedir?", image: "images/12.jpg", options: { A: "Biçmek", B: "Karıştırmak", C: "Yönlendirmek", D: "Temizlemek" }, correctAnswer: "A", answerDetail: "Tırpan, tahıl ve otları biçmek için kullanılan geleneksel tarım aracıdır." },
            { category: "Sağlık", difficulty: "Kolay", question: "Çocuklar neden brokoliyi sevmez?", image: "images/13.jpg", options: { A: "Yeşil renk", B: "Çiğ olması", C: "Acı tadı", D: "Görünüşü" }, correctAnswer: "C", answerDetail: "Brokoli kabaklı bitkiler çocuklara acı gelen bir zevke sahiptir." },
            { category: "Yaşam", difficulty: "Orta", question: "Stres en çok hangi organı etkiler?", image: "images/14.jpg", options: { A: "Kalp", B: "Mide", C: "Akciğer", D: "Karaciğer" }, correctAnswer: "B", answerDetail: "Stres doğrudan mide fonksiyonlarını ve sindirim sistemini etkiler." },
            { category: "Dünya", difficulty: "Kolay", question: "Filistin'deki çocukların zorluk çekme nedeni?", image: "images/15.jpg", options: { A: "Nüfus", B: "Eğitim", C: "İklim", D: "Siyasi durum" }, correctAnswer: "D", answerDetail: "Filistin'deki çocuklar siyasi çatışmaların sonuçları ile karşılaşmaktadır." },
            { category: "Tarih", difficulty: "Orta", question: "Savaşçı kadın kabilelerine ne denir?", image: "images/16.jpg", options: { A: "Amazonlar", B: "Vikingler", C: "Hunlar", D: "Aztekler" }, correctAnswer: "A", answerDetail: "Amazonlar, antik mitolojide ve tarihi kayıtlarda savaşçı kadınlar olarak bilinir." },
            { category: "Kültür ve Sanat", difficulty: "Orta", question: "Yeşilçam'ın 4 yapraklı yoncasından biri?", image: "images/17.jpg", options: { A: "Türkan Şoray", B: "Nejat Saydam", C: "Kerem Çalışkan", D: "Müjdat Gezen" }, correctAnswer: "A", answerDetail: "Türkan Şoray, Yeşilçam'ın en efsanevi oyuncu ve starlarından biridir." },
            { category: "Dünya", difficulty: "Kolay", question: "Anime kültürü hangi ülkede doğmuştur?", image: "images/18.jpg", options: { A: "G. Kore", B: "Çin", C: "Japonya", D: "Taylanda" }, correctAnswer: "C", answerDetail: "Anime kültürü Japonya'da ortaya çıkıp dünyaya yayılmıştır." },
            { category: "Tarih", difficulty: "Zor", question: "Tarihin ilk kadın savaşçı hükümdarlarından?", image: "images/19.jpg", options: { A: "Kleopatra", B: "Tomris Hatun", C: "Jeanne d'Arc", D: "İsabel I" }, correctAnswer: "B", answerDetail: "Tomris Hatun, Saka halkının efsanevi kadın hükümdarı ve savaşçısıdır." },
            { category: "Tarih", difficulty: "Orta", question: "Saray palyaçolarının temel görevi neydi?", image: "images/20.jpg", options: { A: "Taktik", B: "Eğlendirmek", C: "Yasa", D: "Savunma" }, correctAnswer: "B", answerDetail: "Saray palyaçoları halkı eğlendirip hoşça geçirmek için sarayda bulunurdu." },
            { category: "Hayvanlar", difficulty: "Kolay", question: "Foklar neden soğuk suda üşümez?", image: "images/21.jpg", options: { A: "Kuyruk", B: "Şarkı", C: "Pul", D: "Vücut yağı" }, correctAnswer: "D", answerDetail: "Fokların kalın vücut yağı tabakası onları soğuk suda sıcak tutar." },
            { category: "Hayvanlar", difficulty: "Orta", question: "Leylekler yönlerini neyle bulur?", image: "images/22.jpg", options: { A: "Manyetik alan", B: "Akıntı", C: "Takip", D: "Koku" }, correctAnswer: "A", answerDetail: "Leylekler göç ederken Dünya'nın manyetik alanını kullanır." },
            { category: "Hayvanlar", difficulty: "Kolay", question: "Orangutanları ayıran en büyük özellik?", image: "images/23.jpg", options: { A: "Boyun", B: "Uzun kollar", C: "Uçma", D: "Hız" }, correctAnswer: "B", answerDetail: "Orangutanlar, ağaçlarda hareket etmek için çok uzun kolları vardır." },
            { category: "Hayvanlar", difficulty: "Zor", question: "Sphynx kedileri neden bu ismi almıştır?", image: "images/24.jpg", options: { A: "Mısır'da doğuş", B: "Günübirlik", C: "Sphinx benzerliği", D: "Tüysüz olması" }, correctAnswer: "C", answerDetail: "Sphynx kedileri, Mısır'daki Great Sphinx'e benzerliğinden dolayı bu ismi almıştır." },
            { category: "Hayvanlar", difficulty: "Kolay", question: "Sincaplar yiyecekleri nereye saklar?", image: "images/25.jpg", options: { A: "Ağaç kovuğu", B: "Su kuyusu", C: "Güneş altında", D: "Yeraltında" }, correctAnswer: "D", answerDetail: "Sincaplar kışa hazırlanmak için yiyeceklerini toprak altına saklar." }
        ],
        chapter2: [
            { category: "Canlılar", difficulty: "Kolay", question: "Köpeklerin \"sadık hayvanlar\" olarak anılmasının en önemli nedeni nedir?", image: "images/26.jpg", options: { A: "Tek başlarına yaşamayı sevmeleri", B: "Çok yavaş koşmaları", C: "Sadece geceleri aktif olmaları", D: "Sürü içgüdüsüyle hareket etmeleri" }, correctAnswer: "D", answerDetail: "Köpekler binlerce yıldır insanlarla birlikte yaşayan ilk evcil hayvanlardan biridir ve insanı sürü lideri olarak görür." },
            { category: "Fantastik", difficulty: "Orta", question: "Bir süper kahramanın \"gizli kimlik\" kullanmasının temel nedeni nedir?", image: "images/27.jpg", options: { A: "Kostüm maliyetini azaltmak için", B: "Daha havalı görünmek için", C: "Süper gücünü saklamak zorunda olduğu için", D: "Sevdiklerini tehlikeden korumak için" }, correctAnswer: "D", answerDetail: "Birçok süper kahraman, ailesinin ve arkadaşlarının zarar görmemesi için kimliğini gizler." },
            { category: "Sağlık", difficulty: "Orta", question: "Gençlerde uzun süreli mutsuzluğun en yaygın nedeni hangisidir?", image: "images/28.jpg", options: { A: "Özgüven problemleri ve sosyal baskı", B: "Fiziksel aktivitenin azalması", C: "Az su içmek", D: "Ders çalışmayı sevmemek" }, correctAnswer: "A", answerDetail: "Ergenlik döneminde sosyal çevre ve akran baskısı duygusal durumu güçlü şekilde etkiler." },
            { category: "Canlılar", difficulty: "Kolay", question: "Evcil kuşların en çok dikkat edilmesi gereken ihtiyacı nedir?", image: "images/29.jpg", options: { A: "Günlük su banyosu", B: "Sürekli karanlık bir odada durmak", C: "Temiz hava ve güvenli ortam", D: "Yüksek sesli müzik" }, correctAnswer: "C", answerDetail: "Kuşlar narin hayvanlardır; stres ve ses kirliliği sağlıklarını hızlı etkiler." },
            { category: "Yaşam", difficulty: "Orta", question: "\"Ansiklopedinin\" temel amacı nedir?", image: "images/30.jpg", options: { A: "Genel bilgileri sistemli şekilde sunmak", B: "Sadece eğlenceli hikâyeler anlatmak", C: "Çizgi roman karakterleri tanıtmak", D: "Matematik problemleri çözmek" }, correctAnswer: "A", answerDetail: "Ansiklopediler, birçok konuda kısa ve güvenilir bilgiler sunan referans kaynaklarıdır." },
            { category: "Sağlık", difficulty: "Zor", question: "Vücudun ısı kaybetme hızının artması ve çekirdek sıcaklığının düşmesiyle karakterize edilen tıbbi durumun adı nedir?", image: "images/31.jpg", options: { A: "Hipertermi", B: "Dehidrasyon", C: "Hipotermi", D: "Soğuk Şoku" }, correctAnswer: "C", answerDetail: "Hipotermi, vücut sıcaklığı 35°C'nin altına düştüğünde ortaya çıkar." },
            { category: "Bilim", difficulty: "Orta", question: "Ders çalışırken \"not almak\" ne işe yarar?", image: "images/32.jpg", options: { A: "Sadece defteri süslemek için", B: "Dersi kısaltmak için", C: "Öğretmeni memnun etmek için", D: "Bilgiyi daha iyi hatırlamaya yardımcı olur" }, correctAnswer: "D", answerDetail: "Not almak, beynin bilgiyi işlemesini kolaylaştırır ve belleğe yardımcı olur." },
            { category: "Kültür & Sanat", difficulty: "Zor", question: "Afrika'da hikâyeleri sözlü olarak aktaran geleneksel anlatıcılara ne ad verilir?", image: "images/33.jpg", options: { A: "Griot", B: "Şaman", C: "Bard", D: "Sufi" }, correctAnswer: "A", answerDetail: "Griotlar tarih, şiir ve müziği kuşaktan kuşağa aktaran kültür taşıyıcılarıdır." }
        ]
    },
    en: {
        chapter1: [
            { category: "Animals", difficulty: "Easy", question: "Why do snails come out after rain?", image: "images/01.jpg", options: { A: "Moist air", B: "Finding food", C: "Social meeting", D: "Copying" }, correctAnswer: "A", answerDetail: "Moist environment prevents the snail's skin from drying out." },
            { category: "Culture", difficulty: "Medium", question: "What should be done first to light a campfire safely?", image: "images/02.jpg", options: { A: "Large woods", B: "Prepare safe area", C: "Inside", D: "Windy place" }, correctAnswer: "B", answerDetail: "Before starting a campfire, the area must be cleared." },
            { category: "Culture", difficulty: "Medium", question: "In which century did modern fashion emerge?", image: "images/03.jpg", options: { A: "17.", B: "18.", C: "19.", D: "20." }, correctAnswer: "C", answerDetail: "Modern fashion developed after the 19th century industrial revolution." },
            { category: "History", difficulty: "Hard", question: "What does the lion usually represent in mythology?", image: "images/04.jpg", options: { A: "Wisdom", B: "Loyalty", C: "Ambition", D: "Power" }, correctAnswer: "D", answerDetail: "Throughout history, lions have been symbols of power and aggression." },
            { category: "Fantastic", difficulty: "Easy", question: "Is there evidence that dragons live?", image: "images/05.jpg", options: { A: "There are remains", B: "Just legends", C: "Still living", D: "Fossil found" }, correctAnswer: "B", answerDetail: "Dragons have no scientific evidence; they only appear in myths and stories." },
            { category: "World", difficulty: "Medium", question: "In which country are snake charmers best known?", image: "images/06.jpg", options: { A: "India", B: "Brazil", C: "Turkey", D: "Egypt" }, correctAnswer: "A", answerDetail: "Snake charmers are particularly well known in India and can be seen on streets." },
            { category: "World", difficulty: "Medium", question: "Where is the Afro hairstyle based on the origin?", image: "images/07.jpg", options: { A: "Africa", B: "Scandinavian", C: "China", D: "Northeast" }, correctAnswer: "A", answerDetail: "The Afro hairstyle is connected to the natural hair texture of African peoples." },
            { category: "Literature", difficulty: "Hard", question: "Which work is Dostoevsky known for?", image: "images/08.jpg", options: { A: "Miserables", B: "Crime and Punishment", C: "M. Cristo", D: "Karenina" }, correctAnswer: "B", answerDetail: "Crime and Punishment is Dostoevsky's most famous and influential work." },
            { category: "Fashion", difficulty: "Hard", question: "What is the name given to the old period elegant clothing style?", image: "images/09.jpg", options: { A: "Vintage", B: "Futuristic", C: "Street", D: "Underground" }, correctAnswer: "A", answerDetail: "Vintage describes retro and classic style clothing from past periods." },
            { category: "Health", difficulty: "Medium", question: "What leads to the fear of exclusion in young people?", image: "images/10.jpg", options: { A: "Social anxiety", B: "Self-confidence", C: "Indifference", D: "Success" }, correctAnswer: "A", answerDetail: "Fear of peer exclusion leads to social anxiety in young people." },
            { category: "Culture", difficulty: "Easy", question: "What is the name of the Hollywood award statuette?", image: "images/11.jpg", options: { A: "Grammy", B: "Oscar", C: "Emmy", D: "Golden Globe" }, correctAnswer: "B", answerDetail: "The Oscar is the most prestigious award in the film industry." },
            { category: "World", difficulty: "Medium", question: "What is the main purpose of the scythe for the farmer?", image: "images/12.jpg", options: { A: "To mow", B: "To mix", C: "To direct", D: "To clean" }, correctAnswer: "A", answerDetail: "The scythe is a traditional farming tool used to mow grain and grass." },
            { category: "Health", difficulty: "Easy", question: "Why don't children like broccoli?", image: "images/13.jpg", options: { A: "Green color", B: "Being raw", C: "Bitter taste", D: "Appearance" }, correctAnswer: "C", answerDetail: "Cruciferous vegetables like broccoli have a bitter taste to children." },
            { category: "World", difficulty: "Medium", question: "Which organ does stress affect the most?", image: "images/14.jpg", options: { A: "Heart", B: "Stomach", C: "Lung", D: "Liver" }, correctAnswer: "B", answerDetail: "Stress directly affects stomach functions and the digestive system." },
            { category: "World", difficulty: "Easy", question: "The reason for the difficulties of children in Palestine?", image: "images/15.jpg", options: { A: "Population", B: "Education", C: "Climate", D: "Political situation" }, correctAnswer: "D", answerDetail: "Children in Palestine face the consequences of political conflicts." },
            { category: "History", difficulty: "Medium", question: "What are warrior women tribes called?", image: "images/16.jpg", options: { A: "Amazons", B: "Vikings", C: "Huns", D: "Aztecs" }, correctAnswer: "A", answerDetail: "Amazons are known in ancient mythology and historical records as warrior women." },
            { category: "Culture", difficulty: "Medium", question: "One of Yeşilçam's 4-leaf clover?", image: "images/17.jpg", options: { A: "Türkan Şoray", B: "Nejat Saydam", C: "Kerem Çalışkan", D: "Müjdat Gezen" }, correctAnswer: "A", answerDetail: "Türkan Şoray is one of the most legendary actresses and stars of Yeşilçam." },
            { category: "World", difficulty: "Easy", question: "In which country was anime culture born?", image: "images/18.jpg", options: { A: "S. Korea", B: "China", C: "Japan", D: "Thailand" }, correctAnswer: "C", answerDetail: "Anime culture originated in Japan and spread worldwide." },
            { category: "History", difficulty: "Hard", question: "One of the first female warrior rulers in history?", image: "images/19.jpg", options: { A: "Cleopatra", B: "Tomris Hatun", C: "Jeanne d'Arc", D: "Isabel I" }, correctAnswer: "B", answerDetail: "Tomris Hatun is the legendary female ruler and warrior of the Saka people." },
            { category: "History", difficulty: "Medium", question: "What was the main task of the palace clowns?", image: "images/20.jpg", options: { A: "Tactics", B: "To Entertain", C: "Law", D: "Defense" }, correctAnswer: "B", answerDetail: "Palace clowns were present in the palace to entertain and amuse people." },
            { category: "Animals", difficulty: "Easy", question: "Why don't seals get cold in cold water?", image: "images/21.jpg", options: { A: "Tail", B: "Song", C: "Seal", D: "Body fat" }, correctAnswer: "D", answerDetail: "Seals' thick layer of body fat keeps them warm in cold water." },
            { category: "Animals", difficulty: "Medium", question: "How do storks find their way?", image: "images/22.jpg", options: { A: "Magnetic field", B: "Flow", C: "Following", D: "Smell" }, correctAnswer: "A", answerDetail: "Storks use Earth's magnetic field when migrating." },
            { category: "Animals", difficulty: "Easy", question: "The biggest feature that distinguishes orangutans?", image: "images/23.jpg", options: { A: "Neck", B: "Long arms", C: "Flying", D: "Speed" }, correctAnswer: "B", answerDetail: "Orangutans have very long arms to move in trees." },
            { category: "Animals", difficulty: "Hard", question: "Why did Sphynx cats get this name?", image: "images/24.jpg", options: { A: "Birth in Egypt", B: "Daytime", C: "Sphinx similarity", D: "Hairless" }, correctAnswer: "C", answerDetail: "Sphynx cats got their name from their resemblance to the Great Sphinx in Egypt." },
            { category: "Animals", difficulty: "Easy", question: "Where do squirrels hide food?", image: "images/25.jpg", options: { A: "Tree hollow", B: "Water well", C: "Under sun", D: "Underground" }, correctAnswer: "D", answerDetail: "Squirrels bury food underground to prepare for winter." }
        ],
        chapter2: [
            { category: "Animals", difficulty: "Easy", question: "What is the most important reason why dogs are called \"loyal animals\"?", image: "images/26.jpg", options: { A: "They love to live alone", B: "They run very slowly", C: "They are only active at night", D: "They act with herd instinct" }, correctAnswer: "D", answerDetail: "Dogs are among the first domesticated animals that have lived with humans for thousands of years and see humans as their pack leader." },
            { category: "Fantastic", difficulty: "Medium", question: "What is the basic reason for a superhero using a \"secret identity\"?", image: "images/27.jpg", options: { A: "To reduce costume cost", B: "To look cooler", C: "To hide their superpowers", D: "To protect loved ones from danger" }, correctAnswer: "D", answerDetail: "Many superheroes hide their identity to prevent their family and friends from being harmed." },
            { category: "Health", difficulty: "Medium", question: "What is the most common cause of prolonged unhappiness in young people?", image: "images/28.jpg", options: { A: "Self-confidence problems and social pressure", B: "Reduced physical activity", C: "Drinking little water", D: "Not liking to study" }, correctAnswer: "A", answerDetail: "During adolescence, the social environment and peer pressure strongly affect emotional state." },
            { category: "Animals", difficulty: "Easy", question: "What is the most important need to pay attention to for pet birds?", image: "images/29.jpg", options: { A: "Daily water bath", B: "Constant dark room stay", C: "Clean air and safe environment", D: "Loud music" }, correctAnswer: "C", answerDetail: "Birds are delicate animals; stress and noise pollution quickly affect their health." },
            { category: "Life", difficulty: "Medium", question: "What is the main purpose of an \"encyclopedia\"?", image: "images/30.jpg", options: { A: "Present general information in a systematic way", B: "Tell only entertaining stories", C: "Introduce comic book characters", D: "Solve math problems" }, correctAnswer: "A", answerDetail: "Encyclopedias are reference sources that provide short and reliable information on many topics." },
            { category: "Health", difficulty: "Hard", question: "What is the medical condition characterized by increased heat loss and drop in core body temperature?", image: "images/31.jpg", options: { A: "Hyperthermia", B: "Dehydration", C: "Hypothermia", D: "Cold Shock" }, correctAnswer: "C", answerDetail: "Hypothermia occurs when body temperature drops below 35°C." },
            { category: "Science", difficulty: "Medium", question: "What is the purpose of \"taking notes\" while studying?", image: "images/32.jpg", options: { A: "Only to decorate the notebook", B: "To shorten the lesson", C: "To please the teacher", D: "Helps better remember information" }, correctAnswer: "D", answerDetail: "Taking notes helps the brain process information and aids memory." },
            { category: "Culture & Art", difficulty: "Hard", question: "What is the name given to traditional storytellers in Africa who pass down stories orally?", image: "images/33.jpg", options: { A: "Griot", B: "Shaman", C: "Bard", D: "Sufi" }, correctAnswer: "A", answerDetail: "Griots are cultural carriers who pass down history, poetry, and music from generation to generation." }
        ]
    }
};

// --- TEMEL FONKSİYONLAR ---

function setLanguage(lang) {
    currentLang = lang;
    
    // Butonların aktiflik durumunu CSS sınıflarına göre güncelle
    const buttons = document.querySelectorAll('.lang-btn');
    if(buttons.length >= 2) {
        buttons[0].classList.toggle('active', lang === 'tr');
        buttons[1].classList.toggle('active', lang === 'en');
    }
    
    // Bölüm isimlerini güncelle
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
        currentQuestions = progress.currentQuestions;
        hasAnsweredCurrentCard = Boolean(progress.hasAnsweredCurrentCard);
        selectedAnswer = progress.selectedAnswer || null;
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

    // Arayüzü ayarla
    document.getElementById('initial-screen').style.display = 'none';
    document.getElementById('game-area').style.display = 'block';
    updateUITexts();
    setLanguage(currentLang);
    
    // Kartı düzelt ve doğru kartı yükle
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

    // Kategori ve Zorluk Metinlerini Güncelle
    document.getElementById('category-text').textContent = cardData.category || "";
    document.getElementById('difficulty-text').textContent = cardData.difficulty || "";

    // Metinleri ve Resmi Güncelle
    document.getElementById('question-text').textContent = cardData.question;
    document.getElementById('character-image').src = cardData.image;
    document.getElementById('correct-answer-text').textContent = `${cardData.correctAnswer}) ${cardData.options[cardData.correctAnswer]} - ${cardData.answerDetail}`;
    
    // Seçenek Butonlarını Sıfırla ve Doldur
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

    // Sayacı ve Skoru Güncelle
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

    // Butonları Renklendir ve Kilitle
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
        const opt = btn.getAttribute('data-option');
        if(opt === cardData.correctAnswer) btn.classList.add('correct-btn');
        else if(opt === selected) btn.classList.add('wrong-btn');
    });

    saveProgress();
    
    // 0.6 saniye bekleyip kartı arkaya çevir
    setTimeout(() => {
        document.getElementById('quiz-card').classList.add('flipped');
    }, 600);
}

function nextCard() {
    // 1. Kartı ön yüzüne döndürmeye başla
    const quizCard = document.getElementById('quiz-card');
    quizCard.classList.remove('flipped');
    
    // 2. Çoklu tıklamayı önlemek için butonu kilitle
    document.querySelector('.next-card-btn').disabled = true;

    // 3. Kart havada tam 90 dereceyken (350ms) yazıları değiştir
    setTimeout(() => {
        currentCardIndex++;
        hasAnsweredCurrentCard = false;
        selectedAnswer = null;
        saveProgress();
        loadCardData(currentCardIndex);
        
        // İşlem bitince butonu tekrar aç
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

// Sayfa yüklendiğinde dili ayarla
window.onload = () => {
    setLanguage('tr');
    updateUITexts();
    renderLeaderboard();
    updateResumeButton();
    setScoreSaveAvailability(false);
};

// --- İLERLEME KAYDETME ---
const STORAGE_KEY = 'bilgi-karti-save-v3';
const BOARD_KEY = 'bilgi-karti-leaderboard-v1';

let canSaveScore = false;

function saveProgress() {
    const progress = { currentLang, currentCardIndex, score, currentChapter, currentQuestions, hasAnsweredCurrentCard, selectedAnswer };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    updateResumeButton();
}

function getProgress() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    try {
        const progress = JSON.parse(raw);
        const hasValidQuestions = Array.isArray(progress.currentQuestions) && progress.currentQuestions.length > 0;
        const hasValidIndex = Number.isInteger(progress.currentCardIndex)
            && progress.currentCardIndex >= 0
            && hasValidQuestions
            && progress.currentCardIndex < progress.currentQuestions.length;

        if (!hasValidQuestions || !hasValidIndex) {
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
