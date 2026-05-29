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

# Custom Domain Blocker （自定义域名拦截）

<div align="center">
  <img alt="Code License" src="https://img.shields.io/badge/Code_License-MIT-f5de53?&color=f5de53">
  <img src="https://img.shields.io/badge/Google-Bing-4285F4?logo=google&logoColor=white" alt="Supports Google & Bing">
</div>

<div align="center">
  <a href="https://github.com/vinds476283/custom_domain_blocker/blob/main/README.md">English</a> | 简体中文
</div>

> 此翻译虽然是开发者本人翻译，但在更新迭代中可能会出现之修改了其中一个文档的信息。若此文档与<a href="https://github.com/vinds476283/custom_domain_blocker/blob/main/README.md">英文版本</a>有出入，以英文版本为准。

## 用途

启用此插件后，当你在 [google.com](https://google.com) 或 [bing.com](https://bing.com) 上搜索时，如果遇到 `domains.json` 中的域名，那么此卡片中的所有文字都会变成灰色，并且用删除线划掉。

你可以自由修改 `domains.json` 中的内容，但需要注意符合 `JSON` 的文件格式。

本项目文件 `domains.json` 中的内容仅为示例，不代表本人偏好。

## 使用方法

此插件暂时没有放在商店中，你需要自己在浏览器中安装。也正因如此，你可以自由修改 `domains.json` 中的内容以符合你的偏好。

### 在 Edge 浏览器中

1. 下载此项目，并解压；
2. 在搜索框中键入下面的内容并回车：

```text
edge://extensions
```

3. 找到**开发人员模式**，开启此选项；
4. 点击**加载解压缩的扩展**，然后选择此项目的父文件夹；
5. Edge 浏览器会自动启用该插件，如果没有自动启用，请手动启用；
6. 插件现在可以正常使用了。

### 在 Chrome 浏览器中

1. 下载此项目，并解压；
2. 在搜索框中键入并回车：

```text
chrome://extensions
```

3. 找到**开发者模式**，开启此选项；
4. 点击**加载已解压的扩展程序**，然后选择此项目的父文件夹；
5. Chrome 会自动启用该插件，如果没有自动启用，请手动启用；
6. 插件现在可以正常使用了。

### 在其他浏览器中

本人没有尝试在其他浏览器中使用本插件，但理论上通过类似的操作即可正常安装并使用此插件。

## 项目结构

共 6 份文件:

- `manifest.json` – 扩展配置文件（Manifest V3）
- `content.js` – 核心脚本，负责扫描并标记搜索结果
- `domains.json` – 用户可编辑的域名屏蔽列表
- `README.md` – 本文档的英文翻译版本
- `README-zh.md` – 本文档
- `LICENSE` - 协议声明

## 许可证

本项目采用 [MIT](https://opensource.org/license/mit) 开源协议。详情请参阅 [LICENSE](https://github.com/vinds476283/custom_domain_blocker?tab=MIT-1-ov-file) 文件。
