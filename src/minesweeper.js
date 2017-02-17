import Cell from './cell';

class MineSweeper{
	constructor(options){
		Object.assign(this, options);
		this.rows = this.rows || 10;
		this.cols = this.cols || 10;
		this.bombs = this.bombs || 10;
		this.total = this.rows * this.cols;
		this.cellMatrix = [];
		this.el = document.getElementById("main");
		this.addBombs();
		this.addCells();
		this.populateNeighbors();
		this.render();
	}

	addBombs(){
		if(!this.bombArray){
			this.bombArray = [];
			for(let i = 0; i < this.bombs; i++){
				this.bombArray.push(this.getRandomBombIndex(this.bombArray));
			}
		}
	}

	getRandomBombIndex(arr){
		let int = parseInt(Math.random() * this.total);
		if(arr.indexOf(int) !== -1){
			int = this.getRandomBombIndex(arr);
		}
		return int;
	}

	addCells(){
		let index = 0;
		for(let i = 0; i < this.rows; i++){
			let row = [];
			for(let j = 0; j < this.cols; j++){
				let isBomb = this.bombArray.indexOf(index) !== -1;
				let cell = new Cell({
					index: index,
					rowIndex: i,
					colIndex: j,
					isBomb: isBomb
				});
				row.push(cell);
				this.el.appendChild(cell.el);
				index++;
			}
			this.cellMatrix.push(row);
			const br = document.createElement("br");
			this.el.appendChild(br);
		}
	}

	getNeighbors(x, y){
		let neighbors = [];
		let top = y > 0 ? false : true;
		let left = x > 0 ? false : true;
		let bottom = y < this.rows - 1 ? false : true;
		let right = x < this.cols - 1 ? false : true;

		if(!top){
			if(!left){
				neighbors.push(this.cellMatrix[x - 1][y - 1]);
			}
			neighbors.push(this.cellMatrix[x][y - 1]);
			if(!right){
				neighbors.push(this.cellMatrix[x + 1][y - 1]);
			}
		}

		if(!left){
			neighbors.push(this.cellMatrix[x - 1][y]);
		}

		//CURRENT CELL

		if(!right){
			neighbors.push(this.cellMatrix[x + 1][y]);
		}
		if(!bottom){
			if(!left){
				neighbors.push(this.cellMatrix[x - 1][y + 1]);
			}
			neighbors.push(this.cellMatrix[x][y + 1]);
			if(!right){
				neighbors.push(this.cellMatrix[x + 1][y + 1]);
			}
		}
		return neighbors;
	}


	populateNeighbors(){
		for(let i = 0; i < this.rows; i++){
			for(let j = 0; j < this.cols; j++){
				let cell = this.cellMatrix[i][j];
				cell.neighbors = this.getNeighbors(j, i);
			}
		}
	}

	render(){
		for(let cell of this.cellMatrix){

		}
	}
}

export default MineSweeper;