import mongoose from 'mongoose'
import { getMongoUrl } from '@/config/database'

export default async () => mongoose.connect(getMongoUrl())
