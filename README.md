# Docusaurus Project with Multi-Language & Lunr Search

This project is built using [Docusaurus](https://docusaurus.io/) with multi-language support and the `docusaurus-lunr-search` plugin for search functionality.

## How to Start

### Clone the Repository
```sh
git clone <your-repo-url>
cd <your-repo-name>
```

### Install Dependencies
```sh
yarn install
# or
npm install
```

### Start Development Server
To start the project with the default language:
```sh
yarn start
# or
npm run start
```

### Running a Specific Language
If you are using multiple languages and want to run only one language, use:
```sh
yarn start --locale <language-code>
# Example:
yarn start --locale en
```

## Configuration

### Multi-Language Support
Modify `docusaurus.config.js` to enable internationalization (i18n):

```js
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'es'], // Add your languages here
    localeConfigs: {
      en: { label: 'English' },
      fr: { label: 'Français' },
      es: { label: 'Español' },
    },
  },
};
```

### Add Lunr Search
Install the search plugin:
```sh
yarn add docusaurus-lunr-search
# or
npm install docusaurus-lunr-search
```

Modify `docusaurus.config.js` to include the plugin:
```js
module.exports = {
  plugins: [
    [require.resolve("@cmfcmf/docusaurus-search-local"), {
      indexDocs: true,
      indexBlog: true,
      indexPages: true,
      language: ["en", "fr", "es"],
    }],
  ],
};
```

### Run Local Search
To use Lunr search locally, build the search index:
```sh
yarn build
yarn serve
# or
npm run build
npm run serve
```

## Deployment
You can deploy your Docusaurus site to GitHub Pages, Vercel, Netlify, or any static hosting provider. Follow the [official deployment guide](https://docusaurus.io/docs/deployment).

## License
This project is licensed under the [MIT License](LICENSE).
