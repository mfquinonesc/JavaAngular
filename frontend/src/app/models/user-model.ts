export class UserModel {
    id?: number = 0;
    identification: number = 0;
    name: string = '';
    birth_date: string = '';

    constructor(identification: number, name: string, birth_date: string, id?: number) {
        this.id = id;
        this.identification = identification;
        this.birth_date = birth_date;
        this.name = name;
    }
}
