


export class Ticket {

    public numero: number;
    public clienteID: string;
    public status: string;
    public id?: number;

    constructor( numero: number ) {
        this.numero = numero;
        this.clienteID = '';
        this.status = 'OP';
    }
    
}