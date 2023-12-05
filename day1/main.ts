import fs from "fs/promises"

const lines = (await fs.readFile("./input.txt", "utf8"))
	.split("\n")
	.map(x => x.trim())
	.filter(x => x.length > 0)

async function part1() {
	const total = lines
		.map(x => x.replace(/[^0-9]/g, ""))
		.map(x => Number(x[0] + x[x.length - 1]))
		.reduce((value, current) => value + current, 0)

	console.log(total)
}

async function part2() {
	const matchers = {
		1: 1,
		2: 2,
		3: 3,
		4: 4,
		5: 5,
		6: 6,
		7: 7,
		8: 8,
		9: 9,
		one: 1,
		two: 2,
		three: 3,
		four: 4,
		five: 5,
		six: 6,
		seven: 7,
		eight: 8,
		nine: 9,
	}
	const total = lines
		.map(x => {
			let result: { index: number; value: number }[] = []
			for (const [matcher, value] of Object.entries(matchers)) {
				const firstIndex = x.indexOf(matcher)
				const lastIndex = x.lastIndexOf(matcher)

				if (firstIndex >= 0) result.push({ index: firstIndex, value })
				if (lastIndex >= 0) result.push({ index: lastIndex, value })
			}

			return result
				.sort((a, b) => a.index - b.index)
				.map(x => x.value)
				.join("")
				.replace(/[^0-9]/g, "")
		})
		.map(x => Number(x[0] + x[x.length - 1]))
		.reduce((value, current) => value + current, 0)

	console.log(total)
}
