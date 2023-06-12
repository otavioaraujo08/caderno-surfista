import config, { IConfig } from 'config';
import { connect as mongooseConnect, connection } from 'mongoose';

const dbConfig: IConfig = config.get('App.database');

// Metodo para conectar com o banco de dados
export const connect = async (): Promise<void> => {
    await mongooseConnect(dbConfig.get('mongoUrl'));
};

// Metodo para encerrar a conexão com o banco de dados
export const close = (): Promise<void> => connection.close();
