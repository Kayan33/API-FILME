import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import {v4 as uuid} from 'uuid';
import { pessoa, pessoa,} from './pessoa.entity';
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import { CriaPessoaDTO } from './dto/criaPessoa.dto';
import { AlteraPessoaDTO } from './dto/atualizaPessoa.dto';


@Injectable()
export class PessoaService {
  constructor(
    @Inject('PESSOA_REPOSITORY')
    private pessoaRepository: Repository<pessoa>,
  ) {}

  async listar(): Promise<pessoa[]> {
    return this.pessoaRepository.find();
  }

  async inserir(dados: CriaPessoaDTO): Promise<RetornoCadastroDTO>{
    let pessoa = new pessoa();
        pessoa.id = uuid();
        pessoa.nome = dados.nome;
        pessoa.nascimento = dados.nascimento;
        pessoa.pais = dados.pais;
        

    return this.pessoaRepository.save(pessoa)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: pessoa.ID,
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

  localizarID(id: string): Promise<pessoa> {
    return this.pessoaRepository.findOne({
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


  async remover(id: string): Promise<RetornoObjDTO> {
    const pessoa = await this.localizarID(id);
    
    return this.pessoaRepository.remove(pessoa)
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

  async alterar(id: string, dados: AlteraPessoaDTO): Promise<RetornoCadastroDTO> {
    const pessoa = await this.localizarID(id);

    Object.entries(dados).forEach(
      ([chave, valor]) => {
          if(chave=== 'id'){
              return;
          }

          pessoa[chave] = valor;
      }
    )

    return this.pessoaRepository.save(pessoa)
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
}