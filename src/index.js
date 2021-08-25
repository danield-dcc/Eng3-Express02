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

//"midleware" - é uma função "intermediaria", ela pega os dados (executa o que tem que fazer) os devolve 
//é obrigatorio colocar o next, se não a função não avança
function log(request, response, next) {
    const { url, method } = request;
    console.log(`${method} - ${url} at ${new Date()}`)
    return next();
}

app.use(log)

//requisição de usuario 
//resposta de servidor

//retorno de todos os clientes em json
app.get('/clients', (request, response) => response.status(200).json(clients))

//buscar um unico recurso
app.get('/clients/:id', (request, response) => {
    const { id } = request.params;
    const client = clients.find(value => value.id == id);
    if (client == undefined) {
        response.status(400).json({ error: 'Requisição inválida' })
    } else {
        response.status(200).json(client)
    }

    //response.json(clients.filter(value => value.id == request.params.id))
})

//inserir dados no servidor = BD
app.post('/clients', (request, response) => {
    const client = request.body;
    clients.push(client)
    response.status(201).json(client)
})

//Atualizar nome de clientes
app.put('/clients/:id', (request, response) => {
    const id = request.params.id;
    const nome = request.body.nome;

    let client = clients.find(value => value.id == id);
    if (client == undefined) {
        response.status(400).send();
    } else {
        client.nome = nome;
        response.status(200).json(client)
    }
})

app.delete('/clients/:id', (request, response) => {
    const { id } = request.params;
    const index = clients.findIndex(value => value.id == id);
    if (index == -1) {
        response.status(400).send()
    } else {
        clients.splice(index, 1)
        response.status(204).send()
    }

})

app.listen(3000)