

![HanCards Logo](public/icon.png)

# HanCards

**HanCards** is a web application for learning and practicing Korean vocabulary, with a focus on Hanja (Chinese characters used in Korean). It provides interactive study and quiz modes, customizable vocabulary packs, and multilingual support.

## Purpose

HanCards helps learners of Korean (especially those interested in Hanja) to efficiently memorize and review vocabulary through spaced repetition, quizzes, and self-paced study. It is designed for both beginners and advanced learners, supporting multiple languages for the interface and word packs.

## Features

- **Study Mode:** Flip cards to reveal translations and practice at your own pace.
- **Quiz Mode:** Multiple-choice quizzes to test your recall in both directions (Korean ↔ English/Vietnamese).
- **Customizable Packs:** Enable or disable vocabulary packs by topic or level. Packs are loaded from CSV files for easy extension.
- **Spaced Repetition:** Words are prioritized for review based on your performance, helping you focus on what needs practice.
- **Progress Tracking:** Scores are saved locally in your browser.
- **Multilingual UI:** Interface available in English and Vietnamese (easily extendable to other languages).
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

### Build for Production

```bash
npm run build
```
The output will be in the `dist/` folder.

## Adding New Vocabulary Packs or Languages

- To add a new language, see instructions in `src/config.js`.
- To add new vocabulary packs, place CSV files in `public/packs/` and register them in the config.

## Project Structure

- `src/` — React source code
- `public/packs/` — Vocabulary CSV files
- `src/locales/` — UI translations
- `src/config.js` — App configuration and language/pack registration

## License

MIT License. See [LICENSE](LICENSE).
