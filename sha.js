// Função principal do SHA
function SHA(texto) {
    let mensagem = adicionar_padding(texto);
    let blocos = dividir_em_blocos(mensagem);
    let hash_inicial = inicializar_hash();

    for (let bloco of blocos) {
        let expansao = expandir_bloco(bloco);
        hash_inicial = comprimir_hash(hash_inicial, expansao);
    }

    return formatarHashFinal(hash_inicial);  // Converte para hexadecimal
}

function formatarHashFinal(hashArray) {
    return hashArray.map(num => (num >>> 0).toString(16).padStart(8, '0')).join('');
}

function adicionar_padding(texto) {
    let binario = textoToBinario(texto);

    binario += '1';
    while (binario.length % 512 !== 448) {
        binario += '0';
    }
    binario += texto.length.toString(2).padStart(64, '0');

    return binario;
}

function dividir_em_blocos(mensagem) {
    let blocos = [];
    for (let i = 0; i < mensagem.length; i += 512) {
        blocos.push(mensagem.slice(i, i + 512));
    }
    return blocos;
}

//hashes iniciais de acordo com o SHA-256
function inicializar_hash() {
    return [
        0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
        0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
    ];
}

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

// Funções auxiliares para rotações e operações de escolha e maioria
function rotr(n, x) {
    return (x >>> n) | (x << (32 - n));
}

function Sigma0(x) {
    return rotr(2, x) ^ rotr(13, x) ^ rotr(22, x);
}

function Sigma1(x) {
    return rotr(6, x) ^ rotr(11, x) ^ rotr(25, x);
}

function sigma0(x) {
    return rotr(7, x) ^ rotr(18, x) ^ (x >>> 3);
}

function sigma1(x) {
    return rotr(17, x) ^ rotr(19, x) ^ (x >>> 10);
}

function Ch(x, y, z) {
    return (x & y) ^ (~x & z);
}

function Maj(x, y, z) {
    return (x & y) ^ (x & z) ^ (y & z);
}

// Constantes para cada rodada (primeiros 32 bits das raízes fracionárias dos primeiros 64 números primos)
const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
];

function comprimir_hash(hash, bloco_exp) {
    // Inicializa os registradores com os valores do hash
    let [a, b, c, d, e, f, g, h] = hash;

    for (let i = 0; i < 64; i++) {
        let temp1 = (h + Sigma1(e) + Ch(e, f, g) + K[i] + bloco_exp[i]) & 0xFFFFFFFF;
        let temp2 = (Sigma0(a) + Maj(a, b, c)) & 0xFFFFFFFF;

        h = g;
        g = f;
        f = e;
        e = (d + temp1) & 0xFFFFFFFF;
        d = c;
        c = b;
        b = a;
        a = (temp1 + temp2) & 0xFFFFFFFF;
    }

    // Atualiza os valores de hash
    hash[0] = (hash[0] + a) & 0xFFFFFFFF;
    hash[1] = (hash[1] + b) & 0xFFFFFFFF;
    hash[2] = (hash[2] + c) & 0xFFFFFFFF;
    hash[3] = (hash[3] + d) & 0xFFFFFFFF;
    hash[4] = (hash[4] + e) & 0xFFFFFFFF;
    hash[5] = (hash[5] + f) & 0xFFFFFFFF;
    hash[6] = (hash[6] + g) & 0xFFFFFFFF;
    hash[7] = (hash[7] + h) & 0xFFFFFFFF;

    return hash;
}


function textoToBinario(texto) {
    return texto.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('');
}

function rotr(n, x) {
    return (x >>> n) | (x << (32 - n));
}
//==========================================================
//console.log(textoToBinario("Texto exemplo 1"));
console.log(SHA("Texto exemplo 1"));
console.log(SHA("Texto exemplo 2"));
console.log(SHA("Texto exemplo 3"));
