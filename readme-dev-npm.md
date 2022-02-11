# Переустановка пакета
```shell
npm uninstall js-request-manager
npm install js-request-manager@1.0.0-beta.4
```

# Публикация пакета на npmjs
```shell
# (предварительно npm login)
# npm run build  # !!! не забыть !!!
npm publish
```

# Публикация beta версий на npmjs
```shell
npm publish --tag beta
```

# Отмена публикации пакета на npmjs
```shell
npm unpublish js-request-manager@1.0.0-beta.0
```

# Установить пакеты устаревшими
```shell
npm deprecate js-request-manager@"< 0.2.3" "critical bug fixed in v0.2.3"
npm deprecate js-request-manager@0.x "0.x is no longer supported"
```
