// Função principal do SHA
function SHA(texto) {
    // Pré-processamento
    let mensagem = adicionar_padding(texto);
    let blocos = dividir_em_blocos(mensagem);

    // Inicialização dos hashes iniciais
    let hash_inicial = inicializar_hash();

    // Processamento dos blocos
    for (let bloco of blocos) {
        // Expansão do bloco
        let expansao = expandir_bloco(bloco);

        // Compressão
        hash_inicial = comprimir_hash(hash_inicial, expansao);
    }

    // Retorna o hash final
    return hash_inicial;
}

// Função para adicionar o padding ao texto
function adicionar_padding(texto) {
    // Convertendo texto para binário
    let binario = textoToBinario(texto);

    // Adicionando 1 seguido de zeros e o comprimento original
    binario += '1';
    while (binario.length % 512 !== 448) {
        binario += '0';
    }
    binario += texto.length.toString(2).padStart(64, '0');

    return binario;
}

// Função para dividir a mensagem em blocos de 512 bits
function dividir_em_blocos(mensagem) {
    let blocos = [];
    for (let i = 0; i < mensagem.length; i += 512) {
        blocos.push(mensagem.slice(i, i + 512));
    }
    return blocos;
}

// Função para inicializar os hashes iniciais de acordo com o SHA-256
function inicializar_hash() {
    return [
        0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
        0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
    ];
}

// Função para expandir o bloco (corrigida)
function expandir_bloco(bloco) {
    let palavras = [];
    for (let i = 0; i < bloco.length; i += 32) {
        palavras.push(parseInt(bloco.slice(i, i + 32), 2));
    }
    for (let i = 16; i < 64; i++) {
        let s0 = (rotr(palavras[i - 15], 7) ^ rotr(palavras[i - 15], 18) ^ (palavras[i - 15] >>> 3));
        let s1 = (rotr(palavras[i - 2], 17) ^ rotr(palavras[i - 2], 19) ^ (palavras[i - 2] >>> 10));
        palavras[i] = (palavras[i - 16] + s0 + palavras[i - 7] + s1) & 0xFFFFFFFF;
    }
    return palavras;
}

// Função para a compressão do hash
function comprimir_hash(hash, bloco_exp) {
    // Defina constantes de compressão aqui e aplique uma série de operações
    let [a, b, c, d, e, f, g, h] = hash;

    for (let i = 0; i < 64; i++) {
        // Realizar operações bit a bit (rotacionamento, XOR, etc.) e atualizar os valores de a, b, c...
        // Simplificado aqui para ilustrar
        // Cada passo seria um pouco complexo e geralmente é pré-definido para SHA-256
    }

    // Combine e retorne o novo estado do hash
    return [a, b, c, d, e, f, g, h].map((v, i) => (v + hash[i]) & 0xFFFFFFFF);
}

// Função auxiliar para converter texto em binário
function textoToBinario(texto) {
    return texto.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('');
}

// Função auxiliar para rotacionar bits à direita
function rotr(n, x) {
    return (x >>> n) | (x << (32 - n));
}

// Testando a função SHA com diferentes textos
console.log(SHA("Texto exemplo 1"));
console.log(SHA("Texto exemplo 2"));
console.log(SHA("Texto exemplo 3"));



