var generators = require('yeoman-generator');
var _ = require('underscore.string');
var inventtiWelcome = require('welcome-inventti-ascii');

module.exports = generators.Base.extend({
	bemVindo: function () {
		console.log(inventtiWelcome);
	},

	aplicacao: function () {
		var done = this.async();
		this.prompt({
			type    : 'input',
			name    : 'appName',
			message : 'Qual o nome da aplicação?',
			default : this.appname
		}, function (resposta) {
			var nomeAplicacao = _.camelize(_.humanize(resposta.appName));
			this.appname = nomeAplicacao;

			done();
		}.bind(this));
	},

	copiarTemplateAplicacao: function () {
		this.log('Gerando arquivos da aplicação. Aguarde...');

		this.fs.copyTpl(
			this.templatePath('templates/app/app/app.js'),
			this.destinationPath(this.destinationRoot('/app/app.js')),
			{ nomeAplicacao: this.appname }
		);
	}
});