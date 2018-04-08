'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Team = exports.Tipo = exports.Event = exports.Player = exports.User = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = new _sequelize2.default('users_db', null, null, {
	host: 'localhost',
	dialect: 'sqlite',
	storage: './data.sqlite'
});

var User = exports.User = sequelize.define('user', {
	nickname: _sequelize2.default.STRING,
	password: _sequelize2.default.STRING,
	email: _sequelize2.default.STRING

});

var Player = exports.Player = sequelize.define('player', {
	name: _sequelize2.default.STRING,
	country: _sequelize2.default.STRING,
	position: _sequelize2.default.STRING,
	//picture: Sequelize.IMAGE,
	score: _sequelize2.default.INTEGER

});

var Event = exports.Event = sequelize.define('event', {
	round: _sequelize2.default.STRING

});

var Tipo = exports.Tipo = sequelize.define('tipo', {
	name: _sequelize2.default.STRING,
	score: _sequelize2.default.INTEGER
});

var Team = exports.Team = sequelize.define('team', {
	name: _sequelize2.default.STRING,
	formation: _sequelize2.default.STRING,
	score: _sequelize2.default.INTEGER
});

//chave entrangeira de Event
Tipo.hasOne(Event);
Player.hasOne(Event);

//chave estrangeira de Team
User.hasOne(Team);
/* Player.hasOne(Team) */

/* User.belongsTo(Team)
Team.belongsTo(User) */

// User.hasMany(UserLeagueAssociation)
// UserLeagueAssociation.belongsTo(User)

// League.hasMany(UserLeagueAssociation)

User.sync();
Player.sync();
Event.sync();
Tipo.sync();
Team.sync();
// UserLeagueAssociation.sync();
// League.sync();