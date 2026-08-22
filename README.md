# AidenMunger.com — Feedback Site

This version gives visitors a polished "Rate Your Experience With Aiden" form and stores every response in a Google Sheet.

## Setup

### 1. Create the database
Create a blank Google Sheet. You can name it `Aiden Feedback`.

### 2. Add the backend
In the Sheet, go to **Extensions → Apps Script**.

Replace the default code with `google-apps-script.js` from this folder.

Click **Deploy → New deployment**.
- Type: **Web app**
- Execute as: **Me**
- Who has access: **Anyone**

Copy the Web app URL.

### 3. Connect the website
Open `script.js` and replace:

`PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`

with your Web app URL.

### 4. Put it on GitHub Pages
Upload `index.html`, `style.css`, and `script.js` to your GitHub Pages repository.

Your Google Sheet becomes the private dashboard where all responses are stored.

## Important
Do not put private API keys in the frontend. This setup uses a Google Sheet + Apps Script, so the site can stay static and work with GitHub Pages.
