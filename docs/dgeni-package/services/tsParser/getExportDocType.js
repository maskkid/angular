var ts = require('typescript');

module.exports = function getExportDocType() {

  return function(symbol) {
    if(symbol.flags & ts.SymbolFlags.FunctionScopedVariable) {
      return 'var';
    }
    if(symbol.flags & ts.SymbolFlags.BlockScopedVariable) {
      return getBlockScopedVariableDocType(symbol);
    }
    if(symbol.flags & ts.SymbolFlags.Function) {
      return 'function';
    }
    if(symbol.flags & ts.SymbolFlags.Class) {
      return 'class';
    }
    if(symbol.flags & ts.SymbolFlags.Interface) {
      return 'interface';
    }
    if(symbol.flags & ts.SymbolFlags.ConstEnum) {
      return 'enum';
    }
    if(symbol.flags & ts.SymbolFlags.RegularEnum) {
      return 'enum';
    }
    if(symbol.flags & ts.SymbolFlags.Property) {
      return 'module-property';
    }

    log.warn('Unknown symbol type', symbol.name, symbol.flags, symbol.target);
    return 'unknown';
  }

  function getBlockScopedVariableDocType(symbol) {

    var node = symbol.valueDeclaration;
    while(node) {
      if ( node.flags & 0x2000 /* const */) {
        return 'const';
      }
      node = node.parent;
    }
    return 'let';
  }
};