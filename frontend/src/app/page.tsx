import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <head>
        <title>OPTIMATECH TEST</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
          <div className="max-w-2xl text-center">
            <h1 className="text-7xl font-bold mb-4">
              OPTIMATECH TEST
            </h1>
            <h2 className="text-2xl font-bold mb-9">
              SISTEMA COM ARQUITETURA EM TRÊS CAMADAS
            </h2>
            <p className="text-xl mb-8">
              Este é um sistema de demonstração de arquitetura em três camadas,
              com o Front-end sendo feito em Next.js e usando shadcn/ui como Desings Systems,
              já para o desenvolvimento do bakcend usou-se como solicitado o Python com o microframework Flask, 
              por fim para o banco de dados foi optado pelo PostgreSQL, com a divisão de contêiners sendo feita com Dockers.
            </p>
            <div className="space-x-4">
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/register">Cadastro</Link>
              </Button>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}
