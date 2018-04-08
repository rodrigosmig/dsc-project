import express from 'express';
import {User, Team} from '../modelos/models';

let router = express.Router();

router.route('/teams')

	.get((req, res)=>{
		Team.findAll().then(function(team) {
			res.send(team);
		})
	})

	.post((req, res)=>{
		Team.findOne({
			where: {
				userId: req.body.userId,
			}
		}).then(team => {
			//Não permite usuário criar mais de um time
			if(!team) {
				const name = req.body.name;
				const formation = req.body.formation;
				const score = req.body.score;
				const userId = req.body.userId;
				const data = {
					name: req.body.name, 
					formation: req.body.formation,
					score: req.body.score,
					userId: req.body.userId,
				};
				
				Team.create(data).then((team)=> {
					res.json({
						message:'Time cadastrado com sucesso!!'
					});
				})
			}
			else {
				res.json({error: 'Usuário já possui um time'});
			}
		})
		
	})

router.route('/teams/:team_id')

	.get((req, res)=>{
		Team.findById(req.params.team_id).then(team => {
			if(team) {
				res.json(team);
			}else{
				res.json({message: 'Time não cadastrado'});
			}
		})
	})	

	.delete((req, res)=>{
		Team.findById(req.params.team_id).then(team => {
			if(team) {
				team.destroy().then((team)=>{
					res.json({message: 'Time Deletado'});
				})
			}else{
				res.json({error: 'Time não cadastrado'});
			}
		})
	})

	.put((req, res)=>{
		Team.findById(req.params.team_id).then(team => {
			if(team){
				team.update({
					name: req.body.name, 
					formation: req.body.formation,
					score: req.body.score,
					userId: req.body.userId,
				}).then((team) => {
					res.json(team);
				})
			}else{
				res.json({error: 'Time não cadastrado'});
			}
		})
	})

export default router;