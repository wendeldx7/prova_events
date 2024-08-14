import conn from "../config/conn.js";

const tableParticipante = /*sql*/ `
    CREATE TABLE IF NOT EXISTS participantes(
      id int AUTO_INCREMENT PRIMARY KEY,
        nome varchar(255) not null,
        idade int(3) not null,
        email varchar(255) not null, 
        telefone varchar(255), 
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp
    )
`;
conn.query(tableParticipante, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Tabela [ participante ] criada com sucesso 🤗🤗🤗🤗🤗");
});