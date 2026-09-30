# Student Registration Portal

## Assignment Stack
- HTML5
- CSS3
- Bootstrap 5
- jQuery
- Basic JavaScript + Regular Expressions

## Project Structure
Student Registration Portal/
│
├── index.html
├── css/
│   └── style.css
└── js/
    └── script.js

## Main Features
1. Responsive navbar with Home, Courses, Registration and Student Records.
2. Home heading uses jQuery fadeIn().
3. Home visual uses jQuery slideDown().
4. Course descriptions are hidden initially and use toggle().
5. Change Theme button uses toggleClass() and the project also contains addClass()/removeClass() usage.
6. Registration form has Full Name, Email, Phone, Password, Confirm Password and Course.
7. Real-time validation uses keyup() and blur().
8. Regex patterns validate name, email and 11-digit phone.
9. Invalid fields get a red border and red message below the field.
10. Form submission uses submit() and preventDefault().
11. Registration only succeeds when all fields are valid.
12. Successful registration shows a jQuery fadeIn() success message.
13. Student information is added dynamically using append().
14. Each record has a Delete button.
15. Delete uses fadeOut() and remove().
16. jQuery is loaded through CDN.

## How to Run
Open `index.html` in a browser while connected to the internet so the Bootstrap and jQuery CDNs can load.

## Note
The assignment's validation requirements mention Email and the student-record example includes Email/Course, so the form includes both fields along with the explicitly listed registration fields.
