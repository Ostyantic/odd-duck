'use strict';

console.log('Hello World!');

// TODO
// 1. Create a constructor function that creates an object associated with each product, and has the following properties:
// Name of the product
// File path of image
// Times the image has been shown
// -----------------------------------

// delcaring a products array
let productsArr = [];
// console.log(productsArr);

// creating a queue (for later use)
let uniqueProducts = [];

// setting a counter to keep track of number of clicks
let clickCounter = 0;

let results = document.getElementById('result');

// Assigning HTML img elements to 3 separate image variables, will be manipulated to add src and alt attributes
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:last-child');

// creating a contructor named Products with various properties
function Product(name, src) {
  this.name = name;
  this.src = src;
  this.viewed = 0;
  this.clicked = 0;
  productsArr.push(this);
}

// creating new products with the Products constructor
let product1 = new Product ('R2D2 Bags', './Img/bag.jpg');
let product2 = new Product ('Banana Cutter', './Img/banana.jpg');
let product3 = new Product ('Tablet TP', './Img/bathroom.jpg');
let product4 = new Product ('Breakfast Machine', './Img/breakfast.jpg');
let product5 = new Product ('Meatball BG', './Img/bubblegum.jpg');
let product6 = new Product ('Uncomfortable Chair', './Img/chair.jpg');
let product7 = new Product ('Cthulhu', './Img/cthulhu.jpg');
let product8 = new Product ('Dog Duck', './Img/dog-duck.jpg');
let product9 = new Product ('Dragon Meat', './Img/dragon.jpg');
let product10 = new Product ('Weird Pens', './Img/pen.jpg');
let product11 = new Product ('Pet Sweep', './Img/pet-sweep.jpg');
let product12 = new Product ('Pizza Cutter', './Img/scissors.jpg');
let product13 = new Product ('Shark Bed', './Img/shark.jpg');
let product14 = new Product ('Baby Sweep', './Img/sweep.png');
let product15 = new Product ('Tauntaun', './Img/tauntaun.jpg');
let product16 = new Product ('Unicorn Meat', './Img/unicorn.jpg');
let product17 = new Product ('Water Can', './Img/water-can.jpg');
let product18 = new Product ('Wine Glass', './Img/wine-glass.jpg');
let product19 = new Product ('Useless Boots', './Img/boots.jpg');

// console logging each item in the productsArr array
// console.log(productsArr);

// -----------------------------------
// 2. Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.
// -----------------------------------


// creating a function to generate a random index from the productsArr
function generateRandomProdIndex () {
  return Math.floor(Math.random() * productsArr.length);
}

// Assigning generateRandomProdIndex function to 3 separate product image variables
// let index1 = generateRandomProdIndex();
// let index2 = generateRandomProdIndex();
// let index3 = generateRandomProdIndex();

// testing for proper return values using console.log
// console.log(`Product image 1 is: ${index1} 
// Product image 2 is: ${index2} 
// Product image 3 is: ${index3}`);

// creating a function that renders 3 randomly generated product images

function renderProductImages () {

  while (uniqueProducts.length < 6 ) {

    let randomIndex = generateRandomProdIndex();
    console.log(`The random product is: ${productsArr[randomIndex].name}`);

    if(!uniqueProducts.includes(productsArr[randomIndex])) {
      uniqueProducts.push(productsArr[randomIndex]);
      console.log('the unique products are: ', uniqueProducts);
    }
  }

  let firstImageObject = uniqueProducts.shift();
  let secondImageObject = uniqueProducts.shift();
  let thirdImageObject = uniqueProducts.shift();

  console.log('The three unique images are :', firstImageObject.name, secondImageObject.name, thirdImageObject.name);
  console.log('The remain unique products after shifts is:', uniqueProducts);

  image1.src = firstImageObject.src;
  image1.alt = firstImageObject.name;
  image1.title = firstImageObject.name;

  image2.src = secondImageObject.src;
  image2.alt = secondImageObject.name;
  image2.title = secondImageObject.name;

  image3.src = thirdImageObject.src;
  image3.alt = thirdImageObject.name;
  image3.title = thirdImageObject.name;

  firstImageObject.viewed++;
  secondImageObject.viewed++;
  thirdImageObject.viewed++;
}

