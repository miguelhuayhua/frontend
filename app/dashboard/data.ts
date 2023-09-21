export function getRandomHexColor() {
   const letters = '012345';
   const redOrBlue = Math.random() > 0.5;
   let color = redOrBlue ? '#BB' : "BB";
   if (redOrBlue) {
      for (let i = 0; i < 4; i++) {
         color += letters[Math.floor(Math.random() * 6)];
      }
   }
   else {
      for (let i = 0; i < 4; i++) {
         color = letters[Math.floor(Math.random() * 6)] + color;
      }
      color = "#" + color;
   }
   return color;
}