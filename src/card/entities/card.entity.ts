import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';


@Entity()
export class Card extends BaseEntity {
  constructor (
		term: string, 
    meaning: string,
    author?: string,
    id: string = uuidv4(),
	) {
		super();
		this.term = term;
    this.meaning = meaning;
    this.author = author || null;
    this.id = id;
	}

  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({
    nullable : false,
    type : 'varchar',
    length : 255,
  })
  term: string;

  @Column({
    nullable : false,
    type : 'varchar',
    length : 255,
  })
  meaning: string;

  @Column({
    nullable : true,
    type : 'varchar',
    length : 255,
  })
  author: string;
}
