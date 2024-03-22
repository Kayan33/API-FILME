import { FILME } from "src/filme/filme.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class SERIE {
    @PrimaryColumn()
    ID:string;

    @Column({length: 255})
    nomeSerie: string;

    @Column({length: 255})
    episodio: string;

    @Column({length: 255})
    temporada: string;

    @ManyToOne(() => FILME, filme => filme.produtos)
    @JoinColumn({ name: 'IDFILME', referencedColumnName:'ID'})
    filme: FILME;
}