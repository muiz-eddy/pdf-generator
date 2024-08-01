#!/bin/sh

if [ ! -f .env ]; then
  echo ".env file not found, creating from .env.example"
  cp .env.example .env
else
  echo ".env file already exists"
fi
