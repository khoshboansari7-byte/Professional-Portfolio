# Khushbo Ansari — Personal Portfolio

A fast, single-page portfolio site built with **HTML5 + Tailwind CSS (CDN) + a little vanilla JS**. No build step, so it works as-is on GitHub Pages, Netlify, or Vercel.

```
personal-website/
├── index.html    ← all page content (edit text & links here)
├── styles.css    ← theme colours, cards, buttons, timeline
├── script.js     ← mobile menu, light/dark toggle, copy-email, active nav
├── resume.pdf    ← ADD THIS YOURSELF (see step 3)
└── README.md
```

## Preview locally

Double-click `index.html` to open it in your browser. That's it.

---

## Make it yours: checklist

Open `index.html` in a text editor (VS Code is a good free choice) and use **Find (Ctrl+F)** for each item below.

### 1. Email (required)
Search for `your.email@example.com`. It appears **4 times** in the Contact section. Replace every one with your real email address.

### 2. Your details
| Find this text | Replace with |
|---|---|
| `Your University` | Your university name |
| `Your College` | Where you did your foundation / pre-university |
| `second-year` | Your current year |
| `CGPA 3.6 / 4.0` | Your real CGPA (or delete it) |
| `March 2027` (2 places) | When you can start your internship |
| Experience timeline items | Your real part-time jobs, clubs, hackathons |

> ⚠️ The education, experience and project content is **sample text** that makes the site look complete. Replace it with your own before you share the site. Recruiters will ask about everything on it.

### 3. Your CV / resume
1. Export your CV as a PDF.
2. Rename it to exactly **`resume.pdf`**.
3. Put it in this folder, next to `index.html`.

The **Download Full CV (PDF)** button links to `./resume.pdf`. Until you add the file, that button shows a "not found" page.

### 4. Projects
Each project is one `<article class="project-card">` block in `index.html`. For each one:
- Change the **title**, **description**, and the **tech pills** (`<li class="pill">…</li>`).
- Change the **GitHub Repo** link to your real repo: `https://github.com/khoshboansari7-byte/<repo-name>`.
- Change the **Live Demo** link to your deployed URL. If a project has no live demo, keep the `…/<repo-name>#readme` link, which opens the repo's README.
- To delete a project, remove its whole `<article>…</article>` block. To add one, copy a block.

The repos currently linked (`campus-eats`, `kl-transit-tracker`, `studysync`, `expense-lens`) are examples. They'll 404 unless you create repos with those names.

**Using real screenshots instead of the emoji headers:** add an `images/` folder, put a screenshot in it (e.g. `images/campus-eats.png`, about 1200×630), and replace the `<div class="project-thumb …">…</div>` block with:

```html
<img src="images/campus-eats.png" alt="CampusEats screenshot" class="h-36 w-full object-cover border-b border-line" loading="lazy" />
```

### 5. Skills
Edit the pills in the **Tech Stack & Skills** section. Only list things you can talk about in an interview.

### 6. Colours (optional)
Theme colours are at the top of `styles.css` (`--accent` is cyan, `--accent2` is emerald). Values are RGB numbers, e.g. `34 211 238`.

---

## Deploy for free on GitHub Pages

1. Sign in at [github.com](https://github.com) as **khoshboansari7-byte**.
2. Create a new **public** repository named exactly **`khoshboansari7-byte.github.io`**.
   (With this name the site lives at `https://khoshboansari7-byte.github.io`. Any other repo name also works; the site will then be at `https://khoshboansari7-byte.github.io/<repo-name>/`.)
3. Upload the files:
   - **Easiest:** on the new repo page, click **"uploading an existing file"**, drag in `index.html`, `styles.css`, `script.js`, `resume.pdf` (and `images/` if you have it), then click **Commit changes**.
   - **With Git:**
     ```bash
     cd path/to/personal-website
     git init
     git add .
     git commit -m "Initial portfolio"
     git branch -M main
     git remote add origin https://github.com/khoshboansari7-byte/khoshboansari7-byte.github.io.git
     git push -u origin main
     ```
4. In the repo, go to **Settings → Pages**. Under **Build and deployment**, set **Source: Deploy from a branch**, **Branch: `main`**, folder **`/ (root)`**, then click **Save**.
5. Wait 1–2 minutes and open `https://khoshboansari7-byte.github.io`.

To update the site later, edit the files and upload or push them again. GitHub Pages redeploys automatically.

### Alternatives
- **Netlify:** go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag this whole folder onto the page.
- **Vercel:** go to [vercel.com/new](https://vercel.com/new), import the GitHub repo, and click Deploy. No settings are needed.

---

## Notes
- **Tailwind via CDN** is the zero-setup option and is fine for a personal site. Tailwind shows a console note recommending a build step for production. You can ignore it.
- **Copy Email** uses the Clipboard API, which needs `https://` (fine once deployed). When the page is opened as a local file, a fallback copy method is used.
- Light/dark choice is remembered in the visitor's browser.
