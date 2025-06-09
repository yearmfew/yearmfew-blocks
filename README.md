# yearmfew-blocks

A collection of customizable Gutenberg blocks for WordPress, designed to enhance your content creation experience with dynamic features and modern UI components.

## Features

- **Postonic Block:**  
  Display your latest posts in a responsive grid with options for category filtering, author and date display and a share button.
- **Hello Yearmfew Block:**  
  A simple starter block for demonstration and extension.
  Just made for fun :):):)

## Highlights

- Dynamic content display with customizable options.
- Category selection and filtering.
- Clean, modern design with SCSS styling.
- Easy to extend with your own blocks and components.

## Installation

1. Clone or download this repository into your WordPress `wp-content/plugins/yearmfew-blocks` directory.
2. Run `npm install` to install dependencies.
3. Use `npm run build` to build the blocks for production.
4. Activate the **yearmfew-blocks** plugin from your WordPress admin panel.

## Usage

- After activation, you will find new blocks (like **Postonic**) available in the Gutenberg editor.
- Configure block options in the editor sidebar to customize display, sharing, and filtering.

## Development

- Blocks are located in the `blocks/` directory.
- Shared components and utilities can be placed in `src/components/`.
- SCSS files are used for styling and compiled during build.

## Scripts

- `npm run yearmfew-build`: Builds all blocks in the project once. Use this to generate production-ready build files for every block automatically.
- `npm run yearmfew-start`: Starts watch mode for all blocks. When you make changes to any block's source files, only that block will be rebuilt automatically. Useful for development and live preview.

## License

MIT License

Copyright (c) 2025 Birol YILMAZ

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

Crafted with ❤️ for modern WordPress sites.
