// --- DİL VE SABİT METİN AYARLARI ---
let currentLang = 'tr'; 
let currentCardIndex = 0;
let score = 0;
let currentQuestions = [];

const uiTranslations = {
    tr: {
        startButton: "Oyuna Başla",
        nextButton: "Sonraki Kart",
        scoreLabel: "Puan",
        cardLabel: "Kart",
        correctLabel: "DOĞRU CEVAP:",
        gameOver: "Oyun bitti! Skorunuz: {score} / {total}"
    },
    en: {
        startButton: "Start Game",
        nextButton: "Next Card",
        scoreLabel: "Score",
        cardLabel: "Card",
        correctLabel: "CORRECT ANSWER:",
        gameOver: "Game Over! Your Score: {score} / {total}"
    }
};

// --- SORU VERİ HAVUZU (30 Soru) ---
const quizData = {
    tr: [
        { category: "Doğa & Hayvanlar", difficulty: "Kolay", question: "Salyangozlar genellikle yağmurdan sonra neden dışarı çıkarlar?", image: "images/01.jpg", options: { A: "Nemli hava", B: "Parlaklık", C: "Enerji", D: "Güneş" }, correctAnswer: "A", answerDetail: "Nemli havalar kurumadan hareket etmeleri için idealdir." },
        { category: "Genel Kültür", difficulty: "Orta", question: "Kamp ateşini güvenli yakmak için ilk ne yapılmalıdır?", image: "images/02.jpg", options: { A: "Büyük odunlar", B: "Kuru çember", C: "Ot üstü", D: "Yakıt" }, correctAnswer: "B", answerDetail: "Kontrol için önce kuru dallardan bir temel oluşturulmalıdır." },
        { category: "Kültür Ve Sanat", difficulty: "Orta", question: "Modern moda hangi yüzyılda ortaya çıkmıştır?", image: "images/03.jpg", options: { A: "17.", B: "18.", C: "19.", D: "20." }, correctAnswer: "C", answerDetail: "19. yüzyıl, seri üretimin başlamasıyla modanın doğuşudur." },
        { category: "Tarih", difficulty: "Zor", question: "Mitolojide aslan genellikle neyi temsil eder?", image: "images/04.jpg", options: { A: "Bilgelik", B: "Sadakat", C: "Hırs", D: "Güç" }, correctAnswer: "D", answerDetail: "Aslan, tarih boyunca gücün ve cesaretin simgesi olmuştur." },
        { category: "Fantastik", difficulty: "Kolay", question: "Ejderhaların yaşadığına dair kanıt var mıdır?", image: "images/05.jpg", options: { A: "Kalıntı var", B: "Sadece efsane", C: "Kanıtlanmıştır", D: "Hala yaşıyorlar" }, correctAnswer: "B", answerDetail: "Ejderhalar efsanevi yaratıklardır; biyolojik kanıtları yoktur." },
        { category: "Dünya", difficulty: "Orta", question: "Yılan oynatıcıları en çok hangi ülkede bilinir?", image: "images/06.jpg", options: { A: "Hindistan", B: "Brezilya", C: "Türkiye", D: "Japonya" }, correctAnswer: "A", answerDetail: "Hindistan, kobra yılanı oynatıcılarıyla ünlüdür." },
        { category: "Dünya", difficulty: "Orta", question: "Afro saç modeli köken olarak nereye dayanır?", image: "images/07.jpg", options: { A: "Afrika", B: "İskandinav", C: "Çin", D: "G. Amerika" }, correctAnswer: "A", answerDetail: "Afrika kökenli toplumların doğal saç yapısından doğmuştur." },
        { category: "Edebiyat", difficulty: "Zor", question: "Dostoyevski hangi eseriyle tanınır?", image: "images/08.jpg", options: { A: "Sefiller", B: "Suç ve Ceza", C: "M. Cristo", D: "K. Prens" }, correctAnswer: "B", answerDetail: "Suç ve Ceza, yazarın en derin psikolojik eseridir." },
        { category: "Moda", difficulty: "Zor", question: "Eski dönem zarif giyim tarzına ne ad verilir?", image: "images/09.jpg", options: { A: "Vintage", B: "Futuristik", C: "Sokak", D: "Urban" }, correctAnswer: "A", answerDetail: "Vintage, geçmiş dönemlerin özgün dokusunu temsil eder." },
        { category: "Sağlık", difficulty: "Orta", question: "Gençlerde dışlanma korkusu neye yol açar?", image: "images/10.jpg", options: { A: "Sosyal kaygı", B: "Özgüven", C: "Umursamazlık", D: "Saldırganlık" }, correctAnswer: "A", answerDetail: "Kabul görmeme endişesi sosyal kaygıyı tetikleyebilir." },
        { category: "Kültür ve Sanat", difficulty: "Kolay", question: "Hollywood ödül heykelciğinin adı nedir?", image: "images/11.jpg", options: { A: "Grammy", B: "Oscar", C: "Emmy", D: "Globe" }, correctAnswer: "B", answerDetail: "Oscar, sinema dünyasının en prestijli ödülüdür." },
        { category: "Doğa", difficulty: "Orta", question: "Çiftçi için tırpanın temel amacı nedir?", image: "images/12.jpg", options: { A: "Biçmek", B: "Karıştırmak", C: "Yönlendirmek", D: "Yaymak" }, correctAnswer: "A", answerDetail: "Tırpan, tahılların hasadında geleneksel olarak kullanılır." },
        { category: "Sağlık", difficulty: "Kolay", question: "Çocuklar neden brokoliyi sevmez?", image: "images/13.jpg", options: { A: "Yeşil renk", B: "Çiğ olması", C: "Acı tadı", D: "Sertliği" }, correctAnswer: "C", answerDetail: "Brokolideki bileşikler çocuklara acı gelebilir." },
        { category: "Yaşam", difficulty: "Orta", question: "Stres en çok hangi organı etkiler?", image: "images/14.jpg", options: { A: "Kalp", B: "Mide", C: "Akciğer", D: "Karaciğer" }, correctAnswer: "B", answerDetail: "Stres mide asidini artırarak mideye zarar verir." },
        { category: "Dünya", difficulty: "Kolay", question: "Filistin'deki çocukların zorluk çekme nedeni?", image: "images/15.jpg", options: { A: "Nüfus", B: "Eğitim", C: "İklim", D: "Soykırım" }, correctAnswer: "D", answerDetail: "İsrail'in saldırıları binlerce çocuğun hayatını etkilemektedir." },
        { category: "Tarih", difficulty: "Orta", question: "Savaşçı kadın kabilelerine ne denir?", image: "images/16.jpg", options: { A: "Amazonlar", B: "Vikingler", C: "Hunlar", D: "Aztekler" }, correctAnswer: "A", answerDetail: "Amazonlar mitolojik, savaşçı kadın topluluklarıdır." },
        { category: "Kültür ve Sanat", difficulty: "Orta", question: "Yeşilçam'ın 4 yapraklı yoncasından biri?", image: "images/17.jpg", options: { A: "Türkan Şoray", B: "N. Yeşilçay", C: "Beren Saat", D: "H. Erçel" }, correctAnswer: "A", answerDetail: "Şoray, Koçyiğit, Akın ve Girik bu gruptadır." },
        { category: "Dünya", difficulty: "Kolay", question: "Anime kültürü hangi ülkede doğmuştur?", image: "images/18.jpg", options: { A: "G. Kore", B: "Çin", C: "Japonya", D: "Tayland" }, correctAnswer: "C", answerDetail: "Anime, Japonya'da doğup dünyaya yayılmış bir sanattır." },
        { category: "Tarih", difficulty: "Zor", question: "Tarihin ilk kadın savaşçı hükümdarlarından?", image: "images/19.jpg", options: { A: "Kleopatra", B: "Tomris Hatun", C: "Jeanne d'Arc", D: "Hatice Sultan" }, correctAnswer: "B", answerDetail: "Tomris Hatun, Persleri yenen efsanevi liderdir." },
        { category: "Tarih", difficulty: "Orta", question: "Saray palyaçolarının temel görevi neydi?", image: "images/20.jpg", options: { A: "Taktik", B: "Eğlendirmek", C: "Yasa", D: "Savaş" }, correctAnswer: "B", answerDetail: "Soyluları eğlendirmek ve bazen gerçekleri mizahla söylemekti." },
        { category: "Hayvanlar", difficulty: "Kolay", question: "Foklar neden soğuk suda üşümez?", image: "images/21.jpg", options: { A: "Kuyruk", B: "Şarkı", C: "Pul", D: "Vücut yağı" }, correctAnswer: "D", answerDetail: "Kalın yağ tabakaları onları soğuktan korur." },
        { category: "Hayvanlar", difficulty: "Orta", question: "Leylekler yönlerini neyle bulur?", image: "images/22.jpg", options: { A: "Manyetik alan", B: "Akıntı", C: "Takip", D: "Koku" }, correctAnswer: "A", answerDetail: "Dünyanın manyetik alanını pusula gibi kullanırlar." },
        { category: "Hayvanlar", difficulty: "Kolay", question: "Orangutanları ayıran en büyük özellik?", image: "images/23.jpg", options: { A: "Boyun", B: "Uzun kollar", C: "Uçma", D: "Soğuk iklim" }, correctAnswer: "B", answerDetail: "Kolları ağaçlarda süzülmek için çok uzundur." },
        { category: "Hayvanlar", difficulty: "Zor", question: "Sphynx kedileri neden bu ismi almıştır?", image: "images/24.jpg", options: { A: "Mısır'da doğuş", B: "Günübirlik", C: "Sfenks benzerliği", D: "Tüysüzlük" }, correctAnswer: "C", answerDetail: "Yüz hatları Sfenks heykeline benzetilmiştir." },
        { category: "Hayvanlar", difficulty: "Kolay", question: "Sincaplar yiyecekleri nereye saklar?", image: "images/25.jpg", options: { A: "Ağaç kovuğu", B: "Su kuyusu", C: "Güneş altı", D: "Taş üstü" }, correctAnswer: "A", answerDetail: "Yiyecekleri ağaç kovuklarına ve toprağa gömerler." },
        { category: "Hayvanlar", difficulty: "Kolay", question: "Köpeklerin sadık olma nedeni nedir?", image: "images/26.jpg", options: { A: "Yalnızlık", B: "Yavaşlık", C: "Gececilik", D: "Sürü içgüdüsü" }, correctAnswer: "D", answerDetail: "Sürü içgüdüsüyle insanı lider olarak görürler." },
        { category: "Fantastik", difficulty: "Orta", question: "Bir süper kahramanın 'gizli kimlik' kullanmasının sebebi nedir?", image: "images/27.jpg", options: { A: "Maliyeti Azaltmak", B: "Havalı Görünmek", C: "Süper Gücünü Saklamak", D: "Sevdiklerini Korumak" }, correctAnswer: "D", answerDetail: "Pek çok kahraman sevdiklerini korumak için kimliğini gizler." },
        { category: "Sağlık", difficulty: "Orta", question: "Gençlerde mutsuzluğun nedeni ne olabilir?", image: "images/28.jpg", options: { A: "Özgüven Problemleri Sosyal Baskı", B: "Fiziksel Aktivite Azlığı", C: "Az Su İçmek", D: "Ders Çalışmayı Sevmemek" }, correctAnswer: "A", answerDetail: "Sosyal çevre ve akran baskısı duygusal durumu etkiler." },
        { category: "Canlılar", difficulty: "Başlangıç", question: "Evcil kuşların en rahatsız olduğu şey nedir?", image: "images/29.jpg", options: { A: "Günlük Su Banyosu", B: "Karanlık Yerde Durmaları", C: "Temiz Hava ve Güvenli Ortam", D: "Yüksek Sesli Müzik" }, correctAnswer: "D", answerDetail: "Kuşlar narin hayvanlardır, ses kirliliği ve stres onları etkiler." },
        { category: "Yaşam", difficulty: "Orta", question: "'Ansiklopedi'nin temel amacı nedir?", image: "images/30.jpg", options: { A: "Genel Bilgileri Sunmak", B: "Eğlenceli Hikayeler Anlatmak", C: "Çizgi Comic Karakterleri", D: "Matematik Problemi Çözmek" }, correctAnswer: "A", answerDetail: "Ansiklopediler pek çok konuda kısa ve güvenilir bilgiler sunar." }
    ],
    en: [
        { category: "Animals", difficulty: "Easy", question: "Why do snails come out after rain?", image: "images/01.jpg", options: { A: "Moist air", B: "Shininess", C: "Energy", D: "Sun" }, correctAnswer: "A", answerDetail: "Moist weather is ideal for their movement." },
        { category: "Culture", difficulty: "Medium", question: "What should be done first to light a campfire safely?", image: "images/02.jpg", options: { A: "Large woods", B: "Dry circle", C: "On weed", D: "Fuel" }, correctAnswer: "B", answerDetail: "For control, a foundation must first be formed from dry branches." },
        { category: "Culture", difficulty: "Medium", question: "In which century did modern fashion emerge?", image: "images/03.jpg", options: { A: "17.", B: "18.", C: "19.", D: "20." }, correctAnswer: "C", answerDetail: "The 19th century is the birth of fashion with the beginning of mass production." },
        { category: "History", difficulty: "Hard", question: "What does the lion usually represent in mythology?", image: "images/04.jpg", options: { A: "Wisdom", B: "Loyalty", C: "Ambition", D: "Power" }, correctAnswer: "D", answerDetail: "The lion has been a symbol of strength and courage throughout history." },
        { category: "Fantastic", difficulty: "Easy", question: "Is there evidence that dragons live?", image: "images/05.jpg", options: { A: "There are remains", B: "Just legends", C: "Proven", D: "They are still alive" }, correctAnswer: "B", answerDetail: "Dragons are legendary creatures; they have no biological evidence." },
        { category: "World", difficulty: "Medium", question: "In which country are snake players best known?", image: "images/06.jpg", options: { A: "India", B: "Brazil", C: "Turkey", D: "Japan" }, correctAnswer: "A", answerDetail: "India is famous for its cobra snake players." },
        { category: "World", difficulty: "Medium", question: "Where is the Afro hairstyle based on the origin?", image: "images/07.jpg", options: { A: "Africa", B: "Scandinavian", C: "China", D: "S. America" }, correctAnswer: "A", answerDetail: "It was born from the natural hair structure of societies of African origin." },
        { category: "Literature", difficulty: "Hard", question: "Which work is Dostoevsky known for?", image: "images/08.jpg", options: { A: "Miserable", B: "Crime and Punishment", C: "M. Cristo", D: "L. Prince" }, correctAnswer: "B", answerDetail: "Crime and Punishment is the author's most profound psychological work." },
        { category: "Fashion", difficulty: "Hard", question: "What is the name given to the old period elegant clothing style?", image: "images/09.jpg", options: { A: "Vintage", B: "Futuristic", C: "Street", D: "Urban" }, correctAnswer: "A", answerDetail: "Vintage represents the original texture of past eras." },
        { category: "Health", difficulty: "Medium", question: "What leads to the fear of exclusion in young people?", image: "images/10.jpg", options: { A: "Social anxiety", B: "Self-confidence", C: "Recklessness", D: "Aggression" }, correctAnswer: "A", answerDetail: "The anxiety of not being accepted can trigger social anxiety." },
        { category: "Culture", difficulty: "Easy", question: "What is the name of the Hollywood award statuette?", image: "images/11.jpg", options: { A: "Grammy", B: "Oscar", C: "Emmy", D: "Globe" }, correctAnswer: "B", answerDetail: "Oscar is the most prestigious award in the world of cinema." },
        { category: "World", difficulty: "Medium", question: "What is the main purpose of the scythe for the farmer?", image: "images/12.jpg", options: { A: "To mow", B: "To mix", C: "To direct", D: "To spread" }, correctAnswer: "A", answerDetail: "Scythe is traditionally used in the harvest of grains." },
        { category: "Health", difficulty: "Easy", question: "Why don't children like broccoli?", image: "images/13.jpg", options: { A: "Green color", B: "To be raw", C: "Bitter taste", D: "Hardness" }, correctAnswer: "C", answerDetail: "The compounds in broccoli can be bitter to children." },
        { category: "World", difficulty: "Medium", question: "Which organ does stress affect the most?", image: "images/14.jpg", options: { A: "Heart", B: "Stomach", C: "Lung", D: "Liver" }, correctAnswer: "B", answerDetail: "Stress can damage the stomach by increasing stomach acid." },
        { category: "World", difficulty: "Easy", question: "The reason for the difficulties of children in Palestine?", image: "images/15.jpg", options: { A: "Population", B: "Education", C: "Climate", D: "Genocide" }, correctAnswer: "D", answerDetail: "Israel's attacks affect the lives of thousands of children." },
        { category: "History", difficulty: "Medium", question: "What are warrior women tribes called?", image: "images/16.jpg", options: { A: "Amazons", B: "Vikings", C: "Huns", D: "Aztecs" }, correctAnswer: "A", answerDetail: "The Amazons are mythological, warrior women's communities." },
        { category: "Culture", difficulty: "Medium", question: "One of Yeşilçam's 4-leaf clover?", image: "images/17.jpg", options: { A: "Türkan Şoray", B: "N. Yeşilçay", C: "Beren Saat", D: "H. Erçel" }, correctAnswer: "A", answerDetail: "Şoray, Koçyiğit, Akın and Girik are in this group." },
        { category: "World", difficulty: "Easy", question: "In which country was anime culture born?", image: "images/18.jpg", options: { A: "S. Korea", B: "China", C: "Japan", D: "Thailand" }, correctAnswer: "C", answerDetail: "Anime is an art that was born in Japan and spread around the world." },
        { category: "History", difficulty: "Hard", question: "One of the first female warrior rulers in history?", image: "images/19.jpg", options: { A: "Kleopatra", B: "Tomris Hatun", C: "Jeanne d'Arc", D: "Hatice Sultan" }, correctAnswer: "B", answerDetail: "Tomris Hatun is the legendary leader who defeated the Persians." },
        { category: "History", difficulty: "Medium", question: "What was the main task of the palace clowns?", image: "images/20.jpg", options: { A: "Tactics", B: "To Entertain", C: "The Law", D: "War" }, correctAnswer: "B", answerDetail: "It was to entertain the nobles and sometimes tell the truth with humor." },
        { category: "Animals", difficulty: "Easy", question: "Why don't seals get cold in cold water?", image: "images/21.jpg", options: { A: "Tail", B: "Song", C: "Semp", D: "Body fat" }, correctAnswer: "D", answerDetail: "Thick layers of fat protect them from the cold." },
        { category: "Animals", difficulty: "Medium", question: "How do storks find their way?", image: "images/22.jpg", options: { A: "Magnetic field", B: "Flow", C: "Following", D: "Smell" }, correctAnswer: "A", answerDetail: "They use the Earth's magnetic field as a compass." },
        { category: "Animals", difficulty: "Easy", question: "The biggest feature that distinguishes orangutans?", image: "images/23.jpg", options: { A: "Neck", B: "Long arms", C: "Flying", D: "Cold climate" }, correctAnswer: "B", answerDetail: "Its arms are too long to slide in the trees." },
        { category: "Animals", difficulty: "Hard", question: "Why did Sphynx cats get this name?", image: "images/24.jpg", options: { A: "Birth in Egypt", B: "Sun", C: "Sphinx similarity", D: "Featherlessness" }, correctAnswer: "C", answerDetail: "The facial features are likened to the Sphinx statue." },
        { category: "Animals", difficulty: "Easy", question: "Where do squirrels hide food?", image: "images/25.jpg", options: { A: "Tree holl", B: "Water well", C: "Under the sun", D: "On stone" }, correctAnswer: "A", answerDetail: "They bury their food in tree hollows and in the ground." },
        { category: "Animals", difficulty: "Easy", question: "What is the reason why dogs are loyal?", image: "images/26.jpg", options: { A: "Loneliness", B: "Slowness", C: "Nightsman", D: "Flock instinct" }, correctAnswer: "D", answerDetail: "They see people as leaders with their herd instinct." },
        { category: "Fantastic", difficulty: "Medium", question: "What is the reason why a superhero uses a 'secret identity'?", image: "images/27.jpg", options: { A: "Reduce Cost", B: "To Being Fancy", C: "Hiding Your Super Power", D: "Protecting Loved Ones" }, correctAnswer: "D", answerDetail: "Many heroes hide their identity to protect their loved ones." },
        { category: "Health", difficulty: "Medium", question: "What could be the cause of unhappiness in young people?", image: "images/28.jpg", options: { A: "Self-Confidence Problems Social Pressure", B: "Lack of Physical Activity", C: "Drinking Little Water", D: "Not Liking To Study" }, correctAnswer: "A", answerDetail: "Social environment and peer pressure affect the emotional state." },
        { category: "Creatures", difficulty: "Easy", question: "What is the most uncomfortable thing about domestic birds?", image: "images/29.jpg", options: { A: "Daily Water Bath", B: "Standing In The Dark Ground", C: "Clean Air and Safe Environment", D: "Loud Music" }, correctAnswer: "D", answerDetail: "Birds are delicate animals, noise pollution and stress affect them." },
        { category: "Life", difficulty: "Medium", question: "What is the main purpose of the 'Encyclopedia'?", image: "images/30.jpg", options: { A: "Provide General Information", B: "Telling Funny Stories", C: "Introducing Comic Book Characters", D: "Solving a Math Problem" }, correctAnswer: "A", answerDetail: "Encyclopedias provide short and reliable information on many topics." }
    ]
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
    
    document.getElementById('start-button').textContent = uiTranslations[currentLang].startButton;
}

