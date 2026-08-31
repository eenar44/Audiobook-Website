// Loading the navbar from an external file
fetch("navbar.html")
    .then(response => response.text())
    // Replace the content of the placeholder with the fetched HTML
    .then(data => {
        document.getElementById("navbar-placeholder").innerHTML = data;

        // Store the original nav for later restoration
        let $navContainer = $("#nav-bar");
        let originalNav = $navContainer.html(); // Save the full nav container

        function initializeMenu() {
            let windowWidth = window.innerWidth;
            console.log("Window resized. Width:", windowWidth);

            // Check if the window width is less than or equal to 767px
            if (windowWidth <= 767) {
                if (!$(".slicknav_menu").length) {
                    $("#nav-bar ul").slicknav({
                        prependTo: "header",
                        label: "",
                        closeOnClick: true,
                        allowParentLinks: true,
                    });
                    $navContainer.hide(); // Hide original nav
                }
            } else {
                if ($(".slicknav_menu").length) {
                    $(".slicknav_menu").remove(); // Remove SlickNav menu
                    $navContainer.html(originalNav); // Restore the original nav
                }
                $navContainer.show(); // Ensure the nav bar is visible
            }
        }

        // Run the function after loading the navbar
        setTimeout(() => {
            initializeMenu();
            $(window).on("resize", initializeMenu);
        }, 100);
    });

// Loading the footer from an external file
fetch("footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer-placeholder").innerHTML = data;
    });


// Regiteration form
$(document).ready(function () {
    $("#register-form").submit(function (event) {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        let name = $("input[type='text']").val().trim();
        let email = $("input[type='email']").val().trim();
        let phone = $("input[type='tel']").val().trim();
        let address = $("input[type='text']").val().trim();
        let emailPromo = $("input[type='checkbox']").eq(0).prop("checked");
        let smsPromo = $("input[type='checkbox']").eq(1).prop("checked");
        let termsAccepted = $("input[type='checkbox']").eq(2).prop("checked");

        // Reset previous error messages
        $(".error-message").remove();

        // Validate form data
        let isValid = true;

        // Name validation
        if (name === "") {
            $("input[type='text']").after("<p class='error-message' style='color:red;'>Name is required.</p>");
            isValid = false;
        }

        if (address === "") {
            $("input[type='text']").after("<p class='error-message' style='color:red;'>Address is required.</p>");
            isValid = false;
        }

        // Email validation (basic regex)
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "" || !emailPattern.test(email)) {
            $("input[type='email']").after("<p class='error-message' style='color:red;'>Enter a valid email.</p>");
            isValid = false;
        }

        // Phone validation (basic pattern)
        let phonePattern = /^[0-9+\-\s]+$/;
        if (phone === "" || !phonePattern.test(phone)) {
            $("input[type='tel']").after("<p class='error-message' style='color:red;'>Enter a valid phone number.</p>");
            isValid = false;
        }

        // Ensure at least one promotional method is selected
        if (!emailPromo && !smsPromo) {
            $("label").eq(0).before("<p class='error-message' style='color:red;'>Select at least one promo option.</p>");
            isValid = false;
        }

        // Ensure T&Cs checkbox is checked
        if (!termsAccepted) {
            $("label").last().before("<p class='error-message' style='color:red;'>You must accept the T&Cs.</p>");
            isValid = false;
        }

        if (isValid) {
            // Simulating data collection
            let formData = {
                name: name,
                email: email,
                phone: phone,
                address: address,
                promoEmail: emailPromo,
                promoSMS: smsPromo,
                termsAccepted: termsAccepted
            };

            // Print form data to console
            console.log("Form Data Collected:", formData);

            // Show success message
            $("#register-form").fadeOut(500, function () {
                $("#message-container").html("<p>Thank you for registering!</p>").fadeIn();
            });
        }
    });
});


// Contact us form on home page
$(document).ready(function () {
    $("#contact-form").submit(function (event) {
        event.preventDefault(); // Prevent form submission

        // Simulate a successful form submission
        $("#contact-form").fadeOut(500, function () {
            $("#contact-message").html("<p>Thank you for reaching out! We'll get back to you soon.</p>")
                .css({ "font-size": "1.2em", "font-weight": "bold", "text-align": "center", "opacity": "0" })
                .fadeIn(500)
                .animate({ opacity: "1" }, 500);
        });
    });
});

// Scrollable section arrows Functionality
document.addEventListener("DOMContentLoaded", function () {
    const scrollWrapper = document.querySelector(".scroll-wrapper");
    const scrollLeftBtn = document.getElementById("scroll-left");
    const scrollRightBtn = document.getElementById("scroll-right");

    scrollLeftBtn.addEventListener("click", function () {
        scrollWrapper.scrollBy({ left: -300, behavior: "smooth" });
    });

    scrollRightBtn.addEventListener("click", function () {
        scrollWrapper.scrollBy({ left: 300, behavior: "smooth" });
    });
});

// advert reel on home page
const adverts = [
    {
        title: "Today's Best Seller...",
        imgSrc: "Graphics/Books/To_Kill_a_Mockingbird-Harper_Lee.jpg"
    },
    {
        title: "Summer Sale 50% Off!",
        imgSrc: "Graphics/Icons/summer_sale_icon.png"
    },
    {
        title: "Join Our Book Club!",
        imgSrc: "Graphics/Icons/Online_Listening_Party_icon.png"
    },
    {
        title: "Our Loyalty Programs!",
        imgSrc: "Graphics/Icons/loyalty_program.jpg"
    }
];

let currentIndex = 0;
const advertTitle = document.getElementById("advert-title");
const advertImg = document.getElementById("advert-img");

function updateAdvert() {
    currentIndex = (currentIndex + 1) % adverts.length;

    // Fade out
    advertTitle.style.opacity = 0;
    advertImg.style.opacity = 0;

    setTimeout(() => {
        // Change content
        advertTitle.textContent = adverts[currentIndex].title;
        advertImg.src = adverts[currentIndex].imgSrc;

        // Fade in
        advertTitle.style.opacity = 1;
        advertImg.style.opacity = 1;
    }, 1500); // Wait for fade out before changing
}

// Change advert every 4 seconds
setInterval(updateAdvert, 4000);
