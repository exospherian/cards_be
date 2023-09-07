import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  constructor (
		username: string, 
	) {
		super();
		this.username = username;
	}

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

}
