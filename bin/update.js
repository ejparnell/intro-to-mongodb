// load('./bin/update.js')
// console.log(db.tng.updateMany({
//     name: 'Jean-Luc Picard'
// }, {
//     $set: {
//         onceBorg: true
//     }
// }))

console.log(db.tng.updateOne({
    name: 'Jean-Luc Picard'
}, {
    $set: {
        onceBorg: false,
        name: 'Locutus'
    }
}))