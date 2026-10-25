# Fang Ventures

The static website for [fang.ventures](https://fang.ventures). Plain HTML, CSS, and a small JavaScript file. No framework, package installation, or build step.

## Preview locally

From this directory, run:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. Stop the server with Ctrl+C.

## Update and publish

Edit `index.html` for content, `styles.css` for appearance, and `script.js` for the email-copy button. Images live in `assets/`.

GitHub Pages publishes the root of `main`. After reviewing changes, commit and push to `main`. Preserve `CNAME`, which sets the custom domain to `fang.ventures`.

## Artwork and game content

The supplied Fang Ventures logo is used unchanged. Original game artwork and factual descriptions come from the existing game pages:

- [Rocket Car Landing](https://github.com/victorfang/victorfang.github.io/tree/main/rocketcarlanding)
- [Hurricane Hero](https://github.com/victorfang/victorfang.github.io/tree/main/hurricanehero)
- [Arrow Neon](https://github.com/victorfang/victorfang.github.io/tree/main/arrow-neon)
- [Word Porch](https://github.com/victorfang/victorfang.github.io/tree/main/word-porch)

Portfolio links use the full game pages' canonical `victorfang.com` URLs.

## Connect the custom domain

GitHub Pages is already configured for `fang.ventures`, but at the time of this build the domain still used Namecheap URL forwarding to `victorfang.com/fangventures/`. To serve this repository directly, replace that forwarding entry in Namecheap Advanced DNS with these records:

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | fangventures.github.io |

Preserve unrelated email, MX, and TXT records. After DNS propagates and GitHub provisions a certificate, enable **Enforce HTTPS** in the repository's **Settings → Pages**. DNS propagation and HTTPS availability may take up to 24 hours.

See [GitHub's custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
