import { Request, Response } from 'express';

import pool from '../database';

class PersonController {
    
    public async list (req: Request, res: Response) {
        const persons = await pool.query('SELECT * FROM person');
        res.json(persons);
    }

    public async getOne (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const person = await pool.query('SELECT * FROM person WHERE id = ?', [id]);
        
        if (person.length > 0) {
            res.json(person[0]);
        }

        res.status(404).json({text: 'The person no exist'});
        
    }

    public async create (req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO person set ?', [req.body]);
        console.log(req.body);
        res.json({message: 'Save person'});
    }
    
    public async delete (req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('DELETE FROM person WHERE id = ?', [id]);
        res.json({message: 'Person Delete ' + [id]});
    }
    
    public async update (req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE person set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'Update person ' + [id] });
    }
}

const personController = new PersonController();
export default personController;