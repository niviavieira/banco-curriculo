// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")
var md5 = require("md5")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 8000
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({ "message": "Ok" })
});

// Insert here other API endpoints
app.get("/api/candidatos", (req, res, next) => {
    var sql = "select * from candidatos"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

app.get("/api/candidato/:id", (req, res, next) => {
    var sql = "select * from candidatos where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        })
    });
});

app.post("/api/candidato/", (req, res, next) => {
    var errors = []
    //  CPF, Nome, Data Nascimento, Cep, Logradouro, Número, Bairro, Cidade, Email, Profissão e Celular
    if (!req.body.cpf) {
        errors.push("Informar o CPF é obrigatório");
    }
    if (!req.body.nome) {
        errors.push("Informar o Nome é obrigatório");
    }
    if (!req.body.nascimento_dia) {
        errors.push("Informar o dia do nascimento é obrigatório");
    }
    if (!req.body.nascimento_mes) {
        errors.push("Informar o mês do nascimento é obrigatório");
    }
    if (!req.body.nascimento_ano) {
        errors.push("Informar o ano do nascimento é obrigatório");
    }
    if (!req.body.cep) {
        errors.push("Informar o CEP é obrigatório");
    }
    if (!req.body.bairro) {
        errors.push("Informar bairro é obrigatório");
    }
    if (!req.body.cidade) {
        errors.push("Informar a cidade é obrigatório");
    }
    if (!req.body.email) {
        errors.push("Informar o e-mail é obrigatório");
    }
    if (!req.body.profissao) {
        errors.push("Informar a profissão é obrigatório");
    }
    if (!req.body.email) {
        errors.push("Informar o número do celular é obrigatório");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join("\n") });
        return;
    }
    var data = {
        nome: req.body.nome,
        nascimento_dia: req.body.nascimento_dia,
        nascimento_mes: req.body.nascimento_mes,
        nascimento_ano: req.body.nascimento_ano,
        cargo_pretendido: req.body.cargo_pretendido,
        estado_civil: req.body.estado_civil,
        sexo: req.body.sexo,
        cep: req.body.cep,
        logradouro: req.body.logradouro,
        numero: req.body.numero,
        complemento: req.body.complemento,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        estado: req.body.estado,
        telefone_fixo1: req.body.telefone_fixo1,
        telefone_fixo2: req.body.telefone_fixo2,
        celular: req.body.celular,
        contato: req.body.contato,
        email: req.body.email,
        profissao: req.body.profissao,
        rg: req.body.rg,
        cpf: req.body.cpf,
        veiculo: req.body.veiculo,
        habilitacao: req.body.habilitacao
    }
    var sql = `
    INSERT INTO candidatos (
        nome,
        nascimento_dia,
        nascimento_mes,
        nascimento_ano,
        cargo_pretendido,
        estado_civil,
        sexo,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        telefone_fixo1,
        telefone_fixo2,
        celular,
        contato,
        email,
        profissao,
        rg,
        cpf,
        veiculo,
        habilitacao
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )`;
    var params = [
        data.nome,
        data.nascimento_dia,
        data.nascimento_mes,
        data.nascimento_ano,
        data.cargo_pretendido,
        data.estado_civil,
        data.sexo,
        data.cep,
        data.logradouro,
        data.numero,
        data.complemento,
        data.bairro,
        data.cidade,
        data.estado,
        data.telefone_fixo1,
        data.telefone_fixo2,
        data.celular,
        data.contato,
        data.email,
        data.profissao,
        data.rg,
        data.cpf,
        data.veiculo,
        data.habilitacao
    ];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    });
})

app.patch("/api/candidato/:id", (req, res, next) => {
    var data = {
        nome: req.body.nome,
        nascimento_dia: req.body.nascimento_dia,
        nascimento_mes: req.body.nascimento_mes,
        nascimento_ano: req.body.nascimento_ano,
        cargo_pretendido: req.body.cargo_pretendido,
        estado_civil: req.body.estado_civil,
        sexo: req.body.sexo,
        cep: req.body.cep,
        logradouro: req.body.logradouro,
        numero: req.body.numero,
        complemento: req.body.complemento,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        estado: req.body.estado,
        telefone_fixo1: req.body.telefone_fixo1,
        telefone_fixo2: req.body.telefone_fixo2,
        celular: req.body.celular,
        contato: req.body.contato,
        email: req.body.email,
        profissao: req.body.profissao,
        rg: req.body.rg,
        cpf: req.body.cpf,
        veiculo: req.body.veiculo,
        habilitacao: req.body.habilitacao
    }
    var params = [
        data.nome,
        data.nascimento_dia,
        data.nascimento_mes,
        data.nascimento_ano,
        data.cargo_pretendido,
        data.estado_civil,
        data.sexo,
        data.cep,
        data.logradouro,
        data.numero,
        data.complemento,
        data.bairro,
        data.cidade,
        data.estado,
        data.telefone_fixo1,
        data.telefone_fixo2,
        data.celular,
        data.contato,
        data.email,
        data.profissao,
        data.rg,
        data.cpf,
        data.veiculo,
        data.habilitacao,
        req.params.id
    ];
    var sql = `
        UPDATE candidatos SET 
            nome = COALESCE(?, nome),
            nascimento_dia = COALESCE(?, nascimento_dia),
            nascimento_mes = COALESCE(?, nascimento_mes),
            nascimento_ano = COALESCE(?, nascimento_ano),
            cargo_pretendido = COALESCE(?, cargo_pretendido),
            estado_civil = COALESCE(?, estado_civil),
            sexo = COALESCE(?, sexo),
            cep = COALESCE(?, cep),
            logradouro = COALESCE(?, logradouro),
            numero = COALESCE(?, numero),
            complemento = COALESCE(?, complemento),
            bairro = COALESCE(?, bairro),
            cidade = COALESCE(?, cidade),
            estado = COALESCE(?, estado),
            telefone_fixo1 = COALESCE(?, telefone_fixo1),
            telefone_fixo2 = COALESCE(?, telefone_fixo2),
            celular = COALESCE(?, celular),
            contato = COALESCE(?, contato),
            email = COALESCE(?, email),
            profissao = COALESCE(?, profissao),
            rg = COALESCE(?, rg),
            cpf = COALESCE(?, cpf),
            veiculo = COALESCE(?, veiculo),
            habilitacao = COALESCE(?, habilitacao)
            WHERE id = ?`;

    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": res.message })
            return;
        }
        res.json({
            message: "success",
            data: data,
            changes: this.changes
        })
    });
});

app.delete("/api/candidato/:id", (req, res, next) => {
    var sql = 'DELETE FROM candidatos WHERE id = ?';
    db.run(sql, req.params.id, function (err, result) {
        if (err) {
            res.status(400).json({ "error": res.message })
            return;
        }
        res.json({ "message": "deleted", changes: this.changes })
    });
});

// Default response for any other request
app.use(function (req, res) {
    res.status(404);
});
