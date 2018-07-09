function cloneParentAncestry(node) {
	let ancestry = null;

	let currentNode = node;
	while(currentNode.parent && currentNode.parent.type !== 'root') {
		const parentClone = currentNode.parent.clone();
		parentClone.removeAll();

		if(ancestry) {
			parentClone.append(ancestry);
		}

		ancestry = parentClone;
		currentNode = currentNode.parent;
	}

	return ancestry;
}

module.exports = cloneParentAncestry;
