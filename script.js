// ===== SISTEMA DE ACESSIBILIDADE =====

const btnAcessibilidade = document.getElementById('btnAcessibilidade');
const menuAcessibilidade = document.getElementById('menuAcessibilidade');

// Abrir/fechar menu
btnAcessibilidade.addEventListener('click', () => {
    if (menuAcessibilidade.style.display === 'none' || menuAcessibilidade.style.display === '') {
        menuAcessibilidade.style.display = 'block';
    } else {
        menuAcessibilidade.style.display = 'none';
    }
});

// Fechar menu clicando fora
const botaoAcessibilidade = document.querySelector('.botao-acessibilidade');
document.addEventListener('click', (event) => {
    if (botaoAcessibilidade && !botaoAcessibilidade.contains(event.target)) {
        if (menuAcessibilidade) {
            menuAcessibilidade.style.display = 'none';
        }
    }
});

// Controle de fonte
let tamanhoFonteAtual = 16;

function aplicarTamanhoFonte(tamanho) {
    document.body.style.fontSize = tamanho + 'px';
    tamanhoFonteAtual = tamanho;
}

document.getElementById('aumentarFonte')?.addEventListener('click', () => {
    if (tamanhoFonteAtual < 22) aplicarTamanhoFonte(tamanhoFonteAtual + 2);
    else alert('Fonte no tamanho máximo!');
});

document.getElementById('diminuirFonte')?.addEventListener('click', () => {
    if (tamanhoFonteAtual > 12) aplicarTamanhoFonte(tamanhoFonteAtual - 2);
    else alert('Fonte no tamanho mínimo!');
});

// Alto contraste
let contrasteAtivo = false;
document.getElementById('altoContraste')?.addEventListener('click', () => {
    if (!contrasteAtivo) {
        document.body.classList.add('alto-contraste');
        contrasteAtivo = true;
    } else {
        document.body.classList.remove('alto-contraste');
        contrasteAtivo = false;
    }
});

// ===== ALFABETO =====
const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const alfabetoGrid = document.getElementById('alfabetoGrid');

if (alfabetoGrid) {
    alfabeto.forEach(letra => {
        const letraCard = document.createElement('div');
        letraCard.className = 'letra-card';
        letraCard.textContent = letra;
        letraCard.addEventListener('click', () => {
            // SpeechSynthesis para falar a letra
            const utterance = new SpeechSynthesisUtterance(letra);
            utterance.lang = 'pt-BR';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
            
            // Efeito visual
            letraCard.style.transform = 'scale(0.95)';
            setTimeout(() => {
                letraCard.style.transform = '';
            }, 200);
        });
        alfabetoGrid.appendChild(letraCard);
    });
}

// ===== SÍLABAS =====
const botoesSilaba = document.querySelectorAll('.btn-silaba');
const exibicaoSilabas = document.getElementById('exibicaoSilabas');

const silabasCompletas = {
    ba: 'BA - BE - BI - BO - BU',
    ca: 'CA - CE - CI - CO - CU',
    da: 'DA - DE - DI - DO - DU',
    fa: 'FA - FE - FI - FO - FU',
    ga: 'GA - GE - GI - GO - GU',
    ja: 'JA - JE - JI - JO - JU',
    la: 'LA - LE - LI - LO - LU',
    ma: 'MA - ME - MI - MO - MU',
    na: 'NA - NE - NI - NO - NU',
    pa: 'PA - PE - PI - PO - PU',
    ra: 'RA - RE - RI - RO - RU',
    sa: 'SA - SE - SI - SO - SU',
    ta: 'TA - TE - TI - TO - TU',
    va: 'VA - VE - VI - VO - VU'
};

botoesSilaba.forEach(botao => {
    botao.addEventListener('click', () => {
        const silaba = botao.getAttribute('data-silaba');
        const texto = silabasCompletas[silaba] || botao.textContent;
        if (exibicaoSilabas) {
            exibicaoSilabas.innerHTML = `<span style="font-size: 2rem; font-weight: bold;">${texto}</span>`;
        }
    });
});

// ===== JOGO DA LEITURA =====
const palavrasJogo = [
    { imagem: '🐱', palavra: 'GATO', opcoes: ['GATO', 'CACHORRO', 'RATO', 'PATO'] },
    { imagem: '🐶', palavra: 'CACHORRO', opcoes: ['CACHORRO', 'GATO', 'COELHO', 'PÁSSARO'] },
    { imagem: '🐭', palavra: 'RATO', opcoes: ['RATO', 'GATO', 'RÃ', 'RÉGUA'] },
    { imagem: '🐮', palavra: 'VACA', opcoes: ['VACA', 'BOI', 'CAVALO', 'PORCO'] },
    { imagem: '🐷', palavra: 'PORCO', opcoes: ['PORCO', 'VACA', 'GALINHA', 'PATINHO'] },
    { imagem: '🐔', palavra: 'GALINHA', opcoes: ['GALINHA', 'GATO', 'PATO', 'PERU'] },
    { imagem: '🐸', palavra: 'RÃ', opcoes: ['RÃ', 'SAPO', 'RATO', 'RÉ'] },
    { imagem: '🐧', palavra: 'PINGUIM', opcoes: ['PINGUIM', 'PATO', 'POMBO', 'PAPAGAIO'] },
    { imagem: '🦁', palavra: 'LEÃO', opcoes: ['LEÃO', 'TIGRE', 'ONÇA', 'LEOPARDO'] },
    { imagem: '🐘', palavra: 'ELEFANTE', opcoes: ['ELEFANTE', 'HIPOPÓTAMO', 'RINOCERONTE', 'GIRAFA'] },
    { imagem: '🦒', palavra: 'GIRAFA', opcoes: ['GIRAFA', 'ELEFANTE', 'ZEBRA', 'CAMELO'] },
    { imagem: '🦓', palavra: 'ZEBRA', opcoes: ['ZEBRA', 'CAVALO', 'BURRO', 'GIRAFA'] },
    { imagem: '🐬', palavra: 'GOLFINHO', opcoes: ['GOLFINHO', 'BALEIA', 'TUBARÃO', 'PEIXE'] },
    { imagem: '🦋', palavra: 'BORBOLETA', opcoes: ['BORBOLETA', 'ABELHA', 'JOANINHA', 'FORMIGA'] }
];

