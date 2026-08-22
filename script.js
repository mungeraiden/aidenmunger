const ENDPOINT = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

const ratingButtons = [...document.querySelectorAll(".rating button")];
const ratingInput = document.querySelector("#rating");
const form = document.querySelector("#feedbackForm");
const status = document.querySelector("#status");

ratingButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    ratingInput.value = btn.dataset.value;
    ratingButtons.forEach(b => b.classList.toggle("selected", b === btn));
  });
});

form.addEventListener("submit", async e => {
  e.preventDefault();
  if (!ratingInput.value) {
    status.textContent = "PICK A RATING FIRST.";
    return;
  }
  if (ENDPOINT.includes("PASTE_YOUR")) {
    status.textContent = "THE FORM ISN'T CONNECTED YET — ADD YOUR APPS SCRIPT URL IN script.js.";
    return;
  }
  const data = Object.fromEntries(new FormData(form).entries());
  data.submittedAt = new Date().toISOString();

  status.textContent = "SENDING...";
  try {
    await fetch(ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: {"Content-Type":"text/plain;charset=utf-8"},
      body: JSON.stringify(data)
    });
    form.reset();
    ratingButtons.forEach(b => b.classList.remove("selected"));
    status.textContent = "THANK YOU. YOUR FEEDBACK WAS SAVED.";
  } catch (err) {
    status.textContent = "COULDN'T SEND — TRY AGAIN.";
  }
});
