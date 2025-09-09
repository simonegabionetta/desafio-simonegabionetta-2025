class AbrigoAnimais {
  // Lista de animais
  animais = [
    { nome: "Rex", tipo: "cão", brinquedos: ["RATO", "BOLA"] },
    { nome: "Mimi", tipo: "gato", brinquedos: ["BOLA", "LASER"] },
    { nome: "Fofo", tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
    { nome: "Zero", tipo: "gato", brinquedos: ["RATO", "BOLA"] },
    { nome: "Bola", tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
    { nome: "Bebe", tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
    { nome: "Loco", tipo: "jabuti", brinquedos: ["SKATE", "RATO"] }
  ];

  todosBrinquedos = ["RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"];

  // Valida se animais existem e não são duplicados
  validaAnimais(ordA) {
    const nomesValidos = this.animais.map(a => a.nome);
    const vistos = new Set();

    for (let nome of ordA) {
      if (!nomesValidos.includes(nome) || vistos.has(nome)) {
        return false; // inválido ou duplicado
      }
      vistos.add(nome);
    }
    return true;
  }

  // Valida se brinquedos são válidos e não duplicados
  validaBrinquedos(lista) {
    const vistos = new Set();
    for (let item of lista) {
      if (!this.todosBrinquedos.includes(item) || vistos.has(item)) {
        return false; // inválido ou duplicado
      }
      vistos.add(item);
    }
    return true;
  }

  // Checa se os brinquedos do animal aparecem na ordem na lista da pessoa
  verificaOrdem(pessoa, animal) {
    let index = 0;
    for (let b of pessoa) {
      if (b === animal[index]) {
        index++;
      }
      if (index === animal.length) return true;
    }
    return false;
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    // Valida formato dos parâmetros
    if (
      typeof brinquedosPessoa1 !== "string" ||
      typeof brinquedosPessoa2 !== "string" ||
      typeof ordemAnimais !== "string" ||
      !brinquedosPessoa1.trim() ||
      !brinquedosPessoa2.trim() ||
      !ordemAnimais.trim() ||
      brinquedosPessoa1.includes(",,") ||
      brinquedosPessoa2.includes(",,") ||
      ordemAnimais.includes(",,")
    ) {
      return { erro: "Formato inválido" };
    }

    const brp1 = brinquedosPessoa1.split(",");
    const brp2 = brinquedosPessoa2.split(",");
    const ordA = ordemAnimais.split(",");

    // Valida animais e brinquedos
    if (!this.validaAnimais(ordA)) return { erro: "Animal inválido" };
    if (!this.validaBrinquedos(brp1) || !this.validaBrinquedos(brp2))
      return { erro: "Brinquedo inválido" };

    const lista = [];
    const countPessoa1 = { qtd: 0 };
    const countPessoa2 = { qtd: 0 };

    for (let nomeAnimal of ordA) {
      const animalObj = this.animais.find(a => a.nome === nomeAnimal);

      const podePessoa1 = this.verificaOrdem(brp1, animalObj.brinquedos);
      const podePessoa2 = this.verificaOrdem(brp2, animalObj.brinquedos);

      // Gatos não dividem brinquedos
      const empateGato =
        animalObj.tipo === "gato" && podePessoa1 && podePessoa2;

      let dono = "abrigo";

      // Lógica Loco
      if (animalObj.nome === "Loco") {
        if (countPessoa1.qtd > 0) dono = "pessoa 1";
        else if (countPessoa2.qtd > 0) dono = "pessoa 2";
      } else if (!empateGato) {
        // Empate geral → abrigo
        if (podePessoa1 && !podePessoa2 && countPessoa1.qtd < 3) dono = "pessoa 1";
        else if (podePessoa2 && !podePessoa1 && countPessoa2.qtd < 3) dono = "pessoa 2";
      }

      if (dono === "pessoa 1") countPessoa1.qtd++;
      else if (dono === "pessoa 2") countPessoa2.qtd++;

      lista.push(`${animalObj.nome} - ${dono}`);
    }

    // Retorna lista em ordem alfabética
    lista.sort();
    return { lista };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