let jogoAtual = 0;
const imagemJogo = document.getElementById('imagemJogo');
const dicaJogo = document.getElementById('dicaJogo');
const opcoesJogo = document.getElementById('opcoesJogo');
const resultadoJogo = document.getElementById('resultadoJogo');
const novaPalavraBtn = document.getElementById('novaPalavraBtn');

function carregarNovaPalavra() {
    jogoAtual = Math.floor(Math.random() * palavrasJogo.length);
    const jogo = palavrasJogo[jogoAtual];
    
    if (imagemJogo) imagemJogo.textContent = jogo.imagem;
    if (dicaJogo) dicaJogo.textContent = 'Qual é o nome deste desenho?';
    if (resultadoJogo) {
        resultadoJogo.innerHTML = '';
        resultadoJogo.className = 'resultado';
    }
    
    // Embaralhar opções
    const opcoesEmbaralhadas = [...jogo.opcoes];
    for (let i = opcoesEmbaralhadas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opcoesEmbaralhadas[i], opcoesEmbaralhadas[j]] = [opcoesEmbaralhadas[j], opcoesEmbaralhadas[i]];
    }
    
    if (opcoesJogo) {
        opcoesJogo.innerHTML = '';
        opcoesEmbaralhadas.forEach(opcao => {
            const botao = document.createElement('button');
            botao.textContent = opcao;
            botao.className = 'btn-opcao';
            botao.addEventListener('click', () => verificarResposta(opcao, botao));
            opcoesJogo.appendChild(botao);
        });
    }
}

function verificarResposta(resposta, botaoClicado) {
    const jogo = palavrasJogo[jogoAtual];
    const botoes = document.querySelectorAll('.btn-opcao');
    
    if (resposta === jogo.palavra) {
        resultadoJogo.innerHTML = '🎉 PARABÉNS! Você acertou! 🎉';
        resultadoJogo.className = 'resultado acerto';
        botaoClicado.classList.add('correto');
        
        // Desabilitar todos os botões
        botoes.forEach(btn => {
            btn.disabled = true;
        });
        
        // Falar a palavra
        const utterance = new SpeechSynthesisUtterance(jogo.palavra);
        utterance.lang = 'pt-BR';
        speechSynthesis.speak(utterance);
    } else {
        resultadoJogo.innerHTML = '❌ Ops! Tente novamente! ❌';
        resultadoJogo.className = 'resultado erro';
        botaoClicado.classList.add('errado');
        setTimeout(() => {
            botaoClicado.classList.remove('errado');
        }, 500);
    }
}

if (novaPalavraBtn) {
    novaPalavraBtn.addEventListener('click', () => {
        carregarNovaPalavra();
    });
}

// Carregar primeira palavra
carregarNovaPalavra();

// ===== ATIVIDADES =====
function mostrarAtividade(tipo) {
    const areaAtividade = document.getElementById('areaAtividade');
    const conteudoAtividade = document.getElementById('conteudoAtividade');
    
    if (!areaAtividade || !conteudoAtividade) return;
    
    areaAtividade.style.display = 'block';
    
    if (tipo === 'completar') {
        conteudoAtividade.innerHTML = `
            <h3>📝 Complete a palavra</h3>
            <p>Qual letra está faltando?</p>
            <div style="text-align: center; padding: 20px;">
                <div style="font-size: 3rem; margin: 20px;">
                    <span style="border-bottom: 3px solid #333;">C _ A</span> = CASA
                </div>
                <button class="btn-opcao" style="margin: 5px;" onclick="respostaCompletar('A')">A</button>
                <button class="btn-opcao" style="margin: 5px;" onclick="respostaCompletar('E')">E</button>
                <button class="btn-opcao" style="margin: 5px;" onclick="respostaCompletar('O')">O</button>
                <button class="btn-opcao" style="margin: 5px;" onclick="respostaCompletar('U')">U</button>
                <p id="respostaCompletar" style="margin-top: 20px;"></p>
            </div>
        `;
    } else if (tipo === 'silabas') {
        conteudoAtividade.innerHTML = `
            <h3>🔗 Junte as sílabas</h3>
            <p>Organize as sílabas para formar a palavra:</p>
            <div style="text-align: center; padding: 20px;">
                <div style="display: flex; gap: 10px; justify-content: center; margin: 20px;">
                    <button class="btn-opcao" onclick="respostaSilabas('CA')">CA</button>
                    <button class="btn-opcao" onclick="respostaSilabas('SA')">SA</button>
                    <button class="btn-opcao" onclick="respostaSilabas('VA')">VA</button>
                </div>
                <p><strong>Palavra: _ _ _ A</strong></p>
                <p id="respostaSilabas" style="margin-top: 20px;"></p>
            </div>
        `;
    } else if (tipo === 'palavras') {
        conteudoAtividade.innerHTML = `
            <h3>🎯 Encontre a palavra</h3>
            <p>Encontre a palavra "SOL" no caça-palavras:</p>
            <div style="text-align: center; padding: 20px;">
                <div style="font-family: mon
