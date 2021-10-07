"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class PersonController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const persons = yield database_1.default.query('SELECT * FROM person');
            res.json(persons);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const person = yield database_1.default.query('SELECT * FROM person WHERE id = ?', [id]);
            if (person.length > 0) {
                res.json(person[0]);
            }
            res.status(404).json({ text: 'The person no exist' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO person set ?', [req.body]);
            console.log(req.body);
            res.json({ message: 'Save person' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM person WHERE id = ?', [id]);
            res.json({ message: 'Person Delete ' + [id] });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE person set ? WHERE id = ?', [req.body, id]);
            res.json({ message: 'Update person ' + [id] });
        });
    }
}
const personController = new PersonController();
exports.default = personController;
