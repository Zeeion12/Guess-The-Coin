let flipCount = 0;
let currentSide = "";
let isFlipping = false;

document.getElementById("flip-button").addEventListener("click", flipCoin);
document.getElementById("guess-heads").addEventListener("click", () => checkGuess("heads"));
document.getElementById("guess-tails").addEventListener("click", () => checkGuess("tails"));

function flipCoin() {
    if (isFlipping) return;
    isFlipping = true;

    const coin = document.getElementById("coin");
    const overlay = document.getElementById("overlay");
    const randomSide = Math.random() > 0.5 ? "heads" : "tails";
    currentSide = randomSide;

    // Show overlay
    overlay.style.display = "flex";

    // Remove previous classes
    coin.classList.remove("heads", "tails");

    // Reset transform before starting a new animation
    coin.style.transform = "rotateY(0deg) translateY(0)";

    // Animate coin flip
    setTimeout(() => {
        coin.style.transition = "transform 1s ease-in-out";
        coin.style.transform = `rotateY(${1800 + (randomSide === "heads" ? 0 : 180)}deg) translateY(-200px)`;
        setTimeout(() => {
            coin.style.transform = `rotateY(${1800 + (randomSide === "heads" ? 0 : 180)}deg) translateY(0)`;
            setTimeout(() => {
                // Apply the final class based on randomSide
                coin.classList.add(randomSide);
                isFlipping = false;
            }, 1000);
        }, 200);
    }, 500);
}

function checkGuess(guess) {
    if (isFlipping) return;

    flipCount++;
    const message = document.getElementById("message");
    const overlay = document.getElementById("overlay");

    // Hide overlay
    overlay.style.display = "none";

    if (flipCount === 3) {
        // Tampilkan jumpscare video pada percobaan ke-3
        const jumpscareVideo = document.createElement("video");
        jumpscareVideo.src = "Sesuatu.mp4";
        jumpscareVideo.style.position = "fixed";
        jumpscareVideo.style.top = "0";
        jumpscareVideo.style.left = "0";
        jumpscareVideo.style.width = "100%";
        jumpscareVideo.style.height = "100%";
        jumpscareVideo.style.objectFit = "cover";
        jumpscareVideo.style.zIndex = "9999";

        document.body.appendChild(jumpscareVideo);
        jumpscareVideo.play();

        setTimeout(() => {
            document.body.removeChild(jumpscareVideo);
            flipCount = 0;  // Reset permainan
            message.textContent = "";
        }, 8000);  // Durasi jumpscare 8 detik
    } else {
        if (guess === currentSide) {
            message.textContent = "Selamat kamu benar!";
        } else {
            message.textContent = "Yaah kamu salah!";
        }
    }
}

// Ganti fungsi auto-play background audio
window.addEventListener('load', function() {
    const audio = document.getElementById('background-audio');
    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // Autoplay berhasil
            console.log('Autoplay berhasil');
        }).catch(error => {
            // Autoplay tidak diizinkan
            console.log('Autoplay tidak diizinkan: ' + error);
            // Tambahkan tombol untuk memulai audio secara manual
            createPlayButton();
        });
    }
});

function createPlayButton() {
    const playButton = document.createElement('button');
    playButton.textContent = 'Putar Musik';
    playButton.style.position = 'fixed';
    playButton.style.bottom = '20px';
    playButton.style.right = '20px';
    playButton.style.zIndex = '1000';
    
    playButton.addEventListener('click', function() {
        const audio = document.getElementById('background-audio');
        audio.play();
        this.remove(); // Hapus tombol setelah diklik
    });

    document.body.appendChild(playButton);
}