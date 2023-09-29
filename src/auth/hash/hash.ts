import { 
	hash, 
	genSalt,
} from 'bcrypt';

export async function hashPass (password: string): Promise<string> {
	const salt = await genSalt();
	return hash(password, salt);
}