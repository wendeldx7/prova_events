### **Dia 1: Configuração e Recursos Básicos (3,33)**

**Objetivo**: Configuração inicial do projeto, compreensão de modelagem de dados e rotas básicas.

1. **Configuração do Ambiente:**
    - Configurar um projeto Node.js com Javascript.
    - Configurar o Express e o MYSQL como banco de dados.
2. **Modelagem Inicial:**
    - Criar modelos de dados para evento, palestrante, e participante.
    - Criar as tabelas no banco de dados MYSql.
3. **Rotas Básicas:**
    - **Rota para criar um novo palestrante:**
        - POST `/eventos/palestrantes`
        - Dados: `{ "nome": "Nome do Palestrante", "expertise": "Área de Especialização" }`
    - **Rota para listar todos os palestrantes:**
        - GET `/eventos/palestrantes`