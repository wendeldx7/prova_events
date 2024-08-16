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
export const getEventosInscritos = (request, response) => {
  const { participanteId } = request.params;

  const sql = `SELECT * FROM inscricoes where ?? = ?`;
  const insertData = ["participanteId", participanteId];

  conn.query(sql, insertData, (err, data) => {
    if (err) {
      response.status(500).json({ msg: "Erro ao acessar os eventos" });
      return;
    }
    if (data.length === 0) {
      response.status(404).json({ msg: "O participante não está inscrito em nenhum evento" });
      return;
    }
    response.status(200).json(data)
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

  const checkSql = `
        SELECT * FROM participantes
        WHERE ?? = ?
    `;
  const checkData = ["email", email];

  conn.query(checkSql, checkData, (err, data) => {
    if (err) {
      response.status(500).json({ msg: "Erro ao buscar o participante" });
      return console.log(err);
    }

    if (data.length > 0) {
      response.status(400).json({ msg: "email repetido" });
      return console.log(err);
    }
    
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

  const checkInscricoes = /*sql*/ `
  SELECT * FROM eventos
  WHERE id = "${eventoId}"
`;
  conn.query(checkInscricoes, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar dados" });
      return;
    }

    if (data.length == 0) {
      response.status(400).json({ message: "evento não encontrado" });
      return;
    }
    
    const checkSql = /*sql*/ `
        SELECT * FROM inscricoes
        WHERE eventoId = "${eventoId}" AND participanteId = "${participanteId}"
    `;

conn.query(checkSql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar dados" });
      return;
    }
    
    if (data.length > 0) {
      response.status(400).json({ message: "A inscrição já foi realizada" });
      return;
    }
    
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
  });
})
};

export const postFeedback = (request, response) => {
  const { participanteId, eventoId, nota, comentario } = request.body;

  if (!participanteId) {
    response.status(400).json({ msg: "participanteId é um campo obrigatório" });
    return;
  }
  if (!eventoId) {
    response.status(400).json({ msg: "eventoId é um campo obrigatório" });
    return;
  }
  if (!nota) {
    response.status(400).json({ msg: "nota é um campo obrigatório" });
    return;
  }
  if (!comentario) {
    response.status(400).json({ msg: "comentario é um campo obrigatório" });
    return;
  }

  const checkSql = `
        SELECT * FROM participantes
        WHERE ?? = ?
    `;
  const checkData = ["id", participanteId];

  conn.query(checkSql, checkData, (err, data) => {
    if (err) {
      response.status(500).json({ msg: "Erro ao buscar o participante" });
      return;
    }

    if (data.length == 0) {
      response.status(400).json({ msg: "participante não encontrado" });
      return console.log(err);
    }

    const checkRep = `
        SELECT * FROM feedback
        WHERE ?? = ? and ?? = ?
    `;
    const checkRepData = [
      "participanteId",
      participanteId,
      "eventoId",
      eventoId,
    ];

    conn.query(checkRep, checkRepData, (err, data) => {
      if (err) {
        response.status(500).json({ msg: "Erro ao buscar o participante" });
        return console.log(err);
      }

      if (data.length > 0) {
        response.status(400).json({ msg: "você já enviou um feedback!" });
        return console.log(err);
      }

      const checkEventSql = `
      SELECT * FROM eventos
      WHERE ?? = ?
      `;
      const checkEventData = ["id", eventoId];

      conn.query(checkEventSql, checkEventData, (err, data) => {
        if (err) {
          response.status(500).json({ msg: "Erro ao buscar o evento" });
          return;
        }

        if (data.length == 0) {
          response.status(400).json({ msg: "evento não encontrado" });
          return;
        }

        const sql = `insert into feedback (??, ??, ??, ??) values (?, ?, ?, ?)`;

        const insertSql = [
          "participanteId",
          "eventoId",
          "nota",
          "comentario",
          participanteId,
          eventoId,
          nota,
          comentario,
        ];

        conn.query(sql, insertSql, (err, data) => {
          if (err) {
            console.error(err);
            response
              .status(500)
              .json({ msg: "Erro ao cadastrar o feedback no banco de dados" });
            return;
          }
          response.status(201).json({ msg: "feedback enviado!" });
        });
      });
    });
  });
};


export const getMostPopular = (request, response) => {

  const sql = `select eventoId, count(*) from inscricoes group by eventoId order by count(*) desc limit 1;
  `;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ msg: "Erro ao acessar as inscrições" });
      return;
    }
    const event = data
    // console.log(data[0])
    // response.status(200).json({msg: `Id do evento: ${data[0].eventoId}, Quantidade de inscrições: ${event}`});
    response.status(200).json(event);
  });

}
export const getMaisAtivo = (request, response) => {

  const sql = `select palestrantesId, count(*) from eventos group by palestrantesId order by count(*) desc limit 1
  ;
  `;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ msg: "Erro ao acessar as inscrições" });
      return;
    }
    const inscricoes = data;
    response.status(200).json(inscricoes);
  });

}

export const editEvento = (request, response) =>{

  const { eventoId, titulo, data, palestrantesId } = request.body;

  //Validação
  if(!eventoId || !titulo || !data || !palestrantesId){
      response.status(400).json({msg: "Algum campo está vazio, verifique e tente novamente"})
  }
  let id = eventoId

  const checkSql = `SELECT * FROM eventos WHERE ?? = ?`;
  const insertData = ["id",id ];

  conn.query(checkSql, insertData, (err, date)=>{
      if (err) {
          console.error(err);
          response.status(500).json({ msg: "Erro ao buscar o evento" });
          return;
        }
        if (date.length === 0) {
          return response.status(404).json({ msg: "evento não encontrado" });
        }

        const updateSql = /*sql*/ `UPDATE eventos SET
        ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`;
      const checkSqlData = [
        "titulo",
        titulo,
        "data",
        data,
        "palestrantesId",
        palestrantesId,
        "id",
        id,
      ];
      conn.query(updateSql, checkSqlData, (err) => {
          if (err) {
            console.error(err);
            response.status(500).json({ msg: "Erro ao atualizar o evento" });
            return;
          }
          response.status(200).json({ msg: "evento atualizado" });
        });
  })
}


export const deletarProduto = (request, response) => {
  const { eventoId} = request.body;
  
  let id = eventoId
  const deleteSql = /*sql*/ `delete from eventos where ?? = ?`;
  const insertData = ["id", id];



  conn.query(deleteSql, insertData, (err, info) => {
      if (err) {
          console.error(err);
          response.status(500).json({ message: "Erro ao deletar o evento" });
      }
      console.log(info);
      if (info.affectedRows === 0) {
          response.status(404).json({ messagae: "evento não encontrado" });
          return;
      }

      response.status(200).json({ message: "evento selecionado foi deletado" });
  });
};






