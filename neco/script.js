//@ts-check
const cursor = document.getElementById("cursor");
let oldX,
	oldY,
	oldDir = 0,
	d = 0;
const duration = 80;
document.addEventListener("mousemove", ({ x, y }) => {
	if (d + duration < new Date().getTime()) {
		update(x, y);
		// 	// mouseX = x;
		// 	// mouseY = y;
		// 	// requestAnimationFrame(update);
		d = new Date().getTime();
	}
});
function update(mouseX, mouseY) {
	const radius = Math.sqrt((mouseX - oldX) ** 2 + (mouseY - oldY) ** 2);
	if (1 < radius) {
		const atandir = Math.atan2(mouseX - oldX, oldY - mouseY) ?? oldDir;
		const diff = atandir - oldDir;
		const dir = oldDir + euc(diff, Math.PI);
		if (cursor) {
			cursor.style.rotate = `${dir}rad`;
			cursor.style.left = `${mouseX}px`;
			cursor.style.top = `${mouseY}px`;
		}
		oldDir = dir;
	}
	oldX = mouseX;
	oldY = mouseY;
}

function euc(dividend, divisor) {
	const dd = divisor * 2;
	const m = dividend % dd;
	return divisor < m ? (m - dd) * Math.sign(m) : (-divisor < m ? 0 : dd) + m;
}
