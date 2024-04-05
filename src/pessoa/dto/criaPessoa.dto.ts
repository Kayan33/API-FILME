import { IsDate, IsDateString, IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";


export class CriaPessoaDTO{
    @IsString()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    nome: string;

    @IsString()
    @IsNotEmpty({message: "Descrição não pode ser vazio"})
    descricao: string;

    @IsDateString()
    @IsNotEmpty({message: "Nascimento não pode ser vazio"})
    nascimento: Date;

    @IsString()
    @IsNotEmpty({message: "Pais não pode ser vazio"})
    pais: string;
}