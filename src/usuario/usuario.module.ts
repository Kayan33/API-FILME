import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { FilesArmazenados } from "src/files/files.dm";
import { ArquivoValido, ArquivoValidoValidator } from "src/files/validacao/arquivo-valido.validator";
import Datas from "src/utils/datas";
import { Repository } from "typeorm";
import { UsuarioController } from "./usuario.controller";
import { Usuario } from "./usuario.entity";
import { UsuarioService } from "./usuario.service";
import { EmailUnicoValidator } from "./validacao/email-unico.validator";
import { pessoaProviders } from "src/pessoa/pessoa.providers";
import { PessoaService } from "src/pessoa/pessoa.service";
import { usuarioProviders } from "./usuario.providers";

@Module({
    imports:[HttpModule,DatabaseModule],
    controllers:[UsuarioController],
    providers: [
        ...pessoaProviders,
        PessoaService,
        ...usuarioProviders,
        UsuarioService,
        Datas,
        EmailUnicoValidator,
        ArquivoValidoValidator
      ],
})

export class UsuarioModule{
    
}