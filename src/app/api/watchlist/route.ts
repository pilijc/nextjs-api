import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * GET handler to fetch the watchlist for a specific viewer.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const viewerId = searchParams.get("viewerId");

  if (!viewerId) {
    return NextResponse.json({ error: "Missing viewerId" }, { status: 400 });
  }

  try {
    const watchlist = await prisma.watchlistItem.findMany({
      where: { viewerId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(watchlist);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch watchlist" }, { status: 500 });
  }
}

/**
 * POST handler to add a movie to the watchlist.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { viewerId, movieId, title, posterPath, releaseDate, voteAverage } = body;

    if (!viewerId || !movieId) {
      return NextResponse.json({ error: "Missing viewerId or movieId" }, { status: 400 });
    }

    const item = await prisma.watchlistItem.upsert({
      where: {
        viewerId_movieId: {
          viewerId,
          movieId,
        },
      },
      update: {},
      create: {
        viewerId,
        movieId,
        title,
        posterPath,
        releaseDate,
        voteAverage,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: "Failed to add to watchlist" }, { status: 500 });
  }
}
