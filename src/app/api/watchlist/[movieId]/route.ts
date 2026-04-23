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
