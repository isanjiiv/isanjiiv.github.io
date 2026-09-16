# Portfolio Repository Architecture

## Production

The public website is intentionally kept simple and compatible with GitHub Pages:

```text
/
├── index.html
├── about.html
├── services.html
├── robots.txt
├── sitemap.xml
├── google-site-verification: google55bb3e2dfb255c1c.html
│
├── assets/
│   ├── audio/
│   ├── docs/
│   └── images/
│       └── project/
│
├── docs/
├── other-files/
└── ARCHITECTURE.md
```

## Recommended future organization

1. Keep public entry pages at the root.
2. Keep all reusable media under `assets/`.
3. Put project screenshots in `assets/images/project/`.
4. Put downloadable documents in `assets/docs/`.
5. Put experiments and old versions in `other-files/`.
6. Before physically moving any existing file, update every relative reference and verify the GitHub Pages site.
