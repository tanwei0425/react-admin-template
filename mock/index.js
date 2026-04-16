import tableAnalysisMock from './common/table';
import loginAnalysisMock from './common/login';
import userAnalysisMock from './common/user';
import roleAnalysisMock from './common/role';
import menuAnalysisMock from './common/menu';
import dictAnalysisMock from './common/dict';

export const worker = [...tableAnalysisMock, ...loginAnalysisMock, ...userAnalysisMock, ...roleAnalysisMock, ...menuAnalysisMock, ...dictAnalysisMock];
