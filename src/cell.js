class Cell{
	constructor(options){
		Object.assign(this, options);
		this.el = document.createElement("div");
		let tempDisplay = this.isBomb ? 'X' : 'O'
		this.el.innerHTML = tempDisplay;
		this.el.classList.add('cell');
	}
}

export default Cell;

