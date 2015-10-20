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
		}, function (answers) {
			this.log(_.camelize(_.humanize(answers.appName)));

			done();
		}.bind(this));
	}
});