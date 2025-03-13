import { allGames, availableFilters, delay } from "@/utils/endpoint"

const ITEMS_PER_PAGE = 12

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const genre = searchParams.get("genre")
  let page = Number.parseInt(searchParams.get("page") ?? "1")

  let games = allGames

  if (genre) {
    games = games.filter((game) => game.genre.toLowerCase() === genre.toLowerCase())
  }

  if (page < 1 || isNaN(page)) page = 1

  // Mock a delay to simulate a real API
  await delay(2000)

  const totalGames = games.length
  const fromIndex = (page - 1) * ITEMS_PER_PAGE
  const toIndex = page * ITEMS_PER_PAGE
  const paginatedGames = games.slice(fromIndex, toIndex)

  const totalPages = Math.ceil(totalGames / ITEMS_PER_PAGE)
  const currentPage = page

  return Response.json({
    games: paginatedGames,
    availableFilters,
    totalPages,
    currentPage,
    totalGames,
  })
}

