
/*
export const HTTP_STATUS_1XX = {
  // 100 : 'Continue продолжай'
  // 101 : 'Switching Protocols переключение протоколов'
  // 102 : 'Processing идёт обработка'
  // 103 : 'Early Hints ранняя метаинформация'
};

export const HTTP_SUCCESS_STATUS = {
  200 : 'OK',                                 // хорошо
  201 : 'Created',                            //  создано
  202 : 'Accepted',                           //  принято
  203 : 'Non-Authoritative Information',      //  информация не авторитетна
  204 : 'No Content',                         //  нет содержимого
  205 : 'Reset Content',                      //  сбросить содержимое
  206 : 'Partial Content',                    //  частичное содержимое
  207 : 'Multi-Status',                       //  многостатусный
  208 : 'Already Reported',                   //  уже сообщалось
  226 : 'IM Used',                            //  использовано IM',
};
*/

const HTTP_STATUS_2XX = {  'title' : 'Success', /* успешно */ };
const HTTP_STATUS_3XX = {  'title' : 'Redirection', /* перенаправление */ };
const HTTP_STATUS_4XX = {  'title' : 'Client Error', /* ошибка клиента */ };
const HTTP_STATUS_5XX = {  'title' : 'Server Error', /* ошибка сервера */ };

export const getStatusInfo = (status) => {
  if(200 <= status && status < 300) { return HTTP_STATUS_2XX.title; }
  if(300 <= status && status < 400) { return HTTP_STATUS_3XX.title; }
  if(400 <= status && status < 500) { return HTTP_STATUS_4XX.title; }
  if(500 <= status && status < 600) { return HTTP_STATUS_5XX.title; }
  return '';
};

export const getStatusMessage = (status) => {
  let message = ''
  message += getStatusInfo(status);
  message += message ? ': ' : '';
  message += status + ' ';
  message += (status in HTTP_ERROR_STATUS) ?  HTTP_ERROR_STATUS[status] : 'Undefined error';

  return message;
};

export const HTTP_ERROR_STATUS = {
  //
  300 : 'Multiple Choices',                   // множество выборов;
  301 : 'Moved Permanently',                  // перемещено навсегда;
  302 : 'Moved Temporarily/Found',            // 302 Moved Temporarily - перемещено временно | 302 Found - найдено
  303 : 'See Other',                          // смотреть другое;
  304 : 'Not Modified',                       // не изменялось;
  305 : 'Use Proxy',                          // использовать прокси;
  306 : 'ERROR_306',                          // зарезервировано (код использовался только в ранних спецификациях);
  307 : 'Temporary Redirect',                 // временное перенаправление;
  308 : 'Permanent Redirect',                 // постоянное перенаправление.

  //
  400 : 'Bad Request',                        //  неправильный, некорректный запрос;
  401 : 'Unauthorized',                       //  не авторизован (не представился);
  402 : 'Payment Required',                   //  необходима оплата;
  403 : 'Forbidden',                          //  запрещено (не уполномочен);
  404 : 'Not Found',                          //  не найдено;
  405 : 'Method Not Allowed',                 //  метод не поддерживается;
  406 : 'Not Acceptable',                     //  неприемлемо;
  407 : 'Proxy Authentication Required',      //  необходима аутентификация прокси;
  408 : 'Request Timeout',                    //  истекло время ожидания;
  409 : 'Conflict',                           //  конфликт;
  410 : 'Gone',                               //  удалён;
  411 : 'Length Required',                    //  необходима длина;
  412 : 'Precondition Failed',                //  условие ложно;
  413 : 'Payload Too Large',                  //  полезная нагрузка слишком велика;
  414 : 'URI Too Long',                       //  URI слишком длинный
  415 : 'Unsupported Media Type',             //  неподдерживаемый тип данных;
  416 : 'Range Not Satisfiable',              //  диапазон не достижим;
  417 : 'Expectation Failed',                 //  ожидание не удалось
  418 : 'I’m a teapot',                       //   я — чайник
  419 : 'Authentication Timeout',             //   (not in RFC 2616) обычно ошибка проверки CSRF
  421 : 'Misdirected Request',                //   [10]
  422 : 'Unprocessable Entity',               //   необрабатываемый экземпляр
  423 : 'Locked',                             //   заблокировано
  424 : 'Failed Dependency',                  //   невыполненная зависимость
  425 : 'Too Early',                          //   слишком рано
  426 : 'Upgrade Required',                   //   необходимо обновление
  428 : 'Precondition Required',              //   необходимо предусловие
  429 : 'Too Many Requests',                  //   слишком много запросов
  431 : 'Request Header Fields Too Large',    //   поля заголовка запроса слишком большие
  449 : 'Retry With',                         //   повторить с
  451 : 'Unavailable For Legal Reasons',      //   недоступно по юридическим причинам.',
  499 : 'Client Closed Request',              //   (клиент закрыл соединение)

  //
  500 : 'Internal Server Error',              //   внутренняя ошибка сервера
  501 : 'Not Implemented',                    //   не реализовано
  502 : 'Bad Gateway',                        //   плохой, ошибочный шлюз
  503 : 'Service Unavailable',                //   сервис недоступен
  504 : 'Gateway Timeout',                    //   шлюз не отвечает
  505 : 'HTTP Version Not Supported',         //   версия HTTP не поддерживается
  506 : 'Variant Also Negotiates',            //   вариант тоже проводит согласование
  507 : 'Insufficient Storage',               //   переполнение хранилища
  508 : 'Loop Detected',                      //   обнаружено бесконечное перенаправление
  509 : 'Bandwidth Limit Exceeded',           //   исчерпана пропускная ширина канала
  510 : 'Not Extended',                       //   не расширено
  511 : 'Network Authentication Required',    //   требуется сетевая аутентификация
  520 : 'Unknown Error',                      //   неизвестная ошибка
  521 : 'Web Server Is Down',                 //   веб-сервер не работает
  522 : 'Connection Timed Out',               //   соединение не отвечает
  523 : 'Origin Is Unreachable ',             //  источник недоступен
  524 : 'A Timeout Occurred',                 //   время ожидания истекло
  525 : 'SSL Handshake Failed',               //   квитирование SSL не удалось
  526 : 'Invalid SSL Certificate',            //   недействительный сертификат SSL.',
};
