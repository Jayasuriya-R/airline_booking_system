function compareTime(time1,time2){
    let timeStamp1 = new Date(time1);
    let timeStamp2 = new Date(time2);
    return timeStamp1.getTime() > timeStamp2.getTime()
}

module.exports = {
    compareTime
}