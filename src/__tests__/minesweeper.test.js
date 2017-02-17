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
		expect(ms.cells.length).toBe(100);
		expect(ms.cells[0]).toBeInstanceOf(Cell);
	});

	it("assigns the correct attribute to cell", () => {
		let firstCell = ms.cells[0];
		let lastCell = ms.cells[99];
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
		for(let cell of ms.cells){
			if(cell.isBomb){
				numBombsFound++;
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
		expect(numBombs).toBe(10);
	});

});