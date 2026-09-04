// Edit the letter here. Paragraphs are separated by blank lines.
export const LETTER_TEXT = `My Hengameh,

I may not yet have the kind of wealth that would let me give you everything I wish I could, but everything I do have is yours — every gift within me, every lesson life has taught me, every skill I have learned, and every little thing I know might make you even a touch happier than you were the moment before. And if there have been times when I was not as good to you as you hoped, or when I failed to love you in the way you truly deserve, please forgive me. Wherever I am and wherever life takes us, know that I am always trying, with all my heart, to become a better man for you.

Thank you for every smile, every conversation, and every small kindness that has become part of us. I treasure the story we are writing — not only the beautiful chapters, but every honest, imperfect, wonderful page in between.

Wherever life takes us, I hope you always know this: you are deeply loved, endlessly appreciated, and held gently in my heart.

Always yours,
Ehsan ♡`;

export function formatLetter(text: string): string {
  return text
    .split("\n\n")
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

export function setupLetter(): void {
  const experience = document.querySelector<HTMLElement>("[data-letter-experience]");
  const openButton = document.querySelector<HTMLButtonElement>("[data-letter-open]");
  const closeButton = document.querySelector<HTMLButtonElement>("[data-letter-close]");
  const backdrop = document.querySelector<HTMLElement>("[data-letter-backdrop]");

  if (!experience || !openButton || !closeButton || !backdrop) return;

  let transitionTimer = 0;

  const openLetter = () => {
    window.clearTimeout(transitionTimer);
    experience.classList.remove("is-closing");
    experience.classList.add("is-opening");
    document.body.classList.add("letter-is-active");
    openButton.setAttribute("aria-expanded", "true");
    backdrop.setAttribute("aria-hidden", "false");

    transitionTimer = window.setTimeout(() => {
      experience.classList.remove("is-opening");
      experience.classList.add("is-open");
      closeButton.focus({ preventScroll: true });
    }, 620);
  };

  const closeLetter = () => {
    window.clearTimeout(transitionTimer);
    experience.classList.remove("is-opening", "is-open");
    experience.classList.add("is-closing");
    openButton.setAttribute("aria-expanded", "false");
    backdrop.setAttribute("aria-hidden", "true");

    transitionTimer = window.setTimeout(() => {
      experience.classList.remove("is-closing");
      document.body.classList.remove("letter-is-active");
      openButton.focus({ preventScroll: true });
    }, 420);
  };

  openButton.addEventListener("click", openLetter);
  closeButton.addEventListener("click", closeLetter);
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) closeLetter();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("letter-is-active")) {
      closeLetter();
    }
  });
}
