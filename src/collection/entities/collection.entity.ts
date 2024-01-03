import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../user/entities';
import { Card } from '../../card/entities';
import { v4 as uuidv4 } from 'uuid';


@Entity()
export class Collection extends BaseEntity {
    constructor (
		name: string,
        id: string = uuidv4(),
	) {
		super();
		this.name = name;
        this.id = id;
	}

    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => User, (user) => user.collections)
    user: User;

    @ManyToMany(() => Card)
    @JoinTable()
    cards: Card[]
}
