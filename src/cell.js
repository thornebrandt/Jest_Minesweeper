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

	checkNearbyBombs(){
		if(this.neighbors){
			let total = 0;
			for(let neighbor of this.neighbors){
				if(neighbor.isBomb){
					total++;
				}
			}
			return total;
		} else {
			return 0;
		}
	}

	checkBomb(){
		return this.isBomb;
	}
}

export default Cell;

