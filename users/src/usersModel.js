const mongoose = require("mongoose");

Schema = mongoose.Schema;
const { isValidEmail } = require("./stringFunctions");

const userSchema = new Schema({
  user_name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: isValidEmail,
    lowercase: true,
  },
  password: { type: String, required: true, select: false },
  birthday: { type: String, required: true },
  account_type: { type: Number, required: true },
  gender: { type: String, required: true },
  heigth: { type: Number, requred: true },
  weigth: { type: Number, requred: true },
  ubication: {
    x: { type: Number, requred: true },
    y: { type: Number, requred: true },
  },
  biography: { type: String, required: true },
  opt_ins: [{ name: { type: String } }],
  equipment: [
    {
      name: { type: String },
    },
  ],
});

module.exports = mongoose.model("User", userSchema, "users");

// Este subsistema es el encargado de manejar las cuentas de los usuarios de Strava.
// Es aquí donde los usuarios se registran (con su email y contraseña) y manejan todo lo relacionado a su
// perfil. La siguiente información es manejada por este subsistema: email y nombre del usuario,
// tipo de cuenta, género, fecha de nacimiento, ubicación, altura y peso, una biografía,
// restricciones de privacidad, equipación (por ejemplo championes o bicicletas) y opt-in de
// notificaciones entre otros.

// -email
// -contrasena
// -nombre
// -tipo de cuenta
// -genero
// -fecha de nacimiento
// -ubicacion
// -altura
// -peso
// -biografia
// -restricciones de privacidad
// -equipaciones (camps, bicis)
// -opt in de notificaciones
