import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { Collection } from '../../collection/entities';

@Entity()
export class User extends BaseEntity {
  constructor (
		username: string, 
    password: string,
	) {
		super();
		this.username = username;
    this.password = password;
	}

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Collection, (collection) => collection.user)
  collections: Collection[]


}
