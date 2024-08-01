const startButton = document.getElementById('startButton');
const daysInput = document.getElementById('daysInput');
const hoursInput = document.getElementById('hoursInput');
const minutesInput = document.getElementById('minutesInput');
const daysSpan = document.getElementById('days');
const hoursSpan = document.getElementById('hours');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');
const endSound = document.getElementById('endSound');

let countdownInterval;

startButton.addEventListener('click', () => {
    const days = parseInt(daysInput.value, 10);
    const hours = parseInt(hoursInput.value, 10);
    const minutes = parseInt(minutesInput.value, 10);

    const targetTime = new Date();
    targetTime.setDate(targetTime.getDate() + days);
    targetTime.setHours(targetTime.getHours() + hours);
    targetTime.setMinutes(targetTime.getMinutes() + minutes);

    clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        const now = new Date();
        const timeDifference = targetTime - now;

        if (timeDifference <= 0) {
            clearInterval(countdownInterval);
            endSound.play();
            Swal.fire({
                title: 'Countdown Complete!',
                text: 'The timer has reached zero.',
                icon: 'success',
                background: '#1e1e1e',
                color: '#0ff',
                confirmButtonColor: '#0cc',
                confirmButtonText: 'Awesome!',
                customClass: {
                    popup: 'swal2-neon',
                    title: 'swal2-title-neon',
                    confirmButton: 'swal2-button-neon'
                }
            });
            return;
        }

        const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const remainingHours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        daysSpan.textContent = remainingDays.toString().padStart(2, '0');
        hoursSpan.textContent = remainingHours.toString().padStart(2, '0');
        minutesSpan.textContent = remainingMinutes.toString().padStart(2, '0');
        secondsSpan.textContent = remainingSeconds.toString().padStart(2, '0');
    }, 1000);
});
