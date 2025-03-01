import mongoose from 'mongoose';
import { MONGODB_URI } from '../env/envoriment.js';
import { DATA_SOURCE } from './datasource.provider.js';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async (): Promise<typeof mongoose> => {
      try {
        const connection = await mongoose.connect(MONGODB_URI);
        return connection;
      } catch (error) {
        console.error('Error to connect database', error);
        process.exit(1);
      }
    },
  },
];
