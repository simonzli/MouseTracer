module.exports = function(sentTrace, width, height){
    var euclideanStep = [], traceArray = [], count = 0, tempOfES = 0;
    if(sentTrace[1] == null || sentTrace[0].x > 50 || sentTrace[0].y > 50 || sentTrace[sentTrace.length-1].time < 100)
        return 0;
    for(var t = 0; t < sentTrace.length; t++){
        if(t != sentTrace.length - 1){
            if(sentTrace[t].time != sentTrace[t+1].time)
                if(sentTrace[t].x != sentTrace[t+1].x && sentTrace[t].y != sentTrace[t+1].y)
                    setTrace();
        } else {
            setTrace();
        }
    }
    for(var t = 0; t < traceArray.length - 1; t++){
        if(euclideanStep[t] > 5 || traceArray[t].x <= 2 || traceArray[t].x >= (width - 2) || traceArray[t].y <= 2 || traceArray[t].y >= (height - 2))
            return 0;
        euclideanStep[t] = Math.sqrt(Math.pow((traceArray[t+1].x - traceArray[t].x), 2) + Math.pow((traceArray[t+1].y - traceArray[t].y), 2));
        tempOfES += traceArray[t+1].time - traceArray[t].time;
        if(t != 0 && euclideanStep[t] / (traceArray[t+1].time - traceArray[t].time) == euclideanStep[t-1] / (traceArray[t].time - traceArray[t-1].time) && tempOfES > 200){
            return 0;
        }
        if(t != 0 && euclideanStep[t] / (traceArray[t+1].time - traceArray[t].time) != euclideanStep[t-1] / (traceArray[t].time - traceArray[t-1].time))
            tempOfES = traceArray[t+1].time - traceArray[t].time;
    }
    
    return [euclideanStep, traceArray];
    
    function setTrace(){
        traceArray[count++] = {
            x: sentTrace[t].x,
            y: sentTrace[t].y,
            time: sentTrace[t].time
        }
    }
}