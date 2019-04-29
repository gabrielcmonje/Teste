//Funcao para Verificar se Existe Operador na String que esta na caixa de Texto
function getOperation(str) {
// Padrao da Expressao Regular pra Pegar o Operador Matematico
var pattern = /['+','/', '*']/;
// WorkAround para o sinal de Menos que nao funciona com expressao regular
var minusWA = str.search('-');
// Metodo Search na String usando o Padrao da Expressao Regular
var theOper = str.search(pattern);
	// Verifica se o Retorno do metodo Search é "-1" que significa que nao encontrou nenhum Operador
	if (theOper == -1 && minusWA == -1) {
		// Retorna Nulo Porque nao encontrou nenhum Operador
		return null;
	} else if (theOper != -1){
		// Operador Encontrado Com expressao Regular
		return str[theOper];
	} else if (minusWA != -1) {
		// Operador Encontrado com WorkAround para o sinal de Menos
		return str[minusWA];
	}
}

// Funcao Que avalia o botao clicado e faz as validacoes necessarias antes de adicionar o caracter na caixa de texto
function getClass(el) {
	// Pega o Elemento de Caixa de Texto de Resultado pelo ID
	var resultBox = document.getElementById('resultado');
	// Se o valor do Text Box for erro, limpa o valor
	if (resultBox.value == "Erro de Operacao") {
		resultBox.value = "";
	}
	// Verifica se a classe do elemento clicado eh do tipo numero
	if ( el.className == "numero") {
		// Se o texto do elemento clicado for '.' executa validacao de apenas um ponto por numero
		if (el.textContent == '.') {
			var theOper = getOperation(resultBox.value);
			var ptPattern = /['.']/;
			// Se nao existir nenhum ponto ainda no primeiro numero antes do ponto, adiciona o ponto
			// Se ja existir ponto no numero, nao faz nada, apenas segue
			if (theOper == null) {
				if (resultBox.value.search(ptPattern) == -1) {
					resultBox.value += el.textContent;
				}
			} else {
				// Se ja existir um operador na expressao, pega o segundo numero e avalia se ja tem ponto
				// Se nao tiver ponto adiciona, se ja tiver, nao faz nada, apenas segue
				var secNum = resultBox.value.split(theOper)[1];
				if (secNum.search(ptPattern) == -1) {
					resultBox.value += el.textContent;
				}
			}
		} else {
		  // Se o botao clicado for um numero normal, que nao seja ponto, adiciona o caracter na caixa de texto
		  resultBox.value += el.textContent;
		}
	// Se o botao clicado for o de resultado (=)
	} else if (el.className == "resultar") {
		var theOper = getOperation(resultBox.value);
		// Verifica de existe operador na expressao
		if (theOper == null) {
			// Deixei um alert aqui comentado, talvez seja util...
			//alert('Sem Operador');
		} else {
			// Se houver operador na expressao, separa os numeros utilizando o operador como separador
			var firstNum = Number(resultBox.value.split(theOper)[0]);
			var secNum = Number(resultBox.value.split(theOper)[1]);
			// Verifica se o segundo numero esta vaziu
			// Se estiver vaziu coloca o valor de erro de Operacao na Caixa de Texto
			if (secNum == null || secNum == "") {
				resultBox.value = "Erro de Operacao";
			} else {
				// Passaram todas validacoes, agora efetivamente executa a operacao
				// Criei um dicionario que a chave eh o operador e o valor eh uma funcao
				// que basicamente retorna o resultado da operacao de acordo com o operador
				// que foi usado como chave
				var calcula = {
					'+': function (x, y) { return x + y },
					'-': function (x, y) { return x - y },
					'/': function (x, y) { return x / y },
					'*': function (x, y) { return x * y }
				};
				// Altera o valor da caixa de texto usando o dicionario e passando como parametros os valores
				// do primeiro e segundo numero, e o operador que foi identificado
				resultBox.value = calcula[theOper](firstNum, secNum);
			}
		}
	// Se o botao clicado nao for de resultado nem de numero, so pode ser de Operador
	// Aqui somente valida se ja existe operador na expressao, caso nao, adiciona o operador
	// caso ja exista operador, nao faz nada
	} else {
		var theOper = getOperation(resultBox.value);
		if (theOper == null) {;
			resultBox.value += el.textContent;
		}
	}
}
