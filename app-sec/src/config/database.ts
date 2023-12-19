import config from '@/config'

export function getMongoUrl(): string {
    const { username, password, hostname, port, database } = config.mongodb
    return `mongodb://${username}:${password}@${hostname}:${port}/${database}`
}
