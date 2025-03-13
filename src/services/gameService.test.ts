import { fetchGames } from "./gameService"
import { describe, beforeEach, test, expect } from "@jest/globals"

// Mock the fetch function
global.fetch = jest.fn()

describe("gameService", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test("fetchGames calls the correct API endpoint with no parameters", async () => {
    const mockResponse = {
      games: [],
      availableFilters: [],
      totalPages: 1,
      currentPage: 1,
      totalGames: 0,
    }
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const result = await fetchGames()

    expect(global.fetch).toHaveBeenCalledWith("/api/games?page=1")
    expect(result).toEqual(mockResponse)
  })

  test("fetchGames calls the correct API endpoint with genre parameter", async () => {
    const mockResponse = {
      games: [],
      availableFilters: [],
      totalPages: 1,
      currentPage: 1,
      totalGames: 0,
    }
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const result = await fetchGames("Action")

    expect(global.fetch).toHaveBeenCalledWith("/api/games?genre=Action&page=1")
    expect(result).toEqual(mockResponse)
  })

  test("fetchGames calls the correct API endpoint with page parameter", async () => {
    const mockResponse = {
      games: [],
      availableFilters: [],
      totalPages: 2,
      currentPage: 2,
      totalGames: 0,
    }
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const result = await fetchGames(undefined, 2)

    expect(global.fetch).toHaveBeenCalledWith("/api/games?page=2")
    expect(result).toEqual(mockResponse)
  })

  test("fetchGames throws an error when the response is not ok", async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Not Found",
    })

    await expect(fetchGames()).rejects.toThrow("Error fetching games: Not Found")
  })
})

