// Import stylesheets
import './style.css';
import { Cookie } from './models/Cookie';

// Create a array/list of cookies named cookies
let cookies: Array<Cookie> = [];

let selectedCookie: Cookie;

const cookieSelector: HTMLSelectElement = document.getElementById('cookieSelector') as HTMLSelectElement;
const cookieColourInput: HTMLInputElement = document.getElementById('cookieColour-inp') as HTMLInputElement;
const cookiesDiv: HTMLElement = document.getElementById('cookiesDiv');
const changeColourBtn: HTMLElement = document.getElementById('changeColour-btn');
const addChopChipBtn: HTMLElement = document.getElementById('addChocolateChip-btn');
const createCookieBtn: HTMLElement = document.getElementById('createCookie-btn');

changeColourBtn.addEventListener('click', changeColour);
addChopChipBtn.addEventListener('click', addChocolateChip);
cookieSelector.addEventListener('change', getSelectedCookie);
createCookieBtn.addEventListener('click', createCookie);


init();

// create an init() function
// init() will create two cookies called Cookie1 and Cookie2, and add them to the array of cookies
function init() {
  //TODO: add code here
  // create the two cookies
  let c1: Cookie = new Cookie('Cookie 1');
  let c2: Cookie = new Cookie('Cookie 2');

  // add them to the array
  cookies.push(c1);
  cookies.push(c2);

  // add them as options in the select/dropdown (cookieSelector) element
  for (let i = 0; i < cookies.length; i++) {
    let newOption: HTMLOptionElement = document.createElement('option');
    newOption.innerHTML = cookies[i].name;
    newOption.value = i.toString();

    cookieSelector.add(newOption);
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
    let newCookieDiv: HTMLDivElement = document.createElement('div');
    newCookieDiv.className = 'cookie';
    newCookieDiv.innerHTML = cookies[i].chocChipNum.toString();
    newCookieDiv.style.backgroundColor = cookies[i].colour;

    cookiesDiv.appendChild(newCookieDiv);
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