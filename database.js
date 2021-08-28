var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "banco-curriculo.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`
            CREATE TABLE candidatos (
                id INTEGER,
                nome TEXT,
                nascimento_dia INTEGER,
                nascimento_mes INTEGER,
                nascimento_ano INTEGER,
                cargo_pretendido TEXT,
                estado_civil TEXT,
                sexo TEXT,
                cep INTEGER,
                logradouro TEXT,
                numero TEXT,
                complemento TEXT,
                bairro TEXT, 
                cidade TEXT,
                estado TEXT,
                telefone_fixo1 TEXT,
                telefone_fixo2 TEXT,
                celular TEXT,
                contato TEXT,
                email TEXT UNIQUE,
                profissao TEXT,
                rg TEXT,
                cpf TEXT UNIQUE,
                veiculo TEXT,
                habilitacao TEXT,
                CONSTRAINT candidatos_pk PRIMARY KEY("id" AUTOINCREMENT)
                CONSTRAINT email_unique UNIQUE (email),
                CONSTRAINT cpf_unique UNIQUE (cpf)
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    // Table just created, creating some rows
                    // var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
                    // db.run(insert, ["admin", "admin@example.com", md5("admin123456")])
                    // db.run(insert, ["user", "user@example.com", md5("user123456")])
                }
            });
    }
});


module.exports = db