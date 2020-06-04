
import { DataManager } from '../classes/dataManager';
import { Ticket } from '../classes/ticket';


export class TicketService {

    private static _TicketService: TicketService;
    private db = DataManager.instance.db;

    constructor() {

    }

    public static get instance() {
        return this._TicketService || (this._TicketService = new TicketService());
    }

    public getAll() {

        return new Promise( (resolve, reject) => {

            this.db.all('select * from ticket', (error, tickets) => {
    
                if ( error ) {  
                    reject(error);
                }

                resolve(tickets);
            });
        })

    }

    public getById( id: number ) {

        return new Promise( (resolve, reject) => {

            this.db.get('select * from ticket where id = ?', id, (error, ticket) => {
    
                if ( error ) {  
                    reject(error);
                }

                resolve(ticket);
            });
        });

    }

    public add( ticket: Ticket ) {

        return new Promise((resolve,reject) => {

            if ( ticket ) {

            let stm: any = this.db.prepare('insert into ticket VALUES(?,?,?)')
                      .run([ticket.numero, ticket.clienteID, 0], ( err ) => {
                        
                        if (err) {
                            reject({error: err.message});
                        }
                        resolve(stm);

                    });                
            
            } else { 
                reject({ ok: false, status: 400, error: 'Se recibio un valor NULL' });
            }

        });

    }

    public update( ticket: Ticket ) {

        return new Promise((resolve, reject) => {

            if ( ticket ) {

                let stmt: any;

                stmt = this.db.prepare(
                    `UPDATE ticket
                      SET
                        numero = ${ ticket.numero },
                        clienteId = ${ ticket.clienteID },
                        status = ${ ticket.status }
                      where
                        numero = ${ ticket.id };`
                ).run((err) => {

                    if( err )
                        reject(err);
                    else
                        resolve(stmt);
                });

            }

            reject({error: 'error'})
        });

    }


    public delete( id: number ) {
        return new Promise((resolve, reject) => {

            let stmt: any = this.db.prepare('Delete from ticket where id=?')
                            .run(id, (err) => {
                if ( err )
                    reject({error: err.message});
                else 
                    resolve(stmt);
            });

        });
    } 

    public despacharTicket() {

        return new Promise( (resolve, reject) => {

            this.db.get(`select min(*) from ticket where status = 0`, (error, ticket) => {
    
                if ( error ) {  
                    reject(error);
                }

                resolve(ticket);
            });
        })

    }

    nuevoTicket() {

        return new Promise((resolve, reject) =>{

            this.db.all('select max(*) from ticket where status=0', (err, tickets: Array<any>) => {
                
                if ( err )
                    reject({error: err.message });
                
                if( tickets.length === 0 )
                    resolve({numero: 1});
                else
                    resolve({numero: (tickets[0].numero + 1)})

            });
        });
    }


}

