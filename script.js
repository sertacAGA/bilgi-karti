// --- DİL VE SABİT METİN AYARLARI ---
let currentLang = 'tr'; 
let currentCardIndex = 0;
let score = 0;
let currentQuestions = [];
let currentChapter = 1; // Seçilen bölüm (1 veya 2)

const uiTranslations = {
    tr: {
        startButton: "Oyuna Başla",
        nextButton: "Sonraki Kart",
        scoreLabel: "Puan",
        cardLabel: "Kart",
        correctLabel: "DOĞRU CEVAP:",
        gameOver: "Oyun bitti! Skorunuz: {score} / {total}",
        chapterTitle: "Bölüm Seç",
        backButton: "Geri"
    },
    en: {
        startButton: "Start Game",
        nextButton: "Next Card",
        scoreLabel: "Score",
        cardLabel: "Card",
        correctLabel: "CORRECT ANSWER:",
        gameOver: "Game Over! Your Score: {score} / {total}",
        chapterTitle: "Select Chapter",
        backButton: "Back"
    }
};

// --- SORU VERİ HAVUZU (25 Soru x 2 Bölüm) ---
const quizData = {
    tr: {
        chapter1: [
            { category: "Doğa & Hayvanlar", difficulty: "Kolay", question: "Salyangozlar genellikle yağmurdan sonra neden dışarı çıkarlar?", image: "images/01.jpg", options: { A: "Nemli hava", B: "Parlak olmak", C: "Enerji almak", D: "Güneş" }, correctAnswer: "A", answerDetail: "Salyangozlar nemli ortamlarda daha rahat hareket ederler." },
            { category: "Genel Kültür", difficulty: "Orta", question: "Kamp ateşini güvenli yakmak için ilk ne yapılmalıdır?", image: "images/02.jpg", options: { A: "Büyük odunlar", B: "Kuru çember", C: "Otlar yakılır", D: "Kağıt yapılır" }, correctAnswer: "B", answerDetail: "Ateş güvenliği için önce kuru bir çember yapılmalıdır." },
            { category: "Kültür Ve Sanat", difficulty: "Orta", question: "Modern moda hangi yüzyılda ortaya çıkmıştır?", image: "images/03.jpg", options: { A: "17.", B: "18.", C: "19.", D: "20." }, correctAnswer: "C", answerDetail: "Modern moda 19. yüzyılda ortaya çıkmıştır." },
            { category: "Tarih", difficulty: "Zor", question: "Mitolojide aslan genellikle neyi temsil eder?", image: "images/04.jpg", options: { A: "Bilgelik", B: "Sadakat", C: "Hırs", D: "Güç" }, correctAnswer: "D", answerDetail: "Aslan mitolojide güç ve cesaretin sembolüdür." },
            { category: "Fantastik", difficulty: "Kolay", question: "Ejderhaların yaşadığına dair kanıt var mıdır?", image: "images/05.jpg", options: { A: "Kalıntı var", B: "Sadece efsane", C: "Kanıt yok", D: "Kemik bulundu" }, correctAnswer: "B", answerDetail: "Ejderhalar sadece efsane ve mitolojide yer alır." },
            { category: "Dünya", difficulty: "Orta", question: "Yılan oynatıcıları en çok hangi ülkede bilinir?", image: "images/06.jpg", options: { A: "Hindistan", B: "Brezilya", C: "Türkiye", D: "Mısır" }, correctAnswer: "A", answerDetail: "Yılan oynatıcıları Hindistan'da en bilineni pratikdir." },
            { category: "Dünya", difficulty: "Orta", question: "Afro saç modeli köken olarak nereye dayanır?", image: "images/07.jpg", options: { A: "Afrika", B: "İskandinav", C: "Çin", D: "G. Amerika" }, correctAnswer: "A", answerDetail: "Afro saç modeli Afrika kökenlidir." },
            { category: "Edebiyat", difficulty: "Zor", question: "Dostoyevski hangi eseriyle tanınır?", image: "images/08.jpg", options: { A: "Sefiller", B: "Suç ve Ceza", C: "M. Cristo", D: "K. Prens" }, correctAnswer: "B", answerDetail: "Dostoyevski 'Suç ve Ceza' eseriyle ünlüdür." },
            { category: "Moda", difficulty: "Zor", question: "Eski dönem zarif giyim tarzına ne ad verilir?", image: "images/09.jpg", options: { A: "Vintage", B: "Futuristik", C: "Sokak", D: "Urban" }, correctAnswer: "A", answerDetail: "Eski dönem giyim tarzına Vintage denir." },
            { category: "Sağlık", difficulty: "Orta", question: "Gençlerde dışlanma korkusu neye yol açar?", image: "images/10.jpg", options: { A: "Sosyal kaygı", B: "Özgüven", C: "Umursamazlık", D: "Haselik" }, correctAnswer: "A", answerDetail: "Dışlanma korkusu sosyal kaygıya yol açar." },
            { category: "Kültür ve Sanat", difficulty: "Kolay", question: "Hollywood ödül heykelciğinin adı nedir?", image: "images/11.jpg", options: { A: "Grammy", B: "Oscar", C: "Emmy", D: "Globe" }, correctAnswer: "B", answerDetail: "Hollywood'un en ünlü ödülü Oscardır." },
            { category: "Doğa", difficulty: "Orta", question: "Çiftçi için tırpanın temel amacı nedir?", image: "images/12.jpg", options: { A: "Biçmek", B: "Karıştırmak", C: "Yönlendirmek", D: "Taşımak" }, correctAnswer: "A", answerDetail: "Tırpan çiftlik işlerinde biçmek için kullanılır." },
            { category: "Sağlık", difficulty: "Kolay", question: "Çocuklar neden brokoliyi sevmez?", image: "images/13.jpg", options: { A: "Yeşil renk", B: "Çiğ olması", C: "Acı tadı", D: "Sertliği" }, correctAnswer: "C", answerDetail: "Brokolinin acı tadı çocukları uzak tutabilir." },
            { category: "Yaşam", difficulty: "Orta", question: "Stres en çok hangi organı etkiler?", image: "images/14.jpg", options: { A: "Kalp", B: "Mide", C: "Akciğer", D: "Karaciğer" }, correctAnswer: "B", answerDetail: "Stres en çok mideyi olumsuz etkiler." },
            { category: "Dünya", difficulty: "Kolay", question: "Filistin'deki çocukların zorluk çekme nedeni?", image: "images/15.jpg", options: { A: "Nüfus", B: "Eğitim", C: "İklim", D: "Soykirım" }, correctAnswer: "D", answerDetail: "Siyasi ve insani sorunlar çocukları etkiler." },
            { category: "Tarih", difficulty: "Orta", question: "Savaşçı kadın kabilelerine ne denir?", image: "images/16.jpg", options: { A: "Amazonlar", B: "Vikingler", C: "Hunlar", D: "Aztekler" }, correctAnswer: "A", answerDetail: "Savaşçı kadın mitolojisi 'Amazonlar' olarak bilinir." },
            { category: "Kültür ve Sanat", difficulty: "Orta", question: "Yeşilçam'ın 4 yapraklı yoncasından biri?", image: "images/17.jpg", options: { A: "Türkan Şoray", B: "N. Yeşilçay", C: "Beren Saat", D: "Tülay Aksoy" }, correctAnswer: "A", answerDetail: "Türkan Şoray Yeşilçam'ın ünlü oyuncularından biridir." },
            { category: "Dünya", difficulty: "Kolay", question: "Anime kültürü hangi ülkede doğmuştur?", image: "images/18.jpg", options: { A: "G. Kore", B: "Çin", C: "Japonya", D: "Tayland" }, correctAnswer: "C", answerDetail: "Anime kültürü Japonya'dan doğmuştur." },
            { category: "Tarih", difficulty: "Zor", question: "Tarihin ilk kadın savaşçı hükümdarlarından?", image: "images/19.jpg", options: { A: "Kleopatra", B: "Tomris Hatun", C: "Jeanne d'Arc", D: "Elizabeth I" }, correctAnswer: "B", answerDetail: "Tomris Hatun Orta Asya'nın ünlü kadın hükümdarıdır." },
            { category: "Tarih", difficulty: "Orta", question: "Saray palyaçolarının temel görevi neydi?", image: "images/20.jpg", options: { A: "Taktik", B: "Eğlendirmek", C: "Yasa", D: "Savaş" }, correctAnswer: "B", answerDetail: "Saray palyaçoları hükümdarları eğlendirmek için vardı." },
            { category: "Hayvanlar", difficulty: "Kolay", question: "Foklar neden soğuk suda üşümez?", image: "images/21.jpg", options: { A: "Kuyruk", B: "Şarkı", C: "Pul", D: "Vücut yağı" }, correctAnswer: "D", answerDetail: "Fokaların kalın vücut yağı onları ısıtır." },
            { category: "Hayvanlar", difficulty: "Orta", question: "Leylekler yönlerini neyle bulur?", image: "images/22.jpg", options: { A: "Manyetik alan", B: "Akıntı", C: "Takip", D: "Koku" }, correctAnswer: "A", answerDetail: "Leylekler manyetik alan kullanarak yön bulurlar." },
            { category: "Hayvanlar", difficulty: "Kolay", question: "Orangutanları ayıran en büyük özellik?", image: "images/23.jpg", options: { A: "Boyun", B: "Uzun kollar", C: "Uçma", D: "Soğuklu" }, correctAnswer: "B", answerDetail: "Orangutanların uzun kolları onları ayırt eder." },
            { category: "Hayvanlar", difficulty: "Zor", question: "Sphynx kedileri neden bu ismi almıştır?", image: "images/24.jpg", options: { A: "Mısır'da doğuş", B: "Günübirlik", C: "Sfenks benzeri", D: "Isıl" }, correctAnswer: "C", answerDetail: "Sphynx kedileri Mısır Sfenksi benzerlikleri nedeniyle adlandırılır." },
            { category: "Hayvanlar", difficulty: "Kolay", question: "Sincaplar yiyecekleri nereye saklar?", image: "images/25.jpg", options: { A: "Ağaç kovuğu", B: "Su kuyusu", C: "Güneş altı", D: "Taş altı" }, correctAnswer: "A", answerDetail: "Sincaplar yiyecekleri ağaç kovuklarında saklar." }
        ],
        chapter2: [
            // Bölüm 2 kartları buraya eklenecek (25 adet)
            { category: "Boş", difficulty: "Kolay", question: "Bölüm 2 - Soru 1", image: "images/01.jpg", options: { A: "Seçenek A", B: "Seçenek B", C: "Seçenek C", D: "Seçenek D" }, correctAnswer: "A", answerDetail: "Bu kart henüz doldurulmamıştır." }
        ]
    },
    en: {
        chapter1: [
            { category: "Animals", difficulty: "Easy", question: "Why do snails come out after rain?", image: "images/01.jpg", options: { A: "Moist air", B: "Shininess", C: "Energy", D: "Sun" }, correctAnswer: "A", answerDetail: "Snails move easier in moist environments." },
            { category: "Culture", difficulty: "Medium", question: "What should be done first to light a campfire safely?", image: "images/02.jpg", options: { A: "Large woods", B: "Dry circle", C: "Grasses burned", D: "Paper made" }, correctAnswer: "B", answerDetail: "A dry circle should be made first for fire safety." },
            { category: "Culture", difficulty: "Medium", question: "In which century did modern fashion emerge?", image: "images/03.jpg", options: { A: "17.", B: "18.", C: "19.", D: "20." }, correctAnswer: "C", answerDetail: "Modern fashion emerged in the 19th century." },
            { category: "History", difficulty: "Hard", question: "What does the lion usually represent in mythology?", image: "images/04.jpg", options: { A: "Wisdom", B: "Loyalty", C: "Ambition", D: "Power" }, correctAnswer: "D", answerDetail: "The lion symbolizes power and courage in mythology." },
            { category: "Fantastic", difficulty: "Easy", question: "Is there evidence that dragons live?", image: "images/05.jpg", options: { A: "There are remains", B: "Just legends", C: "Proven", D: "Bones found" }, correctAnswer: "B", answerDetail: "Dragons exist only in legends and mythology." },
            { category: "World", difficulty: "Medium", question: "In which country are snake charmers best known?", image: "images/06.jpg", options: { A: "India", B: "Brazil", C: "Turkey", D: "Egypt" }, correctAnswer: "A", answerDetail: "Snake charmers are most known in India." },
            { category: "World", difficulty: "Medium", question: "Where is the Afro hairstyle based on the origin?", image: "images/07.jpg", options: { A: "Africa", B: "Scandinavian", C: "China", D: "S. America" }, correctAnswer: "A", answerDetail: "The Afro hairstyle originates from Africa." },
            { category: "Literature", difficulty: "Hard", question: "Which work is Dostoevsky known for?", image: "images/08.jpg", options: { A: "Miserables", B: "Crime and Punishment", C: "M. Cristo", D: "K. Prince" }, correctAnswer: "B", answerDetail: "Dostoevsky is famous for 'Crime and Punishment'." },
            { category: "Fashion", difficulty: "Hard", question: "What is the name given to the old period elegant clothing style?", image: "images/09.jpg", options: { A: "Vintage", B: "Futuristic", C: "Street", D: "Urban" }, correctAnswer: "A", answerDetail: "Old period clothing style is called Vintage." },
            { category: "Health", difficulty: "Medium", question: "What leads to the fear of exclusion in young people?", image: "images/10.jpg", options: { A: "Social anxiety", B: "Self-confidence", C: "Indifference", D: "Envy" }, correctAnswer: "A", answerDetail: "Fear of exclusion leads to social anxiety." },
            { category: "Culture", difficulty: "Easy", question: "What is the name of the Hollywood award statuette?", image: "images/11.jpg", options: { A: "Grammy", B: "Oscar", C: "Emmy", D: "Globe" }, correctAnswer: "B", answerDetail: "Hollywood's most famous award is the Oscar." },
            { category: "World", difficulty: "Medium", question: "What is the main purpose of the scythe for the farmer?", image: "images/12.jpg", options: { A: "To mow", B: "To mix", C: "To direct", D: "To carry" }, correctAnswer: "A", answerDetail: "The scythe is used for mowing in farm work." },
            { category: "Health", difficulty: "Easy", question: "Why don't children like broccoli?", image: "images/13.jpg", options: { A: "Green color", B: "Being raw", C: "Bitter taste", D: "Hardness" }, correctAnswer: "C", answerDetail: "Broccoli's bitter taste can repel children." },
            { category: "World", difficulty: "Medium", question: "Which organ does stress affect the most?", image: "images/14.jpg", options: { A: "Heart", B: "Stomach", C: "Lung", D: "Liver" }, correctAnswer: "B", answerDetail: "Stress most negatively affects the stomach." },
            { category: "World", difficulty: "Easy", question: "The reason for the difficulties of children in Palestine?", image: "images/15.jpg", options: { A: "Population", B: "Education", C: "Climate", D: "Conflict" }, correctAnswer: "D", answerDetail: "Political and humanitarian issues affect children." },
            { category: "History", difficulty: "Medium", question: "What are warrior women tribes called?", image: "images/16.jpg", options: { A: "Amazons", B: "Vikings", C: "Huns", D: "Aztecs" }, correctAnswer: "A", answerDetail: "Warrior women mythology is known as 'Amazons'." },
            { category: "Culture", difficulty: "Medium", question: "One of Yeşilçam's 4-leaf clover?", image: "images/17.jpg", options: { A: "Türkan Şoray", B: "N. Yeşilçay", C: "Beren Saat", D: "Tülay Aksoy" }, correctAnswer: "A", answerDetail: "Türkan Şoray is one of Yeşilçam's famous actors." },
            { category: "World", difficulty: "Easy", question: "In which country was anime culture born?", image: "images/18.jpg", options: { A: "S. Korea", B: "China", C: "Japan", D: "Thailand" }, correctAnswer: "C", answerDetail: "Anime culture was born in Japan." },
            { category: "History", difficulty: "Hard", question: "One of the first female warrior rulers in history?", image: "images/19.jpg", options: { A: "Cleopatra", B: "Tomris Hatun", C: "Jeanne d'Arc", D: "Elizabeth I" }, correctAnswer: "B", answerDetail: "Tomris Hatun is a famous female ruler of Central Asia." },
            { category: "History", difficulty: "Medium", question: "What was the main task of the palace clowns?", image: "images/20.jpg", options: { A: "Tactics", B: "To Entertain", C: "Law", D: "War" }, correctAnswer: "B", answerDetail: "Palace clowns were there to entertain the ruler." },
            { category: "Animals", difficulty: "Easy", question: "Why don't seals get cold in cold water?", image: "images/21.jpg", options: { A: "Tail", B: "Song", C: "Seal", D: "Body fat" }, correctAnswer: "D", answerDetail: "Seals' thick body fat keeps them warm." },
            { category: "Animals", difficulty: "Medium", question: "How do storks find their way?", image: "images/22.jpg", options: { A: "Magnetic field", B: "Flow", C: "Following", D: "Smell" }, correctAnswer: "A", answerDetail: "Storks find their way using magnetic fields." },
            { category: "Animals", difficulty: "Easy", question: "The biggest feature that distinguishes orangutans?", image: "images/23.jpg", options: { A: "Neck", B: "Long arms", C: "Flying", D: "Cold resistant" }, correctAnswer: "B", answerDetail: "Orangutans' long arms distinguish them." },
            { category: "Animals", difficulty: "Hard", question: "Why did Sphynx cats get this name?", image: "images/24.jpg", options: { A: "Birth in Egypt", B: "Daytime", C: "Sphinx similarity", D: "Heat" }, correctAnswer: "C", answerDetail: "Sphynx cats are named for their resemblance to Egyptian Sphinx." },
            { category: "Animals", difficulty: "Easy", question: "Where do squirrels hide food?", image: "images/25.jpg", options: { A: "Tree hollow", B: "Water well", C: "Under sun", D: "Under stone" }, correctAnswer: "A", answerDetail: "Squirrels hide food in tree hollows." }
        ],
        chapter2: [
            { category: "Empty", difficulty: "Easy", question: "Chapter 2 - Question 1", image: "images/01.jpg", options: { A: "Option A", B: "Option B", C: "Option C", D: "Option D" }, correctAnswer: "A", answerDetail: "This card has not been filled yet." }
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
}

function showChapterSelection() {
    document.getElementById('start-actions').style.display = 'none';
    document.getElementById('chapter-selection').style.display = 'block';
}

function backToLanguage() {
    document.getElementById('chapter-selection').style.display = 'none';
    document.getElementById('start-actions').style.display = 'block';
}

function startGame(resume = false, chapter = null) {
    if (chapter) {
        currentChapter = chapter;
    }
    
    const progress = resume ? getProgress() : null;
    if (progress) {
        currentLang = progress.currentLang;
        currentCardIndex = progress.currentCardIndex;
        score = progress.score;
        currentChapter = progress.currentChapter;
        currentQuestions = progress.currentQuestions;
    } else {
        const chapterData = currentLang === 'tr' 
            ? quizData.tr[`chapter${currentChapter}`]
            : quizData.en[`chapter${currentChapter}`];
        currentQuestions = [...chapterData];
        score = 0;
        currentCardIndex = 0;
        saveProgress();
    }

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
    
    const chapterNames = currentLang === 'tr' 
        ? { 1: "Genel Kültür 1", 2: "Genel Kültür 2" }
        : { 1: "General Culture 1", 2: "General Culture 2" };
    
    document.getElementById('chapter-index').textContent = chapterNames[currentChapter];
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
        btn.disabled = false;
        btn.classList.remove('correct-btn', 'wrong-btn');
        btn.onclick = () => handleAnswer(opt);
    });

    // Sayacı ve Skoru Güncelle
    document.getElementById('card-index').textContent = index + 1;
    document.getElementById('score').textContent = score;
}

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
        saveProgress();
        loadCardData(currentCardIndex);
        
        // İşlem bitince butonu tekrar aç
        document.querySelector('.next-card-btn').disabled = false;
    }, 350);
}

