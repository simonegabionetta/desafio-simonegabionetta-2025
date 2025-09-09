import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  //T1 - Animal inválio
  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  //T2 - Encontrar pessoa para animal
  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });
  
  //T3 - Brinquedos intercalados
  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  //T4 - Limite de  3 animais por pessoa
  test('Não permite mais de 3 animais por pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,LASER,CAIXA,NOVELO',
      'BOLA,RATO,LASER',
      'Rex,Bebe,Bola,Fofo'
    );

    const pessoa1Count = resultado.lista.filter(a => a.includes('pessoa 1')).length;
    const pessoa2Count = resultado.lista.filter(a => a.includes('pessoa 2')).length;

    expect(pessoa1Count).toBeLessThanOrEqual(3);
    expect(pessoa2Count).toBeLessThanOrEqual(3);
  });

  //T5 - Gatos empatados ficam no abrigo
  test('Gatos empatados ficam no abrigo', () => {
      const resultado = new AbrigoAnimais().encontraPessoas(
        'BOLA,LASER',
        'BOLA,LASER',
        'Mimi,Fofo'
      );

      expect(resultado.lista).toContain('Mimi - abrigo');
      expect(resultado.lista).toContain('Fofo - abrigo');
  });

  //T6 - Loco só vai para pessoa com outro animal
  test('Loco só vai para pessoa com outro animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,LASER', // pessoa 1 já vai ganhar algum animal
      'BOLA,NOVELO',
      'Rex,Loco'
    );
    expect(resultado.lista).toContain('Rex - pessoa 1'); // pessoa 1 ganha Rex
    expect(resultado.lista).toContain('Loco - pessoa 1'); // Loco acompanha pessoa 1
  });

  
  // T7 - Brinquedo inválido = erro
  test('Brinquedo inválido retorna erro', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,FOFO', // FOFO não é brinquedo
      'BOLA,RATO',
      'Rex'
    );
    expect(resultado.erro).toBe('Brinquedo inválido');
  });

  //T8 - Empate entre pessoas=  animal vai para abrigo
  test('Empate entre pessoas leva animal para abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA',
      'RATO,BOLA',
      'Rex'
    );
    expect(resultado.lista).toContain('Rex - abrigo');
  });

  //T9 - Nenhum brinquedo corresponde → animal vai para abrigo
  test('Animal vai para abrigo se ninguém tem brinquedos corretos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'CAIXA,NOVELO',
      'LASER,NOVELO',
      'Rex'
    );
    expect(resultado.lista).toContain('Rex - abrigo');
  });
});
