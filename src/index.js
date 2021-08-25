const app = require('express')()
const bodyParser = require('body-parser')
const { response } = require('express')

app.use(bodyParser.json())

let clients = [
    { id: 3, nome: "Angelo Luz ", telefone: '53987654321' },
    { id: 1, nome: "Maria Luz ", telefone: '53987654421' },
    { id: 2, nome: "Helena Luz ", telefone: '53987655321' },
    { id: 4, nome: "Isadora Luz ", telefone: '53987694321' }
]

//requisição de usuario 
//resposta de servidor

//retorno de todos os clientes em json
app.get('/clients', (request, response) => response.json(clients))

//buscar um unico recurso
app.get('/clients/:id', (request, response) => {
    response.json(clients.filter(value => value.id == request.params.id))
})

//inserir dados no servidor = BD
app.post('/clients', (request, response) => {
    const client = request.body;
    clients.push(client)
    response.json(client)
})

//Atualizar nome de clientes
app.put('/clients/:id', (request, response) => {
    const id = request.params.id;
    const nome = request.body.nome;

    let client = clients.filter(value => value.id == id);
    //array
    client[0].nome = nome;

    response.json(client[0])

})

app.delete('/clients/:id', (request, response)=>{
    const id = request.params.id;
    clients.filter(value => value.id != id);
    response.json(clients)
})

app.listen(3000)