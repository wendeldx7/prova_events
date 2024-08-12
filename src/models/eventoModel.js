import conn from "../config/conn.js";

const tableEventos = /*sql*/ `
    CREATE TABLE IF NOT EXISTS eventos(
        id varchar(60) primary key,
        local varchar (255) not null,
        horario date not null,
        palestrante_id varchar(60),
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp,
        foreign key (palestrante_id) references palestrante(id)
    )
`;
conn.query(tableEventos, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Tabela [ eventos ] criada com sucesso 🤗🤗🤗🤗🤗");
});