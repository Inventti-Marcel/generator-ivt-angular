# Inventti AngularJS
Generator para as aplicações *AngularJS* que segue o padrão das aplicações do **myrp Varejo** e **Varejo Gratuíto** *(yeoman based generator - http://yeoman.io/ - THE WEB'S SCAFFOLDING TOOL FOR MODERN WEBAPPS)*


## Objetivo
Este generator tem como objetivo padronizar e automatizar a criação de aplicações baseadas no modelo que definimos para as aplicações frontend do varejo. O modelo apresentado aqui é usado em ambos os projetos (Pago e gratuíto).

## O generator e o automatizador de tarefas

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
* Toda as alteração de código desencadeia uma *"recomplição"* dos arquivos *.js*
