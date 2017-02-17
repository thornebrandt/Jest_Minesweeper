import MineSweeper from '../minesweeper';
import Cell from '../cell';

describe("Minesweeper", () => {
	let ms;
	let el;

	const text = (node) => {
		let innerHTML = node.innerHTML;
		return innerHTML.replace(/<[^>]*>/g, "");
	}

	beforeEach(() => {
		document.body.innerHTML = '<div id="main">';
		el = document.getElementById("main");
		ms = new MineSweeper({ rows: 10, cols: 10, bombs: 10});
	});

	it("is to be created with 100 cells and 10 bombs", () => {
		expect(ms.rows).toBe(10);
		expect(ms.cols).toBe(10);
		expect(ms.total).toBe(100);
		expect(ms.bombs).toBe(10);
	});

	it("creates 100 cells", () => {
		expect(ms.cellMatrix.length).toBe(10);
		expect(ms.cellMatrix[0].length).toBe(10);
		expect(ms.cellMatrix[0][0]).toBeInstanceOf(Cell);
	});

	it("assigns the correct attribute to cell", () => {
		let firstCell = ms.cellMatrix[0][0];
		let lastCell = ms.cellMatrix[9][9];
		expect(firstCell.index).toBe(0);
		expect(firstCell.rowIndex).toBe(0);
		expect(firstCell.colIndex).toBe(0);
		expect(lastCell.index).toBe(99);
		expect(lastCell.rowIndex).toBe(9);
		expect(lastCell.colIndex).toBe(9);
	});

	it("creates 10 bombs", () => {
		expect(ms.bombArray.length).toBe(10);
	});

	it("creates integer bomb indexes", () => {
		expect(ms.bombArray[0]).toBe( parseInt(ms.bombArray[0] ));
	});

	it("generates bomb indexes randomly", () => {
		const ms2 = new MineSweeper({ rows: 10, cols: 10, bombs: 10});
		expect(ms2.bombArray).not.toEqual(ms.bombArray); //might fail *randomly
	});

	it("generates unique numbers", () => {
		for(let i = 0; i < 10; i++){
			ms = new MineSweeper({ rows: 10, cols: 10, bombs: 10});
			let containsDupe = ms.bombArray.some((item, i) => {
				return ms.bombArray.indexOf(item) !== i;
			});
			expect(containsDupe).toBe(false);
		}
	});

	it('passes isBomb to 10 cells', () => {
		let numBombsFound = 0;
		for(let row of ms.cellMatrix){
			for(let cell of row){
				if(cell.isBomb){
					numBombsFound++;
				}
			}
		}
		expect(numBombsFound).toBe(10);
	});

	it("displays bombs on DOM", () => {
		let cells = document.getElementsByClassName("cell");
		expect(cells.length).toBe(100);

		//temporary, for display of bombs
		let numBombs = 0;
		for(let cell of cells){
			if(cell.innerHTML === 'X'){
				numBombs++;
			}
		}
	});

	it("add neighbors to cells", () => {
		let topLeftCell = ms.cellMatrix[0][0];
		let middleCell = ms.cellMatrix[4][4];
		expect(topLeftCell.neighbors.length).toBe(3);
		expect(middleCell.neighbors.length).toBe(8);
	});

	it("adds manual bomb array for testing", () => {
		let bombArray = [1];
		let ms2 = new MineSweeper({ bombArray: bombArray });
		expect(ms2.bombArray.length).toBe(1);
	});

	it("cell keeps track of nearby bombs", () => {
		let bombArray = [1];
		let ms2 = new MineSweeper({ bombArray: bombArray });
		let cell = ms2.cellMatrix[0][0];
		expect(cell.getNearbyBombCount()).toBe(1);
	});

	it("displays stringied bombs for testing", () => {
		let ms2 = new MineSweeper({
			rows: 3,
			cols: 3,
			bombs: 1,
			bombArray: [1]
		});
		let string = ms2.stringify();
		let expectedString = "[1X1][111][000]";
		expect(string).toBe(expectedString);
	});




});