// visor
const visor = document.getElementById('numArea');

// Seleciona tds btns da area
const botoes = document.querySelectorAll('#btnArea button');

// Add um evento de clique p btn
botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const id = botao.id;
        const valorVisual = botao.innerText;

        // Limpa o visor se tiver um erro veio ou o palhaço
        if (visor.value === 'Erro' || visor.value === '🤡') {
            visor.value = "";
        }

        switch (id) {
            case 'clearBtn':      //btn c
                visor.value = "";
                break;

            case 'backspaceBtn':     //btn apaga um
                visor.value = visor.value.slice(0, -1);
                break;

            case 'equalBtn':     // Btn igual
                try {
                    // Troca (x, ÷, ,) por operadores (*, /, .)
                    let expressao = visor.value
                        .replace(/x/g, '*')
                        .replace(/÷/g, '/')
                        .replace(/,/g, '.');
                    
                    if (expressao === "") return;

                    // O eval resolve a matemática
                    let resultado = eval(expressao);

                    // Verifica se alguém tentou quebrar a matemática dividindo por 0
                    if (!Number.isFinite(resultado)) {
                        visor.value = '🤡';
                        return;
                    }

                    // Devolve pro visor o results e troca . por , dnv
                    visor.value = String(resultado).replace('.', ',');
                } catch (erro) {
                    // Se a conta for duvidosa (ex: "5++5"), mostra erro
                    visor.value = 'Erro';
                }
                break;

            case 'parenthesesBtn': // Btn ()
                let abertos = (visor.value.match(/\(/g) || []).length;
                let fechados = (visor.value.match(/\)/g) || []).length;
                
                if (abertos > fechados) {
                    visor.value += ')';
                } else {
                    visor.value += '(';
                }
                break;

            case 'sinalBtn': // Btn +/- 
                if (visor.value) {
                    if (visor.value.startsWith('-')) {
                        visor.value = visor.value.substring(1);
                    } else {
                        visor.value = '-' + visor.value;
                    }
                }
                break;

            default:
                // P tds outros btns (n⁰, +, -, x, ÷, ,)
                visor.value += valorVisual;
                break;
        }
    });
});
