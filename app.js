// backend/app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 3500;

// Configuração do MySQL
const db = mysql.createPool({
    host: "sql101.infinityfree.com",
    user: "if0_37651603",           // Usuário do MySQL
    password: "YDahcFSsY8ys",           // Senha do MySQL (vazia para XAMPP padrão)
    database: "if0_37651603_unifi_registro" // Nome do banco de dados
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

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
