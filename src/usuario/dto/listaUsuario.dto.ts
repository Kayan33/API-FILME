export class ListaUsuarioDTO{
    constructor(
        readonly id: string,
        // readonly NOME: string,
        readonly cidade: string,
        readonly email: string,

        readonly pessoa: object,
        
        readonly assinatura: string,
        readonly senha: string,
        // readonly FOTO: string
        ){}
}