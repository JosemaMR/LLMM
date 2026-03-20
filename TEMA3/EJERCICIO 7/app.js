const pictures = [
  "contBcg-0",
  "contBcg-1",
  "contBcg-2",
  "contBcg-3",
];

let counter = 0;
const imageDIV = document.getElementById('img-container');

function changeImage(direction) {
  counter += direction;

  if (counter < 0) {
    counter = pictures.length - 1;
  }

  if (counter > pictures.length - 1) {
    counter = 0;
  }

  imageDIV.style.backgroundImage = `url('./img/${pictures[counter]}.jpeg')`;
}
