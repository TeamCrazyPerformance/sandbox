/**
 * theme.js - 재민's Web v1.3 다크 모드 토글 (이모지 제거 버전)
 */

"use strict";

(function () {
  const STORAGE_KEY = "jaemin-theme";
  const root        = document.documentElement;

  function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") return saved;

    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleUI(theme);
  }

  function updateToggleUI(theme) {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;

    if (theme === "dark") {
      btn.textContent = "라이트 모드";
    } else {
      btn.textContent = "다크 모드";
    }
  }

  function toggleTheme() {
    const current = root.getAttribute("data-theme") || "light";
    applyTheme(current === "dark" ? "light" : "dark");
  }

  // 초기화
  applyTheme(getInitialTheme());

  document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.addEventListener("click", toggleTheme);
      updateToggleUI(root.getAttribute("data-theme") || "light");
    }

    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem(STORAGE_KEY)) {
          applyTheme(e.matches ? "dark" : "light");
        }
      });
    }
  });
})();
