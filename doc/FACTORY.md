## Factory Pattern

Utilizaremos o padrão simple factory para instanciar qual strategy será utilizada na hora de extrair dados de alguma fonte.

```
ScrapingMethodFactory(source Source): ScrapingStrategy {}
```
```
ENUM Source {
    FORUM
    TELEGRAM
    DATABREACH
}
```
- A função ScrapingMethodFactory será responsável por receber uma source e retornar a instância correta da strategy que será utlizada.
```
interface ScrapingStrategy {
    handle() {}
}
```
- A interface ScrapingStrategy será implementada por todos os métodos que definem uma forma de extrair dados.