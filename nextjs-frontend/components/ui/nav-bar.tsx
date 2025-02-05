import Link from "next/link"
import Image from "next/image"
import { LibraryBig, FolderGit2 } from "lucide-react"

export function NavBar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 w-16 flex flex-col border-r bg-background p-4">
      <div className="flex flex-col items-center gap-8">
        <Link
          href="/"
          className="flex items-center justify-center rounded-full"
        >
          <Image
            src="/images/IntellectEU_Cube_Logo.png"
            alt="IntellectEU"
            width={64}
            height={64}
            className="object-cover transition-transform duration-200 hover:scale-105"
          />
        </Link>
        <Link
          href="/repositories"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <FolderGit2 className="h-5 w-5" />
        </Link>
        <Link
          href="/sources"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <LibraryBig className="h-5 w-5" />
        </Link>
      </div>
    </aside>
  )
}
