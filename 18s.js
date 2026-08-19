window.onload = function () {
    // Loading asset
    const assets = [
        "kicaw.webm", "salah.webm",
        "mp3/birthday.mp3", "mp3/salah.mp3", "mp3/wish.mp3",
        "mp3/about.mp3", "mp3/nadhif.mp3", "mp3/nuca.mp3",
        "mp3/fixyou.mp3", "mp3/blue.mp3", "mp3/hindia.mp3",
        "mp3/lesungpipi.mp3", "mp3/neira.mp3",
        "img/album1.jpg", "img/album2.jpg", "img/album3.jpg",
        "img/album4.jpg", "img/album5.jpg", "img/album6.jpg",
        "img/album7.jpg", "img/album8.jpg", "seal.png"
    ];

    let loaded = 0;
    const total = assets.length;
    const fill = document.querySelector(".loading-fill");
    const label = document.querySelector(".loading-content p");

    function onProgress(src) {
        loaded++;
        const persen = Math.round((loaded / total) * 100);
        if (fill) fill.style.width = persen + "%";
        if (label) label.innerText = `Loading... ${persen}%`;

        // Teks detail file yang sedang di-load
        const detail = document.getElementById("loading-detail");
        if (detail) {
            const namaFile = src.split('/').pop();
            const ext = src.split('.').pop().toLowerCase();
            const ikon = ["mp3", "wav", "ogg"].includes(ext) ? "🎵" :
                ["webm", "mp4"].includes(ext) ? "🎬" : "🖼️";
            detail.innerText = `${ikon} ${namaFile}`;
        }

        if (loaded >= total) selesaiLoading();
    }

    function selesaiLoading() {
        if (selesaiLoading.sudah) return;
        selesaiLoading.sudah = true;
        const screen = document.getElementById("loading-screen");
        if (label) label.innerText = "Ready! ✨";
        const detail = document.getElementById("loading-detail");
        if (detail) detail.innerText = "";
        screen.classList.add("ready");
        setTimeout(() => {
            screen.classList.add("hide");
            setTimeout(() => screen.remove(), 800);
        }, 2000);
    }

    assets.forEach(src => {
        const ext = src.split('.').pop().toLowerCase();

        if (["jpg", "jpeg", "png", "webp", "gif"].includes(ext)) {
            const img = new Image();
            img.onload = () => onProgress(src);
            img.onerror = () => onProgress(src);
            img.src = src;

        } else if (["mp3", "wav", "ogg"].includes(ext)) {
            const audio = new Audio();
            let triggered = false;
            function triggerOnce() {
                if (!triggered) { triggered = true; onProgress(src); }
            }
            audio.addEventListener("canplaythrough", triggerOnce, { once: true });
            audio.addEventListener("loadeddata", triggerOnce, { once: true });
            audio.addEventListener("error", triggerOnce, { once: true });
            audio.src = src;
            audio.load();

        } else if (["webm", "mp4"].includes(ext)) {
            const video = document.createElement("video");
            let triggered = false;
            function triggerOnce() {
                if (!triggered) { triggered = true; onProgress(src); }
            }
            video.addEventListener("canplaythrough", triggerOnce, { once: true });
            video.addEventListener("loadeddata", triggerOnce, { once: true });
            video.addEventListener("error", triggerOnce, { once: true });
            video.src = src;
            video.load();
        }
    });

    // Fallback 15 detik — paksa lanjut
    setTimeout(() => selesaiLoading(), 15000);
};


const passwordList = ["fanezha", "nezha", "fanesa", "fanes", "nejul", "nesha", "nesa"];
const birthdaySong = document.getElementById("birthday-song");
const messages = [
    `Happy birthday!

I am sorry I could not say it to you in person. I hope that with your new age, you become more mature and continue to grow. This may not have been the easiest year for you, but I believe you can take valuable lessons from it. Remember, "the rainbow never appears before the rain," so enjoy your journey. Someday, it will become bright and beautiful, just like a rainbow.`
];

function ketikSurat(el, text, speed = 55) {
    let i = 0;
    el.innerHTML = "";

    function ketik() {
        if (i < text.length) {
            if (text.charAt(i) === "\n") {
                el.innerHTML += "<br>";
            } else {
                el.innerHTML += text.charAt(i);
            }

            i++;
            setTimeout(ketik, speed);
        }
    }

    ketik();
}

