import tableAnalysisMock from './common/table';
import loginAnalysisMock from './common/login';
import userAnalysisMock from './common/user';
import roleAnalysisMock from './common/role';
import menuAnalysisMock from './common/menu';

export const worker = [...tableAnalysisMock, ...loginAnalysisMock, ...userAnalysisMock, ...roleAnalysisMock, ...menuAnalysisMock];
