# Beyond the Code — Portfolio

## Files
- `index.html` — website
- `styles.css` — styling
- `script.js` — interactions
- `photo.jpeg` — profile photo
- `certificates/` — four certificate PDFs

## Run locally
Open `index.html` in a browser, or open the folder in VS Code and use Live Server.

## Deploy free with GitHub Pages
1. Sign in to GitHub and create a **public** repository named `beyond-the-code`.
2. Upload all files and the `certificates` folder, preserving this folder structure.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then save.
6. Wait for deployment. GitHub will show the public website URL in Settings → Pages.

Keep `index.html`, `styles.css`, `script.js`, and `photo.jpeg` together in the repository root. Do not upload only the HTML file.

## Important
The contact form currently performs client-side validation only. It does not send email. To receive messages, connect a form service such as Formspree or use a backend.

The certificate PDFs are linked with relative paths under `certificates/`.
