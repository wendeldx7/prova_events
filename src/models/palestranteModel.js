import conn from "../config/conn.js";

const tablePalestrante = /*sql*/ `
    CREATE TABLE IF NOT EXISTS palestrante(
      id int AUTO_INCREMENT PRIMARY KEY,
        nome varchar(255) not null,
        expertise varchar(255) not null,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp
    )
`;
conn.query(tablePalestrante, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Tabela [ palestrante ] criada com sucesso 🤗🤗🤗🤗🤗");
});