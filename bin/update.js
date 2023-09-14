// load('./bin/update.js')
console.log(db.tng.updateMany({
    name: 'Jean-Luc Picard'
}, {
    $set: {
        onceBorg: false
    }
}))