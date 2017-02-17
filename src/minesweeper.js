import Cell from './cell';

class MineSweeper{
	constructor(options){
		Object.assign(this, options);
		this.rows = this.rows || 10;
		this.cols = this.cols || 10;
		this.bombs = this.bombs || 10;
		this.total = this.rows * this.cols;
		this.cells = [];
		this.el = document.getElementById("main");
		this.addBombs();
		this.addCells();
		this.render();
	}

	addBombs(){
		this.bombArray = [];
		for(let i = 0; i < this.bombs; i++){
			this.bombArray.push(this.getRandomBombIndex(this.bombArray));
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
			for(let j = 0; j < this.cols; j++){
				let isBomb = this.bombArray.indexOf(index) !== -1;
				let cell = new Cell({
					index: index,
					rowIndex: i,
					colIndex: j,
					isBomb: isBomb
				});
				this.cells.push(cell);
				this.el.appendChild(cell.el);
				index++;
			}
			const br = document.createElement("br");
			this.el.appendChild(br);
		}
	}

	render(){
		for(let cell of this.cells){
		}
	}
}

export default MineSweeper;