function checkPassword() {
    let input = document.getElementById("password").value.toLowerCase().trim();
    let mainVideo = document.getElementById("main-video");
    let wrongVideo = document.getElementById("wrong-video");
    let wrongAnswerSound = document.getElementById("wrong-answer-sound");

    if (passwordList.includes(input)) {
        tutupKeyboard();
        selebrasi();
        document.getElementById("page-one").classList.remove("active");
        document.getElementById("page-two").classList.add("active");
        birthdaySong.play().catch(e => console.log("Audio butuh interaksi"));
        mulaiTyping();
        hujanKonfeti();
    } else {
        handleSandiSalah(mainVideo, wrongVideo, wrongAnswerSound);
    }
}

function tutupKeyboard() {
    document.activeElement.blur();
}

function handleSandiSalah(v_utama, v_salah, suaraSalah) {
    let label = document.getElementById("label");
    let box = document.querySelector("#page-one #form-box");

    label.innerText = "Incorrect password!";
    box.classList.add("shake");

    v_utama.style.opacity = "0";
    v_salah.style.opacity = "1";

    if (suaraSalah) {
        suaraSalah.currentTime = 0;
        suaraSalah.play();
    }

    setTimeout(() => box.classList.remove("shake"), 400);
}

function selebrasi() {
    setTimeout(() => {
        confetti({
            particleCount: 120,
            spread: 55,
            angle: 70,
            origin: { x: 0.2, y: 1 },
            gravity: 0.8,
            ticks: 400
        });

        confetti({
            particleCount: 120,
            spread: 55,
            angle: 110,
            origin: { x: 0.8, y: 1 },
            gravity: 0.8,
            ticks: 400
        });
    }, 500);
}

document.getElementById("password").addEventListener("input", () => {
    document.getElementById("main-video").style.opacity = "1";
    document.getElementById("wrong-video").style.opacity = "0";
    document.getElementById("label").innerText = "Please enter your password...";

    let wrongAnswerSound = document.getElementById("wrong-answer-sound");
    if (wrongAnswerSound) {
        wrongAnswerSound.pause();
        wrongAnswerSound.currentTime = 0;
    }
});

document.getElementById("password").addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkPassword();
});

const delayPerChar = 50;
const delayPunctuation = {
    '.': 400,
    ',': 200,
    '!': 400,
    '?': 400,
};

let i = 0, j = 0;
function mulaiTyping() {
    if (i < messages.length) {
        let textEl = document.getElementById("text");
        let scrollBox = document.getElementById("scroll-box");

        if (j < messages[i].length) {
            const char = messages[i].charAt(j);

            if (char === "\n") {
                textEl.innerHTML += "<br>";
            } else {
                textEl.innerHTML += char;
            }

            j++;
            const delay = delayPunctuation[char] ?? delayPerChar;
            setTimeout(mulaiTyping, delay);
        } else {
            textEl.innerHTML += "<br><br>";
            i++;
            j = 0;
            scrollBox.scrollTo({ top: scrollBox.scrollHeight, behavior: "smooth" });
            setTimeout(mulaiTyping, 800);
        }
    } else {
        let btn = document.getElementById("next-button");
        btn.disabled = false;
        btn.innerText = "Continue️🌻";
    }
}

function goToNextPage() {
    let btn = document.getElementById("next-button");
    btn.disabled = true;
    btn.innerText = "Please wait...";

    let vol = 1;
    let fadeOut = setInterval(() => {
        if (vol > 0) {
            vol = Math.max(0, vol - 0.05);
            birthdaySong.volume = vol;
        } else {
            clearInterval(fadeOut);
            birthdaySong.pause();
            birthdaySong.currentTime = 0;

            setTimeout(() => {
                document.getElementById("page-two").classList.remove("active");
                document.getElementById("page-six").classList.add("active");

                const wishSong = document.getElementById("wish-song");
                if (wishSong) {
                    wishSong.currentTime = 0;
                    wishSong.play().catch(e => console.log("Wish audio butuh interaksi"));
                }
            }, 1000);
        }
    }, 50);
}

function startHearts() {
    setInterval(() => {
        let heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "️🎂";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (Math.random() * 20 + 15) + "px";
        heart.style.animationDuration = (Math.random() * 3 + 3) + "s";
        heart.style.opacity = Math.random();
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
    }, 400);
}

