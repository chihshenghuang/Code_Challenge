import jwt from 'jsonwebtoken'
import config from '../config'

export genToken = (data) => {
	return new Promise((resolve, reject) => {
		const {secret} = config.auth
		jwt.sign(data, secret, (err, token) => {
			if (err) return reject(err)
			resolve(token)
		})
	})	
}



