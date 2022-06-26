import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn()
	id: number
	@Column({ default: 'New User' })
	name?: string
	@Column()
	email: string
	@Column()
	password: string
	@Column({ default: false })
	isAdmin: boolean
	@CreateDateColumn()
	created_at: Date
	@UpdateDateColumn()
	updated_at: Date
}
