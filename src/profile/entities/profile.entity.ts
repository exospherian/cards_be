import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities';
import { v4 as uuidv4 } from 'uuid';


@Entity()
export class Profile extends BaseEntity {
    constructor (
        email: string, 
        birthDate: string,
        id: string = uuidv4(),
    ) {
        super();
        this.email = email;
        this.birthDate = birthDate;
        this.id = id;
    }

    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

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
