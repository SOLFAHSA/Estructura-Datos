

import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { TicketService } from '../services/ticketService';
import { Ticket } from '../classes/ticket';

const ROUTER = Router();
const ticketService = TicketService.instance;

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

ROUTER.post('/tickets/new', ( req: Request, res: Response ) => {
    
    const SERVER = Server.instance;
    
    let ticket: any = req.body;

    ticketService.nuevoTicket()
        .then(result => {
            const NUM = result as number;
            let newTicket = new Ticket(NUM);
            newTicket.clienteID = ticket.clienteID;
            
            ticketService.add(newTicket)
            .then( result => {
                console.log(result);
                res.json({
                    ok: true,
                    ticket: result
                });
            });
        });
});

ROUTER.post('/tickets/closed', ( req: Request, res: Response ) => {
    
    const SERVER = Server.instance;
    
    ticketService.despacharTicket()
        .then(result => {
            let ticketUpd: Ticket = {...result};
            ticketUpd.status = 1;
            ticketService.update(ticketUpd)
            .then( result => {
                console.log(result);
                res.json({
                    ok: true,
                    ticket: ticketUpd
                });
            });
        });
      


});



export default ROUTER;