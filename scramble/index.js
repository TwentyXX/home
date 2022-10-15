//@ts-check
const LENG = 12;
const KEY_SIGNS = "+-2";
const KEY_CHARS = "RUFLDB";
const duration = 10000;
const fps = 30;
const screenCount = 4;
const indicators = [...Array(screenCount)].map((_, i) => {
	const indi = document.body.appendChild(document.createElement("div"));
	indi.className = "indicator";
	indi.style.top = `${(100 * i) / screenCount}vh`;
	indi.style.height = `${100 / screenCount}vh`;
	indi.style.lineHeight = `${100 / screenCount}vh`;
	indi.dataset.date = `${Date.now()}`;
	return indi;
});
// const boxes = [...Array(screenCount)].map((_, i) => {
// 	const box = document.body.appendChild(document.createElement("div"));
// 	box.className = "box";
// 	box.style.top = `${(100 * i) / screenCount}vh`;
// 	return box;
// });
const elesList = [...Array(screenCount)].map((_, i) => {
	const box = document.body.appendChild(document.createElement("div"));
	box.className = "box";
	box.style.top = `${(100 * i) / screenCount}vh`;
	return [...Array(LENG)].map((_, i) => {
		if (i !== 0) {
			if (i % 6 === 0) box.appendChild(document.createElement("br"));
			box.appendChild(document.createTextNode(" "));
		}
		return box.appendChild(document.createElement("span"));
	});
});
// let intervalIds = [];
// update();
// elesList.map((eles) => eles.map(updateSpan));

indicators.forEach((indicator, i) => {
	updateSign(i);
	setDisplayInterval(i);

	indicator.animate(
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
	setTimeout(() => {
		updateSign(i);
	}, (duration * (i + 1)) / screenCount);
	// animate(i)
});
setTimeout(() => {
	// 	// animate(i)
	updateBox();
	setInterval(updateBox, duration);
	setInterval(() => {
		indicators;
	}, duration / fps);
}, duration / screenCount);

function updateBox() {
	// intervalIds.forEach(clearInterval);
	// intervalIds = [...Array(screenCount)].map((_, i) =>
	// 	setTimeout(() => {
	// 		indicators[i].dataset.date = `${Date.now()}`;
	// 		updateSign(i);
	// 		animate(i);
	// 	}, (duration * i) / screenCount)
	// );
	[...Array(screenCount)].forEach((_, i) =>
		setTimeout(() => {
			indicators[i].dataset.date = `${Date.now()}`;
			updateSign(i);
			animate(i);
		}, (duration * i) / screenCount)
	);
}
/**
 * @param {number} i
 */
function setDisplayInterval(i) {
	setInterval(() => {
		indicators[i].textContent = `${(
			(1 -
				(Date.now() -
					new Date(parseInt(indicators[i].dataset.date ?? "")).getTime()) /
					duration) *
			100
		).toFixed(2)}%`;
	}, duration / fps);
}

/**
 * @param {number} i
 */
function animate(i) {
	indicators[i].animate(
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
}

/**
 * @param {number} i
 */
function updateSign(i) {
	elesList[i].forEach((spn, i) => {
		const sign = KEY_SIGNS[Math.floor(KEY_SIGNS.length * Math.random())];
		const char =
			KEY_CHARS[
				3 * Math.floor((Math.random() * KEY_CHARS.length) / 3) + (i % 3)
			];
		spn.className = `sign face-${char}`;
		spn.textContent = sign + char;
	});
}
