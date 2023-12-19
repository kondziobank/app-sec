import mongoose from 'mongoose'
import moment from 'moment'
import config from '@/config'

const RefreshToken = new mongoose.Schema({
    token: {
        type: String,
        unique: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    validUntil: {
        type: Date,
        default() {
            return moment()
                .add(config.refreshTokenLifetimeSeconds, 'seconds')
                .toDate()
        }
    }
})

RefreshToken.virtual

export default mongoose.model('RefreshToken', RefreshToken)
