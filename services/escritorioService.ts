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

            let stm = this.db.prepare('insert into escritorio VALUES(?,?,?)');
                    
            stm.run({...escritorio}, )
            
            
            } else { 
                reject({ ok: false, status: 400, error: 'Se recibio un valor NULL' });
            }

        });

    }


}