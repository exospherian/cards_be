import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities';

@Entity()
export class Profile extends BaseEntity {
  constructor (
		email: string, 
    birthDate: string,
	) {
		super();
		this.email = email;
        this.birthDate = birthDate;
	}

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({
    type: 'date',
  })
  birthDate: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User
}
