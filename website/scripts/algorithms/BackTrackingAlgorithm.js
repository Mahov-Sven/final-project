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
       //possible solutions
       this.possibleSolutions = {};
       for(key in keys){
        this.possibleSolutions[key] = [];
       }

       
    }

    step(){
        let currentKey = keys[iteration];
        
        for(key of keys){
            if(key != currentKey){
                for(possibleCurrent of variables[currentKey]){
                    this.assignment.set(currentKey, possibleCurrent);
                    for(possibleNext of variables[key]){
                        this.assignment.set(key, possibleNext);
                        for(constraint of this.constraints){
                            if(constraint.isSatisfiedBy(this.assignment)){
                                this.possibleSolutions[currentKey].push(possibleCurrent);
                                this.possibleSolutions[possibleNext].push(possible);
                            }
                        }
                    }
                }
            }
        }


        /*for(possibleCurrent of variables[currentKey]){
            this.assignment.set(currentKey, possibleCurrent);
            for(possibleNext of variables[nextKey]){
                this.assignment.set(nextKey, possibleNext);
                for(possibleConstraint of this.constraints){
                    if(!possibleConstraint.isSatisfiedBy(this.assignment)){
                        satisfied = false;
                    }
                }
                this.solution[currentKey] = possibleCurrent;
                this.solution[nextKey] = possibleNext;
                this.iteration += 1;
                return;
            }
        }
        this.iteration += 1;
        */
    }
}