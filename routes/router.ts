

import { Router, Request, Response } from 'express';
import Server from '../classes/server';

const ROUTER = Router();

ROUTER.get('/mensajes', ( req: Request, res: Response ) => {

    res.json({
        ok: true,
        mensaje: 'Todo esta bien!'
    }); 


});


ROUTER.post('/mensajes', ( req: Request, res: Response ) => {

    const CUERPO = req.body.cuerpo;
    const DE = req.body.de;

    const PAYLOAD = {
        de: DE,
        cuerpo: CUERPO
    };

    const SERVER = Server.instance;

    SERVER.io.emit( 'mensaje-nuevo', PAYLOAD );

    res.json({
        ok: true,
        cuerpo: CUERPO,
        de: DE
    }); 


});

ROUTER.post('/mensajes/:id', ( req: Request, res: Response ) => {

    const PRM = req.params.id;
    const CUERPO = req.body.cuerpo;
    const DE = req.body.de;

    const PAYLOAD = {
        de: DE,
        cuerpo: CUERPO
    };

    const SERVER = Server.instance;

    SERVER.io.in( PRM ).emit( 'mensaje-privado', PAYLOAD );

    res.json({
        ok: true,
        cuerpo: CUERPO,
        de: DE,
        parametros: PRM
    }); 


});


export default ROUTER;