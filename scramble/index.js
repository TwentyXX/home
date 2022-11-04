//@ts-check
const LENG = 12;
const KEY_SIGNS = "+-2";
const KEY_CHARS = "RUFLDB";
const duration = 9000;
const screenCount = 3;
const indicators = [...Array(screenCount)].map((_, i) => {
	const indi = document.body.appendChild(document.createElement("div"));
	indi.className = "indicator";
	indi.style.top = `${(100 * i) / screenCount}vh`;
	indi.style.height = `${100 / screenCount}vh`;
	indi.style.lineHeight = `${100 / screenCount}vh`;
	if (i === screenCount - 1) indi.classList.add("newest");
	return indi;
});
const elesList = [...Array(screenCount)].map((_, i) => {
	const box = document.body.appendChild(document.createElement("div"));
	box.className = "box";
	box.style.top = `${(100 * i) / screenCount}vh`;
	return [...Array(LENG)].map((_, j) => {
		if (j !== 0) {
			if (j % 6 === 0) box.append(document.createElement("br"));
			box.append(" ");
		}
		return box.appendChild(document.createElement("span"));
	});
});
initializeBox();
window.setTimeout(() => {
	updateBox();
	window.setInterval(updateBox, duration);
}, duration / screenCount);

function initializeBox() {
	indicators.forEach((indi, i) => {
		updateSign(i);

		indi.animate(
			[
				{
					width: `${(100 * (i + 1)) / screenCount}vw`,
				},
				{
					width: "0",
				},
			],
			{
				duration: (duration * (i + 1)) / screenCount,
			}
		);
	});
}
function updateBox() {
	indicators.forEach((indi, i) =>
		window.setTimeout(() => {
			updateSign(i);
			indi.animate(
				[
					{
						width: "100vw",
					},
					{
						width: "0",
					},
				],
				{
					duration,
				}
			);
			// indicators.
			indicators[i].classList.add("newest");
			indicators[(i + screenCount - 1) % screenCount].classList.remove(
				"newest"
			);
		}, (duration * i) / screenCount)
	);
}

/**
 * @param {number} i
 */
function updateSign(i) {
	elesList[i].forEach((spn, j) => {
		const sign = KEY_SIGNS[Math.floor(KEY_SIGNS.length * Math.random())];
		const char =
			KEY_CHARS[
				3 * Math.floor((Math.random() * KEY_CHARS.length) / 3) + (j % 3)
			];
		spn.className = `sign face-${char}`;
		spn.textContent = sign + char;
	});
}
