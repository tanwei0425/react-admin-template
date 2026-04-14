import tableAnalysisMock from './common/table';
import loginAnalysisMock from './common/login';
import userAnalysisMock from './common/user';

export const worker = [...tableAnalysisMock, ...loginAnalysisMock, ...userAnalysisMock];
