const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');

const app = express();
const web3 = new Web3('http://localhost:8545'); // Conexión a Ganache o otra red

// ABI y dirección del contrato desplegado
const abi = [ /* ABI generado por Truffle */ ];
const contractAddress = '0x...'; // Dirección del contrato desplegado

app.use(bodyParser.json());

// Ruta para obtener los candidatos
app.get('/candidates', async (req, res) => {
    const contract = new web3.eth.Contract(abi, contractAddress);
    const candidatesCount = await contract.methods.candidatesCount().call();
    let candidates = [];

    for (let i = 1; i <= candidatesCount; i++) {
        const candidate = await contract.methods.candidates(i).call();
        candidates.push(candidate);
    }

    res.json(candidates);
});

// Ruta para votar
app.post('/vote', async (req, res) => {
    const { candidateId, voterAddress } = req.body;
    const contract = new web3.eth.Contract(abi, contractAddress);

    try {
        await contract.methods.vote(candidateId).send({ from: voterAddress });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));