function showEndScreen() {
    const t = uiTranslations[currentLang];
    const chapterNames = currentLang === 'tr' 
        ? { 1: "Genel Kültür 1", 2: "Genel Kültür 2" }
        : { 1: "General Culture 1", 2: "General Culture 2" };
    
    alert(t.gameOver.replace("{score}", score).replace("{total}", currentQuestions.length));
    location.reload();
}

// Sayfa yüklendiğinde dili ayarla
window.onload = () => {
    setLanguage('tr');
    updateUITexts();
    renderLeaderboard();
};

// --- İLERLEME KAYDETME ---
const STORAGE_KEY = 'bilgi-karti-save-v3';
const BOARD_KEY = 'bilgi-karti-leaderboard-v1';

let canSaveScore = false;

function saveProgress() {
    const progress = { currentLang, currentCardIndex, score, currentChapter, currentQuestions };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function getProgress() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
}

function renderLeaderboard() {
    const scores = JSON.parse(localStorage.getItem(BOARD_KEY) || '[]');
    document.getElementById('leaderboard-list').innerHTML = scores.map(s => `<li>${s.name} - ${s.score}p (${s.date})</li>`).join('') || (currentLang === 'tr' ? '<li>Henüz skor yok.</li>' : '<li>No scores yet.</li>');
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

function exitToHome() {
    localStorage.removeItem(STORAGE_KEY);
    document.getElementById('quiz-card').classList.remove('flipped');
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('initial-screen').style.display = 'flex';
    document.getElementById('chapter-selection').style.display = 'none';
    document.getElementById('start-actions').style.display = 'block';
    updateUITexts();
}
