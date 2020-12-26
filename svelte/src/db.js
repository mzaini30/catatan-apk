import Dexie from 'dexie'
const db = new Dexie('database catatan')
db.version(1).stores({
	catatan: '++id, judul, isi, tanggal'
})
export default db