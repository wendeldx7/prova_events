import conn from "../config/conn.js";

const tableEventos = /*sql*/ `
    CREATE TABLE IF NOT EXISTS eventos(
      id int AUTO_INCREMENT PRIMARY KEY,
        titulo varchar(255) not null,
        palestrantesId int not null,
        data date not null,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp,
        foreign key (palestrantesId) references palestrante(id)
    )
`;
conn.query(tableEventos, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Tabela [ eventos ] criada com sucesso 🤗🤗🤗🤗🤗");
});