const express = require("express");
const multer = require("multer");
const path = require("path");
const { v4 } = require("uuid");

const app = express();

app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

/* 
 Configuracion basica de Multer.
 definido, la ruta destino,
 el nombre de los archivos
*/
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

/* Crear para todas las rutas, no recomendado */
app.use(
  multer({
    storage,
    dest: path.join(__dirname, "public/uploads"),
    limits: {
      fileSize: 1000000,
    },
    fileFilter: (req, file, callback) => {
      const validTypes = /jpeg|jpg|png|gif/;
      const mimetype = validTypes.test(file.mimetype);
      const extension = validTypes.test(path.extname(file.originalname));
      mimetype && extension
        ? callback(null, true)
        : callback("Error en el tipo de archivo");
    },
  }).array("images", 10)
);

app.get("/", (req, res) => res.render("index"));

app.post("/subir", (req, res) => {
  console.log(req.files);
  res.send("subiendo");
});
app.listen(app.get("port"), () => {
  console.log("3000");
});
