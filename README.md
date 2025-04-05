# To deploy in Github pages

-   first create a repository in GitHub
-   Go to [vite.config.ts](./vite.config.js)

-   Add ths line after `plugins`

```json
    base: "/<repo-name>",
```

-   Go to [package.json](./package.json)
-   Add this line after `name`

```json
    "homepage": "https://<your-username>.github.io/<repo-name>",
```

-   Now install `github pages package`

```sh
npm install gh-pages
```

-   Now in [package.json](./package.json)
-   In `scripts`, add 2 lines

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

-   Now

```sh
git init
git add .
git commit -m "Commit Message"
git branch -M main
git remote add origin https://github.com/<username>/<repo-name>.git
git push -u origin main
```


- Now,
```sh
npm run deploy
```