import Cell from './cell';

class MineSweeper{
	constructor(options){
		Object.assign(this, options);
		this.rows = this.rows || 10;
		this.cols = this.cols || 10;
		this.bombs = this.bombs || 10;
		this.total = this.rows * this.cols;
		this.cells = [];
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
				this.cells.push(new Cell({
					index: index,
					rowIndex: i,
					colIndex: j
				}));
				index++;
			}
		}
	}

	render(){
		this.el = document.getElementById("main");
		this.el.innerHTML = "minesweeper";
	}
}

export default MineSweeper;