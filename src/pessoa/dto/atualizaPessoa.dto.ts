import { Optional } from "@nestjs/common";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class AlteraPessoaDTO{
    @IsString()
    @Optional()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    nome: string;

    @IsString()
    @Optional()
    @IsNotEmpty({message: "Descrição não pode ser vazio"})
    descricao: string;

    @IsDate()
    @Optional()
    @IsNotEmpty({message: "Nascimento não pode ser vazio"})
    nascimento: Date;

    @IsString()
    @Optional()
    @IsNotEmpty({message: "Pais não pode ser vazio"})
    Pais: string;
}