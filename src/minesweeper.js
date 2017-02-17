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
		this.render();
	}

	addBombs(){
		for(let i = 0; i < this.rows; i++){
			for(let j = 0; j < this.cols; j++){
				this.cells.push(new Cell({
					rowIndex: i,
					colIndex: j
				}));
			}
		}
	}

	render(){
		this.el = document.getElementById("main");
		this.el.innerHTML = "minesweeper";
	}
}

export default MineSweeper;