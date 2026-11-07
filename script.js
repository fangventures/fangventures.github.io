"use strict";

(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const copyButton = document.getElementById("copy-email");
  const copyStatus = document.getElementById("copy-status");
  let feedbackTimeout;

  function showCopyFeedback(message) {
    if (!copyStatus) return;
    clearTimeout(feedbackTimeout);
    copyStatus.textContent = message;
    feedbackTimeout = setTimeout(() => {
      copyStatus.textContent = "";
    }, 5000);
  }

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      clearTimeout(feedbackTimeout);
      try {
        if (!navigator.clipboard || !navigator.clipboard.writeText) {
          throw new Error("Clipboard is unavailable");
        }
        await navigator.clipboard.writeText("FangVentures.HQ@gmail.com");
        showCopyFeedback("Email copied. Say hello!");
      } catch {
        showCopyFeedback("To get in touch, use the email link above.");
      }
    });
  }
})();
