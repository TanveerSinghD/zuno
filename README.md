# Zuno website

White background, bold typography, spinning vinyl, an interactive library preview, a privacy page, and a Spotify callback fallback. No gradients or build step.

## Publish on GitHub Pages

1. Use the public repository `TanveerSinghD/zuno`. The website files belong at its root.
2. Upload the contents of this folder to the repository root, not the outer `website` folder. Include `.nojekyll` and `.well-known/apple-app-site-association`. Use GitHub Desktop or Git to include hidden files if the web uploader omits them.
3. In repository Settings > Pages, choose Deploy from a branch, main, /(root), then Save.
4. When GitHub confirms publication, the website is `https://tanveersinghd.github.io/zuno/`.

GitHub Pages callback page: `https://tanveersinghd.github.io/zuno/spotify-callback/`. This address is not live until publication. Keep the trailing slash consistent between Spotify and the app.

GitHub instructions: https://docs.github.com/en/pages/quickstart

## Spotify iPhone hosting requirement

The native Spotify login requires Apple’s domain association, not just a web page. Serve `/.well-known/apple-app-site-association` at the domain root with HTTP 200, no redirects, valid JSON, and `Content-Type: application/json`. A GitHub project site under `/repository/` cannot place this file at the host’s root. This repository’s GitHub Pages site is under `/zuno/`, so use the Cloudflare Pages option below for the native Spotify login callback. GitHub Pages does not process the included `_headers` file.

For controllable headers without buying a domain, publish the same GitHub files with Cloudflare Pages:

1. Create a Cloudflare Pages project and connect `TanveerSinghD/zuno`.
2. Framework preset None, empty build command, output directory `.`.
3. Pick an available name, for example `zuno-tanveer`. Cloudflare provides the actual free `pages.dev` address after deployment; this example is not reserved.
4. The included `_headers` file sets the Apple association file to JSON and adds no-store/no-referrer headers to callback responses.
5. Verify `https://YOUR-PROJECT.pages.dev/.well-known/apple-app-site-association` returns 200 directly with JSON content type.
6. Register `https://YOUR-PROJECT.pages.dev/spotify-callback/` in Spotify, and set that same URL as `SPOTIFY_REDIRECT_URL` in Zuno’s Build Settings. Add your Spotify app’s `SPOTIFY_CLIENT_ID` too.
7. Add `webcredentials:YOUR-PROJECT.pages.dev` to Zuno’s Associated Domains entitlement, refresh signing, and test on an iPhone.

The included association file uses `7Q8397GJ73.TSD.Zuno` from the project’s Team ID and bundle ID. Verify the signing profile’s actual application identifier prefix is `7Q8397GJ73`; update the file if it differs. Apple’s CDN may take time to pick up changes.

Cloudflare GitHub publishing: https://developers.cloudflare.com/pages/get-started/git-integration/
Response headers: https://developers.cloudflare.com/pages/configuration/headers/
Apple domain association: https://developer.apple.com/documentation/xcode/supporting-associated-domains

## Callback behaviour

The iPhone’s authentication session normally intercepts the Spotify callback. This fallback page asks visitors to return to Zuno. It does not exchange, display, save, or forward authorization codes, and removes the query string from browser history. It does not claim sign-in succeeded. Sign-in starts in the iPhone app, not on the website.

## Preview

Serve this folder with a static server, for example `python3 -m http.server 4173 --bind 127.0.0.1`, and visit `http://127.0.0.1:4173/`.
