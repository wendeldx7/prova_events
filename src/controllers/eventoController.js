import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const getPalestrante = (request, response) => {
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
export const getInscricoes = (request, response) => {
  const sql = `SELECT * FROM inscricoes`;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ msg: "Erro ao acessar os inscricoes" });
      return;
    }
    const inscricoes = data;
    response.status(200).json(inscricoes);
  });
};

export const getParticipantes = (request, response) => {
  const sql = `SELECT * FROM participantes`;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ msg: "Erro ao acessar os Participantes" });
      return;
    }
    const Participantes = data;
    response.status(200).json(Participantes);
  });
};

export const getAgenda = (request, response) => {
  const sql = `SELECT * FROM eventos`;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ msg: "Erro ao acessar a agenda" });
      return;
    }
    const Agenda = data;
    response.status(200).json(Agenda);
  });
};

export const postPalestrante = (request, response) => {
  const { nome, expertise } = request.body;

  if (!nome) {
    response.status(400).json({ msg: "Nome é um campo obrigatório" });
    return;
  }
  if (!expertise) {
    response.status(400).json({ msg: "Expertise é um campo obrigatório" });
    return;
  }

  const sql = `insert into palestrante (??, ??) values (?, ?)`;

  const insertSql = ["nome", "expertise", nome, expertise];

  conn.query(sql, insertSql, (err, data) => {
    if (err) {
      console.error(err);
      response
        .status(500)
        .json({ msg: "Erro ao cadastrar o palestrante no banco de dados" });
      return;
    }
    response.status(201).json({ msg: "Palestrante cadastrado!" });
  });
};

export const criarEvento = (request, response) => {
  const { titulo, data, palestrantesId } = request.body;

  if (!titulo) {
    response.status(400).json({ msg: "titulo é um campo obrigatório" });
    return;
  }
  if (!data) {
    response.status(400).json({ msg: "data é um campo obrigatório" });
    return;
  }
  if (!palestrantesId) {
    response
      .status(400)
      .json({ msg: "palestrantes Id é um campo obrigatório" });
    return;
  }

  const sql = `insert into eventos ( ??, ??, ??) values (?, ?, ?)`;

  const insertSql = [
    "titulo",
    "data",
    "palestrantesId",
    titulo,
    data,
    palestrantesId,
  ];

  conn.query(sql, insertSql, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ msg: "Erro ao cadastrar o evento" });
      return;
    }
    response.status(201).json({ msg: "evento cadastrado!" });
  });
};

export const registroParticipante = (request, response) => {
  const { nome, idade, email, telefone } = request.body;

  if (!nome) {
    response.status(400).json({ msg: "nome é um campo obrigatório" });
    return;
  }
  if (!idade) {
    response.status(400).json({ msg: "idade é um campo obrigatório" });
    return;
  }
  if (!email) {
    response.status(400).json({ message: "O email é obrigatório" });
    return;
  }
  if (!email.includes("@")) {
    response.status(400).json({ message: "O email precisa ter '@'" });
    return;
  }
  if (!telefone) {
    response.status(400).json({ msg: "telefone é um campo obrigatório" });
    return;
  }


  const checkSql =`
        SELECT * FROM participantes
        WHERE ?? = ?
    `
    const checkData = ["email", email]

    conn.query(checkSql, checkData, (err, data)=> {
        if(err){
            response.status(500).json({msg: "Erro ao buscar o participante"})
            return console.log(err);
        }

        if(data.length > 0){
            response.status(400).json({msg: "email repetido"})
            return console.log(err);
        }
    })

  const sql = `insert into participantes ( ??, ??, ??, ??) values (?, ?, ?, ?)`;

  const insertSql = [
    "nome",
    "idade",
    "email",
    "telefone",
    nome,
    idade,
    email,
    telefone,
  ];

  conn.query(sql, insertSql, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ msg: "Erro ao cadastrar o participante" });
      return;
    }
    response.status(201).json({ msg: "participante cadastrado!" });
  });
};

export const inscreverParticipante = (request, response) => {
  const { participanteId, eventoId } = request.body;

  if (!participanteId) {
    response.status(400).json({ msg: "participanteId é um campo obrigatório" });
    return;
  }
  if (!eventoId) {
    response.status(400).json({ msg: "eventoId é um campo obrigatório" });
    return;
  }

 const checkSql = /*sql*/ `
        SELECT * FROM inscricoes
        WHERE eventoId = "${eventoId}" AND participanteId = "${participanteId}"
    `

    conn.query(checkSql, (err, data)=> {
        if(err){
            response.status(500).json({message: "Erro ao buscar dados"})
            return;
        }

        if(data.length > 0){
            response.status(400).json({message: "A inscrição já foi realizada"})
            return;
        }
    })
  

  const sql = `insert into inscricoes (??, ??) values (?, ?)`;

  const insertSql = ["participanteId", "eventoId", participanteId, eventoId];

  conn.query(sql, insertSql, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ msg: "Erro ao inscrever o participante" });
      return;
    }
    response.status(201).json({ msg: "inscrição realizada!" });
  });
};
