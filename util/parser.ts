enum Operation {
  ADD,
  SUB,
  MULT,
  DIV,
  AVG,
  CATEGORY
}

interface Action {
  operation: Operation
  param1: String;
  param2?: String;
}

// 333 was here :D

export function parseOperation(operation: string) {
  let actions = [];
  while(operation.indexOf("(") !== -1) {
    let parsed = operation.substring(0, operation.indexOf("("))
    operation = operation.substring(operation.indexOf("(")+1, operation.lastIndexOf(")"))
  }
}

/**
 *  AVERAGE(CATEGORY(id, slot#)) <- Only used for team display | general stats
 *  
 *  DIVIDE(CATEGORY(id, slot#), CATEGORY(id, slot#)) <- Returns percentage | Can be used for match and team display
 * 
 * AVERAGE(DIVIDE(CATEGORY(id, slot#)))
 * 
 */