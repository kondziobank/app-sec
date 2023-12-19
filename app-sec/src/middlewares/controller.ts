import { catchExceptions } from '@/middlewares/error';
import { Handler } from 'express';

export default function controller(middleware: Handler): Handler {
    return catchExceptions(middleware)
}
