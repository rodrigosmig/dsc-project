import express from 'express';
import {Player} from '../modelos/models';
import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';

let router = express.Router();
const Op = Sequelize.Op;

router.route('/players')

	.get((req, res)=>{
		Player.findAll().then(function(players){
			res.send(players);
		})
	})

	.post((req, res)=>{
		
		const name= req.body.name;
		const country = req.body.country;
		const position = req.body.position;
		//const picture = req.body.picture;
		const score = req.body.score;

		const data={name: name,country: country, position: position, score: score}

		Player.create(data).then((players)=> {
				res.json({message:'cadastro com sucesso!!'});
		})
		
	})

router.route('/players/nome/:player_name')

	.get((req, res)=>{
		const player_name = "%" + req.params.player_name + "%";
		Player.findAll({
			where: {
				name: {
					[Op.like]: player_name,
				} 
			}
		}).then(player =>{
			if(player.length !== 0) {
				res.json(player);
			}else{
				res.json({message: 'Nenhum jogador cadastrado'});
			}
		})
	})

router.route('/players/:player_id')

	.get((req, res)=>{
		Player.findById(req.params.player_id).then(player =>{
			if(player) {
				res.json(player);
			}else{
				res.json({message: 'Jogador não cadastrado'});
			}
		})
	})	

	.delete((req, res)=>{
		Player.findById(req.params.player_id).then(player =>{
			if(player) {
				player.destroy().then((player)=>{
					res.json({message: 'Jogador Deletado'});
				})
			}else{
				res.json({error: 'Jogador não cadastrado'});
			}
		})
	})

	.put((req, res)=>{
		Player.findById(req.params.player_id).then(player =>{
			if(player){
				player.update({
					name: req.body.name, 
					country: req.body.country, 
					position: req.body.position, 
					score: req.body.score
				}).then((player)=>{
					res.json(player);
				})
			}else{
				res.json({error: 'Jogador não cadastrado'});
			}
		})
	})

export default router;