import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../user/entities';
import { Card } from '../../card/entities';

@Entity()
export class Collection extends BaseEntity {
    constructor (
		name: string,
	) {
		super();
		this.name = name;
	}

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => User, (user) => user.collections)
    user: User;

    @ManyToMany(() => Card)
    @JoinTable()
    cards: Card[]
}
