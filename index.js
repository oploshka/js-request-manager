import RequestManager from './src/RequestManager';
import SendRequest    from './src/SendRequest';

global.RequestManager = RequestManager(SendRequest);
