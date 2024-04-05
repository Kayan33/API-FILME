import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import {v4 as uuid} from 'uuid';
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import { Usuario } from './usuario.entity';
import { criaUsuarioDTO } from './dto/usuario.dto';
import { AlteraUsuarioDTO } from './dto/atualizaUsuario.dto';
import { HttpService } from '@nestjs/axios';
import Datas from 'src/utils/datas';
import { pessoa } from 'src/pessoa/pessoa.entity';
import { PessoaService } from 'src/pessoa/pessoa.service';


@Injectable()
export class UsuarioService {
  #usuarios = [];  
  
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
    private httpService: HttpService,
    private datas: Datas,
    @Inject('PESSOA_REPOSITORY')
    private pessoaRepository: Repository<pessoa>,
    private readonly pessoaService: PessoaService,

  ) {}

  async listar(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  private buscaPorID(id: string){
    const possivelUsuario = this.#usuarios.find(
        usuarioSalvo => usuarioSalvo.id === id
    )

    if (!possivelUsuario){
        throw new Error('Usuario nao encontrado')
    }
    
    return possivelUsuario;
}

  async inserir(dados: criaUsuarioDTO): Promise<RetornoCadastroDTO>{
    let pessoa = new Usuario();
    let retornoPessoa = await this.pessoaService.inserir(dados.dadosPessoa);
        pessoa.id = uuid();
        pessoa.PESSOA = await this.pessoaService.localizarID(retornoPessoa.id)
        pessoa.email = dados.email;
        pessoa.senha = dados.senha;
        pessoa.telefone = dados.telefone;
        pessoa.cidade = dados.cidade;
        pessoa.endereco = dados.endereco;
        pessoa.cep = dados.cep;
        pessoa.assinatura = dados.assinatura;
        pessoa.trocaSenha(dados.senha)
        

    return this.usuarioRepository.save(pessoa)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: pessoa.id,
        message: "Pessoa cadastrado!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao cadastrar." + error.message
      };
    })

    
  }

  localizarID(id: string): Promise<Usuario> {
    return this.usuarioRepository.findOne({
      where: {
        id,
      },
    });
  }

  localizarNome(nome: string): Promise<pessoa> {
    return this.pessoaRepository.findOne({
      where: {
        nome,
      },
    });
  }

  localizarEmail(email: string): Promise<Usuario> {
    return this.usuarioRepository.findOne({
      where: {
        email,
      },
    });
  }


  async remover(id: string): Promise<RetornoObjDTO> {
    const pessoa = await this.localizarID(id);
    
    return this.usuarioRepository.remove(pessoa)
    .then((result) => {
      return <RetornoObjDTO>{
        return: pessoa,
        message: "Pessoa excluido!"
      };
    })
    .catch((error) => {
      return <RetornoObjDTO>{
        return: pessoa,
        message: "Houve um erro ao excluir." + error.message
      };
    });  
  }

  async alterar(id: string, dados: AlteraUsuarioDTO): Promise<RetornoCadastroDTO> {
    const pessoa = await this.localizarID(id);

    Object.entries(dados).forEach(
      ([chave, valor]) => {
          if(chave=== 'id'){
              return;
          }

          pessoa[chave] = valor;
      }
    )

    return this.usuarioRepository.save(pessoa)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: pessoa.id,
        message: "Pessoa alterado!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao alterar." + error.message
      };
    });
  }

  async validaEmail(email: string) {
    const possivelUsuario = await this.usuarioRepository.findOne({
        where: {
            email,
        },
    });
    return (possivelUsuario !== null);
}

async removeUsuario(id: string){
  const usuario = this.buscaPorID(id);

  this.#usuarios = this.#usuarios.filter(
      usuarioSalvo => usuarioSalvo.id !== id
  )

  return usuario;
}

  async validarLogin(email:string,senha:string){
    const usuario = await this.localizarEmail(email);
    var objRetorno;
    if (usuario){
      objRetorno = [usuario,await usuario.login(senha)];
    }

    return <RetornoObjDTO>{
      message: objRetorno[1] ? 'Login Efetuado0' : 'Usuario ou senha invalidos',
      return: objRetorno[1] ? objRetorno[0] : null
    }
        
}

adicionarAssinatura(id: string,dias: BigInteger){
  const usuario = this.buscaPorID(id);

  usuario.adicionarAssinatura(dias);

  return usuario.retornaAssinatura();
}

validaAssinatura(id: string){
  const usuario = this.buscaPorID(id);

  return {
      valida: usuario.validarAssinatura(),
      vencimento: usuario.retornaAssinatura()
  };
}


atualizaUSuario(id: string, dadosAtualizacao: Partial<Usuario>){
  const usuario = this.buscaPorID(id);

  Object.entries(dadosAtualizacao).forEach(
      ([chave,valor]) => {
          if(chave === 'id'){
              return
          }else if(chave === 'senha'){
              usuario.trocaSenha(valor);
              return
          }

          usuario[chave] = valor;
      }
  )

  return usuario;
}
}