function startGame() {
    currentQuestions = quizData[currentLang];
    score = 0; 
    currentCardIndex = 0;
    
    // Arayüzü ayarla
    document.getElementById('initial-screen').style.display = 'none';
    document.getElementById('game-area').style.display = 'block';
    updateUITexts();
    
    // Kartı düzelt ve ilk soruyu beklemeden yükle
    document.getElementById('quiz-card').classList.remove('flipped');
    loadCardData(0);
}

function updateUITexts() {
    const t = uiTranslations[currentLang];
    document.getElementById('score-label').textContent = t.scoreLabel;
    document.getElementById('card-label').textContent = t.cardLabel;
    document.querySelector('.next-card-btn').textContent = t.nextButton;
    document.querySelector('.answer-label').textContent = t.correctLabel;
    document.getElementById('total-cards').textContent = currentQuestions.length;
}

// Verileri Ekrana Basan Saf Fonksiyon (Animasyonsuz)
function loadCardData(index) {
    if (index >= currentQuestions.length) {
        showEndScreen();
        return;
    }

    const cardData = currentQuestions[index];

    // Kategori ve Zorluk Metinlerini Güncelle (Eğer veri varsa, yoksa boş bırak)
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
        btn.disabled = false;
        btn.classList.remove('correct-btn', 'wrong-btn');
        btn.onclick = () => handleAnswer(opt);
    });

    // Sayacı ve Skoru Güncelle
    document.getElementById('card-index').textContent = index + 1;
    document.getElementById('score').textContent = score;
}

