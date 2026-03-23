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

// --- SORU VERİ HAVUZU (26 Soru) ---
const quizData = {
    tr: [
        { 
            // YENİ EKLENEN VERİLER:
            category: "DOĞA & HAYVANLAR", 
            difficulty: "KOLAY",
            // ------------------------
            question: "Salyangozlar genellikle yağmurdan sonra neden dışarı çıkarlar?", 
            image: "images/01.jpg", 
            options: { A: "Nemli hava", B: "Parlaklık", C: "Enerji", D: "Güneş" }, 
            correctAnswer: "A", 
            answerDetail: "Nemli havalar kurumadan hareket etmeleri için idealdir." 
        },
        { category: "GENEL KÜLTÜR", difficulty: "ORTA", question: "Kamp ateşini güvenli yakmak için ilk ne yapılmalıdır?", image: "images/02.jpg", options: { A: "Büyük odunlar", B: "Kuru çember", C: "Ot üstü", D: "Yakıt" }, correctAnswer: "B", answerDetail: "Kontrol için önce kuru dallardan bir temel oluşturulmalıdır." },
        // ... DİĞER SORULARA DA category VE difficulty EKLEMELİSİNİZ (Örn: { category: "TARİH", difficulty: "ZOR", question: "..." }) ...
        { question: "Modern moda hangi yüzyılda ortaya çıkmıştır?", image: "images/03.jpg", options: { A: "17.", B: "18.", C: "19.", D: "20." }, correctAnswer: "C", answerDetail: "19. yüzyıl, seri üretimin başlamasıyla modanın doğuşudur." },
        { question: "Mitolojide aslan genellikle neyi temsil eder?", image: "images/04.jpg", options: { A: "Bilgelik", B: "Sadakat", C: "Hırs", D: "Güç" }, correctAnswer: "D", answerDetail: "Aslan, tarih boyunca gücün ve cesaretin simgesi olmuştur." },
        { question: "Ejderhaların yaşadığına dair kanıt var mıdır?", image: "images/05.jpg", options: { A: "Kalıntı var", B: "Sadece efsane", C: "Kanıtlanmıştır", D: "Hala yaşıyorlar" }, correctAnswer: "B", answerDetail: "Ejderhalar efsanevi yaratıklardır; biyolojik kanıtları yoktur." },
        { question: "Yılan oynatıcıları en çok hangi ülkede bilinir?", image: "images/06.jpg", options: { A: "Hindistan", B: "Brezilya", C: "Türkiye", D: "Japonya" }, correctAnswer: "A", answerDetail: "Hindistan, kobra yılanı oynatıcılarıyla ünlüdür." },
        { question: "Afro saç modeli köken olarak nereye dayanır?", image: "images/07.jpg", options: { A: "Afrika", B: "İskandinav", C: "Çin", D: "G. Amerika" }, correctAnswer: "A", answerDetail: "Afrika kökenli toplumların doğal saç yapısından doğmuştur." },
        { question: "Dostoyevski hangi eseriyle tanınır?", image: "images/08.jpg", options: { A: "Sefiller", B: "Suç ve Ceza", C: "M. Cristo", D: "K. Prens" }, correctAnswer: "B", answerDetail: "Suç ve Ceza, yazarın en derin psikolojik eseridir." },
        { question: "Eski dönem zarif giyim tarzına ne ad verilir?", image: "images/09.jpg", options: { A: "Vintage", B: "Futuristik", C: "Sokak", D: "Urban" }, correctAnswer: "A", answerDetail: "Vintage, geçmiş dönemlerin özgün dokusunu temsil eder." },
        { question: "Gençlerde dışlanma korkusu neye yol açar?", image: "images/10.jpg", options: { A: "Sosyal kaygı", B: "Özgüven", C: "Umursamazlık", D: "Saldırganlık" }, correctAnswer: "A", answerDetail: "Kabul görmeme endişesi sosyal kaygıyı tetikleyebilir." },
        { question: "Hollywood ödül heykelciğinin adı nedir?", image: "images/11.jpg", options: { A: "Grammy", B: "Oscar", C: "Emmy", D: "Globe" }, correctAnswer: "B", answerDetail: "Oscar, sinema dünyasının en prestijli ödülüdür." },
        { question: "Çiftçi için tırpanın temel amacı nedir?", image: "images/12.jpg", options: { A: "Biçmek", B: "Karıştırmak", C: "Yönlendirmek", D: "Yaymak" }, correctAnswer: "A", answerDetail: "Tırpan, tahılların hasadında geleneksel olarak kullanılır." },
        { question: "Çocuklar neden brokoliyi sevmez?", image: "images/13.jpg", options: { A: "Yeşil renk", B: "Çiğ olması", C: "Acı tadı", D: "Sertliği" }, correctAnswer: "C", answerDetail: "Brokolideki bileşikler çocuklara acı gelebilir." },
        { question: "Stres en çok hangi organı etkiler?", image: "images/14.jpg", options: { A: "Kalp", B: "Mide", C: "Akciğer", D: "Karaciğer" }, correctAnswer: "B", answerDetail: "Stres mide asidini artırarak mideye zarar verebilir." },
        { question: "Filistin'deki çocukların zorluk çekme nedeni?", image: "images/15.jpg", options: { A: "Nüfus", B: "Eğitim", C: "İklim", D: "Soykırım" }, correctAnswer: "D", answerDetail: "İsrail'in saldırıları binlerce çocuğun hayatını etkilemektedir." },
        { question: "Savaşçı kadın kabilelerine ne denir?", image: "images/16.jpg", options: { A: "Amazonlar", B: "Vikingler", C: "Hunlar", D: "Aztekler" }, correctAnswer: "A", answerDetail: "Amazonlar mitolojik, savaşçı kadın topluluklarıdır." },
        { question: "Yeşilçam'ın 4 yapraklı yoncasından biri?", image: "images/17.jpg", options: { A: "Türkan Şoray", B: "N. Yeşilçay", C: "Beren Saat", D: "H. Erçel" }, correctAnswer: "A", answerDetail: "Şoray, Koçyiğit, Akın ve Girik bu gruptadır." },
        { question: "Anime kültürü hangi ülkede doğmuştur?", image: "images/18.jpg", options: { A: "G. Kore", B: "Çin", C: "Japonya", D: "Tayland" }, correctAnswer: "C", answerDetail: "Anime, Japonya'da doğup dünyaya yayılmış bir sanattır." },
        { question: "Tarihin ilk kadın savaşçı hükümdarlarından?", image: "images/19.jpg", options: { A: "Kleopatra", B: "Tomris Hatun", C: "Jeanne d'Arc", D: "Hatice Sultan" }, correctAnswer: "B", answerDetail: "Tomris Hatun, Persleri yenen efsanevi liderdir." },
        { question: "Saray palyaçolarının temel görevi neydi?", image: "images/20.jpg", options: { A: "Taktik", B: "Eğlendirmek", C: "Yasa", D: "Savaş" }, correctAnswer: "B", answerDetail: "Soyluları eğlendirmek ve bazen gerçekleri mizahla söylemekti." },
        { question: "Foklar neden soğuk suda üşümez?", image: "images/21.jpg", options: { A: "Kuyruk", B: "Şarkı", C: "Pul", D: "Vücut yağı" }, correctAnswer: "D", answerDetail: "Kalın yağ tabakaları onları soğuktan korur." },
        { question: "Leylekler yönlerini neyle bulur?", image: "images/22.jpg", options: { A: "Manyetik alan", B: "Akıntı", C: "Takip", D: "Koku" }, correctAnswer: "A", answerDetail: "Dünyanın manyetik alanını pusula gibi kullanırlar." },
        { question: "Orangutanları ayıran en büyük özellik?", image: "images/23.jpg", options: { A: "Boyun", B: "Uzun kollar", C: "Uçma", D: "Soğuk iklim" }, correctAnswer: "B", answerDetail: "Kolları ağaçlarda süzülmek için çok uzundur." },
        { question: "Sphynx kedileri neden bu ismi almıştır?", image: "images/24.jpg", options: { A: "Mısır'da doğuş", B: "Güneş", C: "Sfenks benzerliği", D: "Tüysüzlük" }, correctAnswer: "C", answerDetail: "Yüz hatları Sfenks heykeline benzetilmiştir." },
        { question: "Sincaplar yiyecekleri nereye saklar?", image: "images/25.jpg", options: { A: "Ağaç kovuğu", B: "Su kuyusu", C: "Güneş altı", D: "Taş üstü" }, correctAnswer: "A", answerDetail: "Yiyecekleri ağaç kovuklarına ve toprağa gömerler." },
        { question: "Köpeklerin sadık olma nedeni nedir?", image: "images/26.jpg", options: { A: "Yalnızlık", B: "Yavaşlık", C: "Gececilik", D: "Sürü içgüdüsü" }, correctAnswer: "D", answerDetail: "Sürü içgüdüsüyle insanı lider olarak görürler." }
    ],
    en: [
        { category: "NATURE & ANIMALS", difficulty: "EASY", question: "Why do snails come out after rain?", image: "images/01.jpg", options: { A: "Moist air", B: "Shininess", C: "Energy", D: "Sun" }, correctAnswer: "A", answerDetail: "Moist weather is ideal for their movement." },
        // ... (İngilizce sorulara da category/difficulty eklenmelidir) ...
    ]
};

// --- TEMEL FONKSİYONLAR ---

function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach((btn, i) => {
        btn.classList.toggle('active', (i === 0 && lang === 'tr') || (i === 1 && lang === 'en'));
    });
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

    // YENİ: Kategori ve Zorluk Metinlerini Güncelle (Eğer veri varsa, yoksa boş bırak)
    document.getElementById('category-text').textContent = cardData.category || "";
    document.getElementById('difficulty-text').textContent = cardData.difficulty || "";
    // ------------------------------------------------------------------------

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
