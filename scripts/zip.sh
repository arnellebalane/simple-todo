#!/bin/bash
zip -r simple-todo.zip \
  manifest.json \
  dist \
  -x 'dist/whats-new/*'

zip -r simple-todo-source.zip \
  src \
  public \
  .env \
  license \
  manifest.json \
  package.json \
  package-lock.json \
  vite.config.js
