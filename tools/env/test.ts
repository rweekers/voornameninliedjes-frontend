import {EnvConfig} from './env-config.interface';

const TestConfig: EnvConfig = {
  ENV: 'TEST',
  API: 'http://localhost:3000/api/n/songs'
  // API: 'http://localhost:8080/namesandsongs/api/song'
};

export = TestConfig;

