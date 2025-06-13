import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center justify-center gap-1">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
          © {year}
          <Link
            href="https://pauloaraujo-portfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 ml-1 hover:text-primary"
          >
            Paulo Araújo.
          </Link>
        </p>
        <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
          Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
