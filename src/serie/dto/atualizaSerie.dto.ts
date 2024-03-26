import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {  IsInt, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { alteraFilmeDTO } from "src/filme/dto/atualizaFilme.dto";
import { criaFilmeDTO } from "src/filme/dto/insereFilme.dto";



export class alteraSerieDTO {    
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: 'Breaking Bad',
        description: `O nome será utilizado para identificar a série.`,
    })
    NOMESERIE: string;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({
        example: '01',
        description: `O número é usado para identificar a ordem dos episódios`,
    })
    EPSODIO: number;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({
        example: '03',
        description: `O número é usado para identificar a ordem das temporadas e para agrupar os mesmos episódios de uma temporada`,
    })
    TEMPORADA: number;
}