function goToPage(nomor) {
    const halamanSekarang = document.querySelector(".page.active");
    if (halamanSekarang) {
        halamanSekarang.classList.remove("active");
    }
    const pageIds = ["", "page-one", "page-two", "page-three", "page-four", "page-five", "page-six", "page-seven"];
    const target = document.getElementById(pageIds[nomor]);
    if (target) {
        target.classList.add("active");
    }
    if (nomor === 7) {
        setTimeout(() => {
            updateAlbum();
        }, 300);
    }

    // Lagu page 6
    const wishSong = document.getElementById("wish-song");
    if (nomor === 6) {
        if (wishSong) {
            wishSong.currentTime = 0;
            wishSong.play().catch(e => console.log("Wish audio butuh interaksi"));
        }
    } else if (wishSong) {
        wishSong.pause();
        wishSong.currentTime = 0;
    }

    const mainPlayer = document.getElementById("full-audio");
    if (nomor === 4 && selectedSong) {
        previewAudio.pause();
        mainPlayer.pause();
        mainPlayer.src = selectedSong;
        mainPlayer.onloadedmetadata = () => {
            mainPlayer.currentTime = 0;
            mainPlayer.play().catch(() => { });
        };
    }
}

const daftarWarna = [
    "#ff4d6d",
    "#ff85a1",
    "#ffc2d1",
    "#ffffff",
    "#ffd6e0",
    "#ffb3c6"
];

let konfetiInterval;

function hujanKonfeti() {
    clearInterval(konfetiInterval);

    konfetiInterval = setInterval(() => {
        const warnaAcak = daftarWarna[Math.floor(Math.random() * daftarWarna.length)];

        confetti({
            particleCount: 1,
            startVelocity: 0,
            ticks: 500,
            origin: { x: Math.random(), y: -0.1 },
            gravity: 0.6,
            colors: [warnaAcak],
            zIndex: -1,
            opacity: 0.6
        });
    }, 500);
}

let timerTombol;
let suratSelesai = false;

function toggleLetter() {
    const wrapper = document.getElementById('envelope-wrapper');
    const fakeLetter = document.querySelector('.letter');
    const realLetter = document.getElementById('real-letter');
    const hint = document.getElementById('click-hint');
    const overlay = document.getElementById('overlay');

    // 1. buka amplop
    if (!wrapper.classList.contains('open')) {
        wrapper.classList.add('open');
        hint.innerText = "(Click once more to pull out the letter)";
        return;
    }

    // 2. tarik surat
    if (!wrapper.classList.contains('pulled')) {
        wrapper.classList.add('pulled');
        overlay.classList.add('active');
        hint.style.opacity = "0";

        setTimeout(() => { fakeLetter.classList.add('hide'); }, 200);

        setTimeout(() => {
            realLetter.classList.add('show');
            currentLembar = 1;
            document.querySelectorAll('.letter-page').forEach(el => el.classList.remove('active'));
            document.getElementById('lp1').classList.add('active');
            document.getElementById('page-indicator').innerText = '1 / ' + totalLembar;
            munculkanTombolLembar();
        }, 420);

        return;
    }

    // 3. tutup — hanya kalau suratSelesai = true
    if (!suratSelesai) return;

    realLetter.classList.add('closing');

    setTimeout(() => {
        realLetter.classList.remove('show', 'closing');
        fakeLetter.style.zIndex = "2";
        fakeLetter.classList.remove('hide');
        wrapper.classList.remove('pulled');
    }, 520);

    setTimeout(() => {
        wrapper.classList.remove('open');
        overlay.classList.remove('active');
        fakeLetter.style.zIndex = "";
        hint.style.opacity = "0.6";
        hint.innerText = "(Click the envelope ✨)";
        suratSelesai = false;

        setTimeout(() => {
            const btn = document.getElementById("continue-button");
            if (!btn.classList.contains("show-btn")) {
                btn.innerText = "See One More Thing ✨";
                btn.onclick = () => goToPage(5);
                btn.classList.add("show-btn");
            }
        }, 1000);
    }, 800);
}

function closeLetter() {
    suratSelesai = true;
    toggleLetter();
}

// ================== LETTER PAGES ==================

let currentLembar = 1;
const totalLembar = 6;
let timerLembar;

function munculkanTombolLembar() {
    clearTimeout(timerLembar);

    const btnNext = document.getElementById("next-letter-button");
    const btnPrev = document.getElementById("previous-button");

    btnNext.classList.remove("btn-visible");
    btnNext.disabled = true;

    if (currentLembar > 1) {
        btnPrev.style.display = "block";
        setTimeout(() => btnPrev.classList.add("btn-visible"), 50);
    } else {
        btnPrev.classList.remove("btn-visible");
        setTimeout(() => { btnPrev.style.display = "none"; }, 400);
    }

    if (currentLembar === totalLembar) {
        btnNext.innerText = "Close ✨";
        btnNext.style.display = "block";
        btnNext.onclick = () => closeLetter();
    } else {
        btnNext.innerText = "Next →";
        btnNext.style.display = "block";
        btnNext.onclick = () => changeLetterPage(1);
    }

    timerLembar = setTimeout(() => {
        btnNext.disabled = false;
        btnNext.classList.add("btn-visible");
    }, 2500);
}

