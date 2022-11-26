// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  let pinCodes = {
    222: ["Muharraq", "Busaiteen"],
    251: ["Muharraq", "Galali"],
    204: ["Muharraq", "Hidd"],
    327: ["Manama", "Adliya"],
    340: ["Manama", "Juffair"],
    306: ["Manama", "Ras Ruman"],
  };
  res.status(200).json(pinCodes);
}
