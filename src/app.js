import express from "express";
import fs from "fs";

const manejoJSON = async () => {
    try {
        const data = await fs.promises.readFile("./Productos.json", "utf-8");
        const productos = JSON.parse(data);
        return productos;
    }
    catch (error) {
        throw new Error(error);
    }
}

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Servidor arriba")
})

app.get("/products", async (req, res) => {
    res.send(await manejoJSON());
});

app.get("/products", async (req, res) => {
    let limit = req.query.limit;
    const limiteDeseado = +limit - 1;
    const productos = await manejoJSON();
    const productosDeseados = (productos.id).slice(0, limiteDeseado);
    console.log(productosDeseados)
    res.send(productosDeseados);
});

app.listen(8080, () => {
    console.log("Servidor abierto en puerto 8080");
})