function changeLetterPage(arah) {
    if (currentLembar + arah < 1 || currentLembar + arah > totalLembar) return;

    const halamanLama = document.getElementById("lp" + currentLembar);
    currentLembar += arah;
    const halamanBaru = document.getElementById("lp" + currentLembar);

    const keluarAnim = arah === 1 ? "slide-out-left" : "slide-out-right";
    const masukAnim = arah === 1 ? "slide-in-right" : "slide-in-left";

    halamanLama.classList.add(keluarAnim);

    setTimeout(() => {
        halamanLama.classList.remove("active", keluarAnim);
        halamanBaru.classList.add("active", masukAnim);

        setTimeout(() => {
            halamanBaru.classList.remove(masukAnim);
        }, 350);

        document.getElementById("page-indicator").innerText = currentLembar + " / " + totalLembar;
        munculkanTombolLembar();
    }, 300);
}

// ================== UMUR ==================

const birthDate = new Date("2008-05-15T12:00:00");

let intervalUmur;

function startAge() {
    if (intervalUmur) return;

    intervalUmur = setInterval(updateUmur, 52);

    const btn = document.getElementById("age-button");
    const hasil = document.getElementById("age-result");
    const header = document.getElementById("age-header");

    btn.style.display = "none";
    header.classList.add("hide");

    const box = document.querySelector("#page-four #form-box");
    box.classList.remove("drop-anim");
    void box.offsetWidth;
    box.classList.add("drop-anim");

    hasil.innerHTML = "";

    setTimeout(() => {
        hasil.classList.remove("umur-hidden");
        hasil.classList.add("umur-show", "focus-mode");

        updateUmur();

        setTimeout(() => {
            document.getElementById("next-button").classList.add("show-btn");
        }, 2000);
    }, 500);
}

function continueMessage() {
    const text = `
Look at how far you have come.
How long have you kept going? You have made it this far, and it is not just a coincidence.
Every exhaustion, every wound, and every difficult day was real. Do not underestimate yourself just because you are tired.
Rest is okay, but giving up would be too small a choice for everything you have overcome. Take it slowly. Life is not a race; it is about continuing to walk even after falling many times.
`;

    document.getElementById("motivational-message").innerText = text;
    document.getElementById("message-overlay").classList.add("show");
}

function updateUmur() {
    const now = new Date();
    let start = new Date(birthDate);

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    if (days < 0) {
        months--;
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const diff = now - birthDate;
    const totalMs = diff;
    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(diff / (1000 * 60));
    const totalHours = Math.floor(diff / (1000 * 60 * 60));
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);

    let tempDate = new Date(birthDate);
    let totalMonths = 0;

    while (tempDate <= now) {
        tempDate.setMonth(tempDate.getMonth() + 1);
        if (tempDate <= now) totalMonths++;
    }

    let totalYears = Math.floor(totalMonths / 12);

    document.getElementById("age-result").innerHTML = `
    <div class="hasil-box">
        <h3>Your Age</h3>
        <div class="umur-utama">
            ${years} Tahun ${months} Bulan ${days} Hari
        </div>
    </div>

    <div class="hasil-box">
        <h3>You Have Been Alive For</h3>

        <div class="row">
            <span>Years</span>
            <b>${totalYears}</b>
        </div>

        <div class="row">
            <span>Months</span>
            <b>${totalMonths}</b>
        </div>

        <div class="row">
            <span>Weeks</span>
            <b>${totalWeeks}</b>
        </div>

        <div class="row">
            <span>Days</span>
            <b>${totalDays}</b>
        </div>

        <div class="row">
            <span>Hours</span>
            <b>${totalHours}</b>
        </div>

        <div class="row">
            <span>Minutes</span>
            <b>${totalMinutes}</b>
        </div>

        <div class="row">
            <span>Seconds</span>
            <b>${totalSeconds}</b>
        </div>

        <div class="row">
            <span>Milliseconds</span>
            <b>${totalMs}</b>
        </div>
    </div>
`;
}

function returnToAge() {
    document.getElementById("message-overlay").classList.remove("show");
}

function nextFromMessage() {
    document.getElementById("message-overlay").classList.remove("show");
    goToPage(3);
}

function sendAnswer(pilihan) {
    var nomorWA = "6283861084598";
    var pesan = "Hi! I just finished opening the website, and I chose this gift: " + pilihan;
    var url = "https://wa.me/" + nomorWA + "?text=" + encodeURIComponent(pesan);
    window.open(url, '_blank');
    goToPage(6);
}

