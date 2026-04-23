import { NextResponse } from "next/server"

const users = [
  {
    id: 1,
    name: "Ada Lovelace",
    email: "ada@example.com",
  },
  {
    id: 2,
    name: "Grace Hopper",
    email: "grace@example.com",
  },
  {
    id: 3,
    name: "Linus Torvalds",
    email: "linus@example.com",
  },
]

export function GET() {
  return NextResponse.json(users)
}
