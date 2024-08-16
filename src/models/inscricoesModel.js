import conn from "../config/conn.js";

const tableIncricoes = /*sql*/ `
    CREATE TABLE IF NOT EXISTS inscricoes(
      id int AUTO_INCREMENT PRIMARY KEY,
      participanteId int not null,
      eventoId int not null,
      created_at timestamp default current_timestamp,
      updated_at timestamp default current_timestamp on update current_timestamp,
      foreign key (participanteId) references participantes(id)
    )
`;
conn.query(tableIncricoes, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Tabela [ inscricoes ] criada com sucesso 🤗🤗🤗🤗🤗");
});