// creating an event handler that records how many times each image is clicked. afterwards, increments the amount of times the image has been clicked and re-renders each image. Finally, an if statement to keep track of the click counter, once the click counter exceeds 25 clicks, the event listeners for each image is removed.
function handleClickedProduct(event) {
  clickCounter++;
  let selection = event.target;

  for (let i = 0; i < productsArr.length; i++) {
    if (selection.alt.includes(productsArr[i].name)) {
      productsArr[i].clicked++;
      // console.log(productsArr[i]);
    }
  }

  renderProductImages();

  if (clickCounter > 24) {
    image1.removeEventListener('click', handleClickedProduct);
    image2.removeEventListener('click', handleClickedProduct);
    image3.removeEventListener('click', handleClickedProduct);
  }
}

// Event handler for button to view results of how many times each image has been viewed and clicked.
function handleViewResults() {
  let prodUL = document.querySelector('ul');

  for (let i = 0; i < productsArr.length; i++ ) {
    let prodLI = document.createElement('li');
    prodLI.innerText = `${productsArr[i].name} was viewed ${productsArr[i].viewed} times and was clicked on ${productsArr[i].clicked} times!`;
    prodUL.appendChild(prodLI);
  }

  // creating empty arrays for names, views and clicks
  let names = [];
  let views = [];
  let clicks = [];

  // for loop to iterate through each item in the productsArr array, each iteration pushes the current indices name, views, and clicks into their corresponding array.
  for (let i = 0; i < productsArr.length; i++) {
    names.push(productsArr[i].name);
    views.push(productsArr[i].viewed);
    clicks.push(productsArr[i].clicked);
  }

  //console log for testing
  // console.log(names);
  // console.log(views);
  // console.log(clicks);

  // Chart sourced from "https://www.chartjs.org/docs/latest/getting-started/"
  // This chart will render the results of each images views and clicks in a bar graph
  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: 'Views',
        data: views,
        borderWidth: 1
      },
      {
        label: 'Clicks',
        data: clicks,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  if (clickCounter > 24) {
    results.removeEventListener('click', handleViewResults);
  }
}

// image render (on page load)
renderProductImages();

// event listeners
image1.addEventListener('click', handleClickedProduct);
image2.addEventListener('click', handleClickedProduct);
image3.addEventListener('click', handleClickedProduct);
results.addEventListener('click', handleViewResults);


// ideas for code:
// add unique products to array
//
// .include();
// .shift();
// .pop();

// // new function to render unique images on every iteration
// function newImageRenderFunc () {

//   // for loop to iterate through
//   for (let i = 0; i < 3; i++) {

//     // testing logs to keep track of image iteration
//     console.log('----------------');
//     console.log(`Image ${i+1}`);
//     console.log('----------------');

//     while (uniqueProducts.length < 6 ) {

//       let randomIndex = generateRandomProdIndex();
//       console.log(`The random product is: ${productsArr[randomIndex].name}`);

//       if(!uniqueProducts.includes(productsArr[randomIndex])) {
//         uniqueProducts.push(productsArr[randomIndex]);
//         console.log('the unique products are: ', uniqueProducts);
//       }
//     }

//     let firstImageObject = uniqueProducts.shift();
//     let secondImageObject = uniqueProducts.shift();
//     let thirdImageObject = uniqueProducts.shift();

//     console.log('The three images are :', firstImageObject, secondImageObject, thirdImageObject);
//     console.log('uniqueProducts after shifts is:', uniqueProducts);
//   }
// }

// newImageRenderFunc();
