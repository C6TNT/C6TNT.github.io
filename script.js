const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -48px 0px",
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const typeTarget = document.querySelector(".type-target");

if (typeTarget) {
  const content = typeTarget.dataset.type ?? "";
  let index = 0;

  const typeNext = () => {
    if (index <= content.length) {
      typeTarget.textContent = content.slice(0, index);
      index += 1;
      window.setTimeout(typeNext, 55);
    }
  };

  typeNext();
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const filterButtons = document.querySelectorAll("[data-filter]");
const projectItems = document.querySelectorAll(".project-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter ?? "all";

    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    projectItems.forEach((card) => {
      const categories = (card.dataset.category ?? "").split(" ");
      const visible = filter === "all" || categories.includes(filter);
      card.classList.toggle("is-hidden", !visible);
    });
  });
});
