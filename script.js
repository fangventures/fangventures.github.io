"use strict";

(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const tabList = document.getElementById("feature-tabs");
  const panels = Array.from(document.querySelectorAll(".feature-panel"));
  const tabs = tabList
    ? Array.from(tabList.querySelectorAll("[data-feature-tab]")).filter((tab) =>
        panels.some((panel) => panel.id === tab.getAttribute("aria-controls")),
      )
    : [];
  const featureStatus = document.getElementById("feature-status");

  function activateTab(activeTab, focus = false, announce = true) {
    const targetId = activeTab.getAttribute("aria-controls");
    const targetPanel = panels.find((panel) => panel.id === targetId);
    if (!targetPanel) return;

    const changed = activeTab.getAttribute("aria-selected") !== "true";
    tabs.forEach((tab) => {
      const selected = tab === activeTab;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel) => {
      panel.hidden = panel !== targetPanel;
    });

    if (focus) activeTab.focus();
    if (featureStatus && announce && changed) {
      const title = activeTab.dataset.title || activeTab.textContent.trim();
      featureStatus.textContent = `Now showing ${title}.`;
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;

      let nextIndex;
      switch (event.key) {
        case "ArrowLeft":
          nextIndex = (index - 1 + tabs.length) % tabs.length;
          break;
        case "ArrowRight":
          nextIndex = (index + 1) % tabs.length;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = tabs.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      activateTab(tabs[nextIndex], true);
    });
  });

  const initialTab = tabs.find((tab) => tab.getAttribute("aria-selected") === "true") || tabs[0];
  if (initialTab) activateTab(initialTab, false, false);

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
