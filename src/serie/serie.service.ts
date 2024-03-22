import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import {v4 as uuid} from 'uuid';
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import { SERIE } from './serie.entity';
import { criaSerieDTO } from './dto/insereSerie.dto';
import { alteraSerieDTO } from './dto/atualizaSerie.dto';
import { ListaSeriesDTO } from './dto/listaSerie.dto';
import { FILME } from 'src/filme/filme.entity';
import { FilmeService } from 'src/filme/filme.service';


@Injectable()
export class serieService {
  constructor(
    @Inject('SERIE_REPOSITORY')
    private serieRepository: Repository<SERIE>,
    @Inject('FILME_REPOSITORY')
    private filmeRepository: Repository<FILME>,  
    private readonly filmeService: FilmeService
  ) {}

  async listar(): Promise<ListaSeriesDTO[]> {
    var serieListados = await this.serieRepository.find();
    return serieListados.map(
      serie => new ListaSeriesDTO(
          serie.ID,
          serie.nomeSerie,
          serie.episodio,
          serie.temporada
      ))
  }

  async inserir(dados: criaSerieDTO): Promise<RetornoCadastroDTO>{
    let serie = new SERIE();
        serie.ID = uuid();
        serie.nomeSerie = dados.nomeSerie;
        serie.episodio = dados.episodio;
        serie.temporada = dados.temporada;
        serie.filme = await this.filmeService.localizarID(dados.FILME);

    return this.serieRepository.save(serie)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: serie.ID,
        message: "Genero cadastrado!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao cadastrar." + error.message
      };
    })

    
  }

  localizarID(ID: string): Promise<SERIE> {
    return this.serieRepository.findOne({
      where: {
        ID,
      },
    });
  }



  async remover(id: string): Promise<RetornoObjDTO> {
    const serie = await this.localizarID(id);
    
    return this.serieRepository.remove(serie)
    .then((result) => {
      return <RetornoObjDTO>{
        return: serie,
        message: "serie excluido!"
      };
    })
    .catch((error) => {
      return <RetornoObjDTO>{
        return: serie,
        message: "Houve um erro ao excluir." + error.message
      };
    });  
  }

  async alterar(id: string, dados: alteraSerieDTO): Promise<RetornoCadastroDTO> {
    const serie = await this.localizarID(id);

    Object.entries(dados).forEach(
      ([chave, valor]) => {
          if(chave=== 'id'){
              return;
          }

          serie[chave] = valor;
      }
    )

    return this.serieRepository.save(serie)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: serie.ID,
        message: "serie alterado!"
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