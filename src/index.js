const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const app = express();
const path = require("path");
require("dotenv").config();
app.set("port", process.env.port || 3001);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.listen(app.get("port"), () => {
  console.log(`Servidor iniciado en el puerto ${app.get("port")}`);
});
app.set("json spaces", 2);
app.use(passport.initialize());

//Rutas
app.use("/api/imagenes/", express.static(path.join(__dirname, "public/img")));
app.use("/api/", require("./routes/index"));
app.use("/api/usuarios/", require("./routes/usuarios"));
app.use("/api/productos/", require("./routes/productos"));
app.use("/api/tarjetas/", require("./routes/tarjetas"));
app.use("/api/categorias/", require("./routes/Categorias"));
app.use("/api/facturas/", require("./routes/facturas"));
app.use("/api/detalles_factura/", require("./routes/detalles_factura"));
app.use("/api/archivos", require("./routes/archivos"));
app.use("/api/autenticacion", require("./routes/autenticacion"));
app.use("/api/empleados/", require("./routes/empleados"));
