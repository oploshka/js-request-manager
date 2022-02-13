
import SenderRequestClientLogic   from "./SenderRequestClientLogic";
import SenderResponsePrepareLogic from "./SenderResponsePrepareLogic";

import {createSenderErrorPromise} from "js-request-manager/src/Core/SenderHelper";


// TODO: переписать на промис с его явным возвратом, (отсутствует abort) ???
const Sender = async (requestClient, responsePrepare, requestClass) => {
  // Отправка данных
  try {
    // Шаг 3
    // _step = 'REQUEST_OBJECT_PREPARE';
    const responseClass = await SenderRequestClientLogic(requestClient, requestClass)
    
    
    
    // Шаг 4
    const data = await SenderResponsePrepareLogic(responsePrepare, responseClass, requestClass);
    
    return data;
    
  } catch (e) {
    // TODO не уверен в корректной работе
    return createSenderErrorPromise('REQUEST_PROVIDER_GET', e.message, {errorObject: e});
  }
}

export default Sender;