// Cevap Verildiğinde Çalışan Fonksiyon
function handleAnswer(selected) {
    const cardData = currentQuestions[currentCardIndex];
    const isCorrect = selected === cardData.correctAnswer;
    
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

    // 0.6 saniye bekleyip kartı arkaya çevir
    setTimeout(() => {
        document.getElementById('quiz-card').classList.add('flipped');
    }, 600);
}

// Sonraki Soru Butonuna Tıklandığında Çalışan Animasyonlu Geçiş
function nextCard() {
    // 1. Kartı ön yüzüne döndürmeye başla
    const quizCard = document.getElementById('quiz-card');
    quizCard.classList.remove('flipped');
    
    // 2. Çoklu tıklamayı önlemek için butonu kilitle
    document.querySelector('.next-card-btn').disabled = true;

    // 3. Kart havada tam 90 dereceyken (350ms) yazıları değiştir
    setTimeout(() => {
        currentCardIndex++;
        loadCardData(currentCardIndex);
        
        // İşlem bitince butonu tekrar aç
        document.querySelector('.next-card-btn').disabled = false;
    }, 350);
}

// Oyun Bitiş Ekranı
function showEndScreen() {
    const t = uiTranslations[currentLang];
    alert(t.gameOver.replace("{score}", score).replace("{total}", currentQuestions.length));
    location.reload(); // Oyunu baştan başlatır
}

