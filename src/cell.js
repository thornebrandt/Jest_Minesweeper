class Cell{
	constructor(options){
		Object.assign(this, options);
		this.onExplode = this.onExplode || this.displayX;
		this.checkBomb = this.checkBomb.bind(this);
		this.clickHandler = this.clickHandler.bind(this);
		this.contextHandler = this.contextHandler.bind(this);
		this.getNearbyBombCount = this.getNearbyBombCount.bind(this);
		this.displayBombCount = this.displayBombCount.bind(this);
		this.proceed = this.proceed.bind(this);
		this.flag = false;
		this.addEl();
	}

	addEl(){
		this.el = document.createElement("div");
		this.el.innerHTML = "&nbsp;";
		this.el.classList.add('cell');
		this.el.addEventListener("click", this.clickHandler);
		this.el.oncontextmenu = this.contextHandler;
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
		this.numBombs = this.numBombs || this.getNearbyBombCount();
		if(this.flag){
			this.el.innerHTML = "&nbsp;";
		} else {
			this.el.innerHTML = this.numBombs;
		}
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

	toggleFlag(){
		this.flag = !this.flag;
		if(this.flag){
			this.el.classList.add('flag');
			this.el.innerHTML = "&nbsp;";
		} else {
			this.el.classList.remove('flag');
			if(this.numBombs){
				this.el.innerHTML = this.numBombs;
			}
		}
		this.onFlag(this.flag);
	}

	contextHandler(e){
		this.toggleFlag();
		e.preventDefault();
	}

	clickHandler(e){
		e.preventDefault();
		if(e.button === 2){
			//rightclick
			this.toggleFlag();
		} else {
			this.checkBomb();
		}
	}

}

export default Cell;

