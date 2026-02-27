

![HanCards Logo](public/icon.png)

# HanCards

**HanCards** is a web application for learning and practicing Korean vocabulary. It provides interactive study and quiz modes, customizable vocabulary packs, and multilingual support.

## Purpose

HanCards helps Korean learners efficiently memorize and review vocabulary through spaced repetition, quizzes, and self-paced study. It is designed for both beginners and advanced learners, supporting multiple languages for the interface and word packs.

## Features

- **Study Mode:** Flip cards to reveal translations and practice at your own pace, in either direction (to or from Korean).
- **Quiz Mode:** Multiple-choice quizzes to test your recall in both directions (Korean ↔ English/Vietnamese).
- **Score-Based Prioritization:** Words are weighted for review based on your performance, helping you focus on what needs practice.
- **Text-to-Speech:** Auto-speak Korean and translation audio as you study, with customizable voice settings.
- **Customizable Packs:** Enable or disable vocabulary packs by topic or level. Import your own CSV packs, and edit or delete existing ones.
- **Progress Tracking:** Scores and pack data are saved locally in your browser.
- **Multilingual UI:** Interface available in English and Vietnamese (easily extendable to other languages).
- **PWA Support:** Installable as an app on mobile and desktop for offline use.
- **Mobile Friendly:** Responsive design for use on phones, tablets, and desktops.

## Getting Started

### Online Demo

Try HanCards online: [https://teambaconn.github.io/hancards](https://teambaconn.github.io/hancards)


### Usage & Setup

1. **Install dependencies:**
	```bash
	npm install
	```

2. **(Optional) Configure environment variables:**
	If you want to self-host or customize the deployment, create a `.env` file in the project root:
	```
	VITE_GA_ID=         # (Optional) Google Analytics ID, e.g. G-XXXXXXXXXX
	VITE_SITE_URL=      # The public URL where your site will be hosted (required for sitemap)
	```

3. **Start the development server:**
	```bash
	npm run dev
	```
	Then open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
	```bash
	npm run build
	```
	The output will be in the `dist/` folder.


- To add a new language, see instructions in `src/config.js`.
- To add new vocabulary packs, place CSV files in `public/packs/` and register them in the config.

## Project Structure

- `src/` — React source code
- `public/packs/` — Vocabulary CSV files
- `src/locales/` — UI translations
- `src/config.js` — App configuration and language/pack registration

## License

MIT License. See [LICENSE](LICENSE).
