import "./style.css";
import { loveReasons, memories, timeline } from "./data";
import { formatLetter, LETTER_TEXT, setupLetter } from "./letter";
import { startRelationshipTimer } from "./timer";

const heartIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
  </svg>`;

const noteIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" />
  </svg>`;

const pauseIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14" /></svg>`;

function renderTimerUnits(): string {
  const units = ["years", "months", "days", "hours", "minutes", "seconds"];
  return units
    .map(
      (unit) => `
        <div class="time-piece">
          <span class="time-piece__value" data-time-unit="${unit}">00</span>
          <span class="time-piece__label">${unit}</span>
        </div>`,
    )
    .join("");
}

function renderTimeline(): string {
  return timeline
    .map(
      (item) => `
        <article class="timeline-item timeline-item--${item.kind ?? "future"} reveal">
          <div class="timeline-item__marker" aria-hidden="true">${item.kind === "official" ? "♡" : ""}</div>
          <div class="timeline-item__content">
            <p class="timeline-item__date">${item.date}</p>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        </article>`,
    )
    .join("");
}

function renderMemories(): string {
  return memories
    .map((memory, index) => {
      const image = memory.image
        ? `<img src="${memory.image}" alt="${memory.caption}" loading="lazy" data-memory-image />`
        : "";

      return `
        <article class="memory-card reveal" style="--card-tilt: ${index % 2 === 0 ? "-1.4deg" : "1.2deg"}">
          <div class="memory-card__image ${memory.image ? "" : "is-placeholder"}">
            ${image}
            <div class="memory-placeholder" aria-hidden="true">
              <span>${heartIcon}</span>
              <small>Your memory here</small>
            </div>
          </div>
          <div class="memory-card__caption">
            <p>${memory.caption}</p>
            ${memory.date ? `<time>${memory.date}</time>` : ""}
          </div>
        </article>`;
    })
    .join("");
}

