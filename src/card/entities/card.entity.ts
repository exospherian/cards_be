import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Card extends BaseEntity {
  constructor (
		term: string, 
    meaning: string,
    author: string,
	) {
		super();
		this.term = term;
    this.meaning = meaning;
    this.author = author;
	}

  @PrimaryGeneratedColumn()
  id: number;

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
