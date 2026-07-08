(function () {
  const blogs = Array.isArray(window.BLOGS) ? window.BLOGS : [];
  const containers = document.querySelectorAll("[data-blogs-list]");

  function formatMeta(post) {
    const parts = [];

    if (post.date) {
      parts.push(post.date);
    }

    if (post.category) {
      parts.push(post.category);
    }

    return parts.join(" / ");
  }

  function renderEmpty(container) {
    container.innerHTML = '<p class="empty-blogs">No blogs yet.</p>';
  }

  function renderPost(post) {
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

    meta.textContent = formatMeta(post);
    title.href = post.url || "#";
    title.textContent = post.title || "Untitled blog";
    desc.textContent = post.description || "";

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
    const limit = Number.parseInt(container.dataset.limit, 10);
    let visibleBlogs = blogs.slice().sort(sortByDateDesc);

    if (Number.isFinite(limit) && limit > 0) {
      visibleBlogs = visibleBlogs.slice(0, limit);
    }

    container.innerHTML = "";

    if (visibleBlogs.length === 0) {
      renderEmpty(container);
      return;
    }

    visibleBlogs.forEach(function (post) {
      container.appendChild(renderPost(post));
    });
  });
})();
