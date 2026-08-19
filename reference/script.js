(function () {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isInstagram = ua.indexOf('Instagram') > -1;
    const isFacebook = (ua.indexOf('FBAN') > -1) || (ua.indexOf('FBAV') > -1);
    const isWhatsapp = ua.indexOf('WhatsApp') > -1;
    const isLine = ua.indexOf('Line') > -1;

    if (isInstagram || isFacebook || isWhatsapp || isLine) {
        document.addEventListener('DOMContentLoaded', () => {
            const el = document.getElementById('chrome-check');
            if (el) el.style.display = 'block';
        });
    }
})();

window.onload = function () {
    // 1. Cek browser
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isInstagram = ua.indexOf('Instagram') > -1;
    const isFacebook = (ua.indexOf('FBAN') > -1) || (ua.indexOf('FBAV') > -1);
    const isWhatsapp = ua.indexOf('WhatsApp') > -1;
    const isLine = ua.indexOf('Line') > -1;

    if (isInstagram || isFacebook || isWhatsapp || isLine) {
        document.getElementById('chrome-check').style.display = 'block';
    }

    // 2. Loading asset
    const assets = [
        "kicaw.webm", "salah.webm",
        "birthday.mp3", "salah.mp3", "wish.mp3",
        "about.mp3", "dist.mp3", "vood.mp3", "it.mp3",
        "foto.mp3", "won.mp3", "maik.mp3", "hanap.mp3",
        "Album1.jpg", "album2.jpg", "album3.jpg", "album4.jpg",
        "album5.jpg", "album6.jpg", "album7.jpg", "album8.jpg", "seal.png"
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
        const detail = document.getElementById("loadingDetail");
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
        const screen = document.getElementById("loadingScreen");
        if (label) label.innerText = "Ready! ✨";
        const detail = document.getElementById("loadingDetail");
        if (detail) detail.innerText = "";
        setTimeout(() => {
            screen.classList.add("hide");
            setTimeout(() => screen.remove(), 800);
        }, 600);
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


const sandiList = ["101200"];
const lagu = document.getElementById("myLagu");
const kalimat = [
    "Happy birthday, Shantal! 🥳 Wishing you lots of happiness, good health, and more amazing memories. Enjoy your day!🎉💗 ------ [sef] as a friend"
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

function cek() {
    let input = document.getElementById("password").value.toLowerCase().trim();
    let v_utama = document.getElementById("vids-utama");
    let v_salah = document.getElementById("vids-salah");
    let suaraSalah = document.getElementById("audioSalah");

    if (sandiList.includes(input)) {
        tutupKeyboard();
        selebrasi();
        document.getElementById("page1").classList.remove("active");
        document.getElementById("page2").classList.add("active");
        lagu.play().catch(e => console.log("Audio butuh interaksi"));
        mulaiTyping();
        hujanKonfeti();
    } else {
        handleSandiSalah(v_utama, v_salah, suaraSalah);
    }
}

function tutupKeyboard() {
    document.activeElement.blur();
}

function handleSandiSalah(v_utama, v_salah, suaraSalah) {
    let label = document.getElementById("label");
    let box = document.querySelector("#page1 #formBox");

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
    document.getElementById("vids-utama").style.opacity = "1";
    document.getElementById("vids-salah").style.opacity = "0";
    document.getElementById("label").innerText = "Please enter the password...";

    let suaraSalah = document.getElementById("audioSalah");
    if (suaraSalah) {
        suaraSalah.pause();
        suaraSalah.currentTime = 0;
    }
});

document.getElementById("password").addEventListener("keypress", (e) => {
    if (e.key === "Enter") cek();
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
    if (i < kalimat.length) {
        let textEl = document.getElementById("text");
        let scrollBox = document.getElementById("scrollBox");

        if (j < kalimat[i].length) {
            const char = kalimat[i].charAt(j);

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
        let btn = document.getElementById("nextBtn");
        btn.disabled = false;
        btn.innerText = "Continue️🌻";
    }
}

function nextPage() {
    let btn = document.getElementById("nextBtn");
    btn.disabled = true;
    btn.innerText = "Please wait...";

    let vol = 1;
    let fadeOut = setInterval(() => {
        if (vol > 0) {
            vol = Math.max(0, vol - 0.05);
            lagu.volume = vol;
        } else {
            clearInterval(fadeOut);
            lagu.pause();
            lagu.currentTime = 0;

            setTimeout(() => {
                document.getElementById("page2").classList.remove("active");
                document.getElementById("page6").classList.add("active");

                const laguWish = document.getElementById("laguWish");
                if (laguWish) {
                    laguWish.currentTime = 0;
                    laguWish.play().catch(e => console.log("Wish audio needs interaction"));
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

function pindahHalaman(nomor) {
    const halamanSekarang = document.querySelector(".page.active");
    if (halamanSekarang) {
        halamanSekarang.classList.remove("active");
    }
    const target = document.getElementById("page" + nomor);
    if (target) {
        target.classList.add("active");
    }
    if (nomor === 7) {
        setTimeout(() => {
            updateAlbum();
        }, 300);
    }

    const laguUmur = document.getElementById("laguUmur");
    if (laguUmur) {
        if (nomor === 4 || nomor === 3 || nomor === 5) {
            if (laguUmur.paused) {
                laguUmur.play().catch(e => console.log("Audio needs interaction"));
            }
        } else {
            laguUmur.pause();
            laguUmur.currentTime = 0;
        }
    }

    // Lagu page 6
    const laguWish = document.getElementById("laguWish");
    if (nomor === 6) {
        laguWish.currentTime = 0;
        laguWish.play().catch(e => console.log("Wish audio needs interaction"));
    } else {
        laguWish.pause();
        laguWish.currentTime = 0;
    }

    const mainPlayer = document.getElementById("fullAudio");
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

function toggleSurat() {
    const wrapper = document.getElementById('amplopWrapper');
    const fakeLetter = document.querySelector('.letter');
    const realLetter = document.getElementById('realLetter');
    const hint = document.getElementById('hintKlik');
    const overlay = document.getElementById('overlay');

    // 1. buka amplop
    if (!wrapper.classList.contains('open')) {
        wrapper.classList.add('open');
        hint.innerText = "(Click again to pull the letter.)";
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
            document.getElementById('pageIndicator').innerText = '1 / ' + totalLembar;
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
        hint.innerText = "(Click on the envelope ✨)";
        suratSelesai = false;

        setTimeout(() => {
            const btn = document.getElementById("btnLanjut");
            if (!btn.classList.contains("show-btn")) {
                btn.innerText = "See One More Thing ✨";
                btn.onclick = () => pindahHalaman(5);
                btn.classList.add("show-btn");
            }
        }, 1000);
    }, 800);
}

function tutupSurat() {
    suratSelesai = true;
    toggleSurat();
}

// ================== LETTER PAGES ==================

let currentLembar = 1;
const totalLembar = 6;
let timerLembar;

function munculkanTombolLembar() {
    clearTimeout(timerLembar);

    const btnNext = document.getElementById("btnNextLetter");
    const btnPrev = document.getElementById("btnPrev");

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
        btnNext.onclick = () => tutupSurat();
    } else {
        btnNext.innerText = "Next →";
        btnNext.style.display = "block";
        btnNext.onclick = () => gantiLembar(1);
    }

    timerLembar = setTimeout(() => {
        btnNext.disabled = false;
        btnNext.classList.add("btn-visible");
    }, 2500);
}

function gantiLembar(arah) {
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

        document.getElementById("pageIndicator").innerText = currentLembar + " / " + totalLembar;
        munculkanTombolLembar();
    }, 300);
}

// ================== UMUR ==================

const birthDate = new Date("2008-08-20T12:00:00");

let intervalUmur;

function startUmur() {
    if (intervalUmur) return;

    intervalUmur = setInterval(updateUmur, 52);

    const btn = document.getElementById("btnUmur");
    const hasil = document.getElementById("umurResult");
    const header = document.getElementById("umurHeader");

    btn.style.display = "none";
    header.classList.add("hide");

    const box = document.querySelector("#page4 #formBox");
    box.classList.remove("drop-anim");
    void box.offsetWidth;
    box.classList.add("drop-anim");

    hasil.innerHTML = "";

    setTimeout(() => {
        hasil.classList.remove("umur-hidden");
        hasil.classList.add("umur-show", "focus-mode");

        updateUmur();

        setTimeout(() => {
            document.getElementById("btnNext").classList.add("show-btn");
        }, 2000);
    }, 500);
}

let pesanTypingTimer;

function lanjutPesan() {
    const text = `
Look at how far you’ve come.

Do you realize how long you’ve managed to keep going? You’ve made it this far, and it wasn’t just by coincidence.

All the exhaustion, all the pain, all those difficult days you’ve been through, they were real. So please, don’t underestimate yourself just because you’re tired right now.

It’s okay to rest, but giving up would be too small of a choice for everything you’ve fought through until now.

Take it slowly. 🤍
`;

    const el = document.getElementById("pesanMotivasi");
    const overlay = document.getElementById("pesanOverlay");

    // Tampilkan overlay dulu
    overlay.classList.add("show");

    // Reset text
    el.innerHTML = "";

    // Pisahkan berdasarkan paragraf
    const paragraphs = text.trim().split(/\n\s*\n/);

    let paragraphIndex = 0;

    function typeParagraph() {
        if (paragraphIndex >= paragraphs.length) {
            return;
        }

        const paragraph = paragraphs[paragraphIndex].trim();

        const p = document.createElement("p");
        el.appendChild(p);

        let charIndex = 0;

        function typeChar() {
            if (charIndex < paragraph.length) {
                p.textContent += paragraph.charAt(charIndex);
                charIndex++;

                const char = paragraph.charAt(charIndex - 1);

                // Kecepatan mengetik
                let delay = 38;

                // Pause lebih lama pada punctuation
                if (char === ",") delay = 180;
                if (char === ".") delay = 450;
                if (char === "!") delay = 500;
                if (char === "?") delay = 500;

                pesanTypingTimer = setTimeout(typeChar, delay);

                // Auto-scroll mengikuti cerita
                p.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });

            } else {
                paragraphIndex++;

                // Pause antar paragraf
                pesanTypingTimer = setTimeout(typeParagraph, 1000);
            }
        }

        typeChar();
    }

    // Mulai storytelling
    setTimeout(typeParagraph, 500);
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

    document.getElementById("umurResult").innerHTML = `
    <div class="hasil-box">
        <h3>Your Age</h3>
        <div class="umur-utama">
            ${years} years ${months} months ${days} days
        </div>
    </div>

    <div class="hasil-box">
        <h3>You Have Lived</h3>

        <div class="row">
            <span>Years</span>
            <b>${totalYears}</b>
        </div>

        <div class="row">
            <span>Month</span>
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
            <span>Miliseconds</span>
            <b>${totalMs}</b>
        </div>
    </div>
`;
}

function kembaliUmur() {
    document.getElementById("pesanOverlay").classList.remove("show");
}

function nextDariPesan() {
    document.getElementById("pesanOverlay").classList.remove("show");
    pindahHalaman(3);
}

function kirimJawaban(pilihan) {
    var nomorWA = "6283861084598";
    var pesan = "Hai! Aku baru selesai buka websitenya, dan aku pilih hadiah: " + pilihan;
    var url = "https://wa.me/" + nomorWA + "?text=" + encodeURIComponent(pesan);
    window.open(url, '_blank');
    pindahHalaman(6);
}

// ===== MAKE A WISH =====
function tiupLilin(n) {
    const api = document.getElementById("api" + n);
    const lilin = document.getElementById("lilin" + n);

    if (!api || !lilin) return;
    if (api.classList.contains("mati")) return;

    // Haptic feedback
    if (navigator.vibrate) navigator.vibrate(40);

    api.classList.add("mati");
    lilin.style.cursor = "default";

    confetti({
        particleCount: 8,
        spread: 35,
        origin: { x: 0.5, y: 0.55 },
        colors: ['#ff4d6d', '#ffccd5'],
        scalar: 0.6,
        ticks: 80
    });

    const semuaApi = document.querySelectorAll(".api");
    const semuaMatiSudah = [...semuaApi].every(api => api.classList.contains("mati"));

    if (semuaMatiSudah) {
        // Haptic panjang saat semua lilin mati
        if (navigator.vibrate) navigator.vibrate([60, 80, 60, 80, 120]);
        semuaMati();
    }
}

function semuaMati() {
    document.getElementById("wishHint").style.opacity = "0";

    setTimeout(() => {
        confetti({ particleCount: 60, spread: 65, origin: { x: 0.3, y: 0.6 }, gravity: 0.9, ticks: 200, scalar: 0.9 });
        confetti({ particleCount: 60, spread: 65, origin: { x: 0.7, y: 0.6 }, gravity: 0.9, ticks: 200, scalar: 0.9 });
    }, 200);

    // wishMsg muncul duluan
    setTimeout(() => {
        document.getElementById("wishMsg").classList.add("show");
    }, 1200);

    // tombol muncul SETELAH wishMsg sudah show
    setTimeout(() => {
        document.getElementById("btnWishLanjut").classList.add("show-btn");
    }, 1800);
}

function lanjutKePlaylist() {
    const btn = document.getElementById("btnWishLanjut");
    const laguWish = document.getElementById("laguWish");

    btn.disabled = true;
    btn.innerText = "Tunggu sebentar...";

    let volume = 1;

    const fade = setInterval(() => {
        if (volume > 0.05) {
            volume -= 0.05;
            laguWish.volume = volume;
        } else {
            clearInterval(fade);
            laguWish.pause();
            laguWish.currentTime = 0;
            laguWish.volume = 1;
        }
    }, 70);

    setTimeout(() => {
        pindahHalaman(7);
        btn.disabled = false;
        btn.innerText = "Lanjut ✨";
    }, 0);
}

// ===== ALBUM SLIDER =====
let currentAlbum = 0;
let selectedSong = "";
let selectedStart = 0;

const previewAudio = document.getElementById("previewAudio");
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

const fullAudio = document.getElementById("fullAudio");

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

function prevAlbum() {
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
