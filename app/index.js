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

	copiarTemplatesAplicacao: function () {
		var nomeAplicacao = this.nomeAplicacao;
		var nomeAplicacaoTratado = this.nomeAplicacaoTratado;
		var diretorioAplicacao = this.nomeDiretorioAplicacao;

		this.log('Gerando arquivos da aplicação. Aguarde...');
		this.sourceRoot(path.join(__dirname, '../templates/'));

		this.fs.copyTpl(
	      	this.templatePath('app/app.js'),
	      	this.destinationPath(path.join(diretorioAplicacao, 'app/app.js')),
	      	{ nomeAplicacaoTratado: nomeAplicacaoTratado }
	    );

	    this.fs.copyTpl(
	      	this.templatePath('app/app.componentes.js'),
	      	this.destinationPath(path.join(diretorioAplicacao, 'app/app.componentes.js'))
	    );

	    this.fs.copyTpl(
	      	this.templatePath('app/app.modulos.js'),
	      	this.destinationPath(path.join(diretorioAplicacao, 'app/app.modulos.js'))
	    );

	    this.fs.copyTpl(
	      	this.templatePath('app/index.html'),
	      	this.destinationPath(path.join(diretorioAplicacao, 'index.html')),
	      	{ nomeAplicacao: nomeAplicacao }
	    );
	}
});