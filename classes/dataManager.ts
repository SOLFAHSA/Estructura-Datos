
import sqlite3 from 'sqlite3';
import { FILE_PATH_DB } from '../global/enviroment';


export class DataManager {

    private static dtm: DataManager;

    public db: sqlite3.Database;
   
    constructor() {
        this.db = new sqlite3.Database(FILE_PATH_DB, (error) => {
            if ( error )
                console.log('Error no se cargo el archivo de la base de datos: ', error);
        });
    }

    public static get instance() {
        return this.dtm || (this.dtm = new DataManager());
     }

}