// ===== MAKE A WISH =====
function blowOutCandle(n) {
    const flame = document.getElementById("flame" + n);
    const candle = document.getElementById("candle" + n);

    if (!flame || !candle) return;
    if (flame.classList.contains("mati")) return;

    // Haptic feedback
    if (navigator.vibrate) navigator.vibrate(40);

    flame.classList.add("mati");
    candle.style.cursor = "default";

    confetti({
        particleCount: 8,
        spread: 35,
        origin: { x: 0.5, y: 0.55 },
        colors: ['#ff4d6d', '#ffccd5'],
        scalar: 0.6,
        ticks: 80
    });

    const allFlames = document.querySelectorAll(".flame");
    const allFlamesOut = [...allFlames].every(flame => flame.classList.contains("mati"));

    if (allFlamesOut) {
        // Haptic panjang saat semua lilin mati
        if (navigator.vibrate) navigator.vibrate([60, 80, 60, 80, 120]);
        semuaMati();
    }
}

function semuaMati() {
    document.getElementById("wish-hint").style.opacity = "0";

    setTimeout(() => {
        confetti({ particleCount: 60, spread: 65, origin: { x: 0.3, y: 0.6 }, gravity: 0.9, ticks: 200, scalar: 0.9 });
        confetti({ particleCount: 60, spread: 65, origin: { x: 0.7, y: 0.6 }, gravity: 0.9, ticks: 200, scalar: 0.9 });
    }, 200);

    // wishMsg muncul duluan
    setTimeout(() => {
        document.getElementById("wish-message").classList.add("show");
    }, 1200);

    // tombol muncul SETELAH wishMsg sudah show
    setTimeout(() => {
        document.getElementById("wish-continue-button").classList.add("show-btn");
    }, 1800);
}

function continueToPlaylist() {
    const btn = document.getElementById("wish-continue-button");
    const wishSong = document.getElementById("wish-song");

    btn.disabled = true;
    btn.innerText = "Please wait a moment...";

    let volume = 1;

    const fade = setInterval(() => {
        if (volume > 0.05) {
            volume -= 0.05;
            wishSong.volume = volume;
        } else {
            clearInterval(fade);
            wishSong.pause();
            wishSong.currentTime = 0;
            wishSong.volume = 1;
        }
    }, 70);

    setTimeout(() => {
        goToPage(7);
        btn.disabled = false;
        btn.innerText = "Continue ✨";
    }, 0);
}

// ===== ALBUM SLIDER =====
let currentAlbum = 0;
let selectedSong = "";
let selectedStart = 0;

const previewAudio = document.getElementById("preview-audio");
let stopPreview;

function updateAlbum() {
    const track = document.querySelector(".album-track");
    const slides = document.querySelectorAll(".album-slide");

    if (!track || slides.length === 0) return;

    track.style.transform = `translateX(-${currentAlbum * 100}%)`;

    const activeSlide = slides[currentAlbum];
    const laguFile = activeSlide.getAttribute("data-audio");
    const startTime = parseFloat(activeSlide.getAttribute("data-start")) || 0;

    selectedSong = laguFile;
    selectedStart = startTime;

    if (laguFile) {
        clearTimeout(stopPreview);
        previewAudio.pause();
        previewAudio.src = laguFile;
        previewAudio.onloadedmetadata = () => {
            previewAudio.currentTime = startTime;
            previewAudio.play().catch(() => { });
        };
        previewAudio.volume = 1;
        stopPreview = setTimeout(() => {
            previewAudio.pause();
        }, 15000);
    }
}

const fullAudio = document.getElementById("full-audio");

function playFullSong() {
    const slides = document.querySelectorAll(".album-slide");
    const activeSlide = slides[currentAlbum];
    const laguFile = activeSlide.getAttribute("data-audio");
    fullAudio.src = laguFile;
    fullAudio.currentTime = 0;
    fullAudio.play();
}

function nextAlbum() {
    const slides = document.querySelectorAll(".album-slide");
    currentAlbum++;
    if (currentAlbum >= slides.length) currentAlbum = 0;
    updateAlbum();
}

function previousAlbum() {
    const slides = document.querySelectorAll(".album-slide");
    currentAlbum--;
    if (currentAlbum < 0) currentAlbum = slides.length - 1;
    updateAlbum();
}

function startPetals() {
    setInterval(() => {
        const petal = document.createElement("div");
        petal.className = "petal";
        petal.innerHTML = "🌸";
        petal.style.left = Math.random() * 100 + "vw";
        petal.style.fontSize = (Math.random() * 10 + 18) + "px";
        petal.style.animationDuration = (Math.random() * 4 + 6) + "s";
        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), 10000);
    }, 700);
}