# Acne Vision
<img src="assets/img/doctor-aloe.png" alt="Dr. Aloe, the Acne Vision mascot" width="200">
An interactive website that helps people work out what type of acne they have and find products suited to it. Take a short skin quiz, get a result page for your acne type, and browse product recommendations. Create an account to save your quiz result and keep a private skincare journal.

**This was a group project.** It was built by a team of three for the course COMP 3450, and credit is shared by all three authors: Magdala Nwuke, Fabeeha Anbar Ahmed and Oyinkansola Olarerin.

**Live demo:** _add the link here once the site is deployed_

**Try it:** sign up with any username and a password of 8+ characters (no email needed), then take the quiz. You need to be logged in so your result can be saved.

## What it does

- **Skin quiz:** 7 questions, each with a picture, that point toward one of three acne types: hormonal, cystic or fungal
- **Result pages:** after the quiz you are taken to a page for your acne type, with product recommendations
- **Products page:** browse recommended products for each acne type, with links to the shops that sell them
- **Accounts:** sign up and log in with a username and password (Firebase Authentication)
- **Saved results:** a logged-in user's quiz result is saved to their account. If you are not logged in, the Dr. Aloe mascot asks you to sign up first
- **Private journal:** write skincare journal entries that are saved to your account and shown in your past entries
- **Profile page** with log out
- **Dr. Aloe**, our mascot, who walks onto the home page and gives tips and speech bubbles around the site

## How the quiz works

Every answer option is tagged with an acne type. As you pick answers, the site keeps a running count for hormonal, cystic and fungal. When you submit, the type with the most answers wins and you are sent to that type's result page. If two types tie, you are sent to the fungal page.

## Technologies

- HTML, CSS and JavaScript
- Bootstrap 5, from the Active template by BootstrapMade (see Credits)
- Firebase Authentication for sign up and log in
- Cloud Firestore for users, quiz results and journal entries

## Run it locally

The site is plain static files, so you only need a simple local web server:

1. Clone the repository and open the project folder in a terminal.
2. Run `python3 -m http.server 8000`.
3. Open `http://localhost:8000` in your browser.

The pages connect to Firebase over the internet, so you need to be online.

**Using your own Firebase project**
1. Create a Firebase project, turn on **Email/Password** sign-in, and create a Firestore database.
2. Publish the rules in `firestore.rules` and the index in `firestore.indexes.json`.
3. Replace the `firebaseConfig` values in `login.html`, `signup.html`, `myjournal.html`, `profile.html` and `assets/js/quiz.js` with your project's values.

## Data and privacy

Each user's quiz result and journal entries are stored under their own account, and `firestore.rules` lets a user read and write only their own data. Passwords are handled by Firebase Authentication, and the site never stores them itself. The Firebase configuration values in the page code only identify the project. Access is controlled by the security rules, not by keeping those values secret.

## Known limitations

- The review form and the newsletter box are front-end only and are not connected to a backend yet.
- The journal's progress photo upload is not saved yet. Only text entries are stored.
- Product links go to outside shops, so they may change or stop working over time.
- This is a student project for learning. It is not medical advice, and anyone with persistent or severe acne should see a doctor or dermatologist.

## Credits

- **Team:** Magdala Nwuke, Fabeeha Anbar Ahmed and Oyinkansola Olarerin (COMP 3450)
- **Fabeeha's part:** the private journal feature (saved with Firebase), plus front-end pages and design
- **Template:** the site layout started from the [Active Bootstrap template](https://bootstrapmade.com/active-bootstrap-website-template/) by BootstrapMade. Our team customized it and added the quiz, accounts, journal, product pages and content.

## Screenshots

_Add 2 to 3 screenshots here (home page, quiz question, result page, journal)._
