"use client"
import { useState } from "react";

import useRiscV, { registerNamesList } from "@/components/useRiscV";
import Button from "@/components/Button";


const useShow = () => {
  const [show, setShow] = useState("r");

  const changeTo = (show) => {
    setShow(show);
  }

  return { show, changeTo };
}

export default function Home() {
  const { textAreaRef, register, executeRISCV, reset } = useRiscV();
  const { show, changeTo } = useShow();

  return (
    <main className="bg-[#D2D3D2] h-screen overflow-auto relative overflow-hidden">

      <header className="bg-[#D2D3D2]">
        <div className="flex items-center justify-between h-20 bg-gray-600 px-10">
          <h1 className="text-3xl text-white">RISC-V Simulator</h1>

          <button>
            About me
          </button>
        </div>
      </header>

      <section className="flex h-[70px] bg-[#D2D3D2] px-10 items-center gap-2">
        <Button onClick={executeRISCV}>Execute</Button>
        <Button>Reset</Button>
        <Button>Load</Button>
      </section>

      <section className="grid grid-cols-2 gap-10 px-10 overflow-hidden h-[calc(100%-200px)]">
        <div className="bg-white rounded-md">
          <textarea
            ref={textAreaRef}
            className="w-full h-full p-4 rounded-md border border-gray-600 resize-none text-xl text-black"
            type="text"
          ></textarea>
        </div>

        <div className="">
          <div className="flex gap-2 mb-4">
            <Button onClick={() => changeTo("r")}>Registers</Button>
            <Button onClick={() => changeTo("m")}>Memory</Button>
          </div>

          {
            show === "r" ? (
              <div>
                <div className="grid grid-cols-4 gap-2">
                  {
                    register.map((value, index) => (
                      <div key={index} className="flex gap-2 p-2 border border-gray-600 rounded-md bg-[#c7c7c7] text-black text-lg justify-between px-4">
                        <div>x{index} | {registerNamesList[index]}</div>
                        <div className="bg-cyan-100 rounded-md px-2">
                          {value}</div>
                      </div>
                    ))
                  }

                </div>
              </div>
            ) : (
              <div className="bg-white overflow-auto rounded-md">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Address</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      register.map((value, index) => (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>{value}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            )
          }

        </div>
      </section>
    </main>
  );
}
