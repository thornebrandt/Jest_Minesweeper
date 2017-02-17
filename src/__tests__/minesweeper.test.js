import MineSweeper from '../minesweeper';
import Cell from '../cell';

describe("Minesweeper", () => {
	let ms;
	let el;

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


});