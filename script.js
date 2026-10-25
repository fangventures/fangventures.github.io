"use strict";

document.getElementById("year").textContent = new Date().getFullYear();

const copyButton = document.getElementById("copy-email");
const copyStatus = document.getElementById("copy-status");
let feedbackTimeout;

copyButton.addEventListener("click", async () => {
  clearTimeout(feedbackTimeout);
  try {
    await navigator.clipboard.writeText("FangVentures.HQ@gmail.com");
    copyStatus.textContent = "Email copied. Say hello!";
  } catch {
    copyStatus.textContent = "To get in touch, use the email link above.";
  }
  feedbackTimeout = setTimeout(() => {
    copyStatus.textContent = "";
  }, 5000);
});
