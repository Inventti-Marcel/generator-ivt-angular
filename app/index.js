var generators = require('yeoman-generator');
var _ = require('underscore.string');
var path = require('path');
var inventtiWelcome = require('welcome-inventti-ascii');

module.exports = generators.Base.extend({
	bemVindo: function () {
		console.log(inventtiWelcome);
	},

	definirDiretorioAplicacao: function () {
		var done = this.async();
		this.prompt({
			type    : 'input',
			name    : 'appDir',
			message : 'Qual o nome do diretório da aplicação?',
			default : this.appname
		}, function (resposta) {
			var nomeDiretorioAplicacao = _.camelize(_.humanize(resposta.appDir));
			this.nomeDiretorioAplicacao = nomeDiretorioAplicacao;

			done();
		}.bind(this));
	},

	definirNomeAplicacao: function () {
		var done = this.async();
		this.prompt({
			type    : 'input',
			name    : 'appName',
			message : 'Qual o nome da aplicação?',
			default : this.appname
		}, function (resposta) {
			this.nomeAplicacao = resposta.appName;

			var nomeAplicacaoTratado = _.camelize(_.humanize(resposta.appName));
			this.nomeAplicacaoTratado = nomeAplicacaoTratado;

			done();
		}.bind(this));
	},

	copiarTemplatesIniciaisAplicacao: function () {
		this.sourceRoot(path.join(__dirname, '../templates/'));

		this.fs.copyTpl(
	      	this.templatePath('app/app.js'),
	      	this.destinationPath(path.join(this.nomeDiretorioAplicacao, 'app/app.js')),
	      	{ nomeAplicacaoTratado: this.nomeAplicacaoTratado }
	    );

	    this.fs.copyTpl(
	      	this.templatePath('app/app.componentes.js'),
	      	this.destinationPath(path.join(this.nomeDiretorioAplicacao, 'app/app.componentes.js'))
	    );

	    this.fs.copyTpl(
	      	this.templatePath('app/app.modulos.js'),
	      	this.destinationPath(path.join(this.nomeDiretorioAplicacao, 'app/app.modulos.js'))
	    );

	    this.fs.copyTpl(
	      	this.templatePath('app/index.html'),
	      	this.destinationPath(path.join(this.nomeDiretorioAplicacao, 'index.html')),
	      	{
	      		nomeAplicacao: this.nomeAplicacao,
	      		nomeAplicacaoTratado: this.nomeAplicacaoTratado
	      	}
	    );
	},

	copiarBowerJSON: function () {
		var done = this.async();

		this.prompt({
			type    : 'input',
			name    : 'descricaoAplicacao',
			message : 'Quer definir uma descrição para a aplicação?'
		}, function (resposta) {
			this.descricaoAplicacao = resposta.descricaoAplicacao;

			this.prompt({
				type    : 'input',
				name    : 'autor',
				message : 'Autor'
			}, function (resposta) {
				this.autor = resposta.autor;

				this.fs.copyTpl(
			      	this.templatePath('app/bower.json'),
			      	this.destinationPath(path.join(this.nomeDiretorioAplicacao, 'bower.json')),
			      	{
			      		nomeAplicacaoTratado: this.nomeAplicacaoTratado,
			      		descricaoAplicacao: this.descricaoAplicacao,
			      		autor: this.autor
			      	}
			    );

				done();
			}.bind(this));
		}.bind(this));
	},

	copiarPackageJSON: function () {
		this.fs.copyTpl(
	      	this.templatePath('app/package.json'),
	      	this.destinationPath(path.join(this.nomeDiretorioAplicacao, 'package.json')),
	      	{
	      		nomeAplicacaoTratado: this.nomeAplicacaoTratado,
	      		descricaoAplicacao: this.descricaoAplicacao,
	      		autor: this.autor
	      	}

	    );
	},

	copiarArquivosConfiguracao: function () {
		this.fs.copyTpl(
	      	this.templatePath('app/bowerrc'),
	      	this.destinationPath(path.join(this.nomeDiretorioAplicacao, '.bowerrc'))
	    );

	    this.fs.copyTpl(
	      	this.templatePath('app/gitignore'),
	      	this.destinationPath(path.join(this.nomeDiretorioAplicacao, '.gitignore'))
	    );

	    this.fs.copyTpl(
	      	this.templatePath('app/config.rb'),
	      	this.destinationPath(path.join(this.nomeDiretorioAplicacao, 'config.rb'))
	    );

	    this.fs.copyTpl(
	      	this.templatePath('app/Gruntfile.js'),
	      	this.destinationPath(path.join(this.nomeDiretorioAplicacao, 'Gruntfile.js'))
	    );
	},

	finalizandoCriacaoAplicacao: function () {
		this.log('Aplicação criada. Por favor, execute o seguinte comando: cd ' + this.nomeDiretorioAplicacao + ' && npm start')
	}
});