// ==UserScript==
// @name        9gag_blinking_banner
// @namespace   9gag.com
// @version     0.1.0
// @grant       none
// ==/UserScript==

const potentialFuns = document.getElementsByClassName('funoff');

if (!potentialFuns.length) {
  return;
}

for (let i = potentialFuns.length - 1; i >= 0; i--) {
  potentialFuns[i].parentElement.removeChild(potentialFuns[i]);
}