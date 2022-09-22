const { Sequelize } = require('sequelize');
const { sequelize } = require('../database/db');
const User = require('../models/user');

require('dotenv').config();

exports.register = async (req, res) => {
    if( req.body.name == '' || undefined ) {
        res.status(400).json({ error: 'Nama tidak boleh kosong' });
    } else if( req.body.address == '' || undefined ) {
        res.status(400).json({ error: 'Alamat tidak boleh kosong' });
    } else if( req.body.phone == '' || undefined ) {
        res.status(400).json({ error: 'Nomor hp tidak boleh kosong' });
    }
    const userData = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        upline_id: req.body.upline_id
    };

    User.findOne({
        where: {
            name: req.body.name
        }
    }).then(( user ) => {
        if(!user){
            User.create(userData).then((user) => {
                res.status(200).json(user);
            }).catch(err => { res.send('error :' + err) })
        }else {
            res.status(400).json({ error: 'Username Sudah Ada' })
        }
    }).catch(err => {
        res.send('error :' + err)
    })
}

exports.checkUplineId = async (req, res) => {
    const users = await User.findAll({ where: { upline_id: req.params.id } });
    if( users.length > 1 ){
        const users = User.findAll({ include: [{ model: User, as: 'Downline' }] }).then(data => {
            const upline = data.map((data) => {
                if( data.dataValues.Downline.length < 2 ) {
                    return {
                        id: data.dataValues.id,
                        name: data.dataValues.name,
                        downline: data.dataValues.Downline.length
                    }
                }
            })
            res.status(200).json(upline);
        }).catch(err => res.send('error :' + err))
    } else {
        res.status(200).json(users);
    }
}

exports.findOne = ( req, res ) => {
    const users = User.findOne({where: [Sequelize.or({ id: req.body.search }, { name: req.body.search }, { phone: req.body.search })], include: [{ model: User, as: 'Downline' }, { model: User, as: 'Upline' }] })
                      .then((data) => {
                          if( data !== null ) {
                          const { dataValues: { Downline, Upline, ...userData } } = data;
                          const down = Downline ? Downline.map((data) => {
                              return {
                                  id: data.dataValues.id,
                                  name: data.dataValues.name,
                                  address: data.dataValues.address,
                                  phone: data.dataValues.phone
                            }
                          }) : [];
                          const up = Upline ? { ...Upline.dataValues } : null;
                          console.log(up);
                          res.status(200).json({
                              user: userData,
                              Downline: down,
                              Upline: up,
                          })
                          }else {
                              res.status(400).json({data: 'Data tidak tersedia'})
                          }
                      }).catch(err => {
                          res.send('error : ' + err)
                      });
}
