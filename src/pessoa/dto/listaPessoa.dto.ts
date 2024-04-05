export class listaPessoaDTO{
  constructor(
      readonly id:string,
      readonly nome: string,
      readonly nascimento: string,
      readonly pais: string
  ){}
}