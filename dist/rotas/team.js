'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../modelos/models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/teams').get(function (req, res) {
	_models.Team.findAll().then(function (team) {
		res.send(team);
	});
}).post(function (req, res) {
	_models.Team.findOne({
		where: {
			userId: req.body.userId
		}
	}).then(function (team) {
		//Não permite usuário criar mais de um time
		if (!team) {
			var name = req.body.name;
			var formation = req.body.formation;
			var score = req.body.score;
			var userId = req.body.userId;
			var data = {
				name: req.body.name,
				formation: req.body.formation,
				score: req.body.score,
				userId: req.body.userId
			};

			_models.Team.create(data).then(function (team) {
				res.json({
					message: 'Time cadastrado com sucesso!!'
				});
			});
		} else {
			res.json({ error: 'Usuário já possui um time' });
		}
	});
});

router.route('/teams/:team_id').get(function (req, res) {
	_models.Team.findById(req.params.team_id).then(function (team) {
		if (team) {
			res.json(team);
		} else {
			res.json({ message: 'Time não cadastrado' });
		}
	});
}).delete(function (req, res) {
	_models.Team.findById(req.params.team_id).then(function (team) {
		if (team) {
			team.destroy().then(function (team) {
				res.json({ message: 'Time Deletado' });
			});
		} else {
			res.json({ error: 'Time não cadastrado' });
		}
	});
}).put(function (req, res) {
	_models.Team.findById(req.params.team_id).then(function (team) {
		if (team) {
			team.update({
				name: req.body.name,
				formation: req.body.formation,
				score: req.body.score,
				userId: req.body.userId
			}).then(function (team) {
				res.json(team);
			});
		} else {
			res.json({ error: 'Time não cadastrado' });
		}
	});
});

exports.default = router;