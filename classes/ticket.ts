


export class Ticket {

    public numero: number;
    public clienteID: string;
    public status: number;

    constructor( numero: number ) {
        this.numero = numero;
        this.clienteID = '';
        this.status = 0;
    }
    
}