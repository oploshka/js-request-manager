Планы:

+ добавить документацию как с этим работать
+ cache
  - время жизни кеша
  - очистка кеша
+ нормализовать обработку promise
+ процесс обновления (разделение пользовательской логики от ядра)
+ второй параметр - options
+ примеры как обстоят дела в чужих проектах (должно быть на моем сайте + habr)


Проблемы с файлами

    In case of CORS requests, browsers can only access the following response headers by default:
    - Cache-Control
    - Content-Language
    - Content-Type
    - Expires
    - Last-Modified
    - Pragma
    
    If you would like your client app to be able to access other headers,
    you need to set the Access-Control-Expose-Headers header on the server:
    Access-Control-Expose-Headers: Access-Token, Uid
    
    источник
    https://stackoverflow.com/questions/37897523/axios-get-access-to-response-header-fields


# Имя скачиваемого файла - через функцию

    content-disposition: attachment; filename=trainers.xlsx
    content-length: 6560
    content-type: application/xlsx; charset=utf-8
    date: Tue, 27 Jul 2021 18:51:28 GMT