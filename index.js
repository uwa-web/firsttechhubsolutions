
       // --- SCRIPT FOR COUNTDOWN TIMER ---
document.addEventListener('DOMContentLoaded', function () {
    const timerElement = document.getElementById("timer");
    if (!timerElement) return;

    // Early bird ends Monday night before course starts on Tuesday, July 29
    const countDownDate = new Date("July 28, 2025 23:59:59").getTime();

    function pad(num) {
        return num < 10 ? "0" + num : num;
    }

    const timerInterval = setInterval(function () {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            timerElement.innerHTML = "OFFER EXPIRED";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerElement.innerHTML =
            pad(days) + "D " +
            pad(hours) + "H " +
            pad(minutes) + "M " +
            pad(seconds) + "S";
    }, 1000);
});


        // --- SCRIPT FOR FAQ ACCORDION ---
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                // Toggle the clicked item
                const isActive = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // If the item was not active, open it
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });