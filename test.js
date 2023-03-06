function parseOperation(operation) {
  let actions = [];
  while(operation.indexOf("(") !== -1) {
    // console.log(operation.substring(operation.indexOf("("), operation.indexOf(")")))
    console.log(operation)
    parsed = operation.substring(0, operation.indexOf("("))
    operation = operation.substring(operation.indexOf("(")+1, operation.lastIndexOf(")"))
  }
}

parseOperation("AVERAGE(DIVIDE(CATEGORY(id, slot#)))");