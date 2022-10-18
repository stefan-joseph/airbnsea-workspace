#! /bin/bash
npm run build:web
netlify deploy --prod ./packages/web/build