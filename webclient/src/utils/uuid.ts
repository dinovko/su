// export const generateGUID: any = () => crypto.randomUUID();

export function generateGUID(): string {
    // Helper function to generate a random number and convert it to a hexadecimal string
    function randomHexDigit() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
  
    // Combine random hexadecimal strings to form a UUID
    return (
      randomHexDigit() +
      randomHexDigit() +
      '-' +
      randomHexDigit() +
      '-' +
      randomHexDigit() +
      '-' +
      randomHexDigit() +
      '-' +
      randomHexDigit() +
      randomHexDigit() +
      randomHexDigit()
    );
  }