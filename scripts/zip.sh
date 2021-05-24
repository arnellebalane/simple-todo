#!/bin/bash
zip -r simple-todo.zip \
  manifest.json \
  build \
  -x 'build/whats-new/*'

zip -r simple-todo-source.zip \
  src \
  public \
  .env \
  license \
  manifest.json \
  package.json \
  package-lock.json \
  snowpack.config.js