function renderLoveReasons(): string {
  return loveReasons
    .map(
      (reason, index) => `
        <article class="reason-card reveal">
          <span class="reason-card__number">${String(index + 1).padStart(2, "0")}</span>
          <span class="reason-card__heart" aria-hidden="true">♡</span>
          <p>${reason}</p>
        </article>`,
    )
    .join("");
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="intro" data-intro>
    <div class="intro__glow" aria-hidden="true"></div>
    <div class="intro__content">
      <p class="eyebrow intro__eyebrow">A little corner of the world, just for you</p>
      <h1>For Hengameh <span>♡</span></h1>
      <p class="intro__subtitle">Every love story is beautiful, but ours is the one I want to keep reading.</p>
      <button class="open-button" type="button" data-open-site>
        <span>Open</span>
        <span class="open-button__heart" aria-hidden="true">♡</span>
      </button>
    </div>
    <p class="intro__signature">Made with love by Ehsan</p>
  </div>

  <div class="ambient-particles" aria-hidden="true">
    <span></span><span></span><span></span><span></span><span></span><span></span>
  </div>

  <main class="main-page" data-main aria-hidden="true" inert>
    <header class="hero section-shell">
      <div class="hero__orb" aria-hidden="true"></div>
      <nav class="topbar" aria-label="Main navigation">
        <a class="monogram" href="#top" aria-label="For Hengameh, home">H <span>♡</span> E</a>
        <a class="topbar__link" href="#letter">My letter <span aria-hidden="true">↓</span></a>
      </nav>
      <div class="hero__content" id="top">
        <p class="eyebrow reveal">27 July 2024 · Our forever began</p>
        <h2 class="reveal">You are my favorite<br /><em>place to be.</em></h2>
        <p class="hero__copy reveal">For every day behind us, every moment we're living, and all the beautiful tomorrows still waiting.</p>
        <a class="text-link reveal" href="#together">Our time together <span aria-hidden="true">↘</span></a>
      </div>
      <div class="hero__scroll" aria-hidden="true"><span></span>Scroll slowly</div>
    </header>

    <section class="section section--timer" id="together">
      <div class="section-heading reveal">
        <p class="eyebrow">Since the day we became us</p>
        <h2>Together for <span>♡</span></h2>
        <p>And I would choose you in every lifetime.</p>
      </div>
      <div class="timer reveal" data-timer aria-label="Live relationship duration">
        ${renderTimerUnits()}
      </div>
      <p class="timer__since reveal">Every second is another tiny piece of our story.</p>
    </section>

    <section class="section section--letter" id="letter">
      <div class="letter-layout">
        <div class="section-heading section-heading--left reveal">
          <p class="eyebrow">Words I keep close</p>
          <h2>A letter for you <span>♡</span></h2>
          <p>Some things deserve more than a message. Tap the envelope when you're ready.</p>
        </div>

        <div class="letter-experience reveal" data-letter-experience>
          <button class="envelope" type="button" data-letter-open aria-expanded="false" aria-controls="love-letter-dialog">
            <span class="envelope__back"></span>
            <span class="envelope__paper">
              <span>My Hengameh,</span>
              <i></i><i></i><i></i>
            </span>
            <span class="envelope__front"></span>
            <span class="envelope__flap"></span>
            <span class="envelope__seal">♡</span>
            <span class="envelope__label">A letter for you</span>
          </button>

          <div class="letter-backdrop" data-letter-backdrop aria-hidden="true">
            <article class="letter-dialog" id="love-letter-dialog" role="dialog" aria-modal="true" aria-labelledby="letter-title">
              <button class="letter-dialog__close" type="button" data-letter-close aria-label="Close letter">
                <span></span><span></span>
              </button>
              <div class="letter-dialog__ornament" aria-hidden="true">♡</div>
              <h3 id="letter-title">A letter from my heart</h3>
              <div class="letter-dialog__body">${formatLetter(LETTER_TEXT)}</div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--story" id="story">
      <div class="section-heading reveal">
        <p class="eyebrow">The chapters that made us</p>
        <h2>Our story</h2>
        <p>Two lives, becoming one beautiful timeline.</p>
      </div>
      <div class="timeline">
        ${renderTimeline()}
      </div>
    </section>

    <section class="section section--memories" id="memories">
      <div class="section-heading section-heading--left reveal">
        <p class="eyebrow">Little pieces of forever</p>
        <h2>Our memories</h2>
        <p>The moments I return to, again and again.</p>
      </div>
      <div class="memory-grid">
        ${renderMemories()}
      </div>
    </section>

    <section class="section section--reasons" id="reasons">
      <div class="section-heading reveal">
        <p class="eyebrow">A list without an ending</p>
        <h2>Things I love about you</h2>
        <p>A few reasons, among countless others.</p>
      </div>
      <div class="reasons-grid">
        ${renderLoveReasons()}
      </div>
      <div class="love-infinity reveal" aria-label="And infinitely more things I love about you">
        <p>And more...</p>
        <div class="love-infinity__mark" aria-hidden="true">
          <svg viewBox="0 0 200 100">
            <defs>
              <linearGradient id="infinity-rose" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#a96f7d" />
                <stop offset="0.5" stop-color="#eed1d2" />
                <stop offset="1" stop-color="#8c5967" />
              </linearGradient>
            </defs>
            <path d="M100 50C80 19 64 14 44 14C21 14 8 30 8 50s13 36 36 36c21 0 38-21 56-36 18-15 35-36 56-36 23 0 36 16 36 36s-13 36-36 36c-20 0-36-5-56-36Z" />
          </svg>
        </div>
        <span>More than words could ever hold.</span>
      </div>
    </section>

    <footer class="footer">
      <div class="footer__heart" aria-hidden="true">♡</div>
      <p>For Hengameh, with all my heart.</p>
      <span>Always yours, Ehsan</span>
      <a href="#top" aria-label="Back to top">Back to the beginning ↑</a>
    </footer>
  </main>

  <div class="music-control" data-music-control>
    <span class="music-control__status" data-music-status>Our song</span>
    <button type="button" data-music-button aria-label="Play our song" aria-pressed="false">
      <span data-music-icon>${noteIcon}</span>
      <span class="music-control__pulse" aria-hidden="true"></span>
    </button>
    <audio data-src="/music/our-song.mp3" preload="none" loop data-audio></audio>
  </div>
`;

function setupIntro(): void {
  const intro = document.querySelector<HTMLElement>("[data-intro]");
  const main = document.querySelector<HTMLElement>("[data-main]");
  const openButton = document.querySelector<HTMLButtonElement>("[data-open-site]");

  if (!intro || !main || !openButton) return;

  const openSite = () => {
    if (intro.classList.contains("intro--leaving")) return;

    intro.classList.add("intro--leaving");
    main.classList.add("main-page--entered");
    main.setAttribute("aria-hidden", "false");
    main.inert = false;
    document.body.classList.add("site-is-open");

    window.setTimeout(() => {
      intro.hidden = true;
      document.querySelector<HTMLElement>(".hero__content")?.focus({ preventScroll: true });
    }, 900);
  };

  // Immediate on touch devices, while click preserves keyboard activation.
  openButton.addEventListener("pointerup", openSite);
  openButton.addEventListener("click", openSite);
}

function setupScrollReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>(".reveal");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -40px" },
  );

  elements.forEach((element) => observer.observe(element));
}

function setupMemoryFallbacks(): void {
  document.querySelectorAll<HTMLImageElement>("[data-memory-image]").forEach((image) => {
    image.addEventListener("load", () => image.parentElement?.classList.add("has-image"));
    image.addEventListener("error", () => {
      image.remove();
      image.parentElement?.classList.add("is-placeholder");
    });
  });
}

function setupMusic(): void {
  const audio = document.querySelector<HTMLAudioElement>("[data-audio]");
  const button = document.querySelector<HTMLButtonElement>("[data-music-button]");
  const status = document.querySelector<HTMLElement>("[data-music-status]");
  const icon = document.querySelector<HTMLElement>("[data-music-icon]");
  const control = document.querySelector<HTMLElement>("[data-music-control]");

  if (!audio || !button || !status || !icon || !control) return;

  const setPlaying = (playing: boolean) => {
    button.setAttribute("aria-pressed", String(playing));
    button.setAttribute("aria-label", playing ? "Pause our song" : "Play our song");
    status.textContent = playing ? "Playing our song" : "Our song";
    icon.innerHTML = playing ? pauseIcon : noteIcon;
    control.classList.toggle("is-playing", playing);
  };

  button.addEventListener("click", async () => {
    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      if (!audio.src) {
        const songPath = audio.dataset.src;
        if (!songPath) throw new Error("Song path is not configured");

        const response = await fetch(songPath, { method: "HEAD" });
        const contentType = response.headers.get("content-type") ?? "";
        if (!response.ok || !contentType.startsWith("audio/")) {
          throw new Error("Song file is not available yet");
        }
        audio.src = songPath;
      }

      await audio.play();
    } catch {
      setPlaying(false);
      control.classList.add("has-error");
      status.textContent = "Add our song";
    }
  });

  audio.addEventListener("play", () => setPlaying(true));
  audio.addEventListener("pause", () => setPlaying(false));
  audio.addEventListener("error", () => {
    control.classList.add("has-error");
    status.textContent = "Add our song";
  });
}

setupIntro();
setupScrollReveal();
setupMemoryFallbacks();
setupMusic();
setupLetter();

const timer = document.querySelector<HTMLElement>("[data-timer]");
if (timer) startRelationshipTimer(timer);
