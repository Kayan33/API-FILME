import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import {v4  as uuid} from 'uuid'
import { ApiTags } from "@nestjs/swagger";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { ListaSeriesDTO } from "./dto/listaSerie.dto";
import { alteraSerieDTO } from "./dto/atualizaSerie.dto";
import { criaSerieDTO } from "./dto/insereSerie.dto";
import { serieService } from "./serie.service";
import { SERIE } from "./serie.entity";

@ApiTags('serie')
@Controller('/serie')
export class SerieController{    
    constructor(private readonly serieService: serieService){
    }

    @Get()
    async Retorno():Promise<ListaSeriesDTO[]> {
        return this.serieService.listar();
    }

    

    @Delete('/:id')
    async remove(@Param('id') id: string): Promise<RetornoObjDTO>{
        return this.serieService.remover(id);
    }


    @Put('/:id')
    async atualiza(@Param('id') id: string, @Body() novosDados: alteraSerieDTO):Promise<RetornoCadastroDTO>{
        return this.serieService.alterar(id, novosDados);
    }

    @Post()
    async cria(@Body() dados: criaSerieDTO):Promise<RetornoCadastroDTO>{
        return this.serieService.inserir(dados);        
    }
}