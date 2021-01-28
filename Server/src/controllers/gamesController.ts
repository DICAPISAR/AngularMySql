import {Request, Response } from 'express'
import pool from '../database'

class GamesController {
    public async list (req: Request, res:Response) {
        const games = await pool.query('SELECT * FROM games');
        res.json(games)
    }

    public async getOne (req: Request, res:Response): Promise<any> {
        const { id } = req.params;
        const game = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
        if(game.length > 0){
            return res.json(game[0]);
        }       
        res.status(404).json({text: "Juego no encontrado"});
    }

    public async create (req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO games set ?', [req.body])
        res.json({message: 'Juego Guardado'})
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM games WHERE id = ?', [id]);
        res.json({message: "El juego fue eliminado"})
    }

    public async update (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE games set ? WHERE id = ?', [req.body, id]);
        res.json({message: "El juego fue Actualizado"});
    }
}

const gamesController =  new GamesController();

export default gamesController;