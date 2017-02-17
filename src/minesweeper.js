class MineSweeper{
	constructor(){
		this.render();
	}

	render(){
		this.el = document.getElementById("main");
		this.el.innerHTML = "minesweeper";
	}
}

export default MineSweeper;