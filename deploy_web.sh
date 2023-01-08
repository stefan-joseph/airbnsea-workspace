#! /bin/bash
npm run build:web
netlify deploy --prod --dir=./packages/web/build