// Sayfa yüklendiğinde dili ayarla
window.onload = () => setLanguage('tr');

// --- GELİŞTİRİLMİŞ OYUN AKIŞI ---
const STORAGE_KEY = 'bilgi-karti-save-v2';
const BOARD_KEY = 'bilgi-karti-leaderboard-v1';
const TOTAL_CARDS = 100;
const CARDS_PER_SECTION = 25;
const difficultyPoints = {
    tr: { "Kolay": 1, "Başlangıç": 1, "Orta": 2, "Zor": 3 },
    en: { "Easy": 1, "Medium": 2, "Hard": 3 }
};

let canSaveScore = false;

function buildDeck(lang) {
    const base = quizData[lang];
    const deck = [];
    while (deck.length < TOTAL_CARDS) {
        const shuffled = [...base].sort(() => Math.random() - 0.5);
        deck.push(...shuffled);
    }
    return deck.slice(0, TOTAL_CARDS);
}

function saveProgress() {
    const progress = { currentLang, currentCardIndex, score, currentQuestions };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function getProgress() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
}

function startGame(resume = false) {
    const progress = resume ? getProgress() : null;
    if (progress) {
        currentLang = progress.currentLang;
        currentCardIndex = progress.currentCardIndex;
        score = progress.score;
        currentQuestions = progress.currentQuestions;
    } else {
        currentQuestions = buildDeck(currentLang);
        score = 0;
        currentCardIndex = 0;
        saveProgress();
    }

    document.getElementById('initial-screen').style.display = 'none';
    document.getElementById('game-area').style.display = 'block';
    updateUITexts();
    document.getElementById('quiz-card').classList.remove('flipped');
    loadCardData(currentCardIndex);
}

