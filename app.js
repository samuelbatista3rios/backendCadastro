const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = process.env.PORT || 3500; // Vercel define a porta através da variável de ambiente

// Configuração do MySQL
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Middlewares
app.use(bodyParser.json());
app.use(cors());

app.post("/register", (req, res) => {
    const { PRIMEIRO_NOME, ULTIMO_NOME, EMAIL, SENHA } = req.body;
    const dispositivo = req.ip; // Pega o IP do dispositivo

    const sql = `
        INSERT INTO usuarios (PRIMEIRO_NOME, ULTIMO_NOME, EMAIL, SENHA, DISPOSITIVO, DATA_ACESSO) 
        VALUES (?, ?, ?, ?, ?, NOW())
    `;

    const values = [PRIMEIRO_NOME, ULTIMO_NOME, EMAIL, SENHA, dispositivo];

    db.query(sql, values, (error, result) => {
        if (error) {
            res.status(500).json({ message: "Erro ao cadastrar.", error: error.message });
        } else {
            res.json({ message: "Cadastro realizado com sucesso!" });
        }
    });
});

// Exporta o app para que o Vercel possa usar
module.exports = app;
/*
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});*/
