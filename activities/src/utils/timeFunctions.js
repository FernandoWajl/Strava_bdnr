const diffreneceOfTimeStrings = (from, to) =>
  new Date(from).getTime() - new Date(to).getTime();

module.exports = { diffreneceOfTimeStrings };
