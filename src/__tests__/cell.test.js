import Cell from '../cell';
import { spy } from 'sinon';

describe("Cell", () => {
	let cell, el;
	let checkBombSpy;

	beforeEach(() => {
		document.body.innerHTML = '<div id="cell">';
		el = document.getElementById("cell");
		checkBombSpy = spy(Cell.prototype, 'checkBomb');
		cell = new Cell();
	});

	afterEach(() => {
		checkBombSpy.restore();
	});

	it("responds to a click", () => {
		let e = new MouseEvent("click");
		cell.isBomb = true;
		cell.el.dispatchEvent(e);
		expect(checkBombSpy.calledOnce).toBe(true);
	});

	it("displays number of nearby bombs", () => {
		let e = new MouseEvent("click");
		cell.neighbors = [
			new Cell({ isBomb: true }),
			new Cell({ isBomb: true }),
			new Cell({ isBomb: true }),
		]
		cell.el.dispatchEvent(e);
		expect(cell.el.innerHTML).toBe("3");
	});

	it("ends the game with a passed function", () => {
		let endGame = jest.fn();
		let explodingCell = new Cell({ isBomb: true, onExplode: endGame});
		explodingCell.explode();
		expect(endGame).toBeCalled();
	});


});