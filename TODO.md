Project assignees and design/implementation details are subject to change!

1. DATABASE
(Assignees - Andrew, Ethan, Tommy)
This step constitutes designing and implementating the database. 
A rough mock-up of the database design will be added to this document at a later date. It is summarized here: 
The database will store constraint satisfaction problems (CSPs), which consist of variables and constraints. 
The database will hold a list of problems under a key-value pair association of unique problem-names to unique file-names. 
Each "problem" file will contain, in order: the number of variables, each variable's domain, the number of constraints (functions), and the generic assmebly code of each function. 

2. VISUALIZATION
(Assignees - Andrew, Ethan, Tommy)
This step constitutes designing and implementating visualization of the CSP. 
A rough mock-up of the visualization design will be added to this document at a later date. It is summarized here: 
The visualization will show variables, their domains, and the constraints at each step of the algorithm.
Each "step" of the algorithm will update the visualization, so that a user can see the algorithm progress step-by-step. 
The user shall have the ability to play/pause the visualization (which will advance automatically unless paused), and to skip one step forward.
The user shall also have the ability to restart the algorithm from the beginning (but shall not be able to go back by a single step). 
The user shall be able to use a sliding bar to advance rapidly throughout the algorithm's process. 
Each "frame" of the visualization displays the variables and restraints in a "graph style" format - variables are nodes and restraints are edges. 
Each uninstantiated node (variable) will be fully or partially shaded, depending on the percentage of remaining values in its domain. 
An instantiated node (variable) will instead display its value. 
Each edge will display its assembly code (see Database) on hover-over. 
The visualization will also have an initial page for accepting a user-inputted CSP. 
To input a CSP, a user must provide one or more variables (and their domains), as well as one or more constraints. 
Note that constraints shall be inputted as one or more lines of generic assembly code, constituting a function.
The back-end of the visualization must properly interpret the user's assembly code before it can store it in the database. 

3. ALGORITHMS
(Assignees - Randy, Josh)
This step constitutes implementation of two or more CSP-solving algorithms. 
Generally, such an algorithm takes all variables, their domains, and a set of constraints as inputs. 
It returns the first valid solution (or sometimes all valid solutions) to the CSP it finds, if any exist. 
The algorithm will have to be modified to update the visualization at each "step" in its process. 
The algorithm may be modified to accept the constraints as a set of functions.  

4. DOCUMENTATION
(Assignees - TBD)
This step constitutes writing up documentation to instruct a potential user of our project. 
The primary challenge is to help the user understand the constraints of a CSP. 
The average user will not be familiar with assembly code, so it will fall to the documentation to teach them the basics. 
The documentation will be accessible through the initial page of the visualization, labelled as "Help" or the like. 

5. PRESENTATION
(Assignees - All)
This step constitutes preparing for the presentation - a Powerpoint, demo, notes, etc.
This step will be approached when all other steps are completed. 


