// Import stylesheets
import './style.css';
import { Cookie } from './models/Cookie';
import {Colours} from './models/Colours.enum';
import { SprinkleCookie } from './models/SprinkleCookie';

// Create a array/list of cookies named cookies
let cookies: Array<Cookie> = [];

let selectedCookie: Cookie;

const cookieSelector: HTMLSelectElement = document.getElementById('cookieSelector') as HTMLSelectElement;
const colourSelector: HTMLSelectElement = document.getElementById('colourSelector') as HTMLSelectElement;
const cookieColourInput: HTMLInputElement = document.getElementById('cookieColour-inp') as HTMLInputElement;
const cookiesDiv: HTMLElement = document.getElementById('cookiesDiv');
const changeColourBtn: HTMLElement = document.getElementById('changeColour-btn');
const addChopChipBtn: HTMLElement = document.getElementById('addChocolateChip-btn');
const createCookieBtn: HTMLElement = document.getElementById('createCookie-btn');
const createSprinkleBtn: HTMLElement = document.getElementById('createSprinkle-btn');

changeColourBtn.addEventListener('click', changeColour);
addChopChipBtn.addEventListener('click', addChocolateChip);
cookieSelector.addEventListener('change', getSelectedCookie);
createCookieBtn.addEventListener('click', createCookie);
createSprinkleBtn.addEventListener('click', createSprinkleCookie);


init();

// create an init() function
// init() will create two cookies called Cookie1 and Cookie2, and add them to the array of cookies
function init() {
  //TODO: add code here
  // create the two cookies
  let c1: Cookie = new Cookie('Cookie 1');
  let c2: Cookie = new Cookie('Cookie 2');
  let c3: SprinkleCookie = new SprinkleCookie('Cookie 3', Colours.Black);

  // add them to the array
  cookies.push(c1);
  cookies.push(c2);
  cookies.push(c3);

  // add them as options in the select/dropdown (cookieSelector) element
  for (let i = 0; i < cookies.length; i++) {
    let newOption: HTMLOptionElement = document.createElement('option');
    newOption.innerHTML = cookies[i].name;
    newOption.value = i.toString();

    cookieSelector.add(newOption);
  }

  let counter = 0;
  for (let c in Colours) {
    let newOption: HTMLOptionElement = document.createElement('option');
    newOption.innerHTML = c;
    newOption.value = counter.toString();
    counter++;
    colourSelector.add(newOption);
  }

  // initialise the cookieColour-inp to the colour of the first cookie created
  cookieColourInput.value = cookies[0].colour;

  selectedCookie = cookies[0];

  updateDisplay();
}

//TODO: this function needs to go through the list of cookies and draw them to cookiesDiv
// create the cookies as divs with the class name of cookie - see style.css
// number of chocolatechips needs to be shown on the cookie
function drawCookies() {
  //clears the div before drawing new cookies
  cookiesDiv.innerHTML = "";

  for (let i = 0; i < cookies.length; i++){
    if (cookies[i] instanceof SprinkleCookie) {
      //convert to sprinkle cookie
      let c: SprinkleCookie = cookies[i] as SprinkleCookie;

      //create new cookie div element
      let newCookieDiv: HTMLDivElement = document.createElement('div');
      newCookieDiv.className = 'cookie';
      newCookieDiv.style.backgroundColor = cookies[i].colour;
      
      //create sprinkle div which goes inside the cookie div
      let sprinkleDiv: HTMLDivElement = document.createElement('div');
      sprinkleDiv.innerHTML = cookies[i].chocChipNum.toString();
      sprinkleDiv.className = 'sprinkle';
      sprinkleDiv.style.backgroundColor = c.sprinkleColour;

      //change colour of text so it is readable on white and black backgrounds
      c.sprinkleColour === Colours.White ? sprinkleDiv.style.color = 'Black' : sprinkleDiv.style.color = 'White';


      newCookieDiv.appendChild(sprinkleDiv);
      cookiesDiv.appendChild(newCookieDiv);
    }
    else {
      let newCookieDiv: HTMLDivElement = document.createElement('div');
      newCookieDiv.className = 'cookie';
      newCookieDiv.innerHTML = cookies[i].chocChipNum.toString();
      newCookieDiv.style.backgroundColor = cookies[i].colour;
      
      cookiesDiv.appendChild(newCookieDiv);
    }
  }
}

//TODO: this fuction needs to be triggered by button changeColour-btn
// upon pressing the button it should change the colour of the cookie selected in the dropdown to the colour typed in the input element (cookieColour-inp)
function changeColour() {
  selectedCookie.colour = cookieColourInput.value;
  updateDisplay();
}

//TODO: this fuction needs to be triggered by button addChocolateChip-btn
// upon pressing the button it should add a chocolate chip to cookies selected from the dropdown
function addChocolateChip() {
  selectedCookie.chocChipNum++;
  updateDisplay();
}

function updateDisplay() {
  drawCookies();
}

function getSelectedCookie() {
  let selectedIndex: number = parseInt(cookieSelector.selectedOptions[0].value);
  selectedCookie = cookies[selectedIndex];
}

function createCookie() {
  let name: string = 'Cookie ' + (cookies.length + 1);
  let c: Cookie = new Cookie(name);
  cookies.push(c);

  let newOption: HTMLOptionElement = document.createElement('option');
  newOption.innerHTML = c.name;
  newOption.value = cookieSelector.options.length.toString();

  cookieSelector.add(newOption);

  drawCookies();
}
function createSprinkleCookie() {
  let c: SprinkleCookie = new SprinkleCookie('Sprinkle Cookie', Colours[colourSelector.selectedOptions[0].innerHTML]);
  cookies.push(c);

  let newOption: HTMLOptionElement = document.createElement('option');
  newOption.innerHTML = c.name;
  newOption.value = cookieSelector.options.length.toString();

  cookieSelector.add(newOption);

  drawCookies();
}