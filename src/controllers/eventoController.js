import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const getPalestrante = async (request, response) => {
    const sql = `SELECT * FROM palestrante`;
    conn.query(sql, (err, data) => {
      if (err) {
        response.status(500).json({ msg: "Erro ao acessar os palestrantes" });
        return;
      }
      const Palestrantes = data;
      response.status(200).json(Palestrantes);
    });
  };


  export const postPalestrante = (request, response) =>{
  
  const { nome, expertise } = request.body;
  

  if (!nome) {
    response.status(400).json({ msg: "Nome é um campo obrigatório" });
    return;
}
if(!expertise){
    response.status(400).json({ msg: "Expertise é um campo obrigatório" });
    return;
}



      const id = uuidv4();

  const sql = `insert into palestrante (??, ??, ??) values (?,?, ?)` 

  const insertSql = ["id","nome", "expertise", id, nome, expertise]

  conn.query(sql, insertSql, (err, data)=>{
      if (err) {
          console.error(err);
          response.status(500).json({ msg: "Erro ao cadastrar o palestrante no banco de dados" });
          return;
        }
        response.status(201).json({msg: "Palestrante cadastrado!"})
      });
 

};

