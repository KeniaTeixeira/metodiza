'use client';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="">
        <div className="">
            <div className="">
                <Image src="/logo.svg" alt="Logo" width={80} height={80} />
                <h1 className="text-cyan-400">METODIZA</h1>
            </div>

            <div className="">
                <h1 className="">Usuario ou e-mail</h1>
                <input
                type="email"
                placeholder="wakawaka.."
                className="bg-white text-black"
                />

                <h1 className="">Senha</h1>
                <input
                type="password"
                placeholder="wili"
                className="bg-white text-black"
                />
            </div>

            <div className="flex flex-col text-gray-300">
                <h1 className="">Esqueci minha senha</h1>
                <h1 className="">Criar conta</h1>
            </div>
            
            <div className="">
                <button className="bg-cyan-500 hover:bg-cyan-600 text-white"> ENTRAR </button>
            </div>
        </div>
    </div>
  );
}
