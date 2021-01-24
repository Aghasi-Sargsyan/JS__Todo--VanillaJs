function reIndexNodeList(nodeList) {
  Array.prototype.forEach.call(
    nodeList,
    (child, index) => (child.index = index)
  );
}
