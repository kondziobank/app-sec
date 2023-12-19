import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import passportLocalMongoose from 'passport-local-mongoose'
import config from '@/config'
import tokenGenerator from '@/services/tokenGenerator'
import RefreshToken from '@/model/refreshToken'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
}, {
    timestamps: true,
})

UserSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        { id: this.id },
        config.jwtSecret,
        { expiresIn: config.accessTokenLifetimeSeconds }
    )
}

UserSchema.methods.createRefreshToken = async function() {
    const refreshToken = tokenGenerator(config.refreshTokenBytesNumber)
    await RefreshToken.create({
        token: refreshToken,
        owner: this._id,
    })

    return refreshToken
}

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

export default mongoose.model('User', UserSchema)
