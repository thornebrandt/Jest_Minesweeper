class Cell{
	constructor(options){
		Object.assign(this, options);
		this.checkBomb = this.checkBomb.bind(this);
		this.addEl();
	}

	addEl(){
		this.el = document.createElement("div");
		let tempDisplay = this.isBomb ? 'X' : 'O'
		this.el.innerHTML = tempDisplay;
		this.el.classList.add('cell');
		this.el.addEventListener("click", this.checkBomb);
	}

	checkBomb(){
		return this.isBomb;
	}
}

export default Cell;

