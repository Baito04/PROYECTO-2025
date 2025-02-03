async function loadCandidates() {
    const response = await fetch('http://localhost:3000/candidates');
    const candidates = await response.json();

    const candidatesDiv = document.getElementById('candidates');
    candidates.forEach(candidate => {
        const candidateElement = document.createElement('div');
        candidateElement.innerHTML = `
            <p>${candidate.name} - Votos: ${candidate.voteCount}</p>
            <button onclick="vote(${candidate.id})">Votar</button>
        `;
        candidatesDiv.appendChild(candidateElement);
    });
}

async function vote(candidateId) {
    const voterAddress = prompt("Ingresa tu dirección de Ethereum:");
    const response = await fetch('http://localhost:3000/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidateId, voterAddress })
    });

    const result = await response.json();
    if (result.success) {
        alert("Voto registrado correctamente.");
        location.reload();
    } else {
        alert("Error al votar: " + result.error);
    }
}

loadCandidates();