const express = require("express") // chama o express
const port = 3000 // // numero da porta numa variável 
const app = express() // coloca o express dentro de uma variavel para facilitar na escrita
const uuid = require('uuid') // bliblioteca de ID, para ser id unico 
app.use(express.json()) // avisar para o express para usar json 

/* 
    - Query params => meusite.com/user?nome=lucas&age=29 // FILTROS
    - Route params => /users/2  // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECIFICO 
    - Request Body => { "name": Lucas, "age":}


    - GET           => busca informação no backk-end
    - POST          => Criar informação no back-end
    - PUT / PATCH   => Alterar/Atualizar informação no back-end
    - DELETE        => Deletar informação no back-end

    - MiddLeware => INTERCEPTADOR => tem o poder de parar ou alterar dados na requisição 

    


*/

const users = [] // NAO USAR ASSIM EM PROJETO POIS QUANDO SE ATUALIZA PERDE TUDO 


const checkUserID = (request, response, next) => {
    const { id } = request.params // pegar o id la em cima, sendo mandado 

    const index = users.findIndex(user => user.id === id) // verifica se o Id existe


    if (index < 0) {
        return response.status(404).json({ message: "User not found" }) // se nao encontrar vai mostrar -1, colocando esse 
        // erro para mostrar na tela que nao encontrou 

    }

    request.userIndex = index
    request.userID = id



    next()
}



app.get('/users', (request, response) => {

    return response.json(users) // retorna todos os usuarios que estao sendo criados 
})


app.post('/users', (request, response) => {
    const { name, age } = request.body // aqui esta sendo recebido o nome e idade enviado 

    const user = { id: uuid.v4(), name, age } // montagem de usuario, com id e nome e idade

    users.push(user) // adicionar dentro do array que estava vazio

    return response.status(201).json(user) // retorna apenas o usuario criado 
})


app.listen(port, () => {
    console.log(`🚀 Server starded on port ${port}`)
})


app.put('/users/:id', checkUserID, (request, response) => {
    const { name, age } = request.body // enviando as informações pelo body no qual vao ser atualizadas
    const index = request.userIndex // pega informação do inex, que é a crianção do usuario
    const id = request.userID // pega a informação do ID

    const updatedUser = { id, name, age } // criando um usuario usando id tb




    users[index] = updatedUser // passa la pelo array de usuarios, procura a posição e atualiza pelas informações
    // que foram mandadas 


    return response.json(updatedUser) // aqui mostra na tela o que atualizou 
})


app.delete('/users/:id', checkUserID, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1) // falando qual posição sera deletada 


    return response.status(204).json()
})