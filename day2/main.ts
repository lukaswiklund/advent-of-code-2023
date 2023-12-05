import fs from "fs/promises"

const colors = ["red", "green", "blue"] as const
type Color = (typeof colors)[number]

const gameLimits: Record<Color, number> = { red: 12, green: 13, blue: 14 }

type Game = { game: number; takes: { count: number; color: Color }[][] }

const games: Game[] = (await fs.readFile("./input.txt", "utf8"))
	.split("\n")
	.map(x => x.trim())
	.filter(x => x.length > 0)
	.map(x => {
		const [gameText, takesText] = x.split(":")
		const game = Number(gameText.substring("Game ".length))
		const takes = takesText.split(";").map(take =>
			take.split(",").map(color => {
				const [countText, colorText] = color.trim().split(" ")
				return {
					color: colors.find(x => x === colorText)!,
					count: Number(countText),
				}
			}),
		)
		return { game, takes }
	})

function part1() {
	const possibleGames = games.filter(game => {
		for (const take of game.takes) {
			for (const takeColor of take) {
				if (gameLimits[takeColor.color] < takeColor.count) return false
			}
		}
		return true
	})

	console.log(
		possibleGames.reduce((value, current) => value + current.game, 0),
	)
}

function part2() {
	let total = 0
	for (const game of games) {
		const largest: Record<Color, number> = { red: 0, green: 0, blue: 0 }
		for (const take of game.takes) {
			for (const takeColor of take) {
				if (largest[takeColor.color] < takeColor.count) {
					largest[takeColor.color] = takeColor.count
				}
			}
		}
		total += largest.red * largest.green * largest.blue
	}
	console.log(total)
}
