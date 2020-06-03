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
        this.db.all('select * from escritorio', (error, escritorios) => {

            if ( error ) {  
                console.error('errores: ', error);
                return;
            }

            console.log('registros', escritorios);
            return escritorios;
        });
    }

    public add( escritorio: Escritorio ) {

        if ( escritorio ) {

        }

    }


}