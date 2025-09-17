# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple portfolio template repository designed for GitHub Pages deployment. The project is built with pure HTML, CSS, and JavaScript without any build tools or package managers. It serves as a static website template that can be customized for personal portfolios.

## Architecture & Structure

- **Root**: Contains the main English version (`index.html`) and shared assets
- **`/ru/`**: Contains the Russian language version with identical structure  
- **`/assets/`**: Contains all static resources
  - `/assets/styles/styles.css`: Main stylesheet with CSS reset and custom styles
  - `/assets/scripts/fslightbox.js`: Lightbox functionality for image galleries
  - `/assets/img/`: Images, icons, and avatar files
- **`/example/`**: Contains sample portfolio pages that users can copy and customize

The project supports bilingual content (English/Russian) with language switching functionality.

## Development Workflow

Since this is a static HTML/CSS/JS project, there are no build commands, package managers, or development servers required.

### Making Changes
- Edit HTML files directly in your preferred editor
- Modify CSS in `/assets/styles/styles.css`
- JavaScript functionality is minimal and contained in `fslightbox.js`

### Testing Locally
- Open `index.html` directly in a browser, or
- Use any simple HTTP server (e.g., `python -m http.server 8000`)

### Deployment
- The site is designed for GitHub Pages deployment
- Simply push changes to the main branch; GitHub Pages will serve the content automatically
- No build process required

## File Structure Conventions

- Main pages should be named `index.html` 
- Language-specific content goes in `/ru/` directory
- All assets must be in `/assets/` with proper subdirectories
- Image paths use absolute paths from root (e.g., `/assets/img/avatar.png`)
- Social media icons are SVG files in `/assets/img/icons/`

## Customization Guidelines

The template is designed to be easily customizable:
- Replace content in HTML files while maintaining the same structure
- Update social media links (currently set to placeholder `#link`)
- Swap out images in `/assets/img/`
- Modify colors and styling in the CSS file
- The CSS includes a modern reset and uses Google Fonts (Roboto)

## Key Components

- **Header**: Language switcher (EN/RU)
- **Hello Section**: Avatar, name, description, and social links
- **Main Content**: Modular blocks for text, projects, and posts
- **Footer**: Copyright and social media links
- **Lightbox**: Image viewing functionality via fslightbox.js