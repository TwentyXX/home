//@ts-check
const cursor = document.getElementById("cursor");
let oldX,
	oldY,
	oldDir = 0;
let mouseX,
	mouseY,
	d = 0;
document.addEventListener("mousemove", ({ x, y }) => {
	const duration = 100;
	if (d + duration < new Date().getTime()) {
		mouseX = x;
		mouseY = y;
		d = new Date().getTime();
	}
});
requestAnimationFrame(update);

function update() {
	const radius = Math.sqrt((mouseX - oldX) ** 2 + (mouseY - oldY) ** 2);
	if (1 < radius) {
		let dir = Math.atan2(mouseX - oldX, oldY - mouseY) ?? 0;
		let diff = dir - oldDir;
		if (Math.PI < Math.abs(diff)) {
			diff -= Math.sign(diff) * 2 * Math.PI;
		}
		dir = oldDir + diff;
		if (cursor) {
			cursor.style.rotate = `${dir}rad`;
			cursor.style.left = `${mouseX}px`;
			cursor.style.top = `${mouseY}px`;
		}
		oldDir = dir;
	}
	oldX = mouseX;
	oldY = mouseY;
	requestAnimationFrame(update);
}
