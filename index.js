
        // --- COUNTDOWN TIMER ---
        document.addEventListener('DOMContentLoaded', function () {
            const timerElement = document.getElementById("timer");
            if (!timerElement) return;

            const countDownDate = new Date("December 31, 2025 23:59:59").getTime();

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

        // --- FAQ ACCORDION ---
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
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

        // --- PAYSTACK PAYMENT FUNCTIONS ---
        function payWithPaystack(email, fullName, phone, redirectUrl = 'thank-you.html') {
            if (!email || email.trim() === '') {
                alert('Please enter your email address');
                return;
            }

            let handler = PaystackPop.setup({
                key: 'pk_live_bdf6dafe3e7ac259f7535b3a032b14bcfaa3682e', // Replace with your actual public key
                email: email,
                amount: 10450 * 100, // ₦10,149 in kobo (including transaction fee)
                currency: "NGN",
                ref: '' + Math.floor(Math.random() * 1000000000 + 1),
                metadata: {
                    custom_fields: [
                        {
                            display_name: "Full Name",
                            variable_name: "full_name",
                            value: fullName
                        },
                        {
                            display_name: "Phone Number",
                            variable_name: "phone",
                            value: phone
                        }
                    ]
                },
                callback: function (response) {
                    alert('Payment complete! Reference: ' + response.reference);
                    // Redirect to thank you page
                    window.location.href = redirectUrl;
                },
                onClose: function () {
                    alert('Transaction was not completed, window closed.');
                }
            });
            handler.openIframe();
        }

        // --- EVENT LISTENERS FOR PAY BUTTONS ---
        document.getElementById("heroPayBtn").addEventListener("click", function() {
            document.getElementById("heroFormContainer").style.display = "block";
        });

        document.getElementById("urgencyPayBtn").addEventListener("click", function() {
            document.getElementById("urgencyFormContainer").style.display = "block";
        });

        // --- HIDDEN FORM FUNCTIONALITY ---
        const openFormBtn = document.getElementById("openFormBtn");
        const formContainer = document.getElementById("formContainer");
        const closeForm = document.getElementById("closeForm");
        const paymentForm = document.getElementById("paymentForm");

        // Hero Form Elements
        const heroFormContainer = document.getElementById("heroFormContainer");
        const closeHeroForm = document.getElementById("closeHeroForm");
        const heroPaymentForm = document.getElementById("heroPaymentForm");

        // Urgency Form Elements
        const urgencyFormContainer = document.getElementById("urgencyFormContainer");
        const closeUrgencyForm = document.getElementById("closeUrgencyForm");
        const urgencyPaymentForm = document.getElementById("urgencyPaymentForm");

        // Show main form when button is clicked
        openFormBtn.addEventListener("click", () => {
            formContainer.style.display = "block";
        });

        // Hide forms when close button is clicked
        closeForm.addEventListener("click", () => {
            formContainer.style.display = "none";
        });

        closeHeroForm.addEventListener("click", () => {
            heroFormContainer.style.display = "none";
        });

        closeUrgencyForm.addEventListener("click", () => {
            urgencyFormContainer.style.display = "none";
        });

        // Close forms when clicking outside the checkout container
        window.addEventListener("click", function(event) {
            if (event.target === formContainer) {
                formContainer.style.display = "none";
            }
            if (event.target === heroFormContainer) {
                heroFormContainer.style.display = "none";
            }
            if (event.target === urgencyFormContainer) {
                urgencyFormContainer.style.display = "none";
            }
        });

        // Handle Hero form submission
        heroPaymentForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const fullName = document.getElementById("heroName").value;
            const phone = document.getElementById("heroPhone").value;
            const email = document.getElementById("heroEmail").value;

            // Validate form fields
            if (!fullName || !phone || !email) {
                alert('Please fill in all fields');
                return;
            }

            heroFormContainer.style.display = "none";
            payWithPaystack(email, fullName, phone, 'thank-you.html');
        });

        // Handle Urgency form submission
        urgencyPaymentForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const fullName = document.getElementById("urgencyName").value;
            const phone = document.getElementById("urgencyPhone").value;
            const email = document.getElementById("urgencyEmail").value;

            // Validate form fields
            if (!fullName || !phone || !email) {
                alert('Please fill in all fields');
                return;
            }

            urgencyFormContainer.style.display = "none";
            payWithPaystack(email, fullName, phone, 'thank-you.html');
        });

        // Handle main form submission
        paymentForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const fullName = document.getElementById("name").value;
            const phone = document.getElementById("phone").value;
            const email = document.getElementById("formEmail").value;

            // Validate form fields
            if (!fullName || !phone || !email) {
                alert('Please fill in all fields');
                return;
            }

            formContainer.style.display = "none";
            payWithPaystack(email, fullName, phone, 'thank-you.html');
        });
   

