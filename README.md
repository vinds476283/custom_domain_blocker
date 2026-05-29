<!--
MIT License

Copyright (c) 2026 [vinds](https://y.vinds.top)

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
-->

# Custom Domain Blocker

<div align="center">
  <img alt="Code License" src="https://img.shields.io/badge/Code_License-MIT-f5de53?&color=f5de53">
  <img src="https://img.shields.io/badge/Google-Bing-4285F4?logo=google&logoColor=white" alt="Supports Google & Bing">
</div>

<div align="center">
  English | <a href="https://github.com/vinds476283/custom_domain_blocker/blob/main/README-zh.md">简体中文</a>
</div>

## Purpose

Once the plugin is activated, when you search on [google.com](https://google.com) or [bing.com](https://bing.com) and encounter a domain listed in `domains.json`, it will automatically turn all text in that card gray and add a strikethrough.

You are free to modify the content of `domains.json`, but make sure it complies with the `JSON` file format.

The content in the `domains.json` file of this project is for demonstration purposes only and does not reflect my personal preferences.

## How to Use

This extension is not currently available in any store, so you need to install it manually in your browser. Because of that, you are free to modify the content of `domains.json` to match your preferences.

### In Edge

1. Download this project and extract it.
2. Type the following into the address bar and press Enter:

```text
edge://extensions
```

3. Find **Developer mode** and turn it on.
4. Click **Load unpacked**, then select the parent folder of this project.
5. Edge should enable the extension automatically. If it doesn’t, enable it manually.
6. The extension is now ready to use.

### In Chrome

1. Download this project and extract it.
2. Type the following into the address bar and press Enter:

```text
chrome://extensions
```

3. Find **Developer mode** and turn it on.
4. Click **Load unpacked**, then select the parent folder of this project.
5. Chrome should enable the extension automatically. If it doesn’t, enable it manually.
6. The extension is now ready to use.

### In other browsers

I haven’t tried using this extension in other browsers myself, but in theory it should work with similar steps.

## Project Structure

5 files:

- `manifest.json` – extension configuration (Manifest V3)
- `content.js` – the core script that scans and marks result cards
- `domains.json` – user‑editable list of domains to block
- `README.md` – this documentation
- `README-zh.md` – The Chinese translation of this document

## License

This project is open-sourced under the [MIT](https://opensource.org/license/mit). See the [LICENSE](https://github.com/vinds476283/custom_domain_blocker?tab=MIT-1-ov-file) file for details.
