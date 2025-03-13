import type { Game } from "@/utils/endpoint";

export interface GamesResponse {
  games: Game[];
  availableFilters: string[];
  totalPages: number;
  currentPage: number;
  totalGames: number;
}

export const fetchGames = async (
  genre?: string,
  page = 1
): Promise<GamesResponse> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const params = new URLSearchParams();
    if (genre) params.append("genre", genre);
    params.append("page", page.toString());

    const response = await fetch(`${apiUrl}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`Error fetching games: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch games:", error);
    throw error;
  }
};
