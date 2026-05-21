# ekram.tech — Personal Portfolio

Personal portfolio site for [Ekram](https://ekram.tech) — CS grad, Co-Founder & CEO of [LynkSphere](https://lynksphere.com), and builder of things across bioinformatics, AI, and full-stack engineering.

## Stack

- **Framework** — Next.js 15, React 19, TypeScript
- **Styling** — Tailwind CSS v4
- **Animation** — Framer Motion, GSAP
- **3D / Canvas** — Three.js, HTML5 Canvas 2D API
- **Scroll** — Lenis
- **Icons** — Iconify
- **Email** — Nodemailer
- **Font** — Space Mono

## Features

- **Hero terminal** — simulates a live `zsh` session with staged typewriter commands, output lines, and a 20-slot Unicode LIGHT SHADE (U+2591) progress bar animating 0→100% via `requestAnimationFrame`
- **DNA double helix** — real-time Canvas 2D background with 16-node rotating strands, base-pair rung labels, and skill annotations rendered at per-frame Z-depth opacity at 60fps
- **Sections** — About, Skills, Projects (git commit cards), Experience, Education, Leadership, Contact
- **Contact form** — server-side API route with Nodemailer
- **CV download** — links directly to `ekram-tech-cv.pdf` in `public/`
- **Scroll animations** — Lenis smooth scroll + Framer Motion entrance animations per section

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/
    components/
      Portfolio/
        Hero/        # Terminal animation + DNA helix
        About/
        Skills/
        Projects/    # Git commit-style project cards
        Experience/
        Education/
        Leadership/
        Contact/     # Email form + social links
    api/
      contact/       # Nodemailer handler
public/
  cv/                # ekram-tech-cv.pdf + ekram-tech-cv.tex
```

## Contact

[ekramjim002@gmail.com](mailto:ekramjim002@gmail.com) · [linkedin.com/in/ekram02](https://www.linkedin.com/in/ekram02) · [ekram.tech](https://ekram.tech)
