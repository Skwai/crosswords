import Firebase from 'firebase'
import config from '@/config'

Firebase.initializeApp(config.FIREBASE)
const db = Firebase.database()

export default db
export const fb = Firebase
