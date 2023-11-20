const PORT = 8080
const MODEL_PERSISTANCE = 'MONGO'  // 'FILE' // 'MONGO'
const MONGO_STRCNX = 'mongodb+srv://teamsuts:zJ6zYTwzOysdSzOP@cluster0.i90gkwk.mongodb.net/'
const MONGO_DATA_BASE = 'sutsDB' // 'sutsDBtest' <--- podríamos generarla

export default{
    PORT,
    MODEL_PERSISTANCE,
    MONGO_STRCNX,
    MONGO_DATA_BASE
}
