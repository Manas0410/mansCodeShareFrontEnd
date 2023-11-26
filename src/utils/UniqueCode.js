export const generateUniqueCode = (length) => {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let uniqueCode = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueCode += characters[randomIndex];
  }

  return uniqueCode;
};

// Example: Generate a unique code of length 8
const code = generateUniqueCode(6);
console.log(code, "expfile");
