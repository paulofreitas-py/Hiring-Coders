import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import CollaboratorController from './app/controllers/CollaboratorController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationsController from './app/controllers/NotificationsController';
import authMiddleware from './app/middlewares/auth'
import multer from 'multer';
import multerConfig from './config/multer';

//import User from './app/models/User';
// import Database from './database';
// usado para teste - a linha acima importa o database/index.js tinha faltado mostrar na aula, consegui solucao no forum no slack

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);

routes.post('/session', SessionController.store);

// Rotas autenticadas

routes.use(authMiddleware)
routes.put('/users', UserController.update);

// rota de agendamento
routes.post('/appointment', AppointmentController.store);

// listagem de agendamento
routes.get('/appointments', AppointmentController.index);

// listagem de colaboradores
routes.get('/collaborator', CollaboratorController.index);

// listagem de agendamentos colaborador
routes.get('/schedule', ScheduleController.index);

// listagem de notificacoes
routes.get('/notifications', NotificationsController.index);

// marcar como lida notificacoes
// quando esta assim a chamada de ver diretamente /notifications/545234534
routes.put('/notifications/:id', NotificationsController.update);

// upload de arquivos
routes.post('/files', upload.single('file'), FileController.store);


export default routes;