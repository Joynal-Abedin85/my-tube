function gettime(time){
    const day = parseInt(time/86000)
    const hours = time % 86000
    const hour = parseInt(hours / 3600)
    const minutes = hours % 3600
    const minute = parseInt(minutes/60)
    return `${day} day ${hour} hour ${minute} min ago `
}
console.log(gettime(440000));