class Cell{
	constructor(options){
		Object.assign(this, options);
		this.el = document.createElement("div");
		this.el.innerHTML = "x";
	}
}

export default Cell;

