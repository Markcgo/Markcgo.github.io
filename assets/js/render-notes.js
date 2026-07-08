(function () {
  const notes = Array.isArray(window.NOTES) ? window.NOTES : [];
  const containers = document.querySelectorAll("[data-notes-list]");

  function formatMeta(note) {
    const parts = [];

    if (note.date) {
      parts.push(note.date);
    }

    if (note.categoryLabel || note.category) {
      parts.push(note.categoryLabel || note.category);
    }

    return parts.join(" / ");
  }

  function renderEmpty(container) {
    container.innerHTML = '<p class="empty-notes">No notes yet.</p>';
  }

  function renderNote(note) {
    const article = document.createElement("article");
    const meta = document.createElement("div");
    const main = document.createElement("div");
    const title = document.createElement("a");
    const desc = document.createElement("p");

    article.className = "entry";
    meta.className = "entry-meta";
    main.className = "entry-main";
    title.className = "entry-title";
    desc.className = "entry-desc";

    meta.textContent = formatMeta(note);
    title.href = note.url || "#";
    title.textContent = note.title || "Untitled note";
    desc.textContent = note.description || "";

    main.appendChild(title);

    if (desc.textContent) {
      main.appendChild(desc);
    }

    article.appendChild(meta);
    article.appendChild(main);

    return article;
  }

  function sortByDateDesc(a, b) {
    return new Date(b.date || 0) - new Date(a.date || 0);
  }

  containers.forEach(function (container) {
    const category = container.dataset.category;
    const limit = Number.parseInt(container.dataset.limit, 10);
    let visibleNotes = notes.slice();

    if (category) {
      visibleNotes = visibleNotes.filter(function (note) {
        return note.category === category;
      });
    }

    visibleNotes.sort(sortByDateDesc);

    if (Number.isFinite(limit) && limit > 0) {
      visibleNotes = visibleNotes.slice(0, limit);
    }

    container.innerHTML = "";

    if (visibleNotes.length === 0) {
      renderEmpty(container);
      return;
    }

    visibleNotes.forEach(function (note) {
      container.appendChild(renderNote(note));
    });
  });
})();
