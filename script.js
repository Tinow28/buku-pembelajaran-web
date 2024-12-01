const progress = { html: 0, css: 0, js: 0 };

    document.addEventListener("DOMContentLoaded", () => {
  // Hapus semua data localStorage untuk memastikan tampilan awal bersih
  if (!localStorage.getItem("initialized")) {
    localStorage.clear();
    localStorage.setItem("initialized", "true"); // Tandai bahwa inisialisasi sudah dilakukan
  }

  loadFromLocalStorage("html-list", "htmlData");
  loadFromLocalStorage("css-list", "cssData");
  loadFromLocalStorage("js-list", "jsData");
  loadFromLocalStorage("html-not-list", "htmlNotData");
  loadFromLocalStorage("css-not-list", "cssNotData");
  loadFromLocalStorage("js-not-list", "jsNotData");
  updateProgressFromStorage();
});

    function submitInput() {
      const learned = document.getElementById("already-learned").value.trim();
      const notLearned = document.getElementById("not-learned").value.trim();

      if (learned) {
        handleLearned(learned);
        document.getElementById("already-learned").value = "";
      }
      if (notLearned) {
        handleNotLearned(notLearned);
        document.getElementById("not-learned").value = "";
      }
    }

    function handleLearned(learned) {
      const category = detectCategory(learned);
      if (!category) return;

      updateListAndProgress(`${category}-list`, `${category}Data`, `${category}-progress`, learned);

      // Remove from "Belum Bisa" if exists
      removeFromNotLearned(`${category}-not-list`, `${category}NotData`, learned);
    }

    function handleNotLearned(notLearned) {
      const category = detectCategory(notLearned);
      if (!category) return;

      updateList(`${category}-not-list`, `${category}NotData`, notLearned);
    }

    function detectCategory(text) {
      if (text.toLowerCase().includes("html")) return "html";
      if (text.toLowerCase().includes("css")) return "css";
      if (text.toLowerCase().includes("javascript")) return "js";
      return null;
    }

    function updateListAndProgress(listId, storageKey, progressId, item) {
      updateList(listId, storageKey, item);
      increaseProgress(progressId);
    }

    function updateList(listId, storageKey, item) {
      const ul = document.getElementById(listId);
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);

      saveToLocalStorage(storageKey, item);
    }

    function removeFromNotLearned(listId, storageKey, item) {
      const ul = document.getElementById(listId);
      const items = JSON.parse(localStorage.getItem(storageKey)) || [];
      const index = items.indexOf(item);

      if (index > -1) {
        items.splice(index, 1);
        localStorage.setItem(storageKey, JSON.stringify(items));

        // Hapus elemen dari tampilan
        const liElements = ul.getElementsByTagName("li");
        for (let li of liElements) {
          if (li.textContent === item) {
            ul.removeChild(li);
            break;
          }
        }
      }
    }

    function saveToLocalStorage(storageKey, item) {
      const existingData = JSON.parse(localStorage.getItem(storageKey)) || [];
      if (!existingData.includes(item)) {
        existingData.push(item);
        localStorage.setItem(storageKey, JSON.stringify(existingData));
      }
    }

    function loadFromLocalStorage(listId, storageKey) {
      const data = JSON.parse(localStorage.getItem(storageKey)) || [];
      data.forEach((item) => {
        updateList(listId, storageKey, item);
      });
    }

    function increaseProgress(progressId) {
      const bar = document.getElementById(progressId);
      const currentProgress = parseInt(bar.style.width || 0);
      if (currentProgress < 100) {
        bar.style.width = `${currentProgress + 20}%`;
      }
    }

    function updateProgressFromStorage() {
      ["html", "css", "js"].forEach((key) => {
        const data = JSON.parse(localStorage.getItem(`${key}Data`)) || [];
        const progressId = `${key}-progress`;
        const bar = document.getElementById(progressId);
        bar.style.width = `${data.length * 20}%`;
      });
    }