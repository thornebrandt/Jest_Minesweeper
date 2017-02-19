import Cell from './cell';
import _ from 'lodash';

class MineSweeper{
	constructor(options){
		Object.assign(this, options);
		if(this.bombArray){
			this.manualBombArray = this.bombArray;
		}
		this.el = document.getElementById("main");
		this.rows = this.rows || 10;
		this.cols = this.cols || 10;
		this.bombs = this.bombs || 10;
		this.total = this.rows * this.cols;
		this.reset();
	}

	reset(){
		this.el.innerHTML = "";
		this.bombsLeft = this.bombs;
		this.bombsLeftEl = document.createElement("p");
		this.el.appendChild(this.bombsLeftEl);
		this.cellMatrix = [];
		this.flagArray = [];
		this.addBombs();
		this.addCells();
		this.populateNeighbors();
		this.displayBombsLeft();
	}

	displayBombsLeft(){
		this.bombsLeftEl.innerHTML = this.bombsLeft +  " bombs left";
	}

	addBombs(){
		if(this.manualBombArray){
			this.bombArray = this.manualBombArray
		} else {
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

	endGame(){
		if(_.isEqual(this.flagArray, this.bombArray)){
			this.winGame();
		} else {
			this.loseGame();
		}
	}

	winGame(){
		this.bombsLeftEl.innerHTML = "You win!";
		this.revealBombs();
	}

	loseGame(){
		this.bombsLeftEl.innerHTML = "You lose!";
		this.revealBombs();
	}

	revealBombs(){
		for(let row of this.cellMatrix){
			for(let cell of row){
				cell.displayBombCount();
			}
		}
	}

	onFlag(flagDropped, flagIndex){
		if(this.bombsLeft){
			if(flagDropped){
				this.addFlag(flagIndex);
				if(this.bombsLeft === 0){
					this.endGame();
				} else {
					this.displayBombsLeft();
				}
			} else {
				this.removeFlag(flagIndex);
				this.displayBombsLeft();
			}
		}
	}

	addFlag(flagIndex){
		this.flagArray.push(flagIndex);
		this.bombsLeft--;
	}

	removeFlag(flagIndex){
		let pos = this.flagArray.indexOf(flagIndex);
		this.flagArray.splice(pos, 1);
		this.bombsLeft++;
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
					isBomb: isBomb,
					onFlag: this.onFlag.bind(this),
					onExplode: this.loseGame.bind(this)
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
				neighbors.push(this.cellMatrix[y - 1][x - 1]);
			}
			neighbors.push(this.cellMatrix[y - 1][x]);
			if(!right){
				neighbors.push(this.cellMatrix[y - 1][x + 1]);
			}
		}

		if(!left){
			neighbors.push(this.cellMatrix[y][x - 1]);
		}

		//CURRENT CELL

		if(!right){
			neighbors.push(this.cellMatrix[y][x + 1]);
		}
		if(!bottom){
			if(!left){
				neighbors.push(this.cellMatrix[y + 1][x - 1]);
			}
			neighbors.push(this.cellMatrix[y + 1][x]);
			if(!right){
				neighbors.push(this.cellMatrix[y + 1][x + 1]);
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

	stringify(){
		let stringArray = [];
		for(let row of this.cellMatrix){
			stringArray.push("[");
			for(let cell of row){
				let character;
				if(cell.isBomb){
					character = 'X'
				} else {
					character = cell.getNearbyBombCount();
				}
				stringArray.push(character);
			}
			stringArray.push("]");
		}
		return(stringArray.join(""));
	}

}

export default MineSweeper;