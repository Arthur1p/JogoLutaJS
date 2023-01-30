function colisaoRetangulo({ retangulo1, retangulo2}){
    return(
        retangulo1.ataqueArea.position.x + retangulo1.ataqueArea.width >= retangulo2.position.x &&
        retangulo1.ataqueArea.position.x <= retangulo2.position.x + retangulo2.width &&
        retangulo1.ataqueArea.position.y + retangulo1.ataqueArea.height >= retangulo2.position.y &&
        retangulo1.ataqueArea.position.y <= retangulo2.position.y + retangulo2.height
    )
}

function determinarVencedor({jogador, inimigo, tempoId}){
    clearTimeout(tempoId)
    document.querySelector("#displayText").style.display = 'flex'
    if(jogador.vida === inimigo.vida){
        document.querySelector("#displayText").innerHTML = 'Empate!'

    } else if (jogador.vida > inimigo.vida){
        document.querySelector("#displayText").innerHTML = 'Jogador 1 venceu!'

    } else if (inimigo.vida > jogador.vida){
        document.querySelector("#displayText").innerHTML = 'Jogador 2 venceu!'
    }
}

let tempo = 20
let tempoId
function diminuirTempo(){
    
    if(tempo > 0){
        tempoId = setTimeout(diminuirTempo, 1000)
        tempo --
        document.querySelector('#tempo').innerHTML = tempo
    }
    if(tempo === 0){

        determinarVencedor({jogador, inimigo, tempoId})
    }

}