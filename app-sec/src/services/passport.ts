import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { Strategy as BearerStrategy } from 'passport-http-bearer'

import User from '@/model/user'
import RefreshToken from '@/model/refreshToken'

export default () => {
    passport.use('login', User.createStrategy())

    passport.use('access-token', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    }, async (payload, done) => {
        try {
            const user = await User.findById(payload.id)
            done(null, user)
        } catch (err) {
            done(err)
        }
    }))

    passport.use('refresh-token', new BearerStrategy(
        async (token, done) => {
            try {
                const refreshToken: any = await RefreshToken.findOneAndDelete({ token }).populate('owner')
                if (!refreshToken || refreshToken.validUntil < new Date()) {
                    return done(null, false)
                }
                
                done(null, refreshToken.owner)
            } catch (err) {
                done(err)
            }
        }
    ))    
}
