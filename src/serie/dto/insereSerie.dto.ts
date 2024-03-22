import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";
import { criaFilmeDTO } from "src/filme/dto/insereFilme.dto";



export class criaSerieDTO {    
    @IsString()
    @ApiProperty({
        example: 'Breaking Bad',
        description: `O nome será utilizado para identificar a série.`,
    })
    nomeSerie: string;

    @IsString()
    @ApiProperty({
        example: '01',
        description: `O número é usado para identificar a ordem dos episódios`,
    })
    episodio: string;

    @IsString()
    @ApiProperty({
        example: '03',
        description: `O número é usado para identificar a ordem das temporadas e para agrupar os mesmos episódios de uma temporada`,
    })
    temporada: string;

    @IsString()
    @ApiProperty({
        example: '20b4d2b8-c682-4e64-bc05-a32b76d4ba13',
        description: `ID do FILME do filme`,
    })
    FILME: string;
}
