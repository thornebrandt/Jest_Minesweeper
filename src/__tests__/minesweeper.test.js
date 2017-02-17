import MineSweeper from '../minesweeper';

describe("Minesweeper", () => {
	let ms;
	let el;

	beforeEach(() => {
		document.body.innerHTML = '<div id="main">';
		el = document.getElementById("main");
		ms = new MineSweeper();
	});

	it("appends minesweeper on page", () => {
		expect(el.innerHTML).toBe("minesweeper");
	});
});