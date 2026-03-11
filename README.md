# BLOK Capital Documentation

Developing the future of decentralized wealth management. This repository contains the source code for the BLOK Capital documentation site, built with [Docusaurus](https://docusaurus.io/).

## Features

- **Multi-language Support**: Fully localized in English, Spanish, and French.
- **Search**: Integrated `docusaurus-lunr-search` for fast, offline-compatible search.
- **Modern UI**: Custom components for Tokenomics, Security Audits, and more.
- **Documentation Versions**: Supports multiple versions of the protocol documentation.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

To start the development server:

```bash
npm start
```

To run the site in a specific locale:

```bash
npm start -- --locale es
```

### Building for Production

```bash
npm run build
```

This will generate static files in the `build/` directory for all configured locales.

## Project Structure

- `docs/`: Version 1 documentation.
- `educ-docs/`: Educational content and protocol concepts.
- `builders-docs/`: Technical guides and smart contract documentation.
- `resources-docs/`: General resources, FAQs, and brand guidelines.
- `i18n/`: Translation files for all supported languages.
- `src/components/`: Custom React components used throughout the site.
- `src/data/`: JSON data files for dynamic content (Tokenomics, Audits, etc.).

## Configuration

The project configuration is located in `docusaurus.config.ts`. Key settings include:

- **i18n**: Configured for `en`, `es`, and `fr`.
- **Plugins**: Custom documentation instances for separate content areas.
- **Theme**: Classic theme with custom CSS and Prism syntax highlighting.

## Search

We use `docusaurus-lunr-search`. To verify search functionality locally, you must first build the site:

```bash
npm run build
npm run serve
```

## Contributing

Please refer to the [Contribute](/resources/CreateVideo) section in the documentation for details on how to help us improve.

## License

This project is licensed under the [MIT License](LICENSE).
