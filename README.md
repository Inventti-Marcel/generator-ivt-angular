# Inventti AngularJS
Generator para as aplicações *AngularJS* que segue o padrão das aplicações do **myrp Varejo** e **Varejo Gratuíto** *(yeoman based generator - http://yeoman.io/ - THE WEB'S SCAFFOLDING TOOL FOR MODERN WEBAPPS)*


## Objetivo
Este generator tem como objetivo padronizar e automatizar a criação de aplicações baseadas no modelo que definimos para as aplicações frontend do varejo. O modelo apresentado aqui é usado em ambos os projetos (Pago e gratuíto).

## O generator e o task runner
Neste generetor é utilizado um *task runner* (http://gruntjs.com/) que está configurado para executar algumas tarefas dependendo de ações do programador. Veja o que o generator faz em conjunto com o *task runner*

* Criar toda a estrutura inicial da aplicação
    * Todos os arquivos inicias como Gruntfile.js, index.html, package.json, .bowerrc e outros serão automaticamente adicionados
    * Todas as dependências serão automaticamentes instaladas (node e bower)
* Adicionar módulos
    * Automaticamente registrados
* Criar controllers
    * Automaticamente registrados
* Subir um servidor
    * Há um servidor que roda com a ajuda do node para que você inicie a aplicação imediatamente
    * Este servidor já está configurado para usar livereload - Isso sognifica que haverá uma mudança no seu workflow, sendo que a cada alteração realizada no código, a página é automaticamente atualizada
* Recompilar
    * Toda a alteração de código desencadeia uma *"recomplição"* dos arquivos *.js*
* ...

## Estrutura
Está é a estrutura criada pelo generator e definida com base nos nossos testes e experiência.
```
/app
    /modulos <-- Diretório com os módulos
        /ModuloExemplo
            /src <-- Diretório com todos os arquivos .js
            /view <-- Diretório com todos os arquivos .html
            modulo.config.js <-- Configurações deste módulo
    /componentes <-- Diretório com os componentes
        /ComponenteExemplo
            /src <-- Diretório com todos os arquivos .js
            /view <-- Diretório com todos os arquivos .html
            modulo.config.js <-- Configurações deste módulo
    app.js <-- Configurações da aplicação
    app.modulos.js <-- Registro dos módulos
    app.componentes.js <-- Registro dos componentes
/assets
    /css <-- Diretório com estilos css
        *.css <-- Arquivos "compilados" automaticamente
    /img
    /js
        concatenado.js <-- Arquivo gerado automaticamente pela "compilação"
        main.min.js <-- Arquivo gerado automaticamente pela "compilação"
    /sass <-- Diretório para estilos usando SASS
        /* <-- Subdiretório para arquivos .scss
        *.scss <-- Arquivos .scss
    /vendor <-- Bibliotecas externas
/node_modules
    /*
.bowerrc <-- Configura onde instalar as dependências
.gitigone
bower.json <-- Lista das dependências instaladas
config.rb <-- Configurações da compilação do SASS
Gruntfile.js <-- Configurações do task runner
index.html
package.json <-- Lista de pacotes node instaladados
```
## Considerações

1. O que define um módulo?
    - Um módulo passa a existir quando houver necessidade de isolar um domínio/conceito específico
2. O que define um componente? 
    - Um componente é uma funcionalidade que pode flutuar entre os módulos
3. modulo.config.js
    - Use este arquivo para definir as rotas dos módulos
    - Use este arquivo para definir seus services, factories e directives
    - Os controllers do módulo serão registrados neste arquivo
4. Css e Sass
    - Não escreve CSS, escreva sass. O Sass trás muitas facilidades e melhorar o modularização do CSS. Tudo que você escrever em Sass, será compilado para CSS automaticamente pelo task runner.
5. Bower
    - O Bower é um gerenciador de dependências para o frontend. Sempre que quiser adicionar uma biblioteca ao projeto, use o bower executando no terminal *"bower install --save nomeDaBiblioteca"* (Este comando deve ser executado no diretório raiz do projeto)

## Iniciando com o generator
Bom, antes de começar a usar o generator, você precisa montar um ambiente :D

### Montando o ambiente
Precisamos instalar alguns softwares para montar o ambiente e usar o generator (Tudo muito simples). Vamos lá:
* NodeJS (https://nodejs.org/en/)
    * Fique atento durante a instalação para marcar a opção que adiciona o node as suas variáveis de ambiente
    * O Node Package Manager **(NPM)** também será instalado
    * É altamente recomendado que você tenha o GIT instalado e adicionado as variáveis de ambiente (https://git-scm.com/)
* Ruby (http://rubyinstaller.org/downloads/)

Após instalar o node e o ruby, vá para o terminal para executar alguns comandos. Antes de tudo, verifique se você tem acesso ao git (digite "git") e ao npm (digite npm --version). Estando tudo acessível, digite os seguintes comandos:
* gem update --system
* gem install compass
* npm install -g bower
* npm install -g grunt-cli
* npm install -g yo
 
É isso, ambiente preparado para começarmos!

### O GENERATOR

#### Aplicação
Vamos começar criando uma nova aplicação. No terminal digite ***yo ivt-angular***. Algumas perguntas serão feitas a você e, no fim, uma lista com os arquivos criados será apresentada junto com um comando para você executar. Este comando é para navegar até o diretório criado *"cd DiretorioCriado"* e iniciar a aplicação *npm start*. Executando estes comandos, todas as dependências necessárias serão instaladas e o navegador abrirá com a aplicação rodando. Com a aplicação rodando e dependências instaladas, 

#### Módulos
Definimos um padrão de modularização para nossas aplicações e esse generator funciona baseado nesta estrutura. Digite ***yo ivt-angular:modulo NomeDoModulo*** para criar um novo módulo. Este módulo será automaticamente registrado pelo generator. Módulos não registrados, não são executados e nem carregados no run da aplicação.

* yo ivt-angular:modulo **NomeDoModulo**

#### Controllers
Definimos um padrão de modularização para nossas aplicações e esse generator funciona baseado nesta estrutura. Digite ***yo ivt-angular:controller NomeDoController.NomeDoModulo*** para criar um novo controller dentro do módulo especificado. Este controller será automaticamente registrado no módulo pelo generator. Controllers não registrados, são são executados e nem carregados no run da aplicação.

* yo ivt-angular:controller **NomeDoController.NomeDoModulo**

*Ainda evoluindo...*
