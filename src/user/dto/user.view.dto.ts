import { Expose } from 'class-transformer';


export class UserViewDto {
    @Expose()
    username: string;
}