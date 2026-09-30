$(document).ready(function () {

    // Home animations required in the assignment
    $("#heroHeading").hide().fadeIn(1200);
    $("#heroImage").hide().slideDown(1000);

    // Read More: show/hide each course description
    $(".read-more-btn").click(function () {
        var description = $(this).siblings(".course-description");
        var icon = $(this).find("i");

        description.toggle(300);

        if (description.is(":visible")) {
            $(this).contents().first()[0].textContent = "Read Less ";
            icon.removeClass("bi-chevron-down").addClass("bi-chevron-up");
        } else {
            $(this).contents().first()[0].textContent = "Read More ";
            icon.removeClass("bi-chevron-up").addClass("bi-chevron-down");
        }
    });

    // Theme change using addClass/removeClass/toggleClass
    $("#themeBtn").click(function () {
        $("body").toggleClass("alt-theme");

        if ($("body").hasClass("alt-theme")) {
            $(this).html('<i class="bi bi-sun-fill"></i> Original Theme');
        } else {
            $(this).html('<i class="bi bi-moon-stars-fill"></i> Change Theme');
        }
    });

    // Validation helper
    function showError(input, errorBox, message) {
        $(input).removeClass("input-success").addClass("input-error");
        $(errorBox).text(message);
    }

    function showSuccess(input, errorBox) {
        $(input).removeClass("input-error").addClass("input-success");
        $(errorBox).text("");
    }

    function validateName() {
        var name = $("#fullName").val().trim();
        var namePattern = /^[A-Za-z ]+$/;

        if (name === "") {
            showError("#fullName", "#nameError", "Full name is required.");
            return false;
        } else if (!namePattern.test(name)) {
            showError("#fullName", "#nameError", "Name can contain alphabets and spaces only.");
            return false;
        } else {
            showSuccess("#fullName", "#nameError");
            return true;
        }
    }

    function validateEmail() {
        var email = $("#email").val().trim();
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            showError("#email", "#emailError", "Email is required.");
            return false;
        } else if (!emailPattern.test(email)) {
            showError("#email", "#emailError", "Enter a valid email address.");
            return false;
        } else {
            showSuccess("#email", "#emailError");
            return true;
        }
    }

    function validatePhone() {
        var phone = $("#phone").val().trim();
        var phonePattern = /^[0-9]{11}$/;

        if (phone === "") {
            showError("#phone", "#phoneError", "Phone number is required.");
            return false;
        } else if (!phonePattern.test(phone)) {
            showError("#phone", "#phoneError", "Phone number must contain exactly 11 digits.");
            return false;
        } else {
            showSuccess("#phone", "#phoneError");
            return true;
        }
    }

    function validatePassword() {
        var password = $("#password").val();

        if (password === "") {
            showError("#password", "#passwordError", "Password is required.");
            return false;
        } else if (password.length < 8) {
            showError("#password", "#passwordError", "Password must be at least 8 characters.");
            return false;
        } else {
            showSuccess("#password", "#passwordError");
            return true;
        }
    }

    function validateConfirmPassword() {
        var password = $("#password").val();
        var confirmPassword = $("#confirmPassword").val();

        if (confirmPassword === "") {
            showError("#confirmPassword", "#confirmPasswordError", "Please confirm your password.");
            return false;
        } else if (confirmPassword !== password) {
            showError("#confirmPassword", "#confirmPasswordError", "Passwords do not match.");
            return false;
        } else {
            showSuccess("#confirmPassword", "#confirmPasswordError");
            return true;
        }
    }

    function validateCourse() {
        var course = $("#course").val();

        if (course === "") {
            showError("#course", "#courseError", "Please select a course.");
            return false;
        } else {
            showSuccess("#course", "#courseError");
            return true;
        }
    }

    // Real-time validation using keyup()
    $("#fullName").on("keyup", validateName);
    $("#email").on("keyup", validateEmail);
    $("#phone").on("keyup", validatePhone);
    $("#password").on("keyup", validatePassword);
    $("#confirmPassword").on("keyup", validateConfirmPassword);

    // blur() validation
    $("#fullName").on("blur", validateName);
    $("#email").on("blur", validateEmail);
    $("#phone").on("blur", validatePhone);
    $("#password").on("blur", validatePassword);
    $("#confirmPassword").on("blur", validateConfirmPassword);
    $("#course").on("blur", validateCourse);

    // Keep phone field numeric only
    $("#phone").on("input", function () {
        var value = $(this).val();
        $(this).val(value.replace(/[^0-9]/g, ""));
    });

    // Form submission
    $("#registrationForm").submit(function (event) {
        event.preventDefault();

        var isNameValid = validateName();
        var isEmailValid = validateEmail();
        var isPhoneValid = validatePhone();
        var isPasswordValid = validatePassword();
        var isConfirmValid = validateConfirmPassword();
        var isCourseValid = validateCourse();

        if (
            isNameValid &&
            isEmailValid &&
            isPhoneValid &&
            isPasswordValid &&
            isConfirmValid &&
            isCourseValid
        ) {
            var name = $("#fullName").val().trim();
            var email = $("#email").val().trim();
            var course = $("#course").val();

            // Remove empty state
            $("#emptyRow").remove();

            // Dynamic table row using append()
            var newRow = `
                <tr>
                    <td><strong>${escapeHtml(name)}</strong></td>
                    <td>${escapeHtml(email)}</td>
                    <td><span class="badge rounded-pill text-bg-light">${escapeHtml(course)}</span></td>
                    <td>
                        <button type="button" class="delete-btn">
                            <i class="bi bi-trash3"></i> Delete
                        </button>
                    </td>
                </tr>
            `;

            $("#studentTableBody").append(newRow);

            // Success message with fadeIn()
            $("#successMessage").stop(true, true).hide().fadeIn(500);

            // Reset form after successful registration
            $("#registrationForm")[0].reset();
            $(".form-control, .form-select").removeClass("input-success input-error");
            $(".error-message").text("");

            setTimeout(function () {
                $("#successMessage").fadeOut(500);
            }, 3500);
        } else {
            // Show a general error if anything is missing/invalid
            $("#successMessage").stop(true, true).hide();
        }
    });

    // Delete dynamically created student record
    $("#studentTableBody").on("click", ".delete-btn", function () {
        var row = $(this).closest("tr");

        row.fadeOut(400, function () {
            $(this).remove();

            // Show empty state if there are no records
            if ($("#studentTableBody tr").length === 0) {
                $("#studentTableBody").append(`
                    <tr id="emptyRow">
                        <td colspan="4" class="empty-records">
                            <i class="bi bi-inbox"></i>
                            <span>No student records yet.</span>
                        </td>
                    </tr>
                `);
            }
        });
    });

    // Simple HTML escaping for table data
    function escapeHtml(text) {
        return $("<div>").text(text).html();
    }

    // Close mobile navbar after clicking a link
    $(".navbar-nav .nav-link").click(function () {
        $(".navbar-collapse").removeClass("show");
    });

});
