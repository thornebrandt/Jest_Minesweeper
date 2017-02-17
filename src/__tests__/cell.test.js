import Cell from '../cell';
import { spy } from 'sinon';

describe("Cell", () => {
	let cell;
	let checkBombSpy;

	beforeEach(() => {
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
		expect(checkBombSpy.returned(true)).toBe(true);
	});
});