function updateUITexts() {
    const t = uiTranslations[currentLang];
    document.getElementById('score-label').textContent = t.scoreLabel;
    document.getElementById('card-label').textContent = t.cardLabel;
    document.getElementById('section-label').textContent = currentLang === 'tr' ? 'Bölüm' : 'Section';
    document.querySelector('.next-card-btn').textContent = t.nextButton;
    document.querySelector('.answer-label').textContent = t.correctLabel;
    document.getElementById('total-cards').textContent = CARDS_PER_SECTION;
    document.getElementById('resume-button').style.display = getProgress() ? 'inline-block' : 'none';
}

function loadCardData(index) {
    if (index >= currentQuestions.length) return showEndScreen();
    const cardData = currentQuestions[index];
    document.getElementById('category-text').textContent = cardData.category || "";
    document.getElementById('difficulty-text').textContent = `${cardData.difficulty || ""} (+${getDifficultyPoint(cardData.difficulty)})`;
    document.getElementById('question-text').textContent = cardData.question;
    document.getElementById('character-image').src = cardData.image;
    document.getElementById('correct-answer-text').textContent = `${cardData.correctAnswer}) ${cardData.options[cardData.correctAnswer]} - ${cardData.answerDetail}`;
    document.querySelectorAll('.option-btn').forEach(btn => {
        const opt = btn.dataset.option;
        btn.textContent = `${opt}) ${cardData.options[opt]}`;
        btn.disabled = false;
        btn.classList.remove('correct-btn', 'wrong-btn');
        btn.onclick = () => handleAnswer(opt);
    });
    document.getElementById('card-index').textContent = (index % CARDS_PER_SECTION) + 1;
    document.getElementById('section-index').textContent = Math.floor(index / CARDS_PER_SECTION) + 1;
    document.getElementById('score').textContent = score;
}

function getDifficultyPoint(diff) {
    return difficultyPoints[currentLang][diff] || 1;
}

function handleAnswer(selected) {
    const cardData = currentQuestions[currentCardIndex];
    if (selected === cardData.correctAnswer) {
        score += getDifficultyPoint(cardData.difficulty);
        document.getElementById('score').textContent = score;
    }
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
        const opt = btn.dataset.option;
        if (opt === cardData.correctAnswer) btn.classList.add('correct-btn');
        else if (opt === selected) btn.classList.add('wrong-btn');
    });
    saveProgress();
    setTimeout(() => document.getElementById('quiz-card').classList.add('flipped'), 500);
}

function nextCard() {
    document.getElementById('quiz-card').classList.remove('flipped');
    setTimeout(() => {
        currentCardIndex++;
        saveProgress();
        loadCardData(currentCardIndex);
    }, 300);
}

function showEndScreen() {
    canSaveScore = true;
    localStorage.removeItem(STORAGE_KEY);
    alert((currentLang === 'tr' ? 'Oyun bitti! Toplam puanınız: ' : 'Game over! Your total score: ') + score);
    document.getElementById('initial-screen').style.display = 'flex';
    document.getElementById('game-area').style.display = 'none';
}

function saveScore() {
    if (!canSaveScore) return;
    const name = document.getElementById('player-name').value.trim() || (currentLang === 'tr' ? 'Anonim' : 'Anonymous');
    const scores = JSON.parse(localStorage.getItem(BOARD_KEY) || '[]');
    scores.push({ name, score, date: new Date().toLocaleDateString() });
    scores.sort((a, b) => b.score - a.score);
    localStorage.setItem(BOARD_KEY, JSON.stringify(scores.slice(0, 10)));
    canSaveScore = false;
    renderLeaderboard();
}

function renderLeaderboard() {
    const scores = JSON.parse(localStorage.getItem(BOARD_KEY) || '[]');
    document.getElementById('leaderboard-list').innerHTML = scores.map(s => `<li>${s.name} - ${s.score}p (${s.date})</li>`).join('') || '<li>Henüz skor yok.</li>';
}

window.onload = () => {
    setLanguage('tr');
    updateUITexts();
    renderLeaderboard();
};
