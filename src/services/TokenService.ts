import { Repository } from 'typeorm'

import Token from '../entities/Token.js'
import AppDataSource from '../config/database.js'

export default class TokenService {
    private _tokenRepository: Repository<Token>

    public constructor() {
        this._tokenRepository = AppDataSource.getRepository(Token)
    }

    public create = async (token: Token) => {
        const newToken = await this._tokenRepository.save(token)

        return {
            accessToken: newToken.accessToken,
            refreshToken: newToken.refreshToken,
        }
    }
}
