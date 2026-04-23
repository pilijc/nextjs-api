import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * DELETE handler to remove a movie from the watchlist.
 */
export async function DELETE(
  request: Request,
  props: { params: Promise<{ movieId: string }> }
) {
  const params = await props.params;
  const { searchParams } = new URL(request.url);
  const viewerId = searchParams.get("viewerId");
  const movieId = parseInt(params.movieId, 10);

  if (!viewerId || isNaN(movieId)) {
    return NextResponse.json({ error: "Missing viewerId or invalid movieId" }, { status: 400 });
  }

  try {
    await prisma.watchlistItem.delete({
      where: {
        viewerId_movieId: {
          viewerId,
          movieId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove from watchlist" }, { status: 500 });
  }
}

/**
 * PATCH handler to update the rating of a movie in the watchlist.
 */
export async function PATCH(
  request: Request,
  props: { params: Promise<{ movieId: string }> }
) {
  const params = await props.params;
  const movieId = parseInt(params.movieId, 10);
  
  try {
    const body = await request.json();
    const { viewerId, rating } = body;

    if (!viewerId || isNaN(movieId) || rating === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updatedItem = await prisma.watchlistItem.update({
      where: {
        viewerId_movieId: {
          viewerId,
          movieId,
        },
      },
      data: {
        rating,
      },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update rating" }, { status: 500 });
  }
}
