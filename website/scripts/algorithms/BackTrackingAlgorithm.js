class BackTrackingAlgorithm extends AbstractAlgorith{
    constructor(){
        this.solution = {};
        this.keys = [];
    }

    setup(){
        //setup keys array
       for(key in variables){
           this.keys.push(key);
       } 

       
    }

    step(){
        let currentKey = keys[iteration];
        let nextKey = keys[iteration + 1];
        for(possibleCurrent of variables[currentKey]){
            this.assignment.set(currentKey, possibleCurrent);
            for(possibleNext of variables[nextKey]){
                this.assignment.set(nextKey, possibleNext);
                for(possibleConstraint of this.constraints){
                    if(possibleConstraint.isSatisfiedBy(this.assignment)){
                        this.solution[currentKey] = possibleCurrent;
                        this.solution[nextKey] = possibleNext;
                        this.iteration += 1;
                        return;
                    }
                } 
            }
        }
        this.iteration += 1;
    }
}