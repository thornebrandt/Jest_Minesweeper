class Cell{
	constructor(options){
		Object.assign(this, options);
		this.onExplode = this.onExplode || this.displayX;
		this.checkBomb = this.checkBomb.bind(this);
		this.getNearbyBombCount = this.getNearbyBombCount.bind(this);
		this.displayBombCount = this.displayBombCount.bind(this);
		this.proceed = this.proceed.bind(this);
		this.addEl();
	}

	addEl(){
		this.el = document.createElement("div");
		let tempDisplay = this.isBomb ? 'X' : 'O'
		this.el.innerHTML = tempDisplay;
		this.el.classList.add('cell');
		this.el.addEventListener("click", this.checkBomb);
	}

	getNearbyBombCount(){
		if(this.neighbors){
			let total = 0;
			for(let neighbor of this.neighbors){
				if(neighbor.isBomb){
					total++;
				}
			}
			this.checked = true;
			if(total === 0){
				this.proceed();
			}
			return total;
		} else {
			return 0;
		}
	}

	proceed(){
		for(let neighbor of this.neighbors){
			if(!neighbor.checked){
				neighbor.displayBombCount();
			}
		}
	}

	displayBombCount(){
		this.el.innerHTML = this.getNearbyBombCount();
	}

	displayX(){
		this.el.innerHTML = '!';
	}

	explode(){
		this.onExplode();
	}

	checkBomb(){
		if(this.isBomb){
			this.explode();
			return;
		} else {
			this.displayBombCount();
		}
	}

}

export default Cell;

