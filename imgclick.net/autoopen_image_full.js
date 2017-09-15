// ==UserScript==
// @name        imgclick
// @namespace   imgclick.net
// @version     0.1.0
// @grant       none
// ==/UserScript==

/**
 * This script automatically opens an image in fullscreen mode.
 * imgclick.net usually intercepts the opening of images, rendering their service pretty lame. 
 * This little script will help out.
 */

const log = (text) => {
  console.log(`GM (${GM_info.script.name}): ${text}`);
};

const knownPictureFormats = [
  '.jpg',
  '.jpeg',
  '.png',
];
  
const currentUrl = new URL(document.URL);

const foundPictureEnding = knownPictureFormats.find((knownPictureFormat) => {
  return currentUrl.pathname.indexOf(`${knownPictureFormat}.html`) !== -1;
});

if (!foundPictureEnding) {
  log(`Didnt find ending. Check out the URL: ${currentUrl.pathname}`);
}

if (currentUrl.pathname.indexOf(`${foundPictureEnding}.html`) === -1) {
  log('GM: Nothing to do here');
  return false;
}

const idFirst = currentUrl.pathname.substring(1);
const actualId = idFirst.substring(0, idFirst.indexOf('/'));

log(actualId);
log(`sending to: ${document.URL}`);


const req = new XMLHttpRequest();

const onLoad = (evt) => {
  
  const source = req.response;
  
  if (req.status !== 200) {
    return false;
  }
  
  const startingPoint = source.substring(source.indexOf('<br><img'));
  const startOfUrl = startingPoint.substring(startingPoint.indexOf('"') + 1);
  const properUrl = startOfUrl.substring(0, startOfUrl.indexOf('"'));
  
  log('The winner is:', properUrl);
  
  //window.location.href = properUrl;
  window.location.replace(properUrl);
}

req.addEventListener('load', onLoad)
req.open('POST', document.URL);
const formdata = new FormData()
formdata.append('op', 'view')
formdata.append('id', actualId)
formdata.append('pre', '1')
formdata.append('adb', '1')
formdata.append('next', 'Continue+to+image...')
req.send(formdata);