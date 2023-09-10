export function getRandomHexColor() {
   const letters = '012345678';
   let color = '#';
   for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 9)];
   }
   return color;
}
