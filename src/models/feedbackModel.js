import conn from "../config/conn.js";

const tableFeedback = /*sql*/ `
    CREATE TABLE IF NOT EXISTS feedback(
        id int AUTO_INCREMENT PRIMARY KEY,
        comentario varchar(1000) not null,
        nota int not null,
        participanteId int not null,
        eventoId int not null,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp,
        foreign key (participanteId) references participantes(id)
    )
`;
conn.query(tableFeedback, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Tabela [ feedback ] criada com sucesso 🤗🤗🤗🤗🤗");
});





