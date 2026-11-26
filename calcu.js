let audioContext;

function playSound(type = "click") {

    if (!audioContext) {
        audioContext = new (
            window.AudioContext ||
            window.webkitAudioContext
        )();
    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    // Different tones for different buttons
    let frequency = 650;

    if (type === "number") {
        frequency = 600;
    }

    if (type === "operator") {
        frequency = 850;
    }

    if (type === "clear") {
        frequency = 450;
    }

    if (type === "equal") {
        frequency = 1050;
    }

    if (type === "backspace") {
        frequency = 380;
    }

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
        frequency,
        audioContext.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        frequency * 1.5,
        audioContext.currentTime + 0.09
    );

    gain.gain.setValueAtTime(
        0.0001,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.15,
        audioContext.currentTime + 0.01
    );

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.16
    );

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 0.17
    );
}


function insert(num) {

    let total = document.form1.textview.value;

    playSound(
        isNaN(num) && num !== "."
        ? "operator"
        : "number"
    );

    if (total === "Error") {
        total = "";
    }

    document.form1.textview.value = total + num;

}


function equal() {

    playSound("equal");

    let total = document.form1.textview.value;

    if (total.trim() !== "") {

        try {

            let result = eval(total);

            if (!Number.isFinite(result)) {
                throw new Error("Invalid calculation");
            }

            document.form1.textview.value = result;

        } catch (error) {

            document.form1.textview.value = "Error";

        }

    }

}


function backspace() {

    playSound("backspace");

    let total = document.form1.textview.value;

    if (total === "Error") {
        document.form1.textview.value = "";
        return;
    }

    document.form1.textview.value = total.slice(0, -1);

}


function clearDisplay() {

    playSound("clear");

    document.form1.textview.value = "";

}
