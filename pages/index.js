import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const Three = dynamic(() => import('../components/three'), { ssr: false });
const Three_2 = dynamic(() => import('../components/three_2'), { ssr: false });
const Three_3 = dynamic(() => import('../components/three_3'), { ssr: false });
const Three_4 = dynamic(() => import('../components/three_4'), { ssr: false });
const Three_5 = dynamic(() => import('../components/three_5'), { ssr: false });
const Three_6 = dynamic(() => import('../components/three_6'), { ssr: false });

export default function Home() {
  const [color, setColor] = useState(Math.floor(Math.random() * 16777215).toString(16));
  const [lightsOn, setLightsOn] = useState(true);

  return (
    <div>
      <Head>
        <title>Boilerplate NEXThreeTailwind</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className=" bg-black w-full ">
        <h1 className="text-white text-center -mb-8 pt-2 text-xs">Boilerplate</h1>
        <h1
          className="text-4xl md:text-6xl text-white text-center py-8 font-bold
        text-transparent bg-clip-text bg-gradient-to-br from-gray-600 to-white"
        >
          Next.js + Three.js + Tailwindcss
        </h1>
      </div>
      {/* Three_1 */}
      <div
        className="flex w-full flex-col md:flex-row items-center justify-center relative -mt-2 overflow-hidden"
        onClick={() => setColor(Math.floor(Math.random() * 16777215).toString(16))}
      >
        <Three color={color} />
        <div className="flex flex-col items-center absolute top-0">
          <h1 className="text-white text-center -mb-10 text-xs">Created by someone in</h1>
          <Image src={'/black.svg'} height="180" width="180" alt="black" />
        </div>
      </div>

      <div className="flex w-full flex-col md:flex-row max-w-4xl my-8 mx-auto px-8">
        <h1 className="text-6xl font-bold mr-10 mb-8 md:mb-0">Next.js + Three.js + Tailwindcss</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industrys standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
      <div className="h-px w-full bg-black mx-auto self-center" />

      {/* Three_2 */}
      <div className="flex w-full flex-col md:flex-row items-center justify-center  overflow-hidden mt-12">
        <Three_2 />
        <div className="flex flex-col items-center md:w-1/2 px-12">
          <h1
            className="text-6xl text-white py-8 font-bold
        text-transparent bg-clip-text bg-gradient-to-br from-pink-600 to-blue-400 self-start"
          >
            半値幅
          </h1>
          <p className="text-black">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industrys standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently with desktop publishing
            software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
      {/* Three_3 */}

      <div className="flex w-full flex-col  items-center justify-center  overflow-hidden mt-12 ">
        <div className="flex flex-col items-center  px-12 my-12">
          <h1
            className="text-6xl text-white text-start py-8 font-bold
        text-transparent bg-clip-text bg-gradient-to-br from-[#aefbfd] to-[#FF99FF]"
          >
            半分の高さ
          </h1>
          <p className="text-black">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industrys standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently with desktop publishing
            software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div className="h-px w-full bg-gradient-to-l from-[#aefbfd] to-[#FF99FF] mx-auto self-cente " />
        <div className="h-2 w-full bg-gradient-to-l from-[#aefbfd] to-[#FF99FF] mx-auto self-center my-2" />
        <div className="bg-gradient-to-l from-[#aefbfd] to-[#FF99FF]">
          <Three_3 />
        </div>
        <div className="h-2 w-full bg-black mx-auto self-cente my-2" />
        <div className="h-[5px] w-full bg-black mx-auto self-center" />
        <div className="h-[3px] w-full bg-black mx-auto self-center mt-1" />
      </div>
      {/* Three_4 */}
      <div
        className={`flex w-full flex-col md:flex-row items-center justify-center overflow-hidden my-12 py-4 ${
          lightsOn ? 'bg-white' : 'bg-black'
        }`}
      >
        <div className="flex flex-col items-center md:w-1/2 px-12">
          <h1
            className={`text-6xl py-8 font-black self-start ${
              lightsOn
                ? 'text-black'
                : 'text-transparent bg-clip-text bg-gradient-to-br from-pink-600 to-blue-400'
            }`}
          >
            半値幅
          </h1>
          <p className={` ${lightsOn ? 'text-black' : 'text-white'}`}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industrys standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting.
          </p>
          <div className="self-start my-12">
            {lightsOn ? (
              <button className=" border-2 border-black p-2" onClick={() => setLightsOn(!lightsOn)}>
                Lights off
              </button>
            ) : (
              <button className="text-white border-2 p-2" onClick={() => setLightsOn(!lightsOn)}>
                Lights on
              </button>
            )}
          </div>
        </div>
        <Three_4 lightsOn={lightsOn} />
      </div>

      <div className="h-2 w-full bg-black mx-auto self-cente my-2" />
      <div className="h-[5px] w-full bg-black mx-auto self-center" />
      <div className="h-[3px] w-full bg-black mx-auto self-center mt-1" />
      {/* Three_5 */}

      <div
        className={`flex w-full flex-col items-center justify-center overflow-hidden mt-12  px-12 text-black`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center md:w-1/2 mb-12">
          <h1 className={`text-6xl py-8 font-bold self-start mr-5`}>ああ</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industrys standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting.
          </p>
        </div>
        <div className="cursor-grab  ">
          <Three_5 />
        </div>
      </div>

      {/* Three_6 */}
      <div
        className={`flex w-full flex-col items-center justify-center overflow-hidden mt-12  px-12`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center md:w-1/2 mb-12">
          <h1
            className={`text-6xl py-8 font-bold self-start text-transparent bg-clip-text bg-gradient-to-br from-pink-600 to-yellow-400 mr-5`}
          >
            わお
          </h1>
          <p className={`text-black`}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industrys standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting.
          </p>
        </div>
        <div className="cursor-grab ">
          <Three_6 />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black  py-18 w-full flex justify-center items-center ">
        <a className="my-4" href="https://github.com/webdiego">
          <Image src={'/GitHub.svg'} height="42" width="42" alt="GitHub" />
        </a>
      </div>
    </div>
  );
}
