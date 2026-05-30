/*
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
*/

let blockedList = [];

function loadDomains() {
    let url = chrome.runtime.getURL("domains.json");
    return fetch(url)
        .then(res => {
            if (!res.ok) throw new Error("Failed to load domains.json");
            return res.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                blockedList = data.map(d => d.toLowerCase());
                console.log("Domains loaded:", blockedList);
            } else {
                console.warn("domains.json should contain an array");
            }
        })
        .catch(err => {
            console.error("Failed to load domains.json:", err);
        })
        .finally(() => {
            scan();
        });
}

function shouldBlock(url) {
    if (!url || typeof url != "string") return false;
    try {
        let full = url;
        if (url.startsWith("//")) full = "https:" + url;
        else if (!url.startsWith("http")) full = "https://" + url;
        let host = new URL(full).hostname.toLowerCase();
        for (let i = 0; i < blockedList.length; i++) {
            let d = blockedList[i];
            if (host === d || host.endsWith("." + d)) return true;
        }
        return false;
    } catch (e) {
        return false;
    }
}

function getRealUrl(card, engine) {
    if (engine === "google") {
        let a = card.querySelector("a[href^='/url?q=']");
        if (a) {
            let m = a.href.match(/[?&]q=([^&]+)/);
            if (m) return decodeURIComponent(m[1]);
        }
        let a2 = card.querySelector("a[href^='http']");
        if (a2) return a2.href;
        let dh = card.getAttribute("data-href");
        if (dh && dh.startsWith("http")) return dh;
        return null;
    } else if (engine === "bing") {
        let titleA = card.querySelector("h2 a");
        if (titleA) return titleA.href;
        let anyLink = card.querySelector("a[href^='http']");
        return anyLink ? anyLink.href : null;
    }
    return null;
}

function markBlocked(card) {
    if (card.getAttribute("data-blocked") === "1") return;
    if (!document.getElementById("myBlockerStyle")) {
        let style = document.createElement("style");
        style.id = "myBlockerStyle";
        style.textContent = `
      .strike-it,
      .strike-it * {
        color: gray !important;
        text-decoration: line-through !important;
      }
    `;
        document.head.appendChild(style);
    }
    card.classList.add("strike-it");
    card.setAttribute("data-blocked", "1");
}

function handleCard(card, engine) {
    if (card.getAttribute("data-ai-card") === "1") {
        markBlocked(card);
        console.log("AI result blocked");
        return;
    }
    let target = getRealUrl(card, engine);
    if (target && shouldBlock(target)) {
        markBlocked(card);
        console.log("Blocked: " + target);
    }
}

function aichk(elem) {
    if (!elem) return false;
    let cn = (elem.className || "").toLowerCase();
    let id = (elem.id || "").toLowerCase();
    let t = cn.includes("qna_tlgacont") || cn.includes("extqna");
    if (t) return true;
    if (cn.includes("b_copilot") || cn.includes("b_ans")) return true;
    if (id.includes("copilot") || id.includes("b_copilot_answer")) return true;
    if (elem.getAttribute("data-bm") === "answer") return true;
    if (elem.querySelector('[aria-label*="Copilot"], [aria-label*="Answer"]')) return true;
    let itxt = elem.innerText || "";
    if (itxt.includes("Copilot 生成") || itxt.includes("AI 生成") ||
        itxt.includes("根据AI生成") || itxt.includes("Bing AI")) {
        return true;
    }
    return false;
}

function getCards(engine) {
    let arr = [];
    if (engine === "google") {
        let divs = document.querySelectorAll("div.g");
        if (divs.length === 0) divs = document.querySelectorAll("div[data-sokoban-container]");
        if (divs.length === 0) divs = document.querySelectorAll("div[jscontroller]");
        for (let i = 0; i < divs.length; i++) arr.push(divs[i]);
    } else if (engine === "bing") {
        let items = document.querySelectorAll("li.b_algo");
        for (let i = 0; i < items.length; i++) arr.push(items[i]);
        let exts = ["div.b_algo", "div.b_card", "div.b_slideCard", "li.b_ad", "div.b_ad", ".b_ans", "[data-block-type]"];
        for (let s of exts) {
            let xs = document.querySelectorAll(s);
            for (let c of xs)
                if (!arr.includes(c)) arr.push(c);
        }
        let aisel = [
            "div.qna_tlgacont", "div.extqna", "div[class*='qna_']",
            "div.b_copilot", "div.b_ans.b_topans", "div[data-bm='answer']",
            "div#b_copilot_answer", "div.copilot-area", "div.ai-answer"
        ];
        for (let sel of aisel) {
            let ac = document.querySelectorAll(sel);
            for (let c of ac) {
                if (!arr.includes(c)) {
                    c.setAttribute("data-ai-card", "1");
                    arr.push(c);
                }
            }
        }
        let pot = document.querySelectorAll('[class*="qna"], [class*="copilot"], [class*="b_ans"], [id*="copilot"], [data-bm]');
        for (let el of pot) {
            let cont = el.closest(".qna_tlgacont, .b_copilot, .b_ans, div[data-bm='answer'], #b_copilot_answer, .b_card, li.b_algo, div.b_algo");
            if (!cont) cont = el;
            if (!arr.includes(cont) && aichk(cont)) {
                cont.setAttribute("data-ai-card", "1");
                arr.push(cont);
            }
        }
        let topReg = document.querySelector("#b_results > div:first-child, .b_copilot_placeholder");
        if (topReg && !arr.includes(topReg) && aichk(topReg)) {
            topReg.setAttribute("data-ai-card", "1");
            arr.push(topReg);
        }
    }
    return arr;
}

function whichEngine() {
    let host = window.location.hostname;
    if (host.indexOf("google.com") != -1) return "google";
    if (host.indexOf("bing.com") != -1) return "bing";
    return null;
}

function scan() {
    let engine = whichEngine();
    if (!engine) return;
    let cards = getCards(engine);
    console.log(`Scanning ${cards.length} cards on ${engine}`);
    for (let i = 0; i < cards.length; i++) {
        handleCard(cards[i], engine);
    }
}

function watchPage() {
    let timer = null;
    let obs = new MutationObserver(function(muts) {
        let need = false;
        for (let m of muts) {
            if (m.addedNodes.length) {
                for (let n of m.addedNodes) {
                    if (n.nodeType === Node.ELEMENT_NODE) {
                        let cls = (n.className || "").toLowerCase();
                        if (cls.includes("qna") || cls.includes("copilot") || cls.includes("b_ans") || n.querySelector) {
                            need = true;
                            break;
                        }
                    }
                }
            }
        }
        if (need) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(scan, 200);
        } else {
            if (timer) clearTimeout(timer);
            timer = setTimeout(scan, 500);
        }
    });
    obs.observe(document.body, { childList: true, subtree: true });
}

//
function start() {
    loadDomains();
    watchPage();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
} else {
    start();
}