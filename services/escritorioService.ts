import { Escritorio } from '../classes/escritorio';
import { DataManager } from '../classes/dataManager';


export class EscritorioService {

    private static _EscritorioService: EscritorioService;
    private db = DataManager.instance.db;

    constructor() {

    }

    public static get instance() {
        return this._EscritorioService || (this._EscritorioService = new EscritorioService());
    }

    public getAll() {

        return new Promise( (resolve, reject) => {

            this.db.all('select * from escritorio', (error, escritorios) => {
    
                if ( error ) {  
                    reject(error);
                }

                resolve(escritorios);
            });
        })

    }

    public add( escritorio: Escritorio ) {

        return new Promise((resolve,reject) => {

            if ( escritorio ) {

            let stm: any = this.db.prepare('insert into escritorio VALUES(?,?,?)')
                      .run([escritorio.numero, escritorio.descripcion, escritorio.tipo], (err) => {
                        
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

    public delete( id: number ) {
        return new Promise((resolve, reject) => {

            let stmt: any = this.db.prepare('Delete from escritorio where rowid=?')
                            .run(id, (err) => {
                if (err)
                    reject({error: err.message});
                else 
                    resolve(stmt);
            });

        });
    } 


}