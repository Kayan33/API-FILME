import Datas from "../utils/datas";
import * as bcrypt from 'bcrypt';
import { pessoa } from "src/pessoa/pessoa.entity";
import { Column, Entity, JoinColumn, JoinTable, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Usuario{
    
    @PrimaryColumn()
    id:string;

    @Column({length: 255})
    email: string;

    @Column({length: 255})
    senha: string;

    // @Column({length: 255})
    // NOME: string;

    @Column({length: 255})
    telefone: string;

    @Column({length: 255})
    cicade: string;

    @Column({length: 255})
    endereco: string;

    @Column({length: 255})
    cep: string;

    // @Column()
    // IDADE: number;

    @Column({length: 255})
    assinatura: string;

    // @Column({length: 255})
    // FOTO: string;

    @OneToOne(() => Usuario)
    @JoinColumn({ name: 'IDPESSOA', referencedColumnName:'ID'})
    PESSOA: pessoa

    login(senha){
        return bcrypt.compareSync(senha,this.senha)
    }

    trocaSenha(senha){
        const salt0rRounds=10
        this.senha = bcrypt.hashSync(senha, salt0rRounds)
    }
}