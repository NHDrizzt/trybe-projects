let text = "Eu estudo na Trybe com muita dedicação"
let newSplit = text.split(' ')
console.log(newSplit)
console.log(newSplit.length)
console.log(newSplit[1].length)
let maxValue = 0;
let huge;
for (let index = 0; index < newSplit.length; index++) {
    if(newSplit[index].length > maxValue){
        maxValue = newSplit[index].length
        huge = newSplit[index]
    }
}
console.log(huge)