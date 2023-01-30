//@ts-check
const queryParams = new URLSearchParams(location.search);
const q = {
	count: queryParams.get("count"),
	time: queryParams.get("time"),
	rows: queryParams.get("row"),
	theme: queryParams.get("t"),
};
const defaultOptions = {
	count: 12,
	time: 9000,
	rows: 3,
	theme: "dark",
};
const { count, time, rows, theme } = {
	count: q.count ? parseInt(q.count) : defaultOptions.count,
	time: q.time ? parseInt(q.time) : defaultOptions.time,
	rows: q.rows ? parseInt(q.rows) : defaultOptions.rows,
	theme: q.theme?.startsWith("l") ? "light" : "dark",
};

console.log(count, time, rows, theme)
/** @type HTMLStyleElement? */
const lightStyle = document.querySelector("#lightTheme");
/** @type HTMLStyleElement? */
const darkStyle = document.querySelector("#darkTheme");
if (lightStyle && darkStyle) {
	lightStyle.disabled = theme != "light";
	darkStyle.disabled = theme != "dark";
}
// parseInt(queryParams.get("len")) : 13;
// queryParams.get("dur");
// queryParams.get("scr");
// const LENG = 12;
const KEY_SIGNS = "+-2";
const KEY_CHARS = "RUFLDB";
// const duration = 9000;
// const rows = 3;
const indicators = [...Array(rows)].map((_, i) => {
	const indi = document.body.appendChild(document.createElement("div"));
	indi.className = "indicator";
	indi.style.top = `${(100 * i) / rows}vh`;
	indi.style.height = `${100 / rows}vh`;
	indi.style.lineHeight = `${100 / rows}vh`;
	if (i === rows - 1) indi.classList.add("newest");
	return indi;
});
const elesList = [...Array(rows)].map((_, i) => {
	const box = document.body.appendChild(document.createElement("div"));
	box.className = "box";
	box.style.top = `${(100 * i) / rows}vh`;
	return [...Array(count)].map((_, j) => {
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
	window.setInterval(updateBox, time);
}, time / rows);

function initializeBox() {
	indicators.forEach((indi, i) => {
		updateSign(i);

		indi.animate(
			[
				{
					width: `${(100 * (i + 1)) / rows}vw`,
				},
				{
					width: "0",
				},
			],
			{
				duration: (time * (i + 1)) / rows,
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
					duration: time,
				}
			);
			// indicators.
			indicators[i].classList.add("newest");
			indicators[(i + rows - 1) % rows].classList.remove("newest");
		}, (time * i